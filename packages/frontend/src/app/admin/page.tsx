'use client';
import React from 'react';
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

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
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { isAddress, parseEther } from 'viem';
import { useManageQuota } from '@/hooks/useManageQuota';
import { useManageWhitelist } from '@/hooks/useManageWhitellist';

function Page() {
  const increaseQuotaForm = useForm();
  const decreaseQuotaForm = useForm();
  const addToWhiteListForm = useForm();
  const removeToWhiteListForm = useForm();
  const { incrementQuota, decrementQuota } = useManageQuota();
  const { addToWhiteList, removeFromWhiteList } = useManageWhitelist();

  const onIncreaseSubmit = async (values: any) => {
    try {
      await incrementQuota.writeAsync({
        args: [values.Address, parseEther(values.amount)],
      });
      increaseQuotaForm.reset({
        Address: '',
        amount: '',
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onDecreaseSubmit = async (values: any) => {
    try {
      await decrementQuota.writeAsync({
        args: [values.Address, parseEther(values.amount)],
      });
      decreaseQuotaForm.reset({
        Address: '',
        amount: '',
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onAddToWhiteListSubmit = async (values: any) => {
    try {
      await addToWhiteList.writeAsync({
        args: [values.Address, parseEther(values.Amount)],
      });
      addToWhiteListForm.reset({
        Address: '',
        Amount: '',
      });
    } catch (e) {
      console.error(e);
    }
  };
  const onRemoveFromWhiteList = async (values: any) => {
    try {
      await removeFromWhiteList.writeAsync({
        args: [values.Address],
      });
      removeToWhiteListForm.reset({
        Address: '',
      });
    } catch (e) {
      console.error(e);
    }
  };

  function isValidEthereumAddress(address: string) {
    return isAddress(address);
  }

  return (
    <div className=' flex w-full flex-col lg:flex-row justify-stretch items-stretch gap-10 p-10'>
      <Card className='w-full recent '>
        <CardHeader>
          <CardTitle>Modify whitelist</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='add' className='fundLend'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='add'>Add</TabsTrigger>
              <TabsTrigger value='remove'>Remove</TabsTrigger>
            </TabsList>
            <TabsContent value='add'>
              <Card>
                <CardHeader>
                  <CardTitle>Add to whitelist</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <Form {...addToWhiteListForm}>
                    <form
                      onSubmit={addToWhiteListForm.handleSubmit(
                        onAddToWhiteListSubmit
                      )}
                      className='flex flex-col  items-start gap-4'
                    >
                      <FormField
                        control={addToWhiteListForm.control}
                        name='Address'
                        rules={{
                          required: 'This field is required',
                          validate: {
                            isValidEthereumAddress: (value) =>
                              isValidEthereumAddress(value) ||
                              'Must be a valid Ethereum address',
                          },
                        }}
                        render={({ field }) => (
                          <FormItem className='text-start  w-full'>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                placeholder='0xd7sjh27shs68...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addToWhiteListForm.control}
                        name='Amount'
                        rules={{
                          required: 'This field is required',
                          min: {
                            value: 0,
                            message: 'The quota must be greater than 0',
                          },
                        }}
                        render={({ field }) => (
                          <FormItem className='text-start  w-full'>
                            <FormLabel>Quota</FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                placeholder='1000'
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Remember the value is in tBTC$
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit'>Add to whitelist</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='remove'>
              <Card>
                <CardHeader>
                  <CardTitle>Remove from whitelist</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <Form {...removeToWhiteListForm}>
                    <form
                      onSubmit={removeToWhiteListForm.handleSubmit(
                        onRemoveFromWhiteList
                      )}
                      className='flex flex-col  items-start gap-4'
                    >
                      <FormField
                        control={removeToWhiteListForm.control}
                        name='Address'
                        rules={{
                          required: 'This field is required',
                          validate: {
                            isValidEthereumAddress: (value) =>
                              isValidEthereumAddress(value) ||
                              'Must be a valid Ethereum address',
                          },
                        }}
                        render={({ field }) => (
                          <FormItem className='text-start  w-full'>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                placeholder='0xd7sjh27shs68...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit'>Remove from whitelist</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Card className='w-full recent'>
        <CardHeader>
          <CardTitle>Modify User Quota</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='increase' className='fundLend'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='increase'>Increase</TabsTrigger>
              <TabsTrigger value='decrease'>Decrease</TabsTrigger>
            </TabsList>
            <TabsContent value='increase'>
              <Card>
                <CardHeader>
                  <CardTitle>Increase quota</CardTitle>
                  <CardDescription>
                    Remember to first add the user to the whitelist
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <Form {...increaseQuotaForm}>
                    <form
                      onSubmit={increaseQuotaForm.handleSubmit(
                        onIncreaseSubmit
                      )}
                      className='flex flex-col  items-start gap-4'
                    >
                      <FormField
                        control={increaseQuotaForm.control}
                        name='amount'
                        rules={{
                          required: 'Este campo es requerido',
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
                              Remember the value is in tBTC$
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={increaseQuotaForm.control}
                        name='Address'
                        rules={{
                          required: 'Este campo es requerido',
                          validate: {
                            isValidEthereumAddress: (value) =>
                              isValidEthereumAddress(value) ||
                              'Debe ser una dirección válida de Ethereum',
                          },
                        }}
                        render={({ field }) => (
                          <FormItem className='text-start  w-full'>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                placeholder='0xd7sjh27shs68...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit'>Increase quota</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='decrease'>
              <Card>
                <CardHeader>
                  <CardTitle>Decrease quota</CardTitle>
                  <CardDescription>
                    Remember to first add the user to the whitelist
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <Form {...decreaseQuotaForm}>
                    <form
                      onSubmit={decreaseQuotaForm.handleSubmit(
                        onDecreaseSubmit
                      )}
                      className='flex flex-col  items-start gap-4'
                    >
                      <FormField
                        control={decreaseQuotaForm.control}
                        name='amount'
                        rules={{
                          required: 'This field is required',
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
                              Remember the value is in tBTC$
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={decreaseQuotaForm.control}
                        name='Address'
                        rules={{
                          required: 'This field is required',
                          validate: {
                            isValidEthereumAddress: (value) =>
                              isValidEthereumAddress(value) ||
                              'Must be a valid Ethereum address',
                          },
                        }}
                        render={({ field }) => (
                          <FormItem className='text-start  w-full'>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                placeholder='0xd7sjh27shs68...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit'>Decrease quota</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
