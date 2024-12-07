"use client";
import { useState, useMemo, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { DateRangePicker } from "@nextui-org/date-picker";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button } from "@nextui-org/button";
import DateUtil from "@utils/DateUtil.js";
import DataUtil from '@utils/DataUtil.js';

const ServicePointStats = () => {
  const { data: session, status: sessionStatus } = useSession();
  const service_point_id = useMemo(() => session?.user.service_point_id, [session, sessionStatus]);
  const [rangeType, setRangeType] = useState("predefine");
  const [predefineRange, setPredefineRange] = useState(new Set(["7 ngày trước"]));
  const [parcels, setParcels] = useState([]);
  const sentParcels = useMemo(() => parcels.filter(parcel => parcel.src_service_p === service_point_id), [parcels, service_point_id]);
  const receivedParcels = useMemo(() => parcels.filter(parcel => parcel.des_service_p === service_point_id), [parcels, service_point_id]);
  const totalCost = useMemo(() => sentParcels.reduce((acc, parcel) => acc + parcel.cost, 0), [sentParcels]);
  // Get the current date in the format YYYY-MM-DD
  const currentDate = DateUtil.toCalendarDate(new Date());
  const [dateRange, setDateRange] = useState({
    start: currentDate.add({days: -6}),
    end: currentDate,
  });
  // Data for the line chart
  const data = useMemo(() => {
    let sentData = [];
    let receivedData = [];
    if (rangeType === "predefine") {
      if (Array.from(predefineRange)[0] === "7 ngày trước") {
        sentData = DataUtil.createDayIntervalData(sentParcels, 7, currentDate);
        receivedData = DataUtil.createDayIntervalData(receivedParcels, 7, currentDate, true);
      } else if (Array.from(predefineRange)[0] === "1 tháng trước") {
        sentData = DataUtil.createWeekIntervalData(sentParcels, 1, currentDate);
        receivedData = DataUtil.createWeekIntervalData(receivedParcels, 1, currentDate, true);
      } else if (Array.from(predefineRange)[0] === "3 tháng trước") {
        sentData = DataUtil.createWeekIntervalData(sentParcels, 3, currentDate);
        receivedData = DataUtil.createWeekIntervalData(receivedParcels, 3, currentDate, true);
      } else if (Array.from(predefineRange)[0] === "6 tháng trước") {
        sentData = DataUtil.createMonthIntervalData(sentParcels, 0.5, currentDate);
        receivedData = DataUtil.createMonthIntervalData(receivedParcels, 0.5, currentDate, true);
      } else if (Array.from(predefineRange)[0] === "1 năm trước") {
        sentData = DataUtil.createMonthIntervalData(sentParcels, 1, currentDate);
        receivedData = DataUtil.createMonthIntervalData(receivedParcels, 1, currentDate, true);
      }
    } else {
      const interval = DateUtil.differenceInDays(dateRange.start, dateRange.end);
      sentData = DataUtil.createDayIntervalData(sentParcels, interval, currentDate);
      receivedData = DataUtil.createDayIntervalData(receivedParcels, interval, currentDate, true);
    }
    // return merge sent and received data
    // console.log(sentData, receivedData);
    // console.log(receivedParcels);
    return sentData.map((sent, index) => ({
      date: sent.date.toString(),
      "Đơn hàng đi": sent.parcels,
      "Số tiền cước": sent.cost,
      "Đơn hàng nhận": receivedData[index].parcels,
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [parcels]);

  const fetchParcels = async (start_date, end_date) => {
    try {
      const res = await fetch(`/api/service_manager/stats?service_point_id=${service_point_id}&start_date=${start_date}&end_date=${end_date}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.ok) {
        setParcels(DataUtil.reformatDateForParcels(data.parcels));
      } else {
        console.error("Failed to fetch parcels: ", data.message);
        alert("An error occurred while fetching parcels. See console for more details.");
      }
    } catch (error) {
      console.error("Error fetching parcels: ", error);
      alert("An error occurred while fetching parcels. See console for more details.");
    }
  }

  useEffect(() => {
    if (service_point_id) {
      fetchParcels(DateUtil.calendarDateToTimestamp(dateRange.start), DateUtil.calendarDateToTimestamp(dateRange.end, true));
    }
  }, [dateRange, service_point_id]);

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
  }

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
          Số lượng đơn hàng đi
        </CardHeader>
        <CardBody className="pt-0 pb-4 text-2xl font-bold text-blue-500">
          {sentParcels.length}
        </CardBody>
      </Card>
      <Card className="max-w-62">
        <CardHeader className="text-xl pt-4">
          Số lượng đơn hàng đến
        </CardHeader>
        <CardBody className="pt-0 pb-4 text-2xl font-bold text-blue-500">
          {receivedParcels.length}
        </CardBody>
      </Card>
      <Card className="max-w-62">
        <CardHeader className="text-xl pt-4">
          Tổng tiền cước
        </CardHeader>
        <CardBody className="flex-row pt-0 pb-4 text-2xl font-bold text-yellow-400">
          <span>{totalCost}</span>
          <span className='text-lg ml-2'>₫</span>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <div className="w-full p-6 bg-white min-h-screen">
      <div className="flex justify-start items-center mb-2">
        <h1 className="text-2xl font-bold mr-4">Thống kê</h1>
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
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Đơn hàng đi" stroke="#8884d8" activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="Đơn hàng nhận" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <p className='text-center font-semibold mt-1'>
            {"Biểu đồ số lượng đơn hàng" + (rangeType === "predefine" ? (Array.from(predefineRange)[0] === "7 ngày trước" ? " theo ngày" : (Array.from(predefineRange)[0] === "1 tháng trước" || Array.from(predefineRange)[0] === "3 tháng trước" ? " theo tuần" : " theo tháng")) : " theo ngày")}
          </p>
        </div>
        <div className='bg-blue-200 p-4 rounded-lg shadow-lg'>
          <ResponsiveContainer width="100%" height={400} className="p-2">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Số tiền cước" stroke="#8884d8" activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className='text-center font-semibold mt-1'>
            {"Biểu đồ số tiền cước" + (rangeType === "predefine" ? (Array.from(predefineRange)[0] === "7 ngày trước" ? " theo ngày" : (Array.from(predefineRange)[0] === "1 tháng trước" || Array.from(predefineRange)[0] === "3 tháng trước" ? " theo tuần" : " theo tháng")) : " theo ngày")}
          </p>
        </div>
        <div className='col-span-2 bg-blue-200 p-4 rounded-lg shadow-lg'>

        </div>
      </div>
    </div>
  )
}

export default ServicePointStats;