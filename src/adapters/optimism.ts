import { Config, L2Transaction, L1ForceTransaction } from '../types';
import { encodeAbiParameters, parseAbiParameters } from 'viem';

export class OptimismAdapter {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  public transform(l2Tx: L2Transaction): L1ForceTransaction {
    const l1Data = encodeAbiParameters(
      parseAbiParameters('address to, bytes calldata'),
      [l2Tx.to as `0x${string}`, l2Tx.data as `0x${string}`]
    );

    return {
      to: this.config.to, // L1 bridge contract address
      data: l1Data,
      value: l2Tx.value,
    };
  }
}