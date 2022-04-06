import {withLayout} from "../layouts/default/Layout";
import React from "react";
import {Htag} from "../components";

const Error500: React.FC = () => {
    return (
        <>
            <Htag tag={'h1'}>Ошибка 500</Htag>
        </>
    );
};

export default withLayout(Error500);
