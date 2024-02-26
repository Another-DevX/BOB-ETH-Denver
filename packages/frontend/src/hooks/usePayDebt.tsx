import { toast } from '@/components/ui/use-toast';
import { borrowManagerAddress } from '@/constants';
import abreviarHash from '@/functions/abreviateHash';
import { ToastAction } from '@radix-ui/react-toast';
import { Address, useContractWrite } from 'wagmi';
import borrowManagerABI from '@/constants/BorrowManager.abi.json';

function usePayDebt() {
  const payDebt = useContractWrite({
    address: borrowManagerAddress as Address,
    abi: borrowManagerABI,
    functionName: 'payDebt',
    onSuccess: async (txn) => {
      toast({
        title: 'Debt paid successfully',
        description: abreviarHash(txn.hash),
        action: (
          <ToastAction altText='Copy'>
            <button
              className='Button'
              onClick={async () =>
                await navigator.clipboard.writeText(txn.hash)
              }
            >
              Copy
            </button>
          </ToastAction>
        ),
      });
    },
    onError: (e) => {
      toast({
        title: 'Error while paying debt',
        description: e.message,
      });
    },
  });
  return payDebt;
}

export { usePayDebt };
