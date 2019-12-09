import { AppLayout } from 'components/app-layout/AppLayout';
import NextApp from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { variables } from 'styles/variables';
import { helmet } from 'utils/helmet';

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={variables}>
        <AppLayout>
          <Head>
            <title>{helmet.title}</title>
            {helmet.meta.map(item => (
              <meta key={item.name || item.property} {...item} />
            ))}
            {helmet.link.map(item => (
              <link key={item.href || item.rel} {...item} />
            ))}
          </Head>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    );
  }
}
