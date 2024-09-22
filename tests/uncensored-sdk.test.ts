import { UncensoredSDK } from '../src/index';
import { L2Transaction, AdapterType } from '../src/types';
import { optimism } from 'viem/chains';

describe('UncensoredSDK', () => {
  const sdk = new UncensoredSDK();

  it('should transform an L2 tx to an L1 force tx for optimism', () => {
    const l2Tx: L2Transaction = {
      to: '0xabcdef0123456789abcdef0123456789abcdef01',
      data: '0x1234',
      value: BigInt('1000000000000000000'),
      gasLimit: '1000000',
      chainId: optimism.id,
    };

    const l1Tx = sdk.transformTransaction(l2Tx);

    expect(l1Tx.to).toBe('0xbeb5fc579115071764c7423a4f12edde41f106ed');
    expect(l1Tx.value).toBe(BigInt('1000000000000000000'));
    expect(l1Tx.data).toMatch(/^0x/);
  });

  it('should throw an error for unsupported chain ID', () => {
    const l2Tx: L2Transaction = {
      to: '0xabcdef0123456789abcdef0123456789abcdef01',
      data: '0x1234',
      value: BigInt('1000000000000000000'),
      gasLimit: '1000000',
      chainId: 1, // Unsupported chain ID
    };

    expect(() => sdk.transformTransaction(l2Tx)).toThrow('Unsupported chain ID: 1');
  });

  it('should allow custom configurations', () => {
    const customSdk = new UncensoredSDK({
      12345: {
        type: AdapterType.OPStack,
        optimismPortalAddress: '0x1234567890123456789012345678901234567890',
      },
    });

    expect(customSdk.getSupportedChainIds()).toContain(12345);
  });
});
