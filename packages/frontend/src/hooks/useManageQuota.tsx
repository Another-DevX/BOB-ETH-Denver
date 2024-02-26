import { toast } from '@/components/ui/use-toast';
import { borrowManagerAddress } from '@/constants';
import abreviarHash from '@/functions/abreviateHash';
import { ToastAction } from '@radix-ui/react-toast';
import React from 'react';
import borrowManagerABI from '@/constants/BorrowManager.abi.json';
import { Address, useContractRead, useContractWrite } from 'wagmi';

function useManageQuota(address?: Address) {
  const { data: currentQuota, isLoading } = useContractRead({
    address: borrowManagerAddress as Address,
    abi: borrowManagerABI,
    functionName: 'getCurrentQuota',
    args: [address],
  });
  const incrementQuota = useContractWrite({
    address: borrowManagerAddress as Address,
    abi: borrowManagerABI,
    functionName: 'increaseQuota',
    onSuccess: async (txn) => {
      toast({
        title: 'Cupo aumentado con exito',
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
        title: 'Error al aumentar cupo',
        description: e.message,
      });
    },
  });
  const decrementQuota = useContractWrite({
    address: borrowManagerAddress as Address,
    abi: borrowManagerABI,
    functionName: 'decreaseQuota',
    onSuccess: async (txn) => {
      toast({
        title: 'Cupo disminuido con exito',
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
        title: 'Error al disminuir cupo',
        description: e.message,
      });
    },
  });

  return {
    currentQuota,
    incrementQuota,
    decrementQuota,
    isLoading,
  };
}

export { useManageQuota };
