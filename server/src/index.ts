import 'reflect-metadata';
import express from "express";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { TestResolver } from "./resolvers/testResolver";
import cors from 'cors';

const main = async () => {
  const app = express();

  const devWhitelist = [
    'https://studio.apollographql.com',
    'http://localhost:3000'
  ];
  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || devWhitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true
    })
  );
  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TestResolver],
      validate: false
    }),
    context: ({req, res}) => ({
      req,
      res
    })
  })
  await apolloServer.start();
  apolloServer.applyMiddleware({app, cors: false});

  app.get("/", (_req, res) => {
    res.send("Hello World!")
  })
  app.listen(4000, () => {
    console.log("App listening on port 4000")
  })
};

main().catch((err) => {
  console.error(err);
});
