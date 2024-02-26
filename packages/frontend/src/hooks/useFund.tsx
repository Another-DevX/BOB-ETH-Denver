import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import abreviarHash from '@/functions/abreviateHash';
import React from 'react';
import { Address, useContractWrite } from 'wagmi';
import borrowManagerABI from '@/constants/BorrowManager.abi.json';
import { borrowManagerAddress } from '@/constants';

function useFund() {
  const fund = useContractWrite({
    address: borrowManagerAddress as Address,
    abi: borrowManagerABI,
    functionName: 'capitalize',
    onSuccess: async (txn: any) => {
      toast({
        title: 'Capital añadido con exito',
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
        title: 'Error al solicitar prestamo',
        description: e.message,
      });
    },
  });
  return fund;
}

export { useFund };
