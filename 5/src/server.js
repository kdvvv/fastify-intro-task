import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import getUsers from "./utils.js";

export default async () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.register(view, {
    engine: {
      pug,
    },
  });
  app.get("/users", async (req, res) => {
    return res.view("src/views/users/index", { users });
  });

  app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.view("src/views/users/show", { user });
  });
  // END

  return app;
};
