"use client";
import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Checkbox } from "@nextui-org/checkbox";
import confirmData from "./confirmData";

const Page = () => {
  const [data] = useState(confirmData);
  //select all
  const [selected, setSelected] = useState(new Array(data.length).fill(false));
  const handleSelectAllChange = (isSelected) => {
    setSelected(new Array(data.length).fill(isSelected));
  };
  const handleSelectChange = (index) => {
    const newSelected = [...selected];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);
  };
  const isAllSelected = selected.every((item) => item);
  //select all

  return (
    <div className="w-full p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-black">Đơn hàng chờ xác nhận</h1>
      </div>
      <div>
        <Table aria-label="Danh sách đơn hàng chờ gửi đi">
          <TableHeader>
            <TableColumn>Tên hàng</TableColumn>
            <TableColumn>Số lượng</TableColumn>
            <TableColumn>Trọng lượng</TableColumn>
            <TableColumn></TableColumn>
            <TableColumn>
              <Checkbox 
                isSelected={isAllSelected}
                onValueChange={handleSelectAllChange}
              />
            </TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.weight}</TableCell>
                <TableCell>
                  <div className="flex gap-3">
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
                <TableCell>
                  <Checkbox 
                    isSelected={selected[index]}
                    onValueChange={() => handleSelectChange(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Page;