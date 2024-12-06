import { parseDate, getLocalTimeZone } from "@internationalized/date";

class DateUtil {
  static toCalendarDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return parseDate(formattedDate);
  }

  static calendarDateToTimestamp(calendarDate, isEndDate = false) {
    const jsDate = calendarDate.toDate(getLocalTimeZone());
    const year = jsDate.getFullYear();
    const month = String(jsDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(jsDate.getDate()).padStart(2, '0');
    const hours = isEndDate ? '23' : '00';
    const minutes = isEndDate ? '59' : '00';
    const seconds = isEndDate ? '59' : '00';
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  static timestampToCalendarDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

export default DateUtil;