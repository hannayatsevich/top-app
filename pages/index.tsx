import {Button, Htag, Input, Paragraph, Rating, Tag, Textarea} from '../components';
import {withLayout} from "../layouts/default/Layout";
import {GetStaticProps} from "next";
import React from "react";
import axios from "axios";
import {IMenuItem} from "../interfaces/menu.interface";
import {TopLevelCategory} from "../interfaces/page.interface";

interface HomePageProps extends Record<string, unknown> {
    menu: IMenuItem[];
    firstCategory: TopLevelCategory;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
    const firstCategory = 0;
    const {data: menu} = await axios.post<IMenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });
    return {
        props: {
            menu,
            firstCategory
        }
    };
};

const Home: React.FC<HomePageProps> = () => {
  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Button styleType="primary" arrow={'right'}>Текст</Button>
      <Button styleType="ghost" arrow={'down'}>Текст</Button>
      <Paragraph size={'s'}>Текст</Paragraph>
      <Paragraph>Текст</Paragraph>
      <Paragraph size={'l'}>Текст</Paragraph>
      <Tag size={'s'}>Текст</Tag>
      <Tag size={'m'} color={'primary'}>Текст</Tag>
      <Tag size={'m'} color={'red'} href={'/'}>Текст</Tag>
      <Rating rating={3} isEditable={true} setRating={(i: number):void => console.log(i)}/>
      <Rating rating={3}/>
      <Input placeholder={'test'} />
      <Textarea placeholder={'test'} />
    </>
  );
};

export default withLayout(Home);
