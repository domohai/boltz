import { NextResponse } from "next/server";
import { 
  addParcel, 
  getParcelsByServicePoint, 
  cancelParcels,
  transferToSrcCollectionPoint,
  getParcelsByCollectionPoint,
  confirmParcelsForSrcCollectionPoint,
  confirmParcelForDesCollectionPoint,
  getTransferParcelsByCollectionPoint,
  transferToDesCollectionPoint,
  transferToDesServicePoint,
  getConfirmParcelsByServicePoint,
  confirmParcelForDesServicePoint,
  getWaitingParcelsByServicePoint,
  confirmDeliveredParcels,
  getMonthlyParcelStatsByCP,
  getParcelByTrackingCode,
  getParcelsByRange,
  getParcelsForLeader,
  getParcelsForCollectionManager
} from "@back-end/models/parcel.js";

export async function handleAddParcel(_parcelInfo) {
  try {
    const parcel = await addParcel(_parcelInfo);
    if (!parcel) {
      return NextResponse.json({ message: "Failed to add parcel!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ parcel, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetParcelsByRange(service_point_id, start_date, end_date) {
  try {
    const parcels = await getParcelsByRange(service_point_id, start_date, end_date);
    if (!parcels) {
      return NextResponse.json({ message: "Failed to get parcels!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ parcels, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetParcelsForLeader(start_date, end_date) {
  try {
    const parcels = await getParcelsForLeader(start_date, end_date);
    if (!parcels) {
      return NextResponse.json({ message: "Failed to get parcels!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ parcels, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetParcelByTrackingCode(trackingCode) {
  try {
    const parcel = await getParcelByTrackingCode(trackingCode);
    if (parcel.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy đơn hàng!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ parcel, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error_msg: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetParcelsByServicePoint(service_point_id) {
  try {
    const parcels = await getParcelsByServicePoint(service_point_id);
    if (!parcels) {
      return NextResponse.json({ message: "Failed to get parcels!", ok: false }, { status: 400 });
    }
    // console.log(parcels);
    return NextResponse.json({ parcels, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetParcelsByCollectionPoint(collection_point_id) {
  try {
    const parcels = await getParcelsByCollectionPoint(collection_point_id);
    if (!parcels) {
      return NextResponse.json({ message: "Failed to get parcels!", ok: false }, { status: 400 });
    }
    // console.log(parcels);
    return NextResponse.json({ parcels, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetConfirmParcelsByServicePoint(service_point_id) {
  try {
    const parcels = await getConfirmParcelsByServicePoint(service_point_id);
    if (!parcels) {
      return NextResponse.json({ message: "Failed to get parcels!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ parcels, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetWaitingParcelsByServicePoint(service_point_id) {  
  try {
    const parcels = await getWaitingParcelsByServicePoint(service_point_id);
    if (!parcels) {
      return NextResponse.json({ message: "Failed to get parcels!", ok: false }, { status: 400 });
    }
    // console.log(parcels);
    return NextResponse.json({ parcels, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleCancelParcels(parcel_ids, status) {
  try {
    const parcels = await cancelParcels(parcel_ids, status);
    if (!parcels) {
      return NextResponse.json({ message: "Failed to cancel parcels!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ parcels, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleTransferToSrcCollectionPoint(parcel_ids, status) {
  try {
    const parcels = await transferToSrcCollectionPoint(parcel_ids, status);
    if (!parcels) {
      return NextResponse.json({ message: "Failed to transfer parcels!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ parcels, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleConfirmParcels(parcelsFromSrcServicePoint, parcelsFromSrcCollectionPoint) {
  try {
    let parcelsSrcSP;
    let parcelsSrcCP;
    if (parcelsFromSrcServicePoint.length !== 0) {
      parcelsSrcSP = await confirmParcelsForSrcCollectionPoint(parcelsFromSrcServicePoint);
      console.log(parcelsSrcSP);
    }
    if (parcelsFromSrcCollectionPoint.length !== 0) {
      parcelsSrcCP = await confirmParcelForDesCollectionPoint(parcelsFromSrcCollectionPoint);
      console.log(parcelsSrcCP);
    }
    if (!parcelsSrcSP && !parcelsSrcCP) {
      return NextResponse.json({ message: "Failed to confirm parcels!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleConfirmDeliveredParcels(parcel_ids, status) {
  try {
    const parcels = await confirmDeliveredParcels(parcel_ids, status);
    if (!parcels) {
      return NextResponse.json({ message: "Failed to confirm parcels!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ parcels, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetTransferParcelsByCollectionPoint(collection_point_id) {
  try {
    const parcels = await getTransferParcelsByCollectionPoint(collection_point_id);
    if (!parcels) {
      return NextResponse.json({ message: "Failed to get parcels!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ parcels, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleTransferFromCollection(parcelsToCollectionPoint, parcelsToServicePoint) {
  try {
    let parcelsCP;
    let parcelsSP;
    if (parcelsToCollectionPoint.length !== 0) {
      parcelsCP = await transferToDesCollectionPoint(parcelsToCollectionPoint);
    }
    if (parcelsToServicePoint.length !== 0) {
      parcelsSP = await transferToDesServicePoint(parcelsToServicePoint);
    }
    if (!parcelsCP && !parcelsSP) {
      return NextResponse.json({ message: "Failed to transfer parcels!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleConfirmParcelsForDesServicePoint(parcel_ids, status) {
  try {
    const parcels = await confirmParcelForDesServicePoint(parcel_ids, status);
    if (!parcels) {
      return NextResponse.json({ message: "Failed to confirm parcels!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ parcels, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetMonthlyParcelStats(collection_point_id) {
  try {
    console.log("Controller received collection_point_id:", collection_point_id);
    if (!collection_point_id) {
      return NextResponse.json({ 
        message: "Missing collection_point_id", 
        ok: false 
      }, { status: 400 });
    }

    const stats = await getMonthlyParcelStatsByCP(collection_point_id);
    return NextResponse.json({ stats, ok: true }, { status: 200 });
  } catch (error) {
    console.error("Controller error:", error);
    return NextResponse.json({ 
      message: error.message, 
      ok: false 
    }, { status: 500 });
  }
}

export async function handleGetParcelsForCollectionManager(collection_point_id, start_date, end_date) {
  try {
    if (!collection_point_id) {
      return NextResponse.json(
        { message: "Missing collection_point_id", ok: false },
        { status: 400 }
      );
    }

    const parcels = await getParcelsForCollectionManager(collection_point_id, start_date, end_date);
    return NextResponse.json({ parcels, ok: true }, { status: 200 });
  } catch (error) {
    console.error("Controller error:", error);
    return NextResponse.json(
      { message: error.message, ok: false },
      { status: 500 }
    );
  }
}