/**

 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {string} user
 */
const posts = [
  {
    id: "1",
    title: "How to react server components",
    content: "well react 19 supports it",
    user: "admin",
  },
];

const artificialWait = (ms = 1500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** @returns {Promise<Post[]>} */
export async function getAll() {
  await artificialWait();
  return posts;
}

/** @returns {Promise<Post | undefined>} */
export async function getById(id) {
  await artificialWait();
  return posts.find((album) => album.id === id);
}
