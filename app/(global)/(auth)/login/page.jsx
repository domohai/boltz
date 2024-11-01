"use client";
import LoginForm from '@components/LoginForm';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ROLES } from '@utils/roles';

const LoginPage = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      if (session.user.role === ROLES.LEADER) {
        router.push('/leader');
      } else if (session.user.role === ROLES.COLLECTION_MANAGER) {
        router.push('/collection_manager');
      } else if (session.user.role === ROLES.SERVICE_MANAGER) {
        router.push('/service_manager');
      } else if (session.user.role === ROLES.COLLECTION_STAFF) {
        router.push('/collection_staff');
      } else if (session.user.role === ROLES.SERVICE_STAFF) {
        router.push('/service_staff');
      }
    }
  }, [sessionStatus, session, router]);

  return sessionStatus === 'loading' ? (<h1>Loading...</h1>) : (
    <div className="flex flex-col justify-center items-center bg-white">
      <div className="flex flex-col min-w-[35%] justify-center mt-[4rem]">
        <LoginForm/>
      </div>
    </div>
  );
};

export default LoginPage;