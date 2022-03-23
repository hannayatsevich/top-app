import {Button, Htag, Paragraph, Tag} from '../components';

export default function Home(): JSX.Element {
  return (
    < >
      <Htag tag="h1">Текст</Htag>
      <Button styleType="primary" arrow={'right'}>Текст</Button>
      <Button styleType="ghost" arrow={'down'}>Текст</Button>
      <Paragraph size={'s'}>Текст</Paragraph>
      <Paragraph>Текст</Paragraph>
      <Paragraph size={'l'}>Текст</Paragraph>
      <Tag size={'s'}>Текст</Tag>
      <Tag size={'m'} color={'primary'}>Текст</Tag>
      <Tag size={'m'} color={'red'} href={'/'}>Текст</Tag>
    </>
  );
}
