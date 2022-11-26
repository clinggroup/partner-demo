# Cling - eSign demo project
This project shows the basics for how to implement Clings eSign tool on your website.
The project consists of of a client and server folder. The client-folder highlights the usage of the [@cling-se/widget](https://www.npmjs.com/package/@cling-se/widget)-package. The server-folder includes steps on how to authenticate users and subscribe to webhooks.

## Playground
Try it out here, go to [the demo](https://stackblitz.com/github/clinggroup/partner-demo).

## Commands
Before installing make sure that you have installed pnpm globally, `npm install pnpm -g`.

1. Install the project.
  ```sh
  pnpm install # or pnpm i
  ```
2. When developing, choose which project you'll be working in and start its server.
  ```sh
  pnpm dev # start the client and server
  pnpm client:dev # only start the client
  pnpm server:dev # only start the server
  ```
