import { Address, Hex } from 'viem';

export enum AdapterType {
  OPStack = 'opstack',
  Orbit = 'orbit',
  Custom = 'custom',
}

export interface OPStackConfig {
  type: AdapterType.OPStack;
  optimismPortalAddress: Address;
}

export interface OrbitConfig {
  type: AdapterType.Orbit;
  inboxAddress: Address;
}

export type Config = OPStackConfig | OrbitConfig;

export interface L2Transaction {
  // The chain ID of the L2 network
  chainId: number;
  to: string;
  data: string;
  value: bigint;
  gasLimit: string;
}

export interface L1ForceTransaction {
  to: Address;
  data: string;
  value: bigint;
  // If true, the L1 transaction must be sent from the sender address intended to be the L2 transaction sender
  fromSender?: boolean;
}

export type SignTransactionFn = (l2Tx: L2Transaction) => Promise<Hex>;

export interface TransformTransactionOptions {
  signTransaction?: SignTransactionFn;
}
