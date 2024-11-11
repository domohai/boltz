"use client";
import { useState, useEffect, useMemo } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useSession } from 'next-auth/react';
import collectionManagerAccounts from "./collectionManagerAccounts";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";

const Page = () => {
  const {data: session, status} = useSession();
  const collection_point_id = useMemo(() => session?.user.collection_point_id, [session, status]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const {isOpen, onOpen, onOpenChange } = useDisclosure();
  const [accounts, setAccounts] = useState([]);
  
  const getStaffAccounts = async () => {
    const res = await fetch(`/api/collection_manager/user?collection_point_id=${collection_point_id}`, {
      method: 'GET',
    });
    const data = await res.json();
    if (data.ok) {
      setAccounts(data.users);
      console.log(accounts);
    } else {
      console.log(data.message);
      alert('Failed to get staff accounts');
    }
  };

  useEffect(() => {
    if (session) {
      getStaffAccounts();
    }
    
  }, []);

  const addManagerHandler = async (e) => {
    e.preventDefault();
    
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRole('');  
  };

  return (
    <div className="w-full p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-black">Quản lý tài khoản</h1>
        <Button className="bg-blue-600 text-white hover:bg-blue-700" onPress={onOpen}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
          Thêm tài khoản
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={addManagerHandler}>
              <ModalHeader className="flex justify-center">
                <h2 className="text-lg font-bold">
                  Thêm tài khoản nhân viên tập kết
                </h2>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Input autoFocus type="text" label="Họ và tên" placeholder="Nhập họ và tên" onChange={(e) => setName(e.target.value)} value={name} variant="bordered" />
                  <Input isRequired type="email" label="Email" placeholder="Nhập email" onChange={(e) => setEmail(e.target.value)} value={email} variant="bordered" />
                  <Input isRequired type="password" label="Mật khẩu" placeholder="Nhập mật khẩu" onChange={(e) => setPassword(e.target.value)} value={password} variant="bordered" />
                  <Input isDisabled type='text' label="Chức vụ" defaultValue='Nhân viên điểm tập kết' variant='border' />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>Huỷ</Button>
                <Button type="submit" onPress={onClose} color="primary">Thêm</Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>

      <div>
        <Table aria-label="Danh sách tài khoản">
          <TableHeader>
            <TableColumn>Họ và tên</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Role</TableColumn>
          </TableHeader>
          <TableBody>
            
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;