 
import moment from "moment";
const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY hh:mm:ss");
};

export default formatDate;
