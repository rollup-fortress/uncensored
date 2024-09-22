import { Address, Abi } from 'viem';

export interface Config {
  from: Address;
  to: Address; // L1 bridge contract address
  abi: Abi;
  // Add other configuration options as needed
}

export interface L2Transaction {
  to: Address;
  data: string;
  value: bigint;
  // Add other L2 transaction properties as needed
}

export interface L1ForceTransaction {
  to: Address; // L1 bridge contract address
  data: string;
  value: bigint;
  // Add other L1 force transaction properties as needed
}