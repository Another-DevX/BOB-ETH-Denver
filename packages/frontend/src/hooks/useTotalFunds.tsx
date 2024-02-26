
import { borrowManagerAddress } from '@/constants';
import { Address } from 'viem';
import { useAccount, useContractRead } from 'wagmi';
import borrowManagerABI from '@/constants/BorrowManager.abi.json';

function useTotalFunds() {
  const { address } = useAccount();

  const funds = useContractRead({
    address: borrowManagerAddress as Address,
    abi: borrowManagerABI,
    functionName: 'getTotalFunds',
    args: [address as Address | '0x000'],
    watch: true,
  });
  console.debug(funds);

  return funds;
}

export { useTotalFunds };
