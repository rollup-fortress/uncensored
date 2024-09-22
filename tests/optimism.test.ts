import { UncensoredSDK } from '../src';
import { L2Transaction } from '../src/types';
import { optimism } from 'viem/chains';
import { parseEther, getFunctionSelector } from 'viem';

describe('UncensoredSDK - Optimism', () => {
  const sdk = new UncensoredSDK([optimism.id]);

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
    const depositTxSelector = getFunctionSelector('depositTransaction(address,uint256,uint64,bool,bytes)');
    expect(l1ForceTx.data.startsWith(depositTxSelector)).toBe(true);

    // You could add more detailed checks here, such as decoding the function data
    // and verifying the individual parameters
  });

  it('should throw an error for unsupported chain ID', () => {
    const unsupportedChainId = 1; // Ethereum mainnet, which is not supported in this context
    const l2Tx: L2Transaction = {
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
      data: '0x1234567890abcdef',
      value: parseEther('1').toString(),
      gasLimit: '1000000',
      chainId: unsupportedChainId,
    };

    expect(() => sdk.transformTransaction(l2Tx)).toThrow(`Unsupported chain ID: ${unsupportedChainId}`);
  });
});