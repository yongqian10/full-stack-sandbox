import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { helloResolver } from "./resolvers/hello";
import { postResolver } from "./resolvers/post";
import { userResolver } from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
  //const post = orm.em.create(Post, { title: "my 2st post" });
  //await orm.em.persistAndFlush(post);
  //const posts = await orm.em.find(Post, {});
  //console.log(posts);

  // create server endpoint
  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: "keyboard cat",
      resave: false,
    })
  );
  app.get("/", (_, res) => {
    res.send("hello");
  });
  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [helloResolver, postResolver, userResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });
};

main().catch((err) => {
  console.error(err);
});
