import dayjs from 'dayjs';

const TableDate = ({ date }) => {
  return date ? dayjs(date).format("YYYY-MM-DD")  : "Изменения не вносились";
};

export default TableDate;
