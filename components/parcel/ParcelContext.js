import { createContext, useState, useContext } from "react";

export const ParcelContext = createContext();

export const useParcel = () => {
  return useContext(ParcelContext);
}

export const ParcelProvider = ({ children }) => {
  const [parcelInfo, setParcelInfo] = useState({
    id: "",
    name: "",
    weight: 0,
    value: 0,
    type: "package",
    notes: "",
    src_service_p: "",
    src_collection_p: "",
    des_collection_p: "",
    des_service_p: "",
    curr_point: "src_service_p",
    moving_to: "",
    status: "Chờ xử lý",
    cost: 0.0,
    start_time: "",
    end_time: "",
    sender_id: -1,
    receiver_id: -1,
  });

  const [sender, setSender] = useState({
    id: "",
    name: "",
    phone_number: "",
    city: "",
    district: "",
  });

  const [receiver, setReceiver] = useState({
    id: "",
    name: "",
    phone_number: "",
    city: "",
    district: "",
  });

  const updateParcelInfo = (newInfo) => {
    setParcelInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
  };

  const updateSender = (newSender) => {
    setSender((prevSender) => ({ ...prevSender, ...newSender }));
  }

  const updateReceiver = (newReceiver) => {
    setReceiver((prevReceiver) => ({ ...prevReceiver, ...newReceiver }));
  }

  const createParcel = () => {
    console.log("Sender: ", sender);
    console.log("Receiver: ", receiver);
    console.log("Parcel: ", parcelInfo);
  }

  return (
    <ParcelContext.Provider 
      value={{ 
        parcelInfo, 
        updateParcelInfo, 
        sender, 
        receiver,
        updateSender,
        updateReceiver,
        createParcel
      }}>
      {children}
    </ParcelContext.Provider>
  );
}