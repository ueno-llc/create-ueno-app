import { BlockText } from 'components/block-text/BlockText';
import { Button } from 'components/button/Button';
import { Container } from 'components/container/Container';
import { Highlight } from 'components/intro/Highlight';
import { Intro } from 'components/intro/Intro';
import { Segment } from 'components/segment/Segment';
import Head from 'next/head';
import React from 'react';

export default () => (
  <Segment>
    <Head>
      <title>Home</title>
    </Head>
    <Intro>
      Opinionated starter by Ueno, using opinionated dependencies 🤪,{' '}
      <Highlight>TypeScript</Highlight>,&nbsp;
      <Highlight>SCSS</Highlight>, <Highlight>CSS Modules</Highlight>,{' '}
      <Highlight>React Hooks</Highlight>,&nbsp;
      <Highlight>root resolver</Highlight>,{' '}
      <Highlight>code splitting</Highlight> and a lot of love.
    </Intro>

    <Container>
      <Button>Button</Button>
      <Button href="http://ueno.co">Ueno.co</Button>
      <Button href="/about">About</Button>
    </Container>

    <BlockText
      heading="Who we are"
      description={
        <>
          Ueno is a full-service agency, busy designing and building beautiful
          digital products, brands, and experiences. For more informations go to{' '}
          <a href="https://ueno.co" target="_blank" rel="noopener noreferrer">
            ueno.co
          </a>
          .
        </>
      }
    />
  </Segment>
);
