import { useState } from 'react';
import Todo from '../Todo/Todo';

import { ModalTodo } from '../Modal/ModalTodo';

const ToDosWrapper = ({
  todos,
  setTodos,
}: {
  todos: string[];
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState('');

  function handleToggleModal() {
    setIsOpen((prev) => !prev);
  }
  return (
    <>
      <div>
        {todos.map((item) => (
          <Todo
            key={item}
            id={item}
            setTodos={setTodos}
            handleToggleModal={handleToggleModal}
            setSelectedTodoId={setSelectedTodoId}
          />
        ))}
      </div>
      {isOpen ? (
        <ModalTodo
          isOpen={isOpen}
          onClose={handleToggleModal}
          selectedTodoId={selectedTodoId}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default ToDosWrapper;
