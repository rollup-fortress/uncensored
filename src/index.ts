import { OptimismAdapter } from './adapters/optimism';
import { Config, L2Transaction, L1ForceTransaction } from './types';

export class UncensoredSDK {
  private adapter: OptimismAdapter;

  constructor(config: Config) {
    this.adapter = new OptimismAdapter(config);
  }

  public transformToForceTransaction(l2Tx: L2Transaction): L1ForceTransaction {
    return this.adapter.transform(l2Tx);
  }
}

export { Config, L2Transaction, L1ForceTransaction };