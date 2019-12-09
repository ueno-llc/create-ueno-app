import { Intro } from 'components/intro/Intro';
import { Segment } from 'components/segment/Segment';
import Head from 'next/head';
import React from 'react';

export default () => (
  <Segment>
    <Head>
      <title>About</title>
    </Head>
    <Intro>About page</Intro>
  </Segment>
);
