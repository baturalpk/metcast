import Image from 'next/image';
import Link from 'next/link';
import useAppPreferencesStore from '@/stores/appPreferences';

const Footer = () => {
  const { darkModeEnabled } = useAppPreferencesStore(
    state => state.preferences
  );

  return (
    <div className="my-8">
      <p>
        Powered by <Link href="https://open-meteo.com/">Open-Meteo</Link> API.
      </p>
      <Link href="https://github.com/baturalpk/metcast/" target="_blank">
        <Image
          className="m-auto my-6"
          src={`/git-${darkModeEnabled ? 'light' : 'dark'}.svg`}
          alt="Git SCM Logo. Click to visit the source repository."
          width={48}
          height={48}
          priority
        />
      </Link>
      <p>
        {new Date().getFullYear()} -{' '}
        <Link href="https://baturalpk.dev/" target="_blank">
          baturalpk.dev
        </Link>
      </p>
    </div>
  );
};

export default Footer;
