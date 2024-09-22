# Uncensored SDK

## Overview

Uncensored SDK is a powerful tool designed to enhance the censorship resistance of Layer 2 (L2) transactions. It enables users to transform L2 transactions into Layer 1 (L1) transaction format, allowing them to be sent directly to L1 RPCs. This bypasses potential censorship by L2 sequencers and leverages existing Force Inclusion mechanisms on various L2 chains.

## Features

- Transform L2 transactions to L1 format
- Utilize existing Force Inclusion mechanisms on supported L2 chains
- Easy integration with popular Ethereum libraries (ethers.js, viem)

## Installation

```bash
npm install uncensored-sdk
```

## Key Concepts

### Censorship Resistance

Censorship resistance is crucial for blockchain networks. While Ethereum's L1 achieves this through numerous validators, L2 solutions often rely on centralized sequencers, making them potentially vulnerable to censorship.

### Force Inclusion

Force Inclusion is a mechanism provided by some L2 networks that allows users to submit transactions directly to the L1 Rollup contract. Our SDK helps users leverage these existing mechanisms, ensuring L2 transactions can't be indefinitely censored by sequencers.

### Delayed Execution

To maintain consistency and prevent conflicts, forced transactions typically don't execute immediately on L2 networks. Instead, they enter a "pending" state, giving sequencers a chance to include them in the next batch. If a sequencer consistently refuses to include these transactions, they can be forcibly included after a set time period.

## Supported Networks

- [List of supported L2 networks and their corresponding L1]

## Usage

[Basic usage examples will be added here in future updates]

## Advanced Features

- Transaction status monitoring
- Automated Force Inclusion triggering
- Gas estimation for L1 force transactions

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please file an issue on our GitHub repository.

---

By using Uncensored SDK, you're contributing to a more censorship-resistant and decentralized ecosystem. We believe in the power of open, accessible blockchain networks and are committed to providing tools that uphold these values.