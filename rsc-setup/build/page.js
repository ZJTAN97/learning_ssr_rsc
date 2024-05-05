// src/page.jsx
import { Suspense } from "react";

// data/db.js
var posts = [
  {
    id: "1",
    title: "How to react server components",
    content: "well react 19 supports it",
    user: "admin"
  }
];
var artificialWait = (ms = 1500) => new Promise((resolve) => setTimeout(resolve, ms));
async function getAll() {
  await artificialWait();
  return posts;
}

// src/page.jsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function Page() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { children: "Test server components render to string basics" }),
    ";",
    /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(Posts, {}) })
  ] });
}
async function Posts() {
  const albums = await getAll();
  return /* @__PURE__ */ jsx("ul", { children: albums.map((a) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2 items-center mb-2", children: [
    /* @__PURE__ */ jsx("img", { className: "w-20 aspect-square", src: a.content, alt: a.title }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "text-xl", children: a.title }) })
  ] }, a.id)) });
}
export {
  Page as default
};
