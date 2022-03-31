import {withLayout} from "../../layouts/default/Layout";
import {GetStaticPaths, GetStaticProps} from "next";
import React from "react";
import {IMenuItem} from "../../interfaces/menu.interface";
import {TopLevelCategory} from "../../interfaces/page.interface";
import axios from "axios";
import {firstLevelMenu} from "../../constants";
import {API} from "../../helpers/api";

interface TypePageProps extends Record<string, unknown> {
    menu: IMenuItem[];
    firstCategory: TopLevelCategory;
}

export const getStaticProps: GetStaticProps<TypePageProps> = async ({params}) => {
    if(!params)
        return  {
            notFound: true
        };

    const firstLevelMenuItem = firstLevelMenu.find(menuItem => menuItem.route === params.type);
    if(!firstLevelMenuItem)
        return  {
            notFound: true
        };

    try {
        const {data: menu} = await axios.post<IMenuItem[]>(API.toppage.find, {
            firstCategory: firstLevelMenuItem.id
        });

        return {
            props: {
                menu,
                firstCategory: firstLevelMenuItem.id
            }
        };

    }
    catch (e) {
        return  {
            notFound: true
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map(menuItem => `/${menuItem.route}`),
        fallback: false
    };
};

const TypePage: React.FC<TypePageProps> = ({firstCategory}) => {
  return (
    <>
        {`type: ${firstCategory}` }
    </>
  );
};

export default withLayout(TypePage);
