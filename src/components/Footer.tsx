import Link from 'next/link';

const Footer = () => {
  return (
    <div className="mt-4">
      Powered by <Link href="https://open-meteo.com/">OpenMeteo</Link> API
    </div>
  );
};

export default Footer;
