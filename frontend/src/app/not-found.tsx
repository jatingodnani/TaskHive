import Link from 'next/link';
import Image from 'next/image';
import NotFoundImage from '../../public/not.jpg';

const NotFound: React.FC = () => {
  return (
    <div className='flex w-full h-full items-center justify-center'>
    <div className='w-full flex flex-col h-full items-center justify-center'>
      <Image height={400} width={400} src={NotFoundImage} alt="Not Found" />
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
    </div>
  );
};

export default NotFound;
