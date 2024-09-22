import { optimism } from 'viem/chains';
import { Config } from './types';

export const CHAIN_CONFIGS: { [chainId: number]: Config } = {
  [optimism.id]: {
    optimismPortalAddress: '0xbeb5fc579115071764c7423a4f12edde41f106ed',
  },
};