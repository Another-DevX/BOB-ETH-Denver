'use client';

import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AnimatedPrice from './AnimatedPrice';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { formatEther } from 'viem';
import { useWithdraw } from '@/hooks/useWithdraw';
import { useTotalFunds } from '@/hooks/useTotalFunds';
import { formatFiat } from '@/functions/formatFiat';

function TotalFunds() {
  const { writeAsync: withdraw } = useWithdraw();
  const { data: totalValue, isLoading } = useTotalFunds();
  const { data } = useTotalFunds();
  const handleOnWithdraw = async () => {
    try {
      await withdraw();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='w-full h-full total'>
      {isLoading ? (
        <Card>
          <CardHeader className='chart flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Ganancias totales
            </CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
            </svg>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            <Skeleton className='h-[15px] w-1/2'></Skeleton>

            <p className='text-xs text-muted-foreground'>+20.1% en total</p>
          </CardContent>
          <CardFooter>
            <Button>Withdraw</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader className='chart flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Funds </CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
            </svg>
          </CardHeader>
          <CardContent>
            <AnimatedPrice
              price={parseFloat(formatEther(totalValue as bigint))}
            />
            <p className='w-full text-start'>
              Total contract funds:{' '}
              <strong>
                BTC
                {data ? formatFiat(formatEther(data as bigint)) : formatFiat(0)}
              </strong>
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleOnWithdraw}>Retirar fondos</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export { TotalFunds };
