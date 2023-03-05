import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { pathname } = useRouter();

  if (pathname === '/') {
    return <></>;
  }
  return (
    <div className="w-screen flex justify-around md:justify-start">
      <Link className="px-0 py-4 md:pl-[5%] md:py-7" href="/">
        {'Back to Home >'}
      </Link>
    </div>
  );
};

export default Navbar;
