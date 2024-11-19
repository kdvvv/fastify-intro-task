import _ from "lodash";
import fastify from "fastify";
import getUsers from "./utils.js";

export default () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.get('/users', (request, reply) => {
    const { page = 1, per = 5 } = request.query;

    const pageNumber = Number(page);
    const perPage = Number(per);

     if (isNaN(pageNumber) || isNaN(perPage) || pageNumber < 1 || perPage < 1) {
      return reply.status(400).send({ error: 'Invalid page or per parameter' });
    }

    const startIndex = (pageNumber - 1) * perPage;
    const endIndex = startIndex + perPage;

    const paginatedUsers = users.slice(startIndex, endIndex);

     if (paginatedUsers.length === 0) {
      return reply.status(404).send({ error: 'No users found' });
    }

    reply.send(paginatedUsers);
  });
  // END

  return app;
};
