[![logo](https://user-images.githubusercontent.com/937328/52721449-9b1b2b80-2fa1-11e9-8f10-84dd86eb652b.png)](https://ueno.co/?utm_source=github&utm_campaign=ueno-next-starter)
<br /><br />
![banner](https://user-images.githubusercontent.com/937328/53875813-52cdb700-3ffd-11e9-8585-665eb28707a6.png)
<br /><br />
[![about](https://user-images.githubusercontent.com/937328/51540139-999c8e80-1e4d-11e9-866d-284657a34744.png)](https://ueno.co/contact/?utm_source=github&utm_campaign=ueno-next-starter)
<br /><br />

## Ueno Next Starter

This starter kit is based on `create-next-app` and add couple of features that we are using on all of our projects.

- Server side rendering
- Code splitting
- CSS modules
- SASS support
- Typescript

## Installation

Install [create-ueno-app](https://github.com/ueno-llc/create-ueno-app):

```bash
npm install -g create-ueno-app
yarn global add create-ueno-app
```

Create your app:

```bash
create-ueno-app next my-app
```

<details>
  <summary>Alternative setup</summary>

  You can also cloning this repository but you will have to change and add few files manually.

  ```bash
  git clone "https://github.com/ueno-llc/ueno-next-starter#master --recursive" my-app
  ```

  You gonna have:
  - Change `src/components/link/Link.tsx` with [Link.tsx](https://github.com/ueno-llc/create-ueno-app/blob/master/overwrites/next/Link.tsx)
  - Add `src/utils/config.ts` with [config.ts](https://github.com/ueno-llc/create-ueno-app/blob/master/overwrites/next/config.ts)
</details>
