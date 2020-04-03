# Usage

Create Ueno App supports 4 different stack:

## Next

NextJS with full server capabilities and static rendering. It uses [ueno-next-starter](https://github.com/ueno-llc/ueno-next-starter) as the base config.

```bash
yarn create ueno-app next example-www <styled|sass>
```

## Gatsby

Gatsby with static rendering. It uses the default `gatsby-cli` to set up the project and uses [ueno-gatsby-starter](https://github.com/ueno-llc/ueno-gatsby-starter) as the base config.

```bash
yarn create ueno-app gatsby example-www <styled|sass>
```

## Cra

Create React App with client-only rendering. It uses `create-react-app`'s cli to set up the project and uses [@ueno/react-scripts](https://github.com/ueno-llc/ueno-cra-starter) as the base config.

_Note_

It only have _sass_ available as style library.

```bash
yarn create ueno-app cra example-www
```

## Native

Ueno's React Native Starter with everything you'll need to deploy rock solid apps. It uses `lib/stacks/native.js` to set up the project and uses our lovely [react-native-starter](https://github.com/ueno-llc/react-native-starter).

_Note_

We only support _styled-components_ for the native starter.

```bash
yarn create ueno-app native example-app com.example.app
```

!> The `project-name` will be generated using the path you defined. e.g. `example-www` will be `exampleWww` as the name for the app.

!> The last argument is the `bundle-id` and is required.
