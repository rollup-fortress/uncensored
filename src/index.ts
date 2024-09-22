import { OPStackAdapter } from './adapters/opstack';
import { L2Transaction, L1ForceTransaction, Config, AdapterType } from './types';
import { DEFAULT_CHAIN_CONFIGS } from './constants';

export class UncensoredSDK {
  private adapters: Map<number, OPStackAdapter>;

  constructor(customConfigs: { [chainId: number]: Config } = {}) {
    this.adapters = new Map();
    const configs = { ...DEFAULT_CHAIN_CONFIGS, ...customConfigs };

    for (const [chainId, config] of Object.entries(configs)) {
      if (config.type === AdapterType.OPStack) {
        this.adapters.set(Number(chainId), new OPStackAdapter(config));
      } else {
        throw new Error(`Unsupported adapter type for chain ID: ${chainId}`);
      }
    }
  }

  public transformTransaction(l2Tx: L2Transaction): L1ForceTransaction {
    const adapter = this.adapters.get(l2Tx.chainId);
    if (!adapter) {
      throw new Error(`Unsupported chain ID: ${l2Tx.chainId}`);
    }
    return adapter.transform(l2Tx);
  }

  public getSupportedChainIds(): number[] {
    return Array.from(this.adapters.keys());
  }
}
