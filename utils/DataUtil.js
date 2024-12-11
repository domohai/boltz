import DateUtil from "@utils/DateUtil.js";

class DataUtil {
  static reformatDateForParcels(parcels) {
    return parcels.map(parcel => ({
      ...parcel,
      start_time: DateUtil.timestampToCalendarDate(parcel.start_time).toString(),
      end_time: DateUtil.timestampToCalendarDate(parcel.end_time).toString(),
    }));
  }

  static createDayIntervalData(parcels, days, currentDate, isReceivedParcels = false) {
    const data = [];
    if (!isReceivedParcels) {
      for (let i = 0; i < days; i++) {
        const date = currentDate.add({days: -i});
        const parcelsOnDate = parcels.filter(parcel => {
          return parcel.start_time.toString() === date.toString();
        });
        const cost = parcelsOnDate.reduce((acc, parcel) => acc + parcel.cost, 0);
        data.push({
          date,
          parcels: parcelsOnDate.length,
          cost,
        });
      }   
    } else {
      for (let i = 0; i < days; i++) {
        const date = currentDate.add({days: -i});
        const parcelsOnDate = parcels.filter(parcel => {
          return parcel.end_time === date.toString();
        });
        const cost = parcelsOnDate.reduce((acc, parcel) => acc + parcel.cost, 0);
        data.push({
          date: date.toString(),
          parcels: parcelsOnDate.length,
          cost,
        });
      }
    }
    return data;
  }

  static createWeekIntervalData(parcels, month, currentDate, isReceivedParcels = false) {
    const data = [];
    const range = month * 4;
    for (let i = 0; i < range; i++) {
      // Calculate the current week's end and start dates
      const endDate = currentDate.add({ weeks: -i });
      const startDate = endDate.add({ weeks: -1 });
      // Push the calculated data for this week
      data.push(DataUtil.calculateDataForOneWeek(parcels, startDate, endDate, isReceivedParcels));
    }
    return data;
  }

  static calculateDataForOneWeek(parcels, startDate, endDate, isReceivedParcels = false) {
    // Convert startDate and endDate to Date objects
    const start = new Date(startDate.toString());
    const end = new Date(endDate.toString());
    let numberOfParcels = 0;
    let totalCost = 0;
    if (!isReceivedParcels) {
      for (const parcel of parcels) {
        const parcelDate = new Date(parcel.start_time); // Parse the parcel's start_time
        if (parcelDate >= start && parcelDate <= end) {
          numberOfParcels++;
          totalCost += parcel.cost;
        }
      }
    } else {
      for (const parcel of parcels) {
        const parcelDate = new Date(parcel.end_time); // Parse the parcel's end_time
        if (parcelDate > start && parcelDate <= end) {
          numberOfParcels++;
          totalCost += parcel.cost;
        }
      }
    }
    // Return the result for the week
    return {
      date: endDate.toString(), // Use the endDate as the week's representative date
      parcels: numberOfParcels,
      cost: totalCost,
    };
  }

  static createMonthIntervalData(parcels, year, currentDate, isReceivedParcels = false) { 
    const data = [];
    const range = year * 12; // Total months in the range
  
    for (let i = 0; i < range; i++) {
      // Calculate the current month's end and start dates
      const endDate = currentDate.add({ months: -i }); // End date of the current interval
      const startDate = endDate.add({ months: -1 });   // Start date of the interval
      // Push the calculated data for this month
      data.push(DataUtil.calculateDataForOneMonth(parcels, startDate, endDate, isReceivedParcels));
    }
  
    return data;
  }
  
  static calculateDataForOneMonth(parcels, startDate, endDate, isReceivedParcels = false) {
    // Convert startDate and endDate to Date objects
    const start = new Date(startDate.toString());
    const end = new Date(endDate.toString());
  
    let numberOfParcels = 0;
    let totalCost = 0;
    if (!isReceivedParcels) {
      // Iterate over the parcels array
      for (const parcel of parcels) {
        const parcelDate = new Date(parcel.start_time); // Parse the parcel's start_time
        if (parcelDate >= start && parcelDate <= end) {
          numberOfParcels++;
          totalCost += parcel.cost;
        }
      }
    } else {
      // Iterate over the parcels array
      for (const parcel of parcels) {
        const parcelDate = new Date(parcel.end_time); // Parse the parcel's end_time
        if (parcelDate > start && parcelDate <= end) {
          numberOfParcels++;
          totalCost += parcel.cost;
        }
      }
    }
    // Return the result for the month
    return {
      date: `${endDate.year}-${String(endDate.month).padStart(2, '0')}`, // Use year-month as the representative date
      parcels: numberOfParcels,
      cost: totalCost,
    };
  }
  
}

export default DataUtil;