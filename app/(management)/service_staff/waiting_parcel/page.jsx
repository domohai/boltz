"use client";
import { useState, useMemo, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from "@nextui-org/button";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import { Tooltip } from "@nextui-org/tooltip";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";

const WaitingParcels = () => {
  const { data: session, status: sessionStatus } = useSession();
  const service_point_id = useMemo(() => session?.user.service_point_id, [session, sessionStatus]);
  const [parcels, setParcels] = useState([]); // variable to store all parcels
  const [selectedParcels, setSelectedParcels] = useState(new Set([])); // variable to store selected parcels from checkbox in the table
  // Modals
  const {isOpen: isConfirmModalOpen, onOpen: onConfirmOpen, onOpenChange: onConfirmClose } = useDisclosure();
  const {isOpen: isCancelModalOpen, onOpen: onCancelOpen, onOpenChange: onCancelClose } = useDisclosure();
  const {isOpen: isViewModalOpen, onOpen: onViewOpen, onOpenChange: onViewClose } = useDisclosure();
  const [selectedViewParcel, setSelectedViewParcel] = useState(null); // variable to store the selected parcel to view
  // Table selection mode
  const [selectionMode, setSelectionMode] = useState("single"); // selection mode of table (to fix the warning of NextUI)
  const isMultipleSelect = true; // to fix the warning of NextUI
  // set selection mode (fix the warning of NextUI)
  useEffect(() => {
    if (isMultipleSelect) {
      setSelectionMode("multiple");
    }
  }, [isMultipleSelect]);
  // Pagination for splitting parcels into pages in the table
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalPage = useMemo(() => Math.ceil(parcels.length / rowsPerPage), [parcels.length, rowsPerPage]);
  // Get the part of parcels for the current page
  const parcelsPart = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return parcels.slice(start, end);
  }, [parcels.length, page]);

  // fecth all the related information of parcels with conditions: 
  // 
  const fetchParcels = async () => {
    if (!service_point_id) return;
    try {
      const res = await fetch(`/api/service_staff/waiting_parcel?service_point_id=${String(service_point_id)}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.ok) {
        setParcels(data.parcels);
      } else {
        console.error("Error fetching processing parcels: ", data.message);
      }
    } catch (error) {
      console.error("Error fetching processing parcels: ", error);
    }
  };

  // fetch parcels when the service point id is available
  useEffect(() => {
    if (service_point_id) {
      console.log("Service point ID: ", service_point_id);
      fetchParcels();
    }
  }, [service_point_id]);

  // handle checkbox selection of table
  const handleSelect = (parcelIds) => {
    if (typeof parcelIds === "string" && parcelIds === "all") {
      if (selectedParcels.size === parcels.length) {
        setSelectedParcels(new Set([]));
      } else {
        setSelectedParcels(new Set(parcels.map((parcel) => String(parcel.id))));
      }
    } else {
      setSelectedParcels(new Set(parcelIds));
    }
  };

  const handleSelectedView = (parcelId) => {
    setSelectedViewParcel(parcelId);
    onViewOpen();
  };

  const updateParcels = async (e) => {
    e.preventDefault();
    if (selectedParcels.size === 0) return;
    let parcelArray = Array.from(selectedParcels);
    try {
      const res = await fetch(`/api/service_staff/waiting_parcel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parcel_ids: parcelArray, status: "Đã trả hàng" }),
      });
      const data = await res.json();
      if (data.ok) {
        console.log("Deliver parcels successfully: ", data.parcels);
        alert("Đã xác nhân trả hàng thành công!");
        fetchParcels();
        resetForm();
      } else {
        console.error("Error delivering parcels: ", data.message);
        alert("An error occurred while delivering parcels! See console for more details.");
      }
    } catch (error) {
      console.error("Error delivering parcels: ", error);
      alert("An error occurred while delivering parcels! See console for more details.");
    }
  };

  const cancelParcels = async (e) => {
    e.preventDefault();
    if (selectedParcels.size === 0) return;
    let parcelArray = Array.from(selectedParcels);
    try {
      const res = await fetch(`/api/service_staff/cancel_parcel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parcel_ids: parcelArray, status: "Đã huỷ" }),
      });
      const data = await res.json();
      if (data.ok) {
        console.log("Cancel parcels successfully: ", data.parcels);
        alert("Đã huỷ đơn hàng thành công!");
        fetchParcels();
        resetForm(); 
      } else {
        console.error("Error canceling parcels: ", data.message);
        alert("An error occurred while canceling parcels! See console for more details.");
      }
    } catch (error) {
      console.error("Error canceling parcels: ", error);
      alert("An error occurred while canceling parcels! See console for more details.");
    }
  };

  // Components
  /**
   * Table component for displaying parcel data
   * The table will have the following columns:
   * - Mã đơn hàng (id)
   * - Tên hàng (name)
   * - Người gửi (sender)
   * - Người nhận (receiver)
   * - Nơi nhận 
   * - Trạng thái
   * - Thao tác
   * dữ liệu đơn hàng lấy từ biến 'parcels'
   */
  const parcelTable = (
    <Table 
      isCompact
      aria-label="Danh sách đơn hàng chờ vận chuyển"
      radius='sm'
      selectionMode={selectionMode}
      selectedKeys={selectedParcels}
      onSelectionChange={handleSelect}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            variant="light"
            initialPage={1}
            page={page}
            total={totalPage ? totalPage : 1}
            onChange={(page) => setPage(page)}/>
        </div>
      }>
      <TableHeader>
        <TableColumn>Mã đơn hàng</TableColumn>
        <TableColumn>Tên hàng</TableColumn>
        <TableColumn>Người gửi</TableColumn>
        <TableColumn>Người nhận</TableColumn>
        <TableColumn>Nơi nhận</TableColumn>
        <TableColumn>Trạng thái</TableColumn>
        <TableColumn>Thao tác</TableColumn>
      </TableHeader>
      <TableBody items={parcelsPart}>
        {(parcel) => (
          <TableRow key={parcel.id}>
            <TableCell>{"ĐH" + parcel.id}</TableCell>
            <TableCell>{parcel.name}</TableCell>
            <TableCell>{parcel.sender_name}</TableCell>
            <TableCell>{parcel.receiver_name}</TableCell>
            <TableCell>{parcel.des_service_point_name}</TableCell>
            <TableCell>{parcel.status}</TableCell>
            <TableCell>
              <div className="flex">
                <Tooltip content="Xem" placement="top" color='primary'>
                  <Button 
                    isIconOnly
                    onPress={() => handleSelectedView(parcel.id)}
                    size="sm" 
                    color="primary"
                    variant="light" 
                    className="h-8 w-8 p-0 text-gray-400"
                    startContent={
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
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

  const cancelModal = (
    <Modal 
      size='xl' 
      isOpen={isCancelModalOpen} 
      onOpenChange={onCancelClose} 
      scrollBehavior='outside'
      placement='center'>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={cancelParcels}>
            <ModalHeader className="flex justify-center">
              <h2 className="text-lg font-semibold">Huỷ đơn hàng</h2>
            </ModalHeader>
            <ModalBody>
              {selectedParcels.size > 0 ? (
                <div>
                  <p className='font-semibold mb-4'>Xác nhận huỷ các đơn hàng sau?</p>
                  <Table 
                    isCompact
                    aria-label='List of select parcels'>
                    <TableHeader>
                      <TableColumn>Mã đơn hàng</TableColumn>
                      <TableColumn>Tên hàng</TableColumn>
                      <TableColumn>ĐTK phụ trách</TableColumn>
                      <TableColumn>Địa chỉ ĐTK phụ trách</TableColumn>
                    </TableHeader>
                    <TableBody items={parcels.filter((parcel) => selectedParcels.has(String(parcel.id)))}>
                      {(parcel) => (
                        <TableRow key={parcel.id}>
                          <TableCell>{"ĐH" + parcel.id}</TableCell>
                          <TableCell>{parcel.name}</TableCell>
                          <TableCell>{parcel.src_collection_point_name}</TableCell>
                          <TableCell>{parcel.src_collection_point_address}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-sm text-gray-600">Vui lòng chọn ít nhất một đơn hàng để huỷ</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant='light' onPress={onClose}>Huỷ</Button>
              <Button color="primary" type='submit' onPress={onClose}>Xác nhận</Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );

  const confirmModal = (
    <Modal 
      size='lg' 
      isOpen={isConfirmModalOpen} 
      onOpenChange={onConfirmClose} 
      scrollBehavior='outside'
      placement='center'>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={updateParcels}>
            <ModalHeader className="flex justify-center">
              <h2 className="text-lg font-semibold">Thông tin đơn hàng xác nhận</h2>
            </ModalHeader>
            <ModalBody>
              {selectedParcels.size > 0 ? (
                <div>
                  <p className='font-semibold mb-4'>Xác nhận các đơn hàng sau đã tới điểm tập kết?</p>
                  <Table 
                    isCompact
                    aria-label='List of select parcels'>
                    <TableHeader>
                      <TableColumn>Mã đơn hàng</TableColumn>
                      <TableColumn>Tên hàng</TableColumn>
                      <TableColumn>ĐTK phụ trách</TableColumn>
                      <TableColumn>Địa chỉ ĐTK phụ trách</TableColumn>
                    </TableHeader>
                    <TableBody items={parcels.filter((parcel) => selectedParcels.has(String(parcel.id)))}>
                      {(parcel) => (
                        <TableRow key={parcel.id}>
                          <TableCell>{"ĐH" + parcel.id}</TableCell>
                          <TableCell>{parcel.name}</TableCell>
                          <TableCell>{parcel.src_collection_point_name}</TableCell>
                          <TableCell>{parcel.src_collection_point_address}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-sm text-gray-600">Vui lòng chọn ít nhất một đơn hàng để xác nhận</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant='light' onPress={onClose}>Huỷ</Button>
              <Button color="primary" type='submit' onPress={onClose}>Xác nhận</Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );

  const viewModal = (
    <Modal
      size='md'
      isOpen={isViewModalOpen}
      onOpenChange={onViewClose}
      scrollBehavior='outside'
      placement='center'>
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex justify-center">
              <h2 className="text-lg font-semibold">Chi tiết đơn hàng</h2>
            </ModalHeader>
            <ModalBody>
              {selectedViewParcel ? (
                <div>
                  <ul>
                    <li><span className='font-semibold'>Mã đơn hàng:</span> {"ĐH" + selectedViewParcel}</li>
                    <li><span className='font-semibold'>Tên hàng:</span> {parcels.find((parcel) => parcel.id === selectedViewParcel).name}</li>
                    <li><span className='font-semibold'>Người gửi:</span> {parcels.find((parcel) => parcel.id === selectedViewParcel).sender_name}</li>
                    <li><span className='font-semibold'>Số điện thoại người gửi:</span> {parcels.find((parcel) => parcel.id === selectedViewParcel).sender_phone}</li>
                    <li><span className='font-semibold'>Nơi gửi hàng:</span> {parcels.find((parcel) => parcel.id === selectedViewParcel).sender_city + ", " + parcels.find((parcel) => parcel.id === selectedViewParcel).src_service_point_address}</li>
                    <li><span className='font-semibold'>Người nhận:</span> {parcels.find((parcel) => parcel.id === selectedViewParcel).receiver_name}</li>
                    <li><span className='font-semibold'>Số điện thoại người nhận:</span> {parcels.find((parcel) => parcel.id === selectedViewParcel).receiver_phone}</li>
                    <li><span className='font-semibold'>Nơi nhận hàng:</span> {parcels.find((parcel) => parcel.id === selectedViewParcel).receiver_city + ", " + parcels.find((parcel) => parcel.id === selectedViewParcel).des_service_point_address}</li>
                    <li><span className='font-semibold'>Trạng thái:</span> {parcels.find((parcel) => parcel.id === selectedViewParcel).status}</li>
                    <li><span className='font-semibold'>Ghi chú:</span> {parcels.find((parcel) => parcel.id === selectedViewParcel).notes}</li>
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-gray-600">Không có thông tin đơn hàng</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant='light' onPress={
                () => {
                  onClose();
                  setSelectedViewParcel(null);
                }
              }>Đóng</Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );

  const resetForm = () => {
    setSelectedParcels(new Set([]));
    setSelectedViewParcel(null);
  };

  return (
    <div className="w-full p-4 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4 mx-2">
        <h1 className="text-xl font-bold text-black">Bưu gửi chờ trả</h1>
        <div className='flex justify-end'>
          <Button
            className='mr-1'
            color="danger"
            variant='light'
            onPress={onCancelOpen}
            startContent={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            }>
            Huỷ
          </Button>
          <Button
            color='primary'
            onPress={onConfirmOpen}
            startContent={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
              </svg>
            }>
            Xác nhận trả hàng
          </Button>
        </div>
      </div>
      <div>
        {cancelModal}
        {confirmModal}
        {viewModal}
        {parcelTable}
      </div>
    </div>
  );
}

export default WaitingParcels;