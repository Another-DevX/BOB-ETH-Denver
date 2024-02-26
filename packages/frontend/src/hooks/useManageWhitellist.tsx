import { toast } from '@/components/ui/use-toast';
import { borrowManagerAddress } from '@/constants';
import abreviarHash from '@/functions/abreviateHash';
import { ToastAction } from '@radix-ui/react-toast';
import React from 'react';
import { Address, useContractWrite } from 'wagmi';
import borrowManagerABI from '@/constants/BorrowManager.abi.json';

function useManageWhitelist() {
  const addToWhiteList = useContractWrite({
    address: borrowManagerAddress as Address,
    abi: borrowManagerABI,
    functionName: 'addToWhitelist',
    onSuccess: async (txn) => {
      toast({
        title: 'Usuario añadido a la whitelist con exito',
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
        title: 'Error al añadir usuario a la whitelist',
        description: e.message,
      });
    },
  });
  const removeFromWhiteList = useContractWrite({
    address: borrowManagerAddress as Address,
    abi: borrowManagerABI,
    functionName: 'removeFromWhitelist',
    onSuccess: async (txn) => {
      toast({
        title: 'Usuario removido de la whitelist con exito',
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
        title: 'Error al remover usuario de la whitelist',
        description: e.message,
      });
    },
  });
  return {
    addToWhiteList,
    removeFromWhiteList,
  };
}

export { useManageWhitelist };
