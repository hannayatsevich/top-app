import {withLayout} from "../layouts/default/Layout";
import React from "react";
import {Htag} from "../components";

export const Error404: React.FC = () => {
    return (
        <>
            <Htag tag={'h1'}>Ошибка 404</Htag>
        </>
    );
};

export default withLayout(Error404);
