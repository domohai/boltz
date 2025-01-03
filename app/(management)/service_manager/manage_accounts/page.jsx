"use client";
import { useState, useEffect, useMemo } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useSession } from 'next-auth/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";

const Page = () => {
  const {data: session, status} = useSession();
  const service_point_id = useMemo(() => session?.user.service_point_id, [session, status]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [accounts, setAccounts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const {isOpen: isDeleteModalOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteClose} = useDisclosure();

  const getStaffAccounts = async () => {
    const res = await fetch(`/api/service_manager/user?service_point_id=${service_point_id}`, {
      method: 'GET',
    });
    const data = await res.json();
    if (data.ok) {
      console.log(data);
      setAccounts(data.users);
    } else {
      console.log(data.message);
      alert('Failed to get staff accounts');
    }
  };

  useEffect(() => {
    if (session && service_point_id) {
      getStaffAccounts();
    }
  }, [session, service_point_id]);

  const addManagerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/service_manager/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          role: 'service_staff', 
          service_point_id: service_point_id,
          collection_point_id: null, // Default value 
        }),
      });
      const data = await response.json();
      if (data.ok) {
        alert('Account added successfully!');
        console.log(data);  
        resetForm();
        getStaffAccounts();
      } else {
        alert(`Failed to add account: ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding account:', error);
      alert('An error occurred. See console for details.');
    }
  };
  
  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRole('');
  };

  const deleteAccountHandler = async () => {
    if (!selectedId) return;
    try {
      const response = await fetch(`/api/service_manager/user?id=${selectedId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.ok) {
        alert('Account deleted successfully!');
        getStaffAccounts(); 
        setSelectedId(null);
        onDeleteClose();
      } else {
        alert(`Failed to delete account: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred. See console for details.');
    }
  };
  
  const openDeleteModal = (id) => {
    setSelectedId(id);
    onDeleteOpen();
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
                  Thêm tài khoản nhân viên giao dịch
                </h2>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Input autoFocus type="text" label="Họ và tên" placeholder="Nhập họ và tên" onChange={(e) => setName(e.target.value)} value={name} variant="bordered" />
                  <Input isRequired type="email" label="Email" placeholder="Nhập email" onChange={(e) => setEmail(e.target.value)} value={email} variant="bordered" />
                  <Input isRequired type="password" label="Mật khẩu" placeholder="Nhập mật khẩu" onChange={(e) => setPassword(e.target.value)} value={password} variant="bordered" />
                  <Input isDisabled type='text' label="Chức vụ" defaultValue='Nhân viên giao dịch' variant='border' />
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
      
      <Modal isOpen={isDeleteModalOpen} onOpenChange={onDeleteClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex justify-center">
            <h2 className="text-lg font-bold">Xác nhận xoá tài khoản</h2>
          </ModalHeader>
          <ModalBody>
            <p>Bạn có chắc chắn muốn xoá tài khoản này không?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onDeleteClose}>
              Huỷ
            </Button>
            <Button color="primary" onPress={deleteAccountHandler}>
              Xoá
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div>
        <Table aria-label="Danh sách tài khoản">
          <TableHeader>
            <TableColumn>Họ và tên</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Role</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody items={accounts}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  <div className="flex">
                    <Tooltip content="Xoá" placement="top" color='danger'>
                      <Button 
                        size="sm" 
                        isIconOnly
                        color='danger'
                        variant="light" 
                        className="h-8 w-8 p-0 text-gray-400"
                        onPress={() => openDeleteModal(item.id)}
                        startContent={
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        }
                      />
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;