import { useLoaderData } from 'react-router-dom';
interface Bar {
  name: string;
}

export default function Details() {
  const foo = useLoaderData() as Bar;
  console.log(foo.name);
  return <p>{foo.name}</p>;
}
