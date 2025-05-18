import { arbitrum, optimism, optimismSepolia } from 'viem/chains';
import { OPStackConfig, OrbitConfig, AdapterType } from './types';

export const DEFAULT_CHAIN_CONFIGS: { [chainId: number]: OPStackConfig | OrbitConfig } = {
  [optimism.id]: {
    type: AdapterType.OPStack,
    optimismPortalAddress: '0xbeb5fc579115071764c7423a4f12edde41f106ed',
  },
  [optimismSepolia.id]: {
    type: AdapterType.OPStack,
    optimismPortalAddress: '0x16Fc5058F25648194471939df75CF27A2fdC48BC',
  },
  [arbitrum.id]: {
    type: AdapterType.Orbit,
    inboxAddress: '0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f',
  },
};
