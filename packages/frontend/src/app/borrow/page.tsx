'use client';

import { FundAndLendPanel } from '@/components/borrow/FundAndLendPanel';
import { TotalFunds } from '@/components/borrow/TotalFunds';
import React from 'react';

function Page() {
  return (
    <main>
      <h1>Borrow panel</h1>
      <div className='borrow'>
        <TotalFunds />
        <FundAndLendPanel />
      </div>
    </main>
  );
}

export default Page;
