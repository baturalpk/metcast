import { FC, PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../Navbar';

const DynamicFooter = dynamic(() => import('@/components/Footer'), {
  ssr: false,
});

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <DynamicFooter />
    </>
  );
};

export default DefaultLayout;
