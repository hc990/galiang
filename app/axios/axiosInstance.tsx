import siteMetadata from "@/data/siteMetadata";
import axios from "axios";

export const axiosInstance = axios.create({  
    baseURL: siteMetadata.siteUrl ,
    timeout: 3000
}) 

export default axiosInstance;