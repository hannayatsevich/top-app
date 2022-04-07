import React from "react";
import {withLayout} from "@/layouts/default/Layout";
import {Htag} from "@/components/index";

export const Error404: React.FC = () => {
    return (
        <div className={'Error404'}>
            <Htag tag={'h1'}>Упс... Что-то пошло не так</Htag>
            <Htag tag={'h3'}>Ошибка 404</Htag>
        </div>
    );
};

export default withLayout(Error404);
