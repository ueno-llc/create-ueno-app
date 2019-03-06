# Ueno Gatsby Starter

## Adding a CMS

### Prismic

Prismic has released few weeks ago their GraphQL API. It's great but there is few downsides.

- **With `gatsby-plugin-sharp`**

If you want to use the image plugin from Gatsby, you won't be able to use the GraphQL api straight from Prismic, because it doesn't allow you to require a field inside the image object. In this case:

Install the package:

```bash
yarn add gatsby-source-prismic -E
```

Add plugin to `gatsby-config.js`:

```gatsby.config.js
{
  resolve: 'gatsby-source-prismic',
  options: {
    repositoryName: config.PRISMIC_REPOSITORY_NAME,
    accessToken: config.PRISMIC_ACCESS_TOKEN,
  },
},
```

→ Check out [gatsby-source-prismic](https://github.com/angeloashmore/gatsby-source-prismic)'s documentation for more informations.

!> While using `gatsby-source-prismic` you won't be able to use `prismic-reactjs` to have RichText helpers and so on.

- **With Prismic GraphQl**

If you don't really need `gatsby-plugin-sharp` you can use the Prismic GraphQL straight, with the preview working.

Install the package:

```bash
yarn add gatsby-source-prismic-graphql -E
```

Add plugin to `gatsby-config.js`:

```gatsby.config.js
{
  resolve: 'gatsby-source-prismic-graphql',
  options: {
    repositoryName: config.PRISMIC_REPOSITORY_NAME,
    accessToken: config.PRISMIC_ACCESS_TOKEN,
    linkResolver,
    previews: true,
  }
},
```

Edit your `gatsby-browser.js`:

```bash
const { registerResolvers } = require('gatsby-source-prismic-graphql');
const { linkResolver } = require('./src/utils/link-resolver');

registerResolvers(linkResolver);
```

Create `link-resolver.ts`:

```ts
exports.linkResolver = function linkResolver(doc) {
  let pathname = '/';

  if (doc.type === 'article') {
    pathname = ` /article/${doc.uid}`;
  }

  return pathname;
};

exports.componentResolver = function componentResolver(doc) {
  return () => null;
};
```

→ Check out [gatsby-source-prismic-graphql](https://github.com/birkir/gatsby-source-prismic-graphql)'s documentation for more informations.

### Contentful

SOON
