import BigNumber from 'bignumber.js'
import { Address, erc20ABI, useAccount, useContractRead } from 'wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'

interface UseLiquidStakingApprovalProps {
  approveToken: string
  contractAddress: Address
  shouldCheckApproval: boolean
}

export const useLiquidStakingApprovalStatus = ({
  approveToken,
  contractAddress,
  shouldCheckApproval,
}: UseLiquidStakingApprovalProps) => {
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()

  const { data, refetch } = useContractRead({
    chainId,
    abi: erc20ABI,
    address: approveToken as Address,
    functionName: 'allowance',
    args: [account, contractAddress],
    enabled: !!account && !!contractAddress && !!shouldCheckApproval,
  })

  return {
    isApproved: data ? data > 0 : false,
    allowance: new BigNumber(data?.toString()),
    setLastUpdated: refetch,
  }
}

export default useLiquidStakingApprovalStatus
