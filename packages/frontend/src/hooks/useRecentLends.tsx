
import { borrowManagerAddress } from '@/constants';
import { Address, useAccount, useContractRead } from 'wagmi';
import borrowManagerABI from '@/constants/BorrowManager.abi.json';

function useRecentLends() {

  const { address } = useAccount();
  const recentLends = useContractRead({
    address: borrowManagerAddress as Address,
    abi: borrowManagerABI,
    functionName: 'getActiveLoans',
    args: [address as Address, 0, 10],
    watch: true,
  });
  console.debug(recentLends.data);
  return recentLends;
}

export { useRecentLends };
