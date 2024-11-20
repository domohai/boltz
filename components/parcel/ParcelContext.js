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
    cost: 0,
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

  const resetAll = () => {
    setParcelInfo({
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
      cost: 0,
      start_time: "",
      end_time: "",
      sender_id: -1,
      receiver_id: -1,
    });

    setSender({
      id: "",
      name: "",
      phone_number: "",
      city: "",
      district: "",
    });

    setReceiver({
      id: "",
      name: "",
      phone_number: "",
      city: "",
      district: "",
    });
  }

  const getPersonByPhoneNumber = async (phone_number) => {
    try {
      const res = await fetch(`/api/service_staff/person?phone_number=${phone_number}`, {
        method: 'GET',
      });
      const data = await res.json();
      if (data.ok) {
        return data.person;
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while getting person by phone number! See console for more details.");
    }
  }

  const addPerson = async (name, phone_number, city, district) => {
    try {
      const res = await fetch('/api/service_staff/person', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, phone_number, city, district}),
      });
      const data = await res.json();
      if (data.ok) {
        return data.person;
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding person! See console for more details.");
    }
  }

  const addParcel = async () => {
    try {
      const res = await fetch('/api/service_staff/parcel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parcelInfo),
      });
      const data = await res.json();
      if (data.ok) {
        return data.parcel;
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding parcel! See console for more details.");
    }
  }

  const createParcel = async (e) => {
    e.preventDefault();
    try {
      // Check if sender and receiver exist in the database
      const _sender = await getPersonByPhoneNumber(sender.phone_number);
      const _receiver = await getPersonByPhoneNumber(receiver.phone_number);
      // If not, add them to the database
      if (!_sender) {
        const newSender = await addPerson(sender.name, sender.phone_number, sender.city, sender.district);
        updateSender({ id: newSender.id });
      } else {
        updateSender({ id: _sender[0].id });
      }
      if (!_receiver) {
        const newReceiver = await addPerson(receiver.name, receiver.phone_number, receiver.city, receiver.district);
        updateReceiver({ id: newReceiver.id });
      } else {
        updateReceiver({ id: _receiver[0].id });
      }
      console.log(sender);
      console.log(receiver);
      // Update parcel info with sender and receiver IDs
      updateParcelInfo({ sender_id: sender.id, receiver_id: receiver.id });
      // Add the parcel to the database
      const parcel = await addParcel();
      console.log(parcel);
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating parcel! See console for more details.");
    }
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
        createParcel,
        resetAll
      }}>
      {children}
    </ParcelContext.Provider>
  );
}