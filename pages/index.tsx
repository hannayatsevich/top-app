import {Button, Htag, Paragraph, Rating, Tag} from '../components';
import {withLayout} from "../layouts/default/Layout";

function Home(): JSX.Element {
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
    </>
  );
}

export default withLayout(Home);
