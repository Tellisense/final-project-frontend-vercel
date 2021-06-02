import axios from "axios";

import { toast } from "react-toastify";

import logger from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

//Axios Interceptor Middleware
axios.interceptors.response.use(null, error => {
  console.log("inside the interceptor");
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500; //user error

  if (!expectedError) {
    // if unexpected error occurs log the error and show message to user
    logger.log(error);
    toast.error(error.message);
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
