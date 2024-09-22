import { Address } from 'viem';

export enum AdapterType {
  OPStack = 'opstack',
  Custom = 'custom'
}

export interface Config {
  type: AdapterType;
  optimismPortalAddress: Address;
}

export interface L2Transaction {
  // The chain ID of the L2 network
  chainId: number;
  to: string;
  data: string;
  value: string;
  gasLimit: string;
}

export interface L1ForceTransaction {
  to: Address;
  data: string;
  value: bigint;
  // If true, the L1 transaction must be sent from the sender address intended to be the L2 transaction sender
  fromSender?: boolean;
}
