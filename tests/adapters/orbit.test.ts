import { OrbitAdapter } from '../../src/adapters/orbit';
import { AdapterType, OrbitConfig, L2Transaction } from '../../src/types';
import { encodeFunctionData, Hex } from 'viem';

function mockSignTransaction(l2Tx: L2Transaction): Promise<Hex> {
  return Promise.resolve('0xaabbccddaabbccddaabbccddaabbccddaabbccddaabbccdd');
}

describe('OrbitAdapter', () => {
  const config: OrbitConfig = {
    type: AdapterType.Orbit,
    inboxAddress: '0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f',
  };

  const adapter = new OrbitAdapter(config);

  it('should encode sendL2Message for force inclusion', async () => {
    const l2Tx: L2Transaction = {
      chainId: 42161,
      to: '0x1234567890123456789012345678901234567890',
      data: '0xabcdef', // unsigned L2 tx (mock)
      value: 0n,
      gasLimit: '21000',
    };
    // Mock signTransaction returns a "signed" tx hex string
    const signTransaction = mockSignTransaction;
    const result = await adapter.transform(l2Tx, { signTransaction });
    // messageData = 0x04 || signedTx

    const expectedData = '0xb75436bb0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001904aabbccddaabbccddaabbccddaabbccddaabbccddaabbccdd00000000000000'
    
    expect(result.to).toBe(config.inboxAddress);
    expect(result.data).toBe(expectedData);
    expect(result.value.toString()).toBe('0');
    expect(result.fromSender).toBe(false);
  });
}); 