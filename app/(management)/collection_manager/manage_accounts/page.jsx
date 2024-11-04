"use client";
import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import collectionManagerAccounts from "./collectionManagerAccounts";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";

const Page = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentAccounts] = useState(collectionManagerAccounts);

  const addManagerHandler = async (e) => {
    e.preventDefault();
    let response = await fetch('/api/leader/collection_manager', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
    let data = await response.json();
    if (data.ok) {
      alert('Thêm tài khoản thành công!');
      resetForm();
    } else {
      alert(data.message);
    }
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
                  Thêm tài khoản nhân viên điểm tập kết
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
            <TableColumn>ID</TableColumn>
            <TableColumn>Họ và tên</TableColumn>
            <TableColumn>Giới tính</TableColumn>
            <TableColumn>Ngày sinh</TableColumn>
            <TableColumn>Số điện thoại</TableColumn>
            <TableColumn>Điểm tập kết</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {currentAccounts.map((account) => (
              <TableRow key={account.key}>
                <TableCell>{account.key}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.gender}</TableCell>
                <TableCell>{account.dob}</TableCell>
                <TableCell>{account.phone}</TableCell>
                <TableCell>{account.role}</TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </Button>

                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                      </svg>
                    </Button>

                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;