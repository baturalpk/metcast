import { FC, PropsWithChildren } from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
