import { Bob3D } from '@/components/3DBob';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen  w-full flex-col absolute items-center justify-between p-24'>
      <div className='absolute top-10 left-10 flex flex-col gap-5 w-full'>
        <h1 className='text-4xl font-bold'>SpongeBOB</h1>
        <p className=' w-full'>
          Empowering Dreams, One MicroLending at a Time on Bitcoin&apos;s L2
        </p>
        <Bob3D />
      </div>
    </main>
  );
}
