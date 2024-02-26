'use client';

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
      <h1>Borrow panel</h1>
      <div className='borrow'>
        <TotalFunds />
        <LendsList />
        <FundAndLendPanel />
      </div>
    </main>
  );
}

export default Page;
