import DefaultLayout from '@/components/layouts/DefaultLayout';
import SearchLocation from '@/components/SearchLocation';
import Image from 'next/image';

function Home() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center max-w-screen text-center">
        <div className="h-[15vh] w-[65vw] relative mt-[10%]">
          <Image src="/next.svg" alt="Metcast Logo" fill priority />
        </div>
        <SearchLocation />
      </div>
    </DefaultLayout>
  );
}

export default Home;
