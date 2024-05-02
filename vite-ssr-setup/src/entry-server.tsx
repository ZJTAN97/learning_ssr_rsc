import {
  StartServer,
  transformStreamWithRouter,
} from "@tanstack/react-router-server/server";
import { renderToPipeableStream, PipeableStream } from "react-dom/server";
import { Request } from "express";
import { ServerResponse } from "http";
import { createMemoryHistory } from "@tanstack/react-router";

import "./fetch-polyfill";
import { createRouter } from "./router";

export async function render(opts: {
  url: string;
  head: string;
  req: Request;
  res: ServerResponse;
  template: string;
}) {
  const router = createRouter();

  const memoryHistory = createMemoryHistory({
    initialEntries: [opts.url],
  });

  // Update the history and context
  router.update({
    history: memoryHistory,
    context: {
      head: opts.head,
    },
  });

  // Wait for the router to load critical data
  // (streamed data will continue to load in the background)
  await router.load();

  // Render the app to a readable stream
  let stream!: PipeableStream;

  await new Promise<void>((resolve) => {
    stream = renderToPipeableStream(<StartServer router={router} />, {
      onShellReady: () => {
        resolve();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  });

  opts.res.setHeader("Content-Type", "text/html");

  // Add our Router transform to the stream
  const transforms = [transformStreamWithRouter(router)];

  const [htmlStart, htmlEnd] = opts.template.split(`<!--app-html-->`);

  opts.res.write(htmlStart);

  const transformedStream = transforms.reduce((stream, transform) => {
    transform.on("end", () => {
      opts.res.end(htmlEnd);
    });

    return stream.pipe(transform as any);
  }, stream);

  transformedStream.pipe(opts.res);
}
