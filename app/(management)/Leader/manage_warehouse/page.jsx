"use client";

import React, { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { DateInput } from "@nextui-org/date-input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";

const gatheringPointAccounts = [
  { key: 'GTP001', place_name: 'Tên A', address: '123 Đường ABC', name: 'Trưởng A' },
  { key: 'GTP002', place_name: 'Tên B', address: '456 Đường DEF', name: 'Trưởng B' },
  { key: 'GTP003', place_name: 'Tên C', address: '789 Đường GHI', name: 'Trưởng C' },
  { key: 'GTP004', place_name: 'Tên D', address: '321 Đường JKL', name: 'Trưởng D' },
  { key: 'GTP005', place_name: 'Tên E', address: '654 Đường MNO', name: 'Trưởng E' }
];

const transactionPointAccounts = [
  { key: 'TP001', place_name: 'Tên F', address: '159 Đường PQR', name: 'Trưởng F', region : 'TB', gather_place: 'HN' },
  { key: 'TP002', place_name: 'Tên G', address: '753 Đường STU', name: 'Trưởng G' , region : 'TB', gather_place: 'HN' },
  { key: 'TP003', place_name: 'Tên H', address: '357 Đường VWX', name: 'Trưởng H' , region : 'TB', gather_place: 'HN' },
  { key: 'TP004', place_name: 'Tên I', address: '951 Đường YZ', name: 'Trưởng I' , region : 'TB', gather_place: 'HN' },
  { key: 'TP005', place_name: 'Tên J', address: '753 Đường ABC', name: 'Trưởng J', region : 'TB', gather_place: 'HN'  }
];

const WarehouseManagement = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [currentAccounts, setCurrentAccounts] = useState(gatheringPointAccounts);
  const [selectedRole, setSelectedRole] = useState('ma_diem_tap_ket');

  const handleRoleChange = (role) => {
    if (role === 'ma_diem_tap_ket') {
      setCurrentAccounts(gatheringPointAccounts);
    } else if (role === 'place_name') {
      setCurrentAccounts(transactionPointAccounts);
    }
    setSelectedRole(role);
  };

  return (
    <div className="w-full p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-black">Quản lý kho bãi</h1>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onPress={onOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
          Thêm
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center">
                <h2 className="text-lg font-bold">
                  {selectedRole === 'ma_diem_tap_ket'
                    ? 'Thêm tài khoản trưởng điểm tập kết'
                    : 'Thêm tài khoản trưởng điểm giao dịch'}
                </h2>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <label>
                    Họ và tên:
                    <Input autoFocus variant="bordered" />
                  </label>

                  <label>
                    Giới tính:
                    <RadioGroup orientation="horizontal">
                      <Radio value="male">Nam</Radio>
                      <Radio value="female">Nữ</Radio>
                    </RadioGroup>
                  </label>

                  <label>
                    Ngày sinh:
                    <DateInput />
                  </label>

                  <label>
                    Số điện thoại:
                    <Input variant="bordered" />
                  </label>

                  <label>
                    {selectedRole === 'ma_diem_tap_ket'
                      ? 'Điểm tập kết:'
                      : 'Địa chỉ:'}
                    <Input variant="bordered" />
                  </label>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose} className="w-full">
                  Thêm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => handleRoleChange('ma_diem_tap_ket')}
          className={`px-5 py-2 rounded-full ${selectedRole === 'ma_diem_tap_ket' ? 'bg-gray-400' : 'bg-gray-300'} hover:bg-gray-350`}
        >
          Điểm tập kết
        </Button>
        <Button
          onClick={() => handleRoleChange('place_name')}
          className={`px-5 py-2 rounded-full ${selectedRole === 'place_name' ? 'bg-gray-400' : 'bg-gray-300'} hover:bg-gray-350`}
        >
          Điểm giao dịch
        </Button>
      </div>

      {/* Bảng tài khoản */}
      <div className="rounded-md border border-gray-700 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-black font-medium">Mã điểm tập kết</th>
              <th className="text-left py-3 px-4 text-black font-medium">Tên</th>
              <th className="text-left py-3 px-4 text-black font-medium">Địa chỉ</th>
              <th className="text-left py-3 px-4 text-black font-medium">Trưởng điểm tập kết</th>
              <th className="text-left py-3 px-4 text-black font-medium"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentAccounts.map((account) => (
              <tr key={account.key} className="border-b border-gray-700">
                <td className="py-4 px-4">{account.key}</td>
                <td className="py-4 px-4">{account.place_name}</td>
                <td className="py-4 px-4">{account.address}</td>
                <td className="py-4 px-4">{account.name}</td>
                <td className="py-4 px-4">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseManagement;