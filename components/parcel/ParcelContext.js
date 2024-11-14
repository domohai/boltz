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
    type: "docs",
    notes: "",
    src_service_p: "",
    src_collection_p: "",
    des_collection_p: "",
    des_service_p: "",
    curr_point: "",
    moving_to: "",
    status: "",
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

  return (
    <ParcelContext.Provider 
      value={{ 
        parcelInfo, 
        updateParcelInfo, 
        sender, 
        receiver,
        updateSender,
        updateReceiver
      }}>
      {children}
    </ParcelContext.Provider>
  );
}