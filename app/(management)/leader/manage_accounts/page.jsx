"use client";
import { useState, useEffect } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Tooltip } from "@nextui-org/tooltip";
import { ROLES } from "@utils/roles.js";
import { Select, SelectItem } from "@nextui-org/select";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";

const LeaderManageAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isOpen: isAddModalOpen, onOpen: onAddOpen, onOpenChange: onAddClose } = useDisclosure();
	const {isOpen: isDeleteModalOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteClose } = useDisclosure();
  const [role, setRole] = useState(ROLES.COLLECTION_MANAGER);
  const [selectedRole, setSelectedRole] = useState(new Set([ROLES.COLLECTION_MANAGER]));
  const [cmList, setCmList] = useState([]);
  const [smList, setSmList] = useState([]);
	const [selectedAccountId, setSelectedAccountId] = useState(null);

  const getAllUsersByRole = async (role) => {
    let response = await fetch(`/api/leader/user?role=${role}`, {
      method: 'GET',
    });
    let data = await response.json();
    if (data.ok) {
      if (role === ROLES.COLLECTION_MANAGER) {
        setCmList(data.users);
      } else {
        setSmList(data.users);
      }
    } else {
      alert(`Fail to get users! ${data.message}`);
    }
  };

  useEffect(() => {
    getAllUsersByRole(ROLES.COLLECTION_MANAGER);
    getAllUsersByRole(ROLES.SERVICE_MANAGER);
  }, []);

  const addManagerHandler = async (e) => {
    e.preventDefault();
    const _role = Array.from(selectedRole)[0] === 'cp_manager' ? ROLES.COLLECTION_MANAGER : ROLES.SERVICE_MANAGER;
    console.log(name, email, password, _role);
    let response = await fetch('/api/leader/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name, email, password, _role}),
    });
    let data = await response.json();
    console.log(data);
    if (data.ok) {
      alert('Thêm tài khoản thành công! User: ', data.user);
      if (_role === ROLES.COLLECTION_MANAGER) {
        getAllUsersByRole(ROLES.COLLECTION_MANAGER);
      } else {
        getAllUsersByRole(ROLES.SERVICE_MANAGER);
      }
      resetForm();
    } else {
      alert("Failed to add account!", data.message);
    }
  };

  const deleteManagerHandler = async () => {
		if (!selectedAccountId) return;
    let response = await fetch(`/api/leader/user/${selectedAccountId}`, {
      method: 'DELETE',
    });
    let data = await response.json();
    if (data.ok) {
      alert(data.message);
      getAllUsersByRole(role);
			setSelectedAccountId(null);
			onDeleteClose();
    } else {
      alert("Failed to delete account:", data.message);
    }
  };

	const openDeleteModal = (userId) => {
    setSelectedAccountId(userId);
    onDeleteOpen();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRole(ROLES.COLLECTION_MANAGER);
    setSelectedRole(ROLES.COLLECTION_MANAGER);
  };

  const collectionManagersList = (
    cmList.map((user) => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <div className="flex">
            <Tooltip content="Chỉnh sửa" placement="top">
              <Button 
                size="sm" 
                variant="light"
                isIconOnly 
                className="h-8 w-8 p-0 text-gray-400"
                startContent={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                  </svg>
                }></Button>
            </Tooltip>
            <Tooltip content="Xoá" placement="top" color='danger'>
              <Button 
                size="sm" 
                isIconOnly
                color='danger'
                variant="light" 
                className="h-8 w-8 p-0 text-gray-400"
								onPress={() => openDeleteModal(user.id)}
                startContent={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                }></Button>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
    ))
  );

  const serviceManagersList = (
    smList.map((user) => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <div className="flex">
            <Tooltip content="Chỉnh sửa" placement="top">
              <Button 
                size="sm" 
                variant="light"
                isIconOnly 
                className="h-8 w-8 p-0 text-gray-400"
                startContent={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                  </svg>
                }></Button>
            </Tooltip>
            <Tooltip content="Xoá" placement="top" color='danger'>
              <Button 
                size="sm" 
                isIconOnly
                color='danger'
                variant="light" 
                className="h-8 w-8 p-0 text-gray-400"
								onPress={() => openDeleteModal(user.id)}
                startContent={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                }></Button>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
    ))
  );
  

  return (
    <div className="w-full p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-black">Quản lý tài khoản</h1>
        <Button 
          className="bg-[#0554F2] text-white hover:bg-[#2C6DF9]"
          startContent={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
          } 
          onPress={onAddOpen}>
          Thêm tài khoản
        </Button>
      </div>
      {/* Add manager Modal */}
      <Modal isOpen={isAddModalOpen} onOpenChange={onAddClose} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={addManagerHandler}>
              <ModalHeader className="flex justify-center">
                <h2 className="text-lg font-bold">Thêm tài khoản</h2>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Input 
                    autoFocus
                    type='text' 
                    label="Họ và tên" 
                    placeholder='Nhập họ và tên' 
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    defaultValue=''
                    variant="bordered" />
                  <Input 
                    isRequired
                    type='email' 
                    label="Email" 
                    placeholder='Nhập email' 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    defaultValue=''
                    variant="bordered" />
                  <Input 
                    isRequired
                    type='password' 
                    label="Mật khẩu" 
                    placeholder='Nhập mật khẩu' 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    defaultValue=''
                    variant="bordered" />
                  <Select 
                    aria-label='Select role'
                    label="Chức vụ" 
                    placeholder='Chọn chức vụ' 
                    selectedKey={selectedRole}
                    onSelectionChange={setSelectedRole}>
                    <SelectItem key={ROLES.COLLECTION_MANAGER}>
                      Trưởng điểm tập kết
                    </SelectItem>
                    <SelectItem key={ROLES.SERVICE_MANAGER}>
                      Trưởng điểm giao dịch
                    </SelectItem>
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
                  Huỷ
                </Button>
                <Button type="submit" onPress={onClose} color="primary">
                  Thêm
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      
			{/* Delete Confirmation Modal */}
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
            <Button color="primary" onPress={deleteManagerHandler}>
              Xoá
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

			<div className="flex gap-2 mb-2">
        <Tabs 
          variant='underlined' 
          aria-label='Types of accounts tabs' 
          selectedKey={role}
          onSelectionChange={setRole}>
          <Tab key={ROLES.COLLECTION_MANAGER} title="Trưởng điểm tập kết" />
          <Tab key={ROLES.SERVICE_MANAGER} title="Trưởng điểm giao dịch" />
        </Tabs>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Họ và tên</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {role === ROLES.COLLECTION_MANAGER ? collectionManagersList : serviceManagersList}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderManageAccount;