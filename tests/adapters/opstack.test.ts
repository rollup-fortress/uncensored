import { AdapterType, L2Transaction } from '../../src/types';
import { optimism } from 'viem/chains';
import { getFunctionSelector, parseEther, TransactionReceipt } from 'viem';
import { OPStackAdapter } from '../../src/adapters/opstack';

describe('UncensoredSDK - OPStack Adapter', () => {
  const adapter = new OPStackAdapter({
    optimismPortalAddress: '0x16fc5058f25648194471939df75cf27a2fdc48bc',
    type: AdapterType.OPStack,
  });

  it('should transform an L2 tx to an L1 force tx', () => {
    const l2Tx: L2Transaction = {
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
      data: '0x1234567890abcdef',
      value: parseEther('1'),
      gasLimit: '1000000',
      chainId: optimism.id,
    };

    const l1ForceTx = adapter.transform(l2Tx);

    expect(l1ForceTx.to).toBe('0x16fc5058f25648194471939df75cf27a2fdc48bc');
    expect(l1ForceTx.value.toString()).toBe('0');
    expect(l1ForceTx.fromSender).toBe(true);

    // Check for the correct function selector
    const depositTxSelector = getFunctionSelector(
      'depositTransaction(address,uint256,uint64,bool,bytes)',
    );
    expect(l1ForceTx.data.startsWith(depositTxSelector)).toBe(true);
  });

  it('should get the L2 hashes for an L1 receipt', () => {
    const receipt = {
      blockHash: '0xc95b9676fdff44b3c7d2205d5c571faa5577c73a846cbbdb70a43e1a99bb8959',
      logs: [
        {
          address: '0x16fc5058f25648194471939df75cf27a2fdc48bc',
          blockHash: '0xc95b9676fdff44b3c7d2205d5c571faa5577c73a846cbbdb70a43e1a99bb8959',
          blockNumber: 6744632n,
          data: '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000718143ab000000000000000c35000aabbcc0000000000000000000000000000000000000000',
          logIndex: 5,
          removed: false,
          topics: [
            '0xb3813568d9991fc951961fcb4c784893574240a28925604d09fc577c55bb7c32',
            '0x000000000000000000000000707d44b65ba91c42f212e8bb61f71cc69fbf8fd7',
            '0x000000000000000000000000538d78c2d84efa321f68c115a59058ee5f671674',
            '0x0000000000000000000000000000000000000000000000000000000000000000',
          ],
          transactionHash: '0x3b3e56f81c809b73bbd410c5ae3e683641113c956b0f3e5511ee9698e158a26b',
          transactionIndex: 11,
        },
      ],
      transactionHash: '0x3b3e56f81c809b73bbd410c5ae3e683641113c956b0f3e5511ee9698e158a26b',
      transactionIndex: 11,
    };

    const l2Hashes = adapter.getL2TxHashes(receipt as any as TransactionReceipt);

    expect(l2Hashes).toEqual(
      expect.arrayContaining([
        '0xd6d833a2d52037f9e09737f53e0d5b54fdb1ce5f9c2fec0122f9231ca50c414b',
      ]),
    );
  });
});
