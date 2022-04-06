import {withLayout} from "../layouts/default/Layout";
import React from "react";
import {Htag} from "../components";

const Error500: React.FC = () => {
    return (
        <div  className={'Error500'}>
            <Htag tag={'h1'}>Упс... Что-то пошло не так</Htag>
            <Htag tag={'h3'}>Ошибка 500</Htag>
        </div>
    );
};

export default withLayout(Error500);
