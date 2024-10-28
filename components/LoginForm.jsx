'use client';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input} from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from 'react';

const LoginForm = () => {
  

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0 font-bold justify-center text-[#022873]">
        <h2>Đăng nhập</h2>
      </CardHeader>
      <CardBody className="pt-0">
        <form className="p-4 space-y-[1rem]">
          <Input type="email" label="Email" placeholder="Enter your email" size="sm"/>
          <Input label="Password" placeholder="Enter your password" type="password" size="sm"/>
          <Button className="text-[#f0f0f2] font-medium w-full bg-[#022873]" type="submit" radius="full">Đăng nhập</Button>
        </form>
      </CardBody>
    </Card>
  )
}

export default LoginForm;