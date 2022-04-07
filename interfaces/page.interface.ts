import {IMenuItem} from "@/interfaces/menu.interface";

export enum TopLevelCategory {
    Courses,
    Services,
    // Books,
    // Products
}

export interface ITopPageAdvantage {
    title: string;
    description: string;
    _id: string;
}

export interface IHhData {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
    updatedAt: Date;
    _id: string;
}

export interface IPageBlog {
    h1: string;
    metaTitle: string;
    metaDescription: string;
    views: number;
    _id: string;
}

export interface ITopPageModel {
    _id: string;
    tags: string[];
    secondCategory: string;
    alias: string;
    title: string;
    category: string;
    seoText?: string;
    tagsTitle: string;
    metaTitle: string;
    metaDescription: string;
    firstCategory: TopLevelCategory;
    advantages?: ITopPageAdvantage[];
    createdAt: Date;
    updatedAt: Date;
    hh?: IHhData;
    qas: any[];
    addresses: any[];
    categoryOn: string;
    blog: IPageBlog;
}

export interface IFirstCategory extends Record<string, unknown> {
    firstCategory: TopLevelCategory,
    menu: IMenuItem[];
}