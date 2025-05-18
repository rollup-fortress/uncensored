import { OPStackAdapter } from './adapters/opstack';
import { OrbitAdapter } from './adapters/orbit';
import { L2Transaction, L1ForceTransaction, Config, OPStackConfig, OrbitConfig, AdapterType, TransformTransactionOptions } from './types';
import { DEFAULT_CHAIN_CONFIGS } from './constants';
import { Hash, TransactionReceipt } from 'viem';

export class UncensoredSDK {
  private adapters: Map<number, OPStackAdapter | OrbitAdapter>;

  constructor(customConfigs: { [chainId: number]: Config } = {}) {
    this.adapters = new Map();
    const configs = { ...DEFAULT_CHAIN_CONFIGS, ...customConfigs };

    for (const [chainId, config] of Object.entries(configs)) {
      if (config.type === AdapterType.OPStack) {
        this.adapters.set(Number(chainId), new OPStackAdapter(config as OPStackConfig));
      } else if (config.type === AdapterType.Orbit) {
        this.adapters.set(Number(chainId), new OrbitAdapter(config as OrbitConfig));
      } else {
        throw new Error(`Unsupported adapter type for chain ID: ${chainId}`);
      }
    }
  }

  public async transformTransaction(l2Tx: L2Transaction, options?: TransformTransactionOptions): Promise<L1ForceTransaction> {
    const adapter = this.adapters.get(l2Tx.chainId);
    if (!adapter) {
      throw new Error(`Unsupported chain ID: ${l2Tx.chainId}`);
    }
    return await adapter.transform(l2Tx, options);
  }

  public getSupportedChainIds(): number[] {
    return Array.from(this.adapters.keys());
  }

  /**
   * Get the L2 transaction hashes for a given L1 transaction receipt.
   * Developers can monitor the status of this tx by using the returned hashes.
   * @param txReceipt
   * @param chainId
   * @returns
   */
  public getL2TxHashes(txReceipt: TransactionReceipt, chainId: number): Hash[] {
    const adapter = this.adapters.get(chainId);
    if (!adapter) {
      throw new Error(`Unsupported chain ID: ${chainId}`);
    }
    return adapter.getL2TxHashes(txReceipt);
  }
}
