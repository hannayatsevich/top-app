import {withLayout} from "../../layouts/default/Layout";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import React from "react";
import axios from "axios";
import {IMenuItem} from "../../interfaces/menu.interface";
import {ITopPageModel, TopLevelCategory} from "../../interfaces/page.interface";
import {ParsedUrlQuery} from "node:querystring";
import {IProductModel} from "../../interfaces/product.interface";
import {firstLevelMenu} from "../../constants";
import {TopPageComponent} from "../../components";

interface AliasPageProps extends Record<string, unknown> {
    menu: IMenuItem[];
    firstCategory: TopLevelCategory;
    page: ITopPageModel;
    products: IProductModel[];
}

export const getStaticProps: GetStaticProps<AliasPageProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if(!params) {
        return  {
            notFound: true
        };
    }

    const firstLevelMenuItem = firstLevelMenu.find(menuItem => menuItem.route === params.type);
    if(!firstLevelMenuItem)
        return  {
            notFound: true
        };
    
    try {
        const {data: menu} = await axios.post<IMenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
            firstCategory: firstLevelMenuItem.id
        });
        if(!menu.length)
            return  {
                notFound: true
            };

        const {data: page} = await axios.get<ITopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
        const {data: products} = await axios.post<IProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
            category: page.category,
            limit: 10
        });
        return {
            props: {
                menu,
                firstCategory: firstLevelMenuItem.id,
                page,
                products
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
    let paths: string[] = [];
    for (const firstLevelMenuItem of firstLevelMenu) {
        const {data: menu} = await axios.post<IMenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
            firstCategory: firstLevelMenuItem.id
        });
        paths = paths.concat(menu.flatMap(menuItem => menuItem.pages.map(page => `/${firstLevelMenuItem.route}/${page.alias}`)));
    }

    return {
        paths,
        fallback: true
    };
};

const AliasPage: React.FC<AliasPageProps> = ({ firstCategory, page, products}) => {
    return (
        page ?
        <TopPageComponent
            firstCategory={firstCategory}
            page={page}
            products={products}
        /> : <></>
    );
};

export default withLayout(AliasPage);
