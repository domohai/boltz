'use client';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input} from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState, useEffect } from 'react';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      if (session.user.role === 'cp_manager') {
        router.push('/leader/dashboard');
      }
    }
  }, [sessionStatus, session, router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      // Check if response is undefined or has an error
      if (!res || res.error) {
        setError(res?.error || 'An unexpected error occurred');
        console.error("Login error:", res?.error);
        return;
      }
    } catch (err) {
      console.error("SignIn error:", err);
      setError('An unexpected error occurred');
    }
  };

  return (sessionStatus !== 'authenticated' && (
    <Card className="flex flex-col">
      <CardHeader className="pb-0 font-bold justify-center text-[#022873]">
        <h2>Đăng nhập</h2>
      </CardHeader>
      <CardBody className="pt-0">
        <form onSubmit={handleLogin} className="p-4 space-y-[1rem]">
          <Input 
            isRequired
            type="email" 
            label="Email" 
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            size="sm"/>
          <Input 
            isRequired
            label="Password" 
            type="password" 
            placeholder="Nhập mật khẩu" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="sm"/>
          {error && <p className="text-red-500">{error}</p>}
          <Button
            className="text-[#f0f0f2] font-medium w-full bg-[#022873]" 
            type="submit" 
            radius="full">
            Đăng nhập
          </Button>
        </form>
      </CardBody>
    </Card>
  ))
}

export default LoginForm;