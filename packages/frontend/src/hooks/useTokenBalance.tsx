import { tokenAddress } from '@/constants';
import { Address, erc20ABI, useAccount, useContractRead } from 'wagmi';

function useTokenBalance() {
  const { address } = useAccount();
  const balance = useContractRead({
    address: tokenAddress as Address,
    abi: erc20ABI,
    functionName: 'balanceOf',
    watch: true,
    args: [address as `0x${string}`],
  });
  return balance;
}

export { useTokenBalance };
