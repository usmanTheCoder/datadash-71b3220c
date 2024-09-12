'use client';

import { useRouter } from 'next/navigation';
import { FaExclamationCircle } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Layout from '@/components/Layout';

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Layout title="Page Not Found">
      <div className="flex flex-col items-center justify-center h-screen">
        <FaExclamationCircle className="text-8xl text-red-500 mb-8" />
        <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
        <p className="text-xl text-gray-500 mb-8">
          The page you are looking for does not exist.
        </p>
        <Button onClick={handleGoBack} className="bg-blue-500 hover:bg-blue-600">
          Go Back
        </Button>
      </div>
    </Layout>
  );
};

export default NotFoundPage;