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
        router.push('/leader/dashboard');
      } else if (session.user.role === ROLES.COLLECTION_MANAGER) {

      } else if (session.user.role === ROLES.SERVICE_MANAGER) {

      } else if (session.user.role === ROLES.COLLECTION_STAFF) {

      } else if (session.user.role === ROLES.SERVICE_STAFF) {

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