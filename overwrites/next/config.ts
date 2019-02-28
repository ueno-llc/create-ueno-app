import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const config = {
  ...publicRuntimeConfig,
  ...serverRuntimeConfig,
};
