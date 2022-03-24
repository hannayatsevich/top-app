import {withLayout} from "../../layouts/default/Layout";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import React from "react";
import axios from "axios";
import {IMenuItem} from "../../interfaces/menu.interface";
import {ITopPageModel} from "../../interfaces/page.interface";
import {ParsedUrlQuery} from "node:querystring";
import {IProductModel} from "../../interfaces/product.interface";

const firstCategory = 0;

interface CoursePageProps extends Record<string, unknown> {
    menu: IMenuItem[];
    firstCategory: number;
    page: ITopPageModel;
    products: IProductModel[];
}

export const getStaticProps: GetStaticProps<CoursePageProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if(!params) {
        return  {
            notFound: true
        };
    }
    const {data: menu} = await axios.post<IMenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });
    const {data: page} = await axios.get<ITopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
    const {data: products} = await axios.post<IProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
        category: page.category,
        limit: 10
    });
    return {
        props: {
            menu,
            firstCategory,
            page,
            products
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const {data: menu} = await axios.post<IMenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });
    return {
        paths: menu.flatMap(menuItem => menuItem.pages.map(page => '/courses/' + page.alias)),
        fallback: true
    };
};

const CoursePage: React.FC<CoursePageProps> = ({menu, firstCategory, page, products}) => {
    return (
        <>
            {products && products.length}
        </>
    );
};

export default withLayout(CoursePage);
