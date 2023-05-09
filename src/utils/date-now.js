import dayjs from "dayjs";

const DateNow = () => {
  return dayjs().format("YYYY-MM-DD HH:mm");
};

export default DateNow;
