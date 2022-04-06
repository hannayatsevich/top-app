import {withLayout} from "../../layouts/default/Layout";
import {GetStaticProps} from "next";
import React from "react";
import {IMenuItem} from "../../interfaces/menu.interface";
import {TopLevelCategory} from "../../interfaces/page.interface";
import axios from "axios";
import {useRouter} from "next/router";
import {API} from "../../helpers/api";

interface SearchPageProps extends Record<string, unknown> {
    menu: IMenuItem[];
    firstCategory: TopLevelCategory;
}

export const getStaticProps: GetStaticProps<SearchPageProps> = async () => {
    const firstCategory = TopLevelCategory.Courses;
    const {data: menu} = await axios.post<IMenuItem[]>(API.toppage.find, {
        firstCategory
    });
    return {
        props: {
            menu,
            firstCategory
        }
    };
};

const SearchPage: React.FC<SearchPageProps> = () => {
  return (
    <>
        SearchPage
    </>
  );
};

export default withLayout(SearchPage);
