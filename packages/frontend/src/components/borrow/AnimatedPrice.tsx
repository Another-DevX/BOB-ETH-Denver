import React from 'react';
import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useNetwork } from 'wagmi';

function AnimatedPrice({ price }: { price: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const { chain } = useNetwork();
  useEffect(() => {
    const controls = animate(count, price);
    return controls.stop;
  }, [price]);
  return (
    <div className='text-2xl flex flex-row gap-1 font-bold'>
      BTC$ <motion.div>{rounded}</motion.div>
    </div>
  );
}

export default AnimatedPrice;
