'use client';

import { ApprovalRequests } from '@/components/borrow/ApprovalRequests';
import { FundAndLendPanel } from '@/components/borrow/FundAndLendPanel';
import LendsList from '@/components/borrow/LendsList';
import { TotalFunds } from '@/components/borrow/TotalFunds';
import React, { useEffect, useState } from 'react';

function Page() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <main>
      <div className='borrow'>
        <TotalFunds />
        <FundAndLendPanel />
        <div className='flex flex-col gap-2 row-span-2 h-full flex-1 items-stretch'>
          <LendsList />
          <ApprovalRequests />
        </div>
      </div>
    </main>
  );
}

export default Page;
