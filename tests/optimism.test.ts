import { UncensoredSDK } from '../src';
import { Config, L2Transaction } from '../src/types';
import { parseAbi, Address } from 'viem';

describe('UncensoredSDK - Optimism', () => {
  const config: Config = {
    from: '0x1234567890123456789012345678901234567890' as Address,
    to: '0x0987654321098765432109876543210987654321' as Address, // L1 bridge contract
    abi: parseAbi(['function someFunction(uint256 value) returns (bool)']),
  };

  const sdk = new UncensoredSDK(config);

  it('should transform an L2 transaction to an L1 force transaction', () => {
    const l2Tx: L2Transaction = {
      to: '0xabcdef1234567890abcdef1234567890abcdef12' as Address,
      data: '0x1234567890abcdef',
      value: BigInt(1000000000000000000), // 1 ETH
    };

    const l1ForceTx = sdk.transformToForceTransaction(l2Tx);

    expect(l1ForceTx.to).toBe(config.to);
    expect(l1ForceTx.value).toBe(l2Tx.value);
    expect(l1ForceTx.data).toBeTruthy();
    // Add more specific assertions based on your implementation
  });
});