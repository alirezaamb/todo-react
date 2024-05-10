import { BASE_URL } from '../constant/constant';
import axios, { AxiosResponse } from 'axios';

const GetTodo = async (id?: string) => {
  if (id) {
    const response: AxiosResponse = await axios.get(`${BASE_URL}/todos/${id}`);
    return response;
  } else {
    const response: AxiosResponse = await axios.get(`${BASE_URL}/todos`);
    return response;
  }
};

export default GetTodo;
