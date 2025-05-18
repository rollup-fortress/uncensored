import { OrbitConfig, L2Transaction, L1ForceTransaction, TransformTransactionOptions } from '../types';
import { encodeFunctionData, Hash, TransactionReceipt } from 'viem';

const L2MessageTypePrefix_signedTx = '0x04';

export class OrbitAdapter {
  private config: OrbitConfig;

  constructor(config: OrbitConfig) {
    this.config = config;
  }

  /**
   * Transforms a signed L2 transaction into an L1 force inclusion transaction for Arbitrum.
   * The messageData is 0x04 || signed L2 tx (l2Tx.data).
   */
  public async transform(l2Tx: L2Transaction, options?: TransformTransactionOptions): Promise<L1ForceTransaction> {
    if (!options?.signTransaction) {
      throw new Error('signTransaction callback is required for Orbit (Arbitrum) force inclusion');
    }
    const signedTx = await options.signTransaction(l2Tx);
    const messageData = `${L2MessageTypePrefix_signedTx}${signedTx.replace(/^0x/, '')}`;
    const data = encodeFunctionData({
      abi: [
        {
          name: 'sendL2Message',
          type: 'function',
          inputs: [
            { name: 'messageData', type: 'bytes' },
          ],
          outputs: [],
          stateMutability: 'payable',
        },
      ],
      args: [messageData as `0x${string}`],
    });
    return {
      to: this.config.inboxAddress,
      data,
      value: BigInt(0),
      fromSender: false,
    };
  }

  /**
   * (Optional) Extract L2 tx hashes from L1 receipt. To be implemented if needed.
   */
  public getL2TxHashes(_txReceipt: TransactionReceipt): Hash[] {
    // Not implemented yet
    return [];
  }
} 