console.log("Hello via Bun!");

import { dbInit } from "./src/data/db";
import { Router } from "@2fat2furious/crouter";
import { create } from "./src/models/articles";
import { Tables } from "./types";
dbInit();

async function fakeHamdlerPOST(request: Request, params: URLSearchParams) {
  const data = (await request?.json()) as Record<string, any>;
  const table: Tables = Tables.Users;
  create(table, data);
  return new Response("wesh");
}

const routes = [
  {
    route: "home",
    path: "home",
    queries: ["authors", "tags"],
    methods: { GET: () => new Response("hello"), POST: fakeHamdlerPOST },
    middlewares: [],
  },
];

Bun.serve({
  fetch(request: Request): Response | Promise<Response> {
    return Router(request, routes);
  },
});
