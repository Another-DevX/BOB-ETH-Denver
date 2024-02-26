import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <nav className='flex w-full h-20 justify-between'>
      <h1>Sponge</h1>
      <div className='flex flex-row gap-2'>
        <Link href='/borrow'>Lend panel</Link>
        <Link href='/admin'>Manage panel</Link>
      </div>
      <w3m-button />
    </nav>
  );
}

export default Header;
