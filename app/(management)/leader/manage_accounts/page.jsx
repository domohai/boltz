"use client";
import { useState, useEffect, useMemo } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Tooltip } from "@nextui-org/tooltip";
import { ROLES } from "@utils/roles.js";
import { Select, SelectItem } from "@nextui-org/select";
import { Pagination } from "@nextui-org/pagination";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";

const LeaderManageAccount = () => {
  const [name, setName] = useState(''); // value of the name input field
  const [email, setEmail] = useState(''); // value of the email input field
  const [password, setPassword] = useState(''); // value of the password input field
  const {isOpen: isAddModalOpen, onOpen: onAddOpen, onOpenChange: onAddClose } = useDisclosure(); // hook to control the add manager pop-up
	const {isOpen: isDeleteModalOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteClose } = useDisclosure(); // hook to control the delete manager pop-up
  const [role, setRole] = useState(ROLES.COLLECTION_MANAGER); // value to switch between Tabs component
  const [selectedRole, setSelectedRole] = useState(ROLES.COLLECTION_MANAGER); // value of the Select component in the add manager pop-up
  const [cmList, setCmList] = useState([]); // list of collection managers
  const [smList, setSmList] = useState([]); // list of service managers
	const [selectedAccountId, setSelectedAccountId] = useState(null); // value to store the id of the selected user that we want to delete
  const rowsPerPage = 10; // number of rows per page
  const [cmPage, setCmPage] = useState(1); // value to store the current page number of collection managers
  const [smPage, setSmPage] = useState(1); // value to store the current page number of service managers
  const cmPages = useMemo(() => Math.ceil(cmList.length / rowsPerPage), [cmList.length, rowsPerPage]); // calculate the number of collection managers pages
  const smPages = useMemo(() => Math.ceil(smList.length / rowsPerPage), [smList.length, rowsPerPage]); // calculate the number of service managers pages

  const cmManagers = useMemo(() => {
    const start = (cmPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return cmList.slice(start, end);
  }, [cmList, cmPage]);

  const smManagers = useMemo(() => {
    const start = (smPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return smList.slice(start, end);
  }, [smList, smPage]);

  // Get list of collection managers or service managers base on the role pass in
  const getAllUsersByRole = async (role) => {
    let response = await fetch(`/api/leader/user?role=${role}`, {
      method: 'GET',
    });
    let data = await response.json();
    if (data.ok) {
      // update the list of users
      if (role === ROLES.COLLECTION_MANAGER) {
        setCmList(data.users);
      } else {
        setSmList(data.users);
      }
    } else {
      alert(`Fail to get users! ${data.message}`);
    }
  };
  
  // this will be called when we start the web for the first time
  useEffect(() => {
    getAllUsersByRole(ROLES.COLLECTION_MANAGER);
    getAllUsersByRole(ROLES.SERVICE_MANAGER);
  }, []);

  // add a new manager 
  const addManagerHandler = async (e) => {
    // prevent empty form submission
    e.preventDefault();
    // get the role from the Select component
    // because the Select component return a Set object so we need to convert it to an array and get the first element
    const _role = selectedRole;
    
    // print the manager info to the console for debugging
    console.log(name, email, password, _role);

    let response = await fetch('/api/leader/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name, email, password, _role}),
    });

    let data = await response.json();
    if (data.ok) {
      alert('Thêm tài khoản thành công! User: ', data.user);
      // update the list of users
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
    // when press delete icon, the value of 'selectedAccountId' will be set to the id of the user 
    // that we want to delete. The system will open a confirm pop-up. When we press 'Xoá' button,
    // this function will be called to delete the user.
		if (!selectedAccountId) return; // check if the selectedAccountId is null or not
    let response = await fetch(`/api/leader/user?id=${selectedAccountId}`, {
      method: 'DELETE',
    });

    let data = await response.json();
    if (data.ok) {
      alert(data.message); // notify the user that the account has been deleted
      getAllUsersByRole(role); // update the list of users
			setSelectedAccountId(null); // reset the selectedAccountId
			onDeleteClose(); // close the confirm pop-up
    } else {
      alert("Failed to delete account:", data.message);
    }
  };

  // open the confirm pop-up
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

  // sub-component to display the list of collection managers
  // this will be call in return statement below when the role is 'collection_manager'
  const collectionManagersList = (
    <Table 
      aria-label="collection managers table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            variant='light'
            initialPage={1}
            page={cmPage}
            total={cmPages ? cmPages : 1}
            onChange={(page) => setCmPage(page)}
          />
        </div>
      }>
      <TableHeader>
        <TableColumn>Họ và tên</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Điểm tập kết</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody items={cmManagers}>
        {/* for each collection manager in the list, display their name, email and action buttons */} 
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.collection_point}</TableCell>
            <TableCell>
              <div className="flex">
                {/* Delete icon */}
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
                    }></Button>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  // sub-component to display the list of service managers
  // this will be call in return statement below when the role is 'service_manager'
  const serviceManagersList = (
    <Table 
      aria-label="service managers table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            variant='light'
            initialPage={1}
            page={smPage}
            total={smPages ? smPages : 1}
            onChange={(page) => setSmPage(page)}
          />
        </div>
      }>
      <TableHeader>
        <TableColumn>Họ và tên</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Điểm giao dịch</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody items={smManagers}>
        {/* for each collection manager in the list, display their name, email and action buttons */} 
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.service_point ? 'Điểm giao dịch ' + item.service_point : ''}</TableCell>
            <TableCell>
              <div className="flex">
                {/* Delete icon */}
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
                    }></Button>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
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

      {/* Add Modal */}
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
                    isClearable
                    type='text' 
                    label="Họ và tên" 
                    placeholder='Nhập họ và tên'
                    onChange={(e) => setName(e.target.value)}
                    onClear={() => setName('')}
                    value={name}
                    variant="bordered" />
                  <Input 
                    isRequired
                    isClearable
                    type='email' 
                    label="Email" 
                    placeholder='Nhập email' 
                    onChange={(e) => setEmail(e.target.value)}
                    onClear={() => setEmail('')}
                    value={email}
                    variant="bordered" />
                  <Input 
                    isRequired
                    isClearable
                    type='password' 
                    label="Mật khẩu" 
                    placeholder='Nhập mật khẩu' 
                    onChange={(e) => setPassword(e.target.value)}
                    onClear={() => setPassword('')}
                    value={password}
                    variant="bordered" />
                  <Select 
                    aria-label='Select role'
                    label="Chức vụ" 
                    placeholder='Chọn chức vụ' 
                    selectedKeys={[selectedRole]}
                    onChange={(e) => setSelectedRole(e.target.value)}>
                    <SelectItem key={ROLES.COLLECTION_MANAGER} >
                      Trưởng điểm tập kết
                    </SelectItem>
                    <SelectItem key={ROLES.SERVICE_MANAGER} >
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

			{/* Tab to switch between collection manager and service manager */}
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
        
      {/* Table to display the list of managers */}
      {role === ROLES.COLLECTION_MANAGER ? collectionManagersList : serviceManagersList}
    </div>
  );
};

export default LeaderManageAccount;