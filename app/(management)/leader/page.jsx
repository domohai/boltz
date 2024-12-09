"use client";
import { useState, useMemo, useEffect } from 'react';
import { DateRangePicker } from "@nextui-org/date-picker";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell } from "@nextui-org/table";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button } from "@nextui-org/button";
import DateUtil from "@utils/DateUtil.js";
import DataUtil from '@utils/DataUtil.js';

const LeaderPage = () => {
  const [rangeType, setRangeType] = useState("predefine");
  const [predefineRange, setPredefineRange] = useState(new Set(["7 ngày trước"]));
  const [parcels, setParcels] = useState([]);
  const totalCost = useMemo(() => parcels.reduce((acc, parcel) => acc + parcel.cost, 0), [parcels]);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#F72C5B'];
  // Get the current date in the format YYYY-MM-DD
  const currentDate = DateUtil.toCalendarDate(new Date());
  const [dateRange, setDateRange] = useState({
    start: currentDate.add({days: -6}),
    end: currentDate,
  });

  const parcelsData = useMemo(() => {
    let data = [];
    if (rangeType === "predefine") {
      if (Array.from(predefineRange)[0] === "7 ngày trước") {
        data = DataUtil.createDayIntervalData(parcels, 7, currentDate);
      } else if (Array.from(predefineRange)[0] === "1 tháng trước") {
        data = DataUtil.createDayIntervalData(parcels, 30, currentDate);
      } else if (Array.from(predefineRange)[0] === "3 tháng trước") {
        data = DataUtil.createWeekIntervalData(parcels, 3, currentDate);
      } else if (Array.from(predefineRange)[0] === "6 tháng trước") {
        data = DataUtil.createMonthIntervalData(parcels, 0.5, currentDate);
      } else if (Array.from(predefineRange)[0] === "1 năm trước") {
        data = DataUtil.createMonthIntervalData(parcels, 1, currentDate);
      }
    } else {
      const interval = DateUtil.differenceInDays(dateRange.start, dateRange.end);
      data = DataUtil.createDayIntervalData(parcels, interval, dateRange.end);
    }
    return data.map((item, index) => ({
      date: item.date.toString(),
      "Số lượng đơn hàng": item.parcels,
      "Tổng tiền cước": item.cost,
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [parcels]);

  const pieData = useMemo(() => {
    const statusCount = parcels.reduce((acc, parcel) => {
      acc[parcel.status] = (acc[parcel.status] || 0) + 1;
      return acc;
    }, {});
    const statusCost = parcels.reduce((acc, parcel) => {
      acc[parcel.status] = (acc[parcel.status] || 0) + parcel.cost;
      return acc;
    }, {});
    return Object.keys(statusCount).map((status, index) => ({
      name: status,
      count: statusCount[status],
      cost: statusCost[status],
    }));
  }, [parcels]);


  const fetchParcels = async (start_date, end_date) => {
    try {
      const res = await fetch(`/api/leader?start_date=${start_date}&end_date=${end_date}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.ok) {
        setParcels(DataUtil.reformatDateForParcels(data.parcels));
        console.log("Parcels data fetched successfully: ", data.parcels);
      } else {
        console.error("Failed to fetch parcels: ", data.message);
        alert("An error occurred while fetching parcels data, See console for more details.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching parcels data, See console for more details.");
    }
  };

  useEffect(() => {
    fetchParcels(DateUtil.calendarDateToTimestamp(dateRange.start), DateUtil.calendarDateToTimestamp(dateRange.end));
  }, [dateRange]);


  const handleRangeTypeChange = (newSelection) => {
    setRangeType(newSelection);
    if (newSelection === "predefine") {
      handlePredefineRangeChange(predefineRange);
    } else {
      setDateRange({
        start: currentDate,
        end: currentDate,
      });
    }
  };

  const handlePredefineRangeChange = (newSelection) => {
    setPredefineRange(newSelection);
    let startDate, endDate = currentDate;
    let selectedRange = Array.from(newSelection);
    switch (selectedRange[0]) {
      case "7 ngày trước":
        startDate = currentDate.add({days: -6});
        break;
      case "1 tháng trước":
        startDate = currentDate.add({months: -1});
        break;
      case "3 tháng trước":
        startDate = currentDate.add({months: -3});
        break;
      case "6 tháng trước":
        startDate = currentDate.add({months: -6});
        break;
      case "1 năm trước":
        startDate = currentDate.add({years: -1});
        break;
      default:
        startDate = currentDate;
        break;
    }
    setDateRange({
      start: startDate,
      end: endDate,
    });
  }

  const cards = (
    <div className='flex gap-4'>
      <Card className="max-w-62">
        <CardHeader className="text-xl pt-4">
          Số lượng đơn hàng
        </CardHeader>
        <CardBody className="pt-0 pb-4 text-2xl font-bold text-blue-500">
          <span>{parcels.length}</span>
        </CardBody>
      </Card>
      <Card className="max-w-62">
        <CardHeader className="text-xl pt-4">
          Tổng tiền cước
        </CardHeader>
        <CardBody className="flex-row pt-0 pb-4 text-2xl font-bold text-yellow-400">
          <span>{totalCost.toLocaleString('vi-VN')}</span>
          <span className='text-lg ml-2'>₫</span>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-start items-center mb-2">
        <h1 className="text-2xl font-bold">Thống kê</h1>
      </div>
      <div className='my-3'>
        <RadioGroup 
          label="Chọn khoảng thời gian:"
          value={rangeType}
          onValueChange={handleRangeTypeChange}
          orientation='vertical'
          defaultValue='predefine'>
          {/* Using Predefine Range */}
          <Radio value="predefine" className='font-semibold'>
            Chọn khoảng:
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className='pr-1 ml-2'
                  variant='bordered'
                  isDisabled={rangeType !== "predefine"}
                  endContent={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                  }>
                  {predefineRange.size === 0 ? "Chọn khoảng thời gian" : Array.from(predefineRange).join(", ")}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label='choose predefine date range'
                selectionMode='single'
                color='primary'
                selectedKeys={predefineRange}
                onSelectionChange={handlePredefineRangeChange}
                disallowEmptySelection>
                <DropdownItem key="7 ngày trước">7 ngày trước</DropdownItem>
                <DropdownItem key="1 tháng trước">1 tháng trước</DropdownItem>
                <DropdownItem key="3 tháng trước">3 tháng trước</DropdownItem>
                <DropdownItem key="6 tháng trước">6 tháng trước</DropdownItem>
                <DropdownItem key="1 năm trước">1 năm trước</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Radio>
          <Radio value="custom">
            <DateRangePicker 
              isDisabled={rangeType !== 'custom'}
              className='max-w-[550px] font-semibold'
              variant='faded'
              calendarWidth={320}
              label='Tuỳ chọn:'
              labelPlacement='outside-left'
              aria-label='Date range to display stats'
              visibleMonths={2}
              pageBehavior='single'
              value={dateRange}
              onChange={setDateRange}
            />
          </Radio>
        </RadioGroup>
      </div>
      {cards}
      <div className='grid grid-cols-2 mt-4 gap-2'>
        <div className='bg-blue-200 p-4 pl-0 rounded-lg shadow-lg'>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={500}
              height={300}
              data={parcelsData}
              margin={{ top: 15, right: 10, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Số lượng đơn hàng" stroke="#8884d8" activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className='text-center font-semibold mt-1'>
            {"Biểu đồ số lượng đơn hàng" + (rangeType === "predefine" ? (Array.from(predefineRange)[0] === "7 ngày trước" ? " theo ngày" : (Array.from(predefineRange)[0] === "1 tháng trước" || Array.from(predefineRange)[0] === "3 tháng trước" ? " theo tuần" : " theo tháng")) : " theo ngày")}
          </p>
        </div>
        <div className='bg-blue-200 p-4 rounded-lg shadow-lg'>
          <ResponsiveContainer width="100%" height={400} className="">
            <LineChart
              width={500}
              height={300}
              data={parcelsData}
              margin={{ top: 15, right: 5, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Tổng tiền cước" stroke="#8884d8" activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className='text-center font-semibold mt-1'>
            {"Biểu đồ số tiền cước" + (rangeType === "predefine" ? (Array.from(predefineRange)[0] === "7 ngày trước" ? " theo ngày" : (Array.from(predefineRange)[0] === "1 tháng trước" || Array.from(predefineRange)[0] === "3 tháng trước" ? " theo tuần" : " theo tháng")) : " theo ngày")}
          </p>
        </div>
        <div className='col-span-2 bg-blue-200 p-4 rounded-lg shadow-lg'>
          <div className='flex p-2'>
            <ResponsiveContainer width="100%" height={400} >
              <PieChart>
                <Pie 
                  dataKey="count" 
                  data={pieData} 
                  cx="50%" cy="50%" 
                  outerRadius={130} 
                  fill="#8884d8" 
                  label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <Table
              className='max-w-[450px]'
              removeWrapper
              aria-label='Status table'>
              <TableHeader>
                <TableColumn>Trạng thái</TableColumn>
                <TableColumn className='text-center'>Số lượng</TableColumn>
                <TableColumn className='text-right'>Tổng cước</TableColumn>
              </TableHeader>
              <TableBody>
                {pieData.map((entry, index) => (
                  <TableRow key={entry.name}>
                    <TableCell className='flex flex-row'>
                      <div 
                        className='rounded-xl border-2 w-3 h-3 mt-1 mr-1'
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      {entry.name}
                    </TableCell>
                    <TableCell className='text-center'>{entry.value}</TableCell>
                    <TableCell className='text-right'>{entry.cost.toLocaleString('vi-VN') + " ₫"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );  
}

export default LeaderPage;
