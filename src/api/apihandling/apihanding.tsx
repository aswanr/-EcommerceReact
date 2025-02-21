import axios from "axios";
const baseApi = process.env.main_url || "http://localhost:3001";

const ogApi = axios.create({
  baseURL: baseApi,
  headers: {
    "Content-Type": "application/json",
  },
});

export const gettingDatas = async (id: string | number) => {
  try {
    const response = await ogApi.get(`${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const postingData = async (id: string, data?: object) => {
  try {
    const response = await ogApi.post(id, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

// interseptor
// ogApi.interceptors.request.use(function (config){
//   console.log("founded");
//   return config;
// },function (error){
//   console.log(error)
// });

// ogApi.interceptors.response.use(function (config){
//   console.log("undounded");
//   return config;
// },function (error){
//   console.log(error)
// });