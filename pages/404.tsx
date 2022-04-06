import {withLayout} from "../layouts/default/Layout";
import React from "react";
import {Htag} from "../components";

export const Error404: React.FC = () => {
    return (
        <div className={'Error404'}>
            <Htag tag={'h1'}>Упс... Что-то пошло не так</Htag>
            <Htag tag={'h3'}>Ошибка 404</Htag>
        </div>
    );
};

export default withLayout(Error404);
