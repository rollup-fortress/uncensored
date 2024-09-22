import { Config, L2Transaction, L1ForceTransaction } from '../types';
import { encodeFunctionData } from 'viem';

export class OptimismAdapter {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  public transform(l2Tx: L2Transaction): L1ForceTransaction {
    const depositTxData = encodeFunctionData({
      abi: [{
        name: 'depositTransaction',
        type: 'function',
        inputs: [
          { name: '_to', type: 'address' },
          { name: '_value', type: 'uint256' },
          { name: '_gasLimit', type: 'uint64' },
          { name: '_isCreation', type: 'bool' },
          { name: '_data', type: 'bytes' }
        ],
        outputs: [],
        stateMutability: 'payable'
      }],
      args: [
        l2Tx.to as `0x${string}`,
        BigInt(l2Tx.value),
        BigInt(l2Tx.gasLimit),
        false, // _isCreation
        l2Tx.data as `0x${string}`
      ]
    });

    return {
      to: this.config.optimismPortalAddress,
      data: depositTxData,
      value: BigInt(l2Tx.value),
      fromSender: true
    };
  }
}