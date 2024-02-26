import { toast } from '@/components/ui/use-toast';
import { tokenAddress } from '@/constants';
import abreviarHash from '@/functions/abreviateHash';
import { ToastAction } from '@radix-ui/react-toast';
import React from 'react';
import { Address, erc20ABI, useAccount, useContractWrite } from 'wagmi';

function useApproveAllowance() {
  const { address } = useAccount();

  const approve = useContractWrite({
    address: tokenAddress as Address,
    abi: erc20ABI,
    functionName: 'approve',
    account: address,
    onSuccess: async (txn) => {
      toast({
        title: 'Approval successful',
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
        title: 'Error approving spendance',
        description: e.message,
      });
    },
  });

  return approve;
}

export { useApproveAllowance };
