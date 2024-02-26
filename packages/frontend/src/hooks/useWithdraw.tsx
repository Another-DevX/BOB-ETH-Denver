import { toast } from '@/components/ui/use-toast';
import { borrowManagerAddress } from '@/constants';
import abreviarHash from '@/functions/abreviateHash';
import { ToastAction } from '@radix-ui/react-toast';
import React from 'react';
import borrowManagerABI from '@/constants/BorrowManager.abi.json';

import { Address, useContractWrite } from 'wagmi';

function useWithdraw() {
  const withdraw = useContractWrite({
    address: borrowManagerAddress as Address,
    abi: borrowManagerABI,
    functionName: 'withdrawFunds',
    onSuccess: async (txn) => {
      toast({
        title: 'Funds withdrawn successfully',
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
        title: 'Error while withdrawing funds',
        description: e.message,
      });
    },
  });
  return withdraw;
}

export { useWithdraw };
