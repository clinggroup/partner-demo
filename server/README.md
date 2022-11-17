<h3 align="center">Server example</h3>

  <p align="center">
    This is a server example how a Cling partner can use the API.
  </p>
</div>

## Getting Started

This is just an example of how you may use the partner routes. You launch this as a server and will be able to try out webhooks and how to authenticate as a user.
To get a local copy up and running follow these simple example steps:

### Prerequisites

* nodejs (https://nodejs.org/en/download/)
  ```sh
  node --version
  ```

### Installation and usage

1. Install NPM packages
    ```sh
    npm install
    ```
2. Enter your config in `src/config.js`.
    ```
    You need authorization to be able to communicate as a partner. 
    You need the publicUrl to be able to try out incoming webhooks.
    ```
3. Start dev server with
    ```sh
    npm run dev
    ```

<!-- USAGE EXAMPLES -->
## Usage

As this is a small server example you can use any REST client. You can find the example routes in the `src/routes` folder.