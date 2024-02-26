'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Address, formatEther, parseEther } from 'viem';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { useLend } from '@/hooks/useLend';
import { useFund } from '@/hooks/useFund';
import { useTokenSpendance } from '@/hooks/useTokenSpendance';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { formatFiat } from '@/functions/formatFiat';
import { useApproveAllowance } from '@/hooks/useApproveAllowance';
import { Label } from '@radix-ui/react-label';
import { borrowManagerAddress } from '@/constants';

function FundAndLendPanel() {
  const fundForm = useForm();
  const lendForm = useForm();
  const approveForm = useForm();
  const { writeAsync: loan } = useLend();
  const { writeAsync: fund } = useFund();
  const { writeAsync: approve } = useApproveAllowance();
  const { data: spendance } = useTokenSpendance();
  const { data: balance, isLoading: isbalanceLoading } = useTokenBalance();

  async function onFundSubmit(values: any) {
    try {
      if (parseInt(spendance ? formatEther(spendance) : '0') < values.amount)
        return;
      await fund({
        args: [parseEther(values.amount)],
      });
      fundForm.reset({
        amount: '',
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function onApproveSubmit(values: any) {
    try {
      await approve({
        args: [borrowManagerAddress as Address, parseEther(values.amount)],
      });
      approveForm.reset({
        amount: '',
      });
      fundForm.reset({
        amount: '',
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function onLendSubmit(values: any) {
    try {
      await loan({
        args: [parseEther(values.amount), values.months],
      });
      lendForm.reset({
        amount: '',
        months: '',
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Tabs defaultValue='fund' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='fund'>Fund</TabsTrigger>
        <TabsTrigger value='lend'>Lend</TabsTrigger>
      </TabsList>
      <TabsContent value='lend'>
        <Card>
          <CardHeader>
            <CardTitle>Ask for a lend</CardTitle>
            <CardDescription>
              Rememeber that you can only ask for a lend if you are validated
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Form {...lendForm}>
              <form
                onSubmit={lendForm.handleSubmit(onLendSubmit)}
                className='flex flex-col  items-start gap-4'
              >
                <FormField
                  control={lendForm.control}
                  name='amount'
                  rules={{
                    required: 'This field is required',
                  }}
                  render={({ field }) => (
                    <FormItem className='text-start  w-full'>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='100' {...field} />
                      </FormControl>
                      <FormDescription>
                        The amount of money you want to lend
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={lendForm.control}
                  name='months'
                  rules={{
                    required: 'This field is required',
                    min: {
                      value: 0,
                      message: 'The amount must be greater than 0',
                    },
                    max: {
                      value: 12,
                      message:
                        'The amount must be less than or equal to 12 months',
                    },
                  }}
                  render={({ field }) => (
                    <FormItem className='text-start  w-full'>
                      <FormLabel>Meses</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Escoge una cantidad de meses' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='1'>1</SelectItem>
                              <SelectItem value='2'>2</SelectItem>
                              <SelectItem value='3'>3</SelectItem>
                              <SelectItem value='4'>4</SelectItem>
                              <SelectItem value='5'>5</SelectItem>
                              <SelectItem value='6'>6</SelectItem>
                              <SelectItem value='7'>7</SelectItem>
                              <SelectItem value='8'>8</SelectItem>
                              <SelectItem value='9'>9</SelectItem>
                              <SelectItem value='10'>10</SelectItem>
                              <SelectItem value='11'>11</SelectItem>
                              <SelectItem value='12'>12</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit'>Pedir prestamo</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='fund'>
        <Card>
          <CardHeader>
            <CardTitle>Fund</CardTitle>
            <CardDescription>
              If you fund your account you will be able to lend money to other
              users
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Form {...fundForm}>
              <form
                onSubmit={fundForm.handleSubmit(onFundSubmit)}
                className='flex flex-col  items-start gap-4'
              >
                <FormField
                  control={fundForm.control}
                  name='amount'
                  rules={{
                    required: 'This field is required',
                    min: {
                      value: 0,
                      message: 'The amount must be greater than 0',
                    },
                  }}
                  render={({ field }) => (
                    <FormItem className='text-start  w-full'>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='100' {...field} />
                      </FormControl>
                      <FormDescription>
                        {balance
                          ? `Balance: USD${formatFiat(
                              Number(balance / BigInt(10 ** 18))
                            )}`
                          : isbalanceLoading
                          ? 'loading'
                          : '$0,00'}
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex flex-row w-full gap-2'>
                  <Button type='submit'>Fund</Button>
                  <Popover>
                    <PopoverTrigger>
                      <Button type='button' variant={'outline'}>
                        Approve spendance
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Form {...approveForm}>
                        <form
                          onSubmit={approveForm.handleSubmit(onApproveSubmit)}
                          className='flex flex-col  items-start gap-4'
                        >
                          <FormField
                            control={approveForm.control}
                            name='amount'
                            rules={{
                              required: 'This field is required',
                              min: {
                                value: 0,
                                message: 'The amount must be greater than 0',
                              },
                            }}
                            render={({ field }) => (
                              <FormItem className='text-start  w-full'>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                  <Input
                                    type='number'
                                    placeholder='100'
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  {balance
                                    ? `Balance: USD${formatFiat(
                                        Number(balance / BigInt(10 ** 18))
                                      )}`
                                    : isbalanceLoading
                                    ? 'loading'
                                    : '$0,00'}
                                </FormDescription>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type='submit'>Approve</Button>
                        </form>
                      </Form>
                    </PopoverContent>
                  </Popover>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export { FundAndLendPanel };
