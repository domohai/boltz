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
  // this function will take the local parcelInfo and send it to the back-end to add a new parcel
  const addParcel = async (_parcelInfo) => {
    try {
      const res = await fetch('/api/service_staff/create_parcel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(_parcelInfo),
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

  // Check if person exists, if not add person
  const checkAndAddPerson = async (person, updatePerson) => {
    const existingPerson = await getPersonByPhoneNumber(person.phone_number);
    let personId;
  
    if (!existingPerson) {
      const newPerson = await addPerson(person.name, person.phone_number, person.city, person.district);
      personId = newPerson.id;
      updatePerson({ id: personId });
    } else {
      personId = existingPerson[0].id;
      updatePerson({ id: personId });
    }
    return personId;
  };  

  const createParcel = async (e) => {
    e.preventDefault();
    try {
      // Check and add sender and receiver
      const senderId = await checkAndAddPerson(sender, updateSender);
      const receiverId = await checkAndAddPerson(receiver, updateReceiver);
      // Update parcelInfo with sender_id and receiver_id
      updateParcelInfo({ sender_id: senderId, receiver_id: receiverId });
      // due to the async nature of updateParcelInfo, we need to wait for it to finish before accessing parcelInfo
      // we solve this problem by creating a local copy of parcelInfo with updated sender_id and receiver_id
      const updatedParcelInfo = { ...parcelInfo, sender_id: senderId, receiver_id: receiverId };
      // console.log(updatedParcelInfo);
      const parcel = await addParcel(updatedParcelInfo);
      console.log(parcelInfo);
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