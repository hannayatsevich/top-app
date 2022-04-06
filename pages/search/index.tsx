import {withLayout} from "../../layouts/default/Layout";
import {GetStaticProps} from "next";
import React from "react";
import {IMenuItem} from "../../interfaces/menu.interface";
import {TopLevelCategory} from "../../interfaces/page.interface";
import axios from "axios";
import {API} from "../../helpers/api";
import {SearchPageComponent} from "../../components";

export interface IFirstCategory extends Record<string, unknown> {
    firstCategory: TopLevelCategory,
    menu: IMenuItem[];
}

interface SearchPageProps extends Record<string, unknown> {
    menu: IMenuItem[];
    firstCategory: TopLevelCategory;
    categories: IFirstCategory[],
}

export const getStaticProps: GetStaticProps<SearchPageProps> = async () => {
    try {
        const firstCategory = TopLevelCategory.Courses;
        const {data: menuCourses} = await axios.post<IMenuItem[]>(API.toppage.find, {
            firstCategory: TopLevelCategory.Courses
        });
        const {data: menuServices} = await axios.post<IMenuItem[]>(API.toppage.find, {
            firstCategory: TopLevelCategory.Services
        });
        return {
            props: {
                menu: menuCourses,
                firstCategory,
                categories: [
                    {
                        firstCategory: TopLevelCategory.Courses,
                        menu: menuCourses,
                    },
                    {
                        firstCategory: TopLevelCategory.Services,
                        menu: menuServices,
                    },
                ],
            }
        };
    }
    catch (e) {
        return  {
            notFound: true
        };
    }
};

const SearchPage: React.FC<SearchPageProps> = ({categories}) => {
    return (
        <SearchPageComponent categories={categories}/>
    );
};

export default withLayout(SearchPage);
