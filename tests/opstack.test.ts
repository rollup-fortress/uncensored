import { UncensoredSDK } from '../src';
import { L2Transaction } from '../src/types';
import { optimism } from 'viem/chains';
import { parseEther, getFunctionSelector } from 'viem';

describe('UncensoredSDK - OPStack', () => {
  const sdk = new UncensoredSDK();

  it('should transform an L2 transaction to an L1 force transaction', () => {
    const l2Tx: L2Transaction = {
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
      data: '0x1234567890abcdef',
      value: parseEther('1').toString(), // 1 ETH
      gasLimit: '1000000',
      chainId: optimism.id,
    };

    const l1ForceTx = sdk.transformTransaction(l2Tx);

    expect(l1ForceTx.to).toBe('0xbeb5fc579115071764c7423a4f12edde41f106ed');
    expect(l1ForceTx.value).toBe(BigInt(l2Tx.value));
    expect(l1ForceTx.fromSender).toBe(true);

    // Check for the correct function selector
    const depositTxSelector = getFunctionSelector(
      'depositTransaction(address,uint256,uint64,bool,bytes)',
    );
    expect(l1ForceTx.data.startsWith(depositTxSelector)).toBe(true);
  });
});
