import { Button, Input, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ToDosWrapper from './TodosWrapper/TodosWrapper';
import { TodoType } from '../Utils/type';
import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../constant/constant';
import GetTodo from '../api/todos.api';

const options = [{ value: 'Oldest' }, { value: 'Newest' }, { value: 'A-Z' }];

const HomeComponents = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    async function getData() {
      const response: AxiosResponse = await GetTodo();
      setTodos(response.data.map((item: TodoType) => item.id));
    }
    getData();
  }, []);
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: TodoType = { title, description, details, time: Date.now() };
    console.log(data);
    const response: AxiosResponse = await axios.post(`${BASE_URL}/todos`, data);
    setTodos((prevTodos) => [...prevTodos, response.data.id]);

    setTitle('');
    setDescription('');
    setDetails('');
  }

  return (
    <>
      <form className="flex flex-col gap-4 p-2" onSubmit={submitHandler}>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
          <Select placeholder="Select option">
            {options.map((item, index) => (
              <option key={index} value={item.value}>
                {item.value}
              </option>
            ))}
          </Select>
        </div>
      </form>
      <ToDosWrapper todos={todos} setTodos={setTodos} />
    </>
  );
};

export default HomeComponents;
