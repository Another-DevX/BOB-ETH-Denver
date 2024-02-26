import { useToast } from '@/components/ui/use-toast';
import abreviarHash from '@/functions/abreviateHash';
import { ToastAction } from '@radix-ui/react-toast';
import React from 'react';
import { Address, useAccount, useContractWrite } from 'wagmi';
import borrowManagerABI from '@/constants/BorrowManager.abi.json';
import { borrowManagerAddress } from '@/constants';
function useLend() {
  const { address } = useAccount();
  const { toast } = useToast();
  const lend = useContractWrite({
    address: borrowManagerAddress as Address,
    abi: borrowManagerABI,
    functionName: 'requestLoan',
    account: address,
    onSuccess: async (txn: any) => {
      toast({
        title: 'Lend requested',
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
    onError: (e: any) => {
      toast({
        title: 'Error requesting lend',
        description: e.message,
      });
    },
  });
  return lend;
}

export { useLend };
