import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.245.25:9000/api",
});

export default apiClient;
