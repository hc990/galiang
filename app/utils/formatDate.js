 
import moment from "moment";
const formatDateTime = (date) => {
  return moment(date).format("DD/MM/YYYY hh:mm:ss");
};

const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};
export default formatDate;
