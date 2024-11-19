import fastify from "fastify";

export const data = {
  phones: ["+12345678", "3434343434", "234-56-78"],
  domains: ["example.com", "yandex.ru"],
};

export default () => {
  const app = fastify();

  // BEGIN (write your solution here)
    app.get('/:type', async (request, reply) => {
        const { type } = request.params;

        if (data[type]) {
            return data[type];
        } else {
            reply.code(404).send({ error: 'Not found' });
        }
    });
  // END

  return app;
};
