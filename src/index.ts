import { OptimismAdapter } from './adapters/optimism';
import { L2Transaction, L1ForceTransaction } from './types';
import { CHAIN_CONFIGS } from './constants';

export class UncensoredSDK {
  private adapters: Map<number, OptimismAdapter>;

  constructor(chainIds: number[]) {
    this.adapters = new Map();
    for (const chainId of chainIds) {
      const config = CHAIN_CONFIGS[chainId];
      if (!config) {
        throw new Error(`Unsupported chain ID: ${chainId}`);
      }
      this.adapters.set(chainId, new OptimismAdapter(config));
    }
  }

  public transformTransaction(l2Tx: L2Transaction): L1ForceTransaction {
    const adapter = this.adapters.get(l2Tx.chainId);
    if (!adapter) {
      throw new Error(`Unsupported chain ID: ${l2Tx.chainId}`);
    }
    return adapter.transform(l2Tx);
  }
}