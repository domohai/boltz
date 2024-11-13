"use client";
import { useState, useEffect, useMemo } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import { Pagination } from "@nextui-org/pagination";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Select, SelectItem } from "@nextui-org/select";

const ManageServicePoint = () => {
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);
  const [availableManagers, setAvailableManagers] = useState([]);
  const {isOpen: isAddModalOpen, onOpen: onAddOpen, onOpenChange: onAddClose } = useDisclosure();
  const {isOpen: isDeleteModalOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteClose } = useDisclosure();
  const {isOpen: isEditModalOpen, onOpen: onEditOpen, onOpenChange: onEditClose } = useDisclosure();
  const [spList, setSpList] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalPage = useMemo(() => Math.ceil(spList.length / rowsPerPage), [spList.length, rowsPerPage]);
  
  const spPart = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return spList.slice(start, end);
  }, [spList.length, page, rowsPerPage]);

  const getServicePoints = async () => {
    try {
      const res = await fetch('/api/leader/warehouse/service_point', {
        method: 'GET',
      });
      const data = await res.json();
      if (data.ok) {
        setSpList(data.servicePoints);
      } else {
        console.error(data.message);
        alert("An error occurred. See in console for more details.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. See in console for more details.");
    }
  }

  const getAvailableManagers = async () => {
    try {
      const res = await fetch('/api/leader/warehouse/service_point/available_user', {
        method: 'GET',
      });
      const data = await res.json();
      if (data.ok) {
        setAvailableManagers(data.users);
      } else {
        console.error(data.message);
        alert("An error occurred. See in console for more details.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. See in console for more details.");
    }
  }

  useEffect(() => {
    getServicePoints();
    getAvailableManagers();
  }, []);

  const addServicePoint = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leader/warehouse/service_point', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, district, city, address, selectedManager }),
      });
      const data = await res.json();
      if (data.ok) {
        alert("Đã thêm điểm giao dịch thành công.");
        getServicePoints();
        resetForm();
      } else {
        console.error(data.message);
        alert("An error occurred. See in console for more details.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. See in console for more details.");
    }
  }

  const deleteServicePoint = async () => {
    if (!selectedId) return;
    try {
      const res = await fetch(`/api/leader/warehouse/service_point/${selectedId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.ok) {
        alert("Đã xoá điểm giao dịch thành công.");
        getServicePoints();
        setSelectedId(null); // reset the selectedAccountId
			  onDeleteClose(); // close the confirm pop-up
      } else {
        console.error(data.message);
        alert("An error occurred. See in console for more details.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. See in console for more details.");
    }
  }

  const editServicePoint = async (e) => {
    e.preventDefault();
    // check if the selectedId is valid
    if (!selectedId) return;
    // check if there is any change
    const servicePoint = spList.find(sp => sp.id === selectedId);
    if (!servicePoint) return;
    if (servicePoint.name === name && servicePoint.district === district && servicePoint.city === city && servicePoint.address === address && servicePoint.manager_id === selectedManager) {
      alert("Không có gì thay đổi.");
      resetForm();
      return;
    }
    // send edit request
    try {
      const res = await fetch(`/api/leader/warehouse/service_point/${selectedId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, district, city, address, selectedManager }),
      });
      const data = await res.json();
      if (data.ok) {
        alert("Đã chỉnh sửa điểm giao dịch thành công.");
        getServicePoints();
        resetForm();
        onEditClose();
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. See in console for more details.");
    }
  }

  // open the confirm pop-up
	const openDeleteModal = (id) => {
    setSelectedId(id);
    onDeleteOpen();
  };

  const resetForm = () => {
    setName('');
    setCity('');
    setAddress('');
    setDistrict('');
    setSelectedId(null);
    setSelectedManager(null);
  }

  const spTable = (
    <Table 
      aria-label="service points table"
      className='pt-2'
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            variant='light'
            initialPage={1}
            page={page}
            total={totalPage ? totalPage : 1}
            onChange={(page) => setPage(page)}
          />
        </div>
      }>
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Tên</TableColumn>
        <TableColumn>Quận/Huyện</TableColumn>
        <TableColumn>Tỉnh/Thành phố</TableColumn>
        <TableColumn>Địa chỉ</TableColumn>
        <TableColumn>Email quản lý</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody items={spPart}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.district}</TableCell>
            <TableCell>{item.city}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>{item.manager_email}</TableCell>
            <TableCell>
              <div className="flex">
                {/* Edit icon */}
                <Tooltip content="Chỉnh sửa" placement="top" color='primary'>
                  <Button
                    size="sm"
                    isIconOnly
                    color='primary'
                    variant="light"
                    className="h-8 w-8 p-0 text-gray-400"
                    onPress={() => {
                      setSelectedId(item.id);
                      setName(item.name);
                      setDistrict(item.district);
                      setCity(item.city);
                      setAddress(item.address);
                      onEditOpen();
                    }}
                    startContent={
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    }></Button>
                </Tooltip>
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
        <h1 className="text-2xl font-bold text-black">Quản lý điểm giao dịch</h1>
        <Button 
          className="bg-[#0554F2] text-white hover:bg-[#2C6DF9]"
          startContent={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
            </svg>
          } 
          onPress={onAddOpen}>
          Thêm
        </Button>
      </div>
      
      {/* Add modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onOpenChange={(isOpen) => {
          if (!isOpen) {resetForm();}
          onAddClose(isOpen);
        }}
        placement="top-center" className='px-2'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={addServicePoint}>
              <ModalHeader className="flex justify-center">
                <h2 className="text-lg font-bold">Thêm điểm giao dịch</h2>
              </ModalHeader>
              <ModalBody>
                <Input 
                  autoFocus
                  isRequired
                  isClearable
                  type='text' 
                  label="Tên điểm giao dịch" 
                  placeholder='Nhập tên điểm giao dịch' 
                  onChange={(e) => setName(e.target.value)}
                  onClear={() => setName('')}
                  value={name}
                  variant="bordered" />
                <Input 
                  isRequired
                  isClearable
                  type='text' 
                  label="Quận/Huyện" 
                  placeholder='Nhập quận/huyện' 
                  onChange={(e) => setDistrict(e.target.value)}
                  onClear={() => setDistrict('')}
                  value={district}
                  variant="bordered" />
                <Input 
                  isRequired
                  isClearable
                  type='text' 
                  label="Tỉnh/Thành phố" 
                  placeholder='Tỉnh/Thành phố' 
                  onChange={(e) => setCity(e.target.value)}
                  onClear={() => setCity('')}
                  value={city}
                  variant="bordered" />
                <Input 
                  isRequired
                  isClearable
                  type='text' 
                  label="Địa chỉ" 
                  placeholder='Nhập địa chỉ' 
                  onChange={(e) => setAddress(e.target.value)}
                  onClear={() => setAddress('')}
                  value={address}
                  variant="bordered" />
                <Select 
                  aria-label='Select manager'
                  label="Trưởng điểm giao dịch" 
                  placeholder={availableManagers.length === 0 ? 'Hãy thêm tài khoản trưởng điểm giao dịch!' : 'Chọn trưởng điểm giao dịch'} 
                  selectedKeys={[selectedManager]}
                  onChange={(e) => setSelectedManager(e.target.value)}>
                  {availableManagers.map((manager) => (
                    <SelectItem key={manager.id} value={manager.email}>
                      {manager.name + ' - ' + manager.email}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="danger" 
                  variant="light" 
                  onPress={() => {
                    resetForm();
                    onClose();
                  }}>
                  Huỷ
                </Button>
                <Button type="submit" color="primary" onPress={onClose}>
                  Thêm
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>

      {/* Edit modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onOpenChange={(isOpen) => {
          if (!isOpen) {resetForm();}
          onEditClose(isOpen);
        }} 
        placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={editServicePoint}>
              <ModalHeader className="flex justify-center">
                <h2 className="text-lg font-bold">Chỉnh sửa điểm giao dịch</h2>
              </ModalHeader>
              <ModalBody>
                <Input 
                  autoFocus
                  isClearable
                  isRequired
                  type='text' 
                  label="Tên điểm giao dịch" 
                  placeholder='Nhập tên điểm giao dịch' 
                  onChange={(e) => setName(e.target.value)}
                  onClear={() => setName('')}
                  value={name}
                  variant="bordered" />
                <Input 
                  isRequired
                  isClearable
                  type='text' 
                  label="Quận/Huyện" 
                  placeholder='Nhập quận/huyện' 
                  onChange={(e) => setDistrict(e.target.value)}
                  onClear={() => setDistrict('')}
                  value={district}
                  variant="bordered" />
                <Input 
                  isRequired
                  isClearable
                  type='text' 
                  label="Tỉnh/Thành phố" 
                  placeholder='Tỉnh/Thành phố' 
                  onChange={(e) => setCity(e.target.value)}
                  onClear={() => setCity('')}
                  value={city}
                  variant="bordered" />
                <Input 
                  isRequired
                  isClearable
                  type='text' 
                  label="Địa chỉ" 
                  placeholder='Nhập địa chỉ' 
                  onChange={(e) => setAddress(e.target.value)}
                  onClear={() => setAddress('')}
                  value={address}
                  variant="bordered" />
                {spList.find(sp => sp.id === selectedId).manager_id ? (
                  <Input 
                    isReadOnly
                    type='text' 
                    label="Trưởng điểm giao dịch"  
                    defaultValue={spList.find(sp => sp.id === selectedId).manager_email}
                    variant="bordered" />
                ) : (
                  <Select 
                    aria-label='Select manager'
                    label="Trưởng điểm giao dịch" 
                    placeholder={availableManagers.length === 0 ? 'Hãy thêm tài khoản trưởng điểm giao dịch!' : 'Chọn trưởng điểm giao dịch'} 
                    selectedKeys={[selectedManager]}
                    onChange={(e) => setSelectedManager(e.target.value)}>
                    {availableManagers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.email}>
                        {manager.name + ' - ' + manager.email}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="danger" 
                  variant="light" 
                  onPress={() => {
                    resetForm();
                    onClose();
                  }}>
                  Huỷ
                </Button>
                <Button type="submit" color="primary" onPress={onClose}>
                  Lưu
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onOpenChange={(isOpen) => {
          if (!isOpen) {setSelectedId(null);}
          onDeleteClose(isOpen);
        }}
        placement="top-center">
        <ModalContent>
          <ModalHeader className="flex justify-center">
            <h2 className="text-lg font-bold">Xác nhận xoá điểm giao dịch</h2>
          </ModalHeader>
          <ModalBody>
            <p>Bạn có chắc chắn muốn xoá điểm giao dịch này không?</p>
          </ModalBody>
          <ModalFooter>
            <Button 
              color="danger" 
              variant="light" 
              onPress={() => {
                setSelectedId(null);
                onDeleteClose();
              }}>
              Huỷ
            </Button>
            <Button color="primary" onPress={deleteServicePoint}>
              Xoá
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Bảng tài khoản */}
      {spTable}
    </div>
  );
};

export default ManageServicePoint;
