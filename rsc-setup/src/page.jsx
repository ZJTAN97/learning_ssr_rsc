import { Suspense } from "react";
import { getAll } from "../data/db";

export default function Page() {
  return (
    <>
      <h1>Test server components render to string basics</h1>;
      <Suspense>
        <Posts />
      </Suspense>
    </>
  );
}

async function Posts() {
  const albums = await getAll();
  return (
    <ul>
      {albums.map((a) => (
        <li key={a.id} className="flex gap-2 items-center mb-2">
          <img className="w-20 aspect-square" src={a.content} alt={a.title} />
          <div>
            <h3 className="text-xl">{a.title}</h3>
          </div>
        </li>
      ))}
    </ul>
  );
}
