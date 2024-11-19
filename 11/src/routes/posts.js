import _ from "lodash";
import generatePosts from "../utils.js";

export default (app) => {
  const posts = generatePosts();

  // BEGIN (write your solution here)
  app.get("/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === req.params.id);

    if (!post) {
      return res.status(404).send("Page not found");
    }

    res.view("src/views/posts/show", { post });
  });

   app.get("/posts", (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = 5;
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / pageSize);

     if (page > totalPages) {
      return res.view("src/views/posts/index", { posts: [], currentPage: page, totalPages });
    }

     const startIndex = (page - 1) * pageSize;
    const paginatedPosts = posts.slice(startIndex, startIndex + pageSize);

    res.view("src/views/posts/index", { posts: paginatedPosts, currentPage: page, totalPages });
  });
  // END
};
