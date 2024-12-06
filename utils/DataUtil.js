import DateUtil from "@utils/DateUtil.js";

class DataUtil {
  static reformatDateForParcels(parcels) {
    return parcels.map(parcel => ({
      ...parcel,
      start_time: DateUtil.timestampToCalendarDate(parcel.start_time),
      end_time: DateUtil.timestampToCalendarDate(parcel.end_time),
    }));
  }

  static toDayIntervalData(parcels) {
    
  }
}

export default DataUtil;