"use client";
import { useState, useMemo, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from "@nextui-org/button";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import { Tooltip } from "@nextui-org/tooltip";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";

const ProcessingParcel = () => {
  const { data: session, status: sessionStatus } = useSession();
  const service_point_id = useMemo(() => session?.user.service_point_id, [session, sessionStatus]);
  const [parcels, setParcels] = useState([]);
  const [selectedParcels, setSelectedParcels] = useState(new Set([]));
  const {isOpen: isTransferModalOpen, onOpen: onTransferOpen, onOpenChange: onTransferClose } = useDisclosure();
  const [selectionMode, setSelectionMode] = useState("single");
  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalPage = useMemo(() => Math.ceil(parcels.length / rowsPerPage), [parcels, rowsPerPage]);
  const isMultipleSelect = true; // fix the warning of NextUI
  // Get the part of parcels for the current page
  const parcelsPart = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return parcels.slice(start, end);
  }, [parcels.length, page]);

  // fecth all the related information of parcels with conditions: 
  // src_service_p == service_point_id && curr_point == "src_service_p" && moving_to == NULL
  const fetchParcels = async () => {
    if (!service_point_id) return;
    try {
      const res = await fetch(`/api/service_staff?service_point_id=${String(service_point_id)}`, {
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

  // use effects
  useEffect(() => {
    if (service_point_id) {
      console.log("Service point ID: ", service_point_id);
      fetchParcels();
    }
  }, [service_point_id]);
  
  // set selection mode (fix the warning of NextUI)
  useEffect(() => {
    if (isMultipleSelect) {
      setSelectionMode("multiple");
    }
  }, [isMultipleSelect]);

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
                <Tooltip content="Huỷ" placement="top" color='danger'>
                  <Button 
                    isIconOnly
                    size="sm" 
                    color="danger"
                    variant="light" 
                    className="h-8 w-8 p-0 text-gray-400"
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

  const transferModal = (
    <Modal 
      size='lg' 
      isOpen={isTransferModalOpen} 
      onOpenChange={onTransferClose} 
      scrollBehavior='outside'
      placement='center'>
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex justify-center">
              <h2 className="text-lg font-semibold">Thông tin đơn hàng vận chuyển</h2>
            </ModalHeader>
            <ModalBody>
              
              {selectedParcels.size > 0 ? (
                <Table 
                  isCompact
                  aria-label='List of select parcels'>
                  <TableHeader>
                    <TableColumn>Mã đơn hàng</TableColumn>
                    <TableColumn>Tên hàng</TableColumn>
                    <TableColumn>ĐGD đích</TableColumn>
                  </TableHeader>
                  <TableBody items={parcels.filter((parcel) => selectedParcels.has(String(parcel.id)))}>
                    {(parcel) => (
                      <TableRow key={parcel.id}>
                        <TableCell>{"ĐH" + parcel.id}</TableCell>
                        <TableCell>{parcel.name}</TableCell>
                        <TableCell>{parcel.des_service_point_name}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-gray-600">Vui lòng chọn ít nhất một đơn hàng để chuyển</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant='light' onPress={onClose}>Huỷ</Button>
              <Button color="primary" onPress={() => {console.log("Transfer parcels: ", selectedParcels); onClose();}}>Chuyển hàng</Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );

  return (
    <div className="w-full p-4 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4 mx-2">
        <h1 className="text-xl font-bold text-black">Đơn hàng chờ vận chuyển</h1>
        <Button
          color='primary'
          onPress={onTransferOpen}
          startContent={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
            </svg>
          }>
          Chuyển hàng
        </Button>
      </div>
      <div>
        {transferModal}
        {parcelTable}
      </div>
    </div>
  );
}

export default ProcessingParcel;