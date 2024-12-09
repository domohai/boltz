"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { SearchIcon } from "@components/Homepage/SearchIcon";
import { useState } from "react";

const TrackingParcel = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [parcelInfo, setParcelInfo] = useState(null);
  const [error, setError] = useState("");

  const getParcelInfo = async (e) => {
    e.preventDefault();
    if (trackingCode === "") {
      setError("Vui lòng nhập mã vận đơn!");
      return;
    }
    try {
      const res = await fetch(`/api/tracking?trackingCode=${trackingCode}`, { 
        method: "GET" 
      });
      const data = await res.json();
      if (data.ok) {
        setParcelInfo(data.parcel[0]);
        setError("");
        // console.log(data.parcel[0]);
      } else {
        console.log(data);
        if (data.message) {
          setError(data.message);
        } else {
          setError("Đã có lỗi xảy ra! ", data.error_msg);
        }
      }
    } catch (error) {
      setError("Đã có lỗi xảy ra! ", error.message);
    }
  }

  const displayParcelInfo = (
    <div>
      {parcelInfo ? (
        <div className="m-2">
          <h2 className="font-bold text-xl">Thông tin vận đơn</h2>
          <ul>
            <li><span className="font-semibold">Mã vận đơn:</span> {parcelInfo.id}</li>
            <li><span className="font-semibold">Người gửi:</span> {parcelInfo.sender_name}</li>
            <li><span className="font-semibold">Nơi gửi:</span> {parcelInfo.src_service_point_address}</li>
            <li><span className="font-semibold">Người nhận:</span> {parcelInfo.receiver_name}</li>
            <li><span className="font-semibold">Nơi nhận:</span> {parcelInfo.dest_service_point_address}</li>
            <li><span className="font-semibold">Ngày tạo:</span> {parcelInfo.start_time}</li>
            <li><span className="font-semibold">Trạng thái:</span> {parcelInfo.status}</li>
          </ul>
        </div>
        ) : null}
    </div>
  );

  const resetInfo = () => {
    setParcelInfo(null);
    setError("");
  }

  return (
    <Card>
      <CardBody>
        <form onSubmit={getParcelInfo} className="flex w-full flex-wrap md:flex-nowrap gap-4 items-center justify-center">
          <Input 
            className="w-full" 
            type="text" 
            placeholder="Tra cứu bưu gửi" 
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            startContent={<SearchIcon />}/>
          <Button 
            type="submit"
            className="px-5 py-2 rounded-full">
            Tra cứu
          </Button>
        </form>
        {parcelInfo ? displayParcelInfo : (
          error !== "" && <p className="text-red-500">{error}</p>
        )}
      </CardBody>
    </Card>
  )
}

export default TrackingParcel;