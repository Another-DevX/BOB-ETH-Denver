import { borrowManagerAddress, tokenAddress } from '@/constants'
import { Address, erc20ABI, useAccount, useContractRead } from 'wagmi'


function useTokenSpendance () {

  const { address } = useAccount()
  const spendance = useContractRead({
    address: tokenAddress as Address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address as Address, borrowManagerAddress as Address],
    watch: true
  })
  return spendance
}

export { useTokenSpendance }
