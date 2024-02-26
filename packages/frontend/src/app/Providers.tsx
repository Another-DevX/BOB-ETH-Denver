'use client';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';

import { Chain, WagmiConfig } from 'wagmi';

const projectId = 'YOUR_PROJECT_ID';

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const BOB = {
  id: 11,
  name: 'Build on bitcoin',
  network: 'BOB',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://testnet.rpc.gobob.xyz'] },
    default: { http: ['https://testnet.rpc.gobob.xyz'] },
  },
} as const satisfies Chain;

const chains = [BOB];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export function Web3Modal({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
