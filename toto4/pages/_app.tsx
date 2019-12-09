import * as React from 'react';
import NextApp, { Container } from 'next/app';

import AppLayout from '../src/components/app-layout/AppLayout';

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Container>
    );
  }
}
