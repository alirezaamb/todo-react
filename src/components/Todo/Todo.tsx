import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constant/constant';
import { TodoType } from '../../Utils/type';
import GetTodo from '../../api/todos.api';
// import { ModalTodo } from '../Modal/ModalTodo';

const Todo = ({
  id,
  setTodos,
  handleToggleModal,
  setSelectedTodoId,
}: {
  id: string;
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
  handleToggleModal: () => void;
  setSelectedTodoId: (id: string) => void;
}) => {
  //   const { title, description,id:time } = id;
  const [todo, setTodo] = useState<TodoType | null>(null);
  useEffect(() => {
    async function getData() {
      const response: AxiosResponse = await GetTodo(id);
      setTodo(response.data);
    }
    getData();
  }, [id]);

  async function deleteHandler(id: string) {
    // const id = e.target.id
    await axios.delete(`${BASE_URL}/todos/${id}`);
    setTodos((prev) => {
      console.log([...prev].filter((item) => item !== id));

      return [...prev].filter((item) => item !== id);
    });
  }

  return todo ? (
    <div className="flex justify-between items-center p-2">
      <div className="flex flex-col p-2">
        <div className="border-l pl-2 border-l-purple-600">
          <h1>{todo.title}</h1>
          <h2>{todo.description}</h2>
        </div>
        <p className="pl-2 text-gray-400">
          {new Date(todo.time).toLocaleDateString('fa-IR')}
        </p>
      </div>
      <div>
        <button onClick={() => deleteHandler(id)}>⛔</button>
        <button
          onClick={() => {
            handleToggleModal();
            setSelectedTodoId(id);
          }}
        >
          👁️
        </button>
      </div>
    </div>
  ) : (
    ''
  );
};

export default Todo;
