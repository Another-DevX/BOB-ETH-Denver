import React, { useEffect, useRef, useState } from 'react';
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Address, formatEther, parseEther } from 'viem';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogHeader } from '../ui/dialog';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNetwork } from 'wagmi';
import { useRecentLends } from '@/hooks/useRecentLends';
import { usePayDebt } from '@/hooks/usePayDebt';
import { useTokenSpendance } from '@/hooks/useTokenSpendance';
import { useApproveAllowance } from '@/hooks/useApproveAllowance';
import { formatFiat } from '@/functions/formatFiat';
import { borrowManagerAddress } from '@/constants';

function LendsList() {
  const [id, setId] = useState<string | null>(null);
  const [currentDebt, setCurrentDebt] = useState('');
  const payDebtForm = useForm();
  const approveForm = useForm();
  const { data: recentLends } = useRecentLends();
  const { writeAsync: payDebt } = usePayDebt();
  const { data: spendance } = useTokenSpendance();
  const { writeAsync: approve } = useApproveAllowance();

  const { chain } = useNetwork();

  function getTotaDebt() {
    if (!recentLends) return 0;
    let total = 0;
    //@ts-expect-error
    recentLends.forEach((loan) => {
      total += Number(formatEther(loan.amount));
    });
    return total;
  }

  const handleOnPayDebtSubmit = async (values: any) => {
    console.debug('values', values);
    try {
      if (
        payDebt &&
        parseFloat(spendance ? formatEther(spendance) : '0') >=
          payDebtForm.watch('value')
      ) {
        await payDebt({
          args: [id, parseEther(currentDebt)],
        });
        payDebtForm.reset({
          value: '',
        });
        setCurrentDebt('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  async function onApproveSubmit(values: any) {
    try {
      await approve({
        args: [borrowManagerAddress as Address, parseEther(currentDebt)],
      });
      approveForm.reset({
        amount: '',
      });
      payDebtForm.reset({
        value: '',
      });
    } catch (e) {
      console.error(e);
    }
  }

  function getTotalTime(timeStamp: bigint, monthsToAdd: number) {
    const initialDate = new Date(Number(timeStamp) * 1000);
    // Añadir la cantidad de meses especificada a la fecha inicial
    initialDate.setMonth(initialDate.getMonth() + monthsToAdd);

    const currentDate = new Date();

    // Calcular la diferencia en milisegundos entre las dos fechas
    const diffInMilliseconds = initialDate.getTime() - currentDate.getTime();

    // Convertir la diferencia en milisegundos a días
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

    return diffInDays > 0 ? diffInDays : 0;
  }

  function getTotalDays(timeStamp: bigint, monthsToAdd: number) {
    const initialDate = new Date(Number(timeStamp) * 1000);

    // Crear una nueva fecha que es "monthsToAdd" meses después de "initialDate"
    const futureDate = new Date(initialDate);
    futureDate.setMonth(initialDate.getMonth() + monthsToAdd);

    // Calcular la diferencia en milisegundos entre las dos fechas
    const diffInMilliseconds = futureDate.getTime() - initialDate.getTime();

    // Convertir la diferencia en milisegundos a días
    const totalDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

    return totalDays;
  }

  return (
    <Card className='min-h-full recent'>
      <CardHeader>
        <CardTitle>Your lends</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>ID</TableHead>
              <TableHead className='text-center'>Initial value</TableHead>
              <TableHead className='text-center'>Interest</TableHead>
              <TableHead className='text-center'>Current debt</TableHead>
              <TableHead className='text-center'>Value paied</TableHead>
              <TableHead className='text-center'>Loan term</TableHead>
              <TableHead className='text-center'>Loan term remaining</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!recentLends ? (
              <TableRow>There is no lends</TableRow>
            ) : (
              //@ts-expect-error
              recentLends.map((loan, index) => (
                <TableRow key={index}>
                  <TableCell className='text-center'>{index}</TableCell>
                  <TableCell className='text-center'>
                    tBTC
                    {formatFiat(formatEther(loan.initialAmount))}
                  </TableCell>
                  <TableCell className='text-center'>
                    tBTC
                    {formatFiat(formatEther(loan.interest))}
                  </TableCell>
                  <TableCell className='text-center'>
                    tBTC
                    {formatFiat(formatEther(loan.amount))}
                  </TableCell>
                  <TableCell className='text-center'>
                    tBTC
                    {formatFiat(
                      parseFloat(formatEther(loan.initialAmount)) -
                        parseFloat(formatEther(loan.amount))
                    )}
                  </TableCell>
                  <TableCell className='text-center'>
                    {getTotalDays(loan.startDate, Number(loan.blockMonths))}{' '}
                    days
                  </TableCell>
                  <TableCell className='text-center'>
                    {getTotalTime(loan.startDate, Number(loan.blockMonths))}{' '}
                    days
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger className='cursor-pointer w-full' asChild>
                        <Button
                          onClick={() =>
                            setCurrentDebt(formatEther(loan.amount))
                          }
                          type='button'
                        >
                          Pay debt
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='sm:max-w-[425px]'>
                        <DialogHeader>
                          <DialogTitle>Pay debt</DialogTitle>
                          <DialogDescription>
                            You can pay your debt here
                          </DialogDescription>
                          <Form {...payDebtForm}>
                            <form
                              onSubmit={payDebtForm.handleSubmit(
                                handleOnPayDebtSubmit
                              )}
                              className='space-y-8'
                            >
                              <FormField
                                control={payDebtForm.control}
                                name='value'
                                rules={{
                                  min: {
                                    value: 0,
                                    message: 'The value must be greater than: 0',
                                  },
                                }}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Valor</FormLabel>
                                    <FormControl>
                                      <Input
                                        type='number'
                                        placeholder='0'
                                        {...field}
                                        onChange={(e) =>
                                          setCurrentDebt(e.target.value)
                                        }
                                        value={currentDebt}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              {parseFloat(
                                spendance ? formatEther(spendance) : '0'
                              ) >= payDebtForm.watch('value') ? (
                                <Button
                                  onClick={() => setId(index)}
                                  type='submit'
                                >
                                  Pay debt
                                </Button>
                              ) : (
                                <Dialog>
                                  <DialogTrigger
                                    className='cursor-pointer'
                                    asChild
                                  >
                                    <Button type='button'>Pay debt</Button>
                                  </DialogTrigger>
                                  <DialogContent className='sm:max-w-[425px]'>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Approve allowance
                                      </DialogTitle>
                                      <DialogDescription>
                                        You need to approve the allowance to pay
                                        the debt
                                      </DialogDescription>
                                    </DialogHeader>
                                    <Form {...approveForm}>
                                      <form
                                        onSubmit={approveForm.handleSubmit(
                                          onApproveSubmit
                                        )}
                                        className='space-y-8'
                                      >
                                        <FormField
                                          control={approveForm.control}
                                          name='amount'
                                          rules={{
                                            min: {
                                              value: 0,
                                              message:
                                                'The value must be greater than: 0',
                                            },
                                          }}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Valor</FormLabel>
                                              <FormControl>
                                                <Input
                                                  type='number'
                                                  placeholder='0'
                                                  {...field}
                                                  onChange={(e) =>
                                                    setCurrentDebt(
                                                      e.target.value
                                                    )
                                                  }
                                                  value={currentDebt}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <Button type='submit'>Approve</Button>
                                      </form>
                                    </Form>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </form>
                          </Form>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>Total debt</TableCell>
              <TableCell className='text-right'>
                tBTC
                {formatFiat(getTotaDebt())}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}

export default LendsList;
