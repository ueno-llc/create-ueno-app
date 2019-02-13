[![logo](https://user-images.githubusercontent.com/937328/51313595-d7f90e80-1a45-11e9-8375-a94f03e52fc6.png)](https://ueno.co/?utm_source=github&utm_campaign=create-ueno-app)
<br /><br />
![banner](https://user-images.githubusercontent.com/937328/51313594-d7f90e80-1a45-11e9-8d25-28583da916fa.png)
<br /><br />
[![about](https://user-images.githubusercontent.com/937328/51540139-999c8e80-1e4d-11e9-866d-284657a34744.png)](https://ueno.co/contact/?utm_source=github&utm_campaign=create-ueno-app)
<br /><br />

## Create Ueno App

[![npm version](https://badge.fury.io/js/create-ueno-app.svg)](https://badge.fury.io/js/create-ueno-app)

The easiest and fastest way to create new web projects with `next`, `gatsby`, `create-react-app` and mobile projects with `react-native`. All of them powered with Ueno's configs. All of our starters kits are shipped with everything to ship rock solid apps.

- Opinionated dependencies
- SASS and CSS modules
- Root resolver (import `components/header/Header`)
- Server Side Rendering
- Code splitting

## Installation

We recommend you installing `create-ueno-app` globally:

```bash
yarn global add create-ueno-app
```

```bash
npm install -g create-ueno-app
```

<details>
  <summary>Alternative setup</summary>

  If you are using `yarn`:

  ```bash
  yarn create ueno-app <stack> <project-name>
  ```

  If you are using `npm`:

  ```bash
  npx create-ueno-app <stack> <project-name>
  ```
</details>

## Usage

### `next`

NextJS with full server capabilities and static rendering. It uses [ueno-next-starter](https://github.com/ueno-llc/ueno-next-starter) as the base config.

> ```bash
> create-ueno-app next example-www
> ````

### `gatsby`

Gatsby with static rendering. It uses the default `gatsby-cli` to set up the project and uses [ueno-gatsby-starter](https://github.com/ueno-llc/ueno-gatsby-starter) as the base config.

> ```bash
> create-ueno-app gatsby example-www
> ````

### `cra`

Create-react-app with client-only rendering. It uses the `create-react-app` to set up the project and uses [@ueno/react-scripts](https://github.com/ueno-llc/create-react-app) as the base config.

> ```bash
> create-ueno-app cra example-www
> ````

### `native`

Ueno's React Native Starter with everything you'll ever need to deploy rock solid apps. It uses a `lib/utils/eact-native-starter-init` to set up the project and uses our lovely [react-native-starter](https://github.com/ueno-llc/react-native-starter).

> ```bash
> create-ueno-app native example-app com.example.app
> ````

> **Warning** The `project-name` will be generated using the path you defined. e.g. `example-www` will be `exampleWww` as the name for the app.

> **Warning** The last argument is the `bundle-id` and is required.
