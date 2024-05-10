import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { TodoType } from '../../Utils/type';
import GetTodo from '../../api/todos.api';

export function ModalTodo({
  isOpen,
  onClose,
  selectedTodoId,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedTodoId: string;
}) {
  const [todo, setTodo] = useState<TodoType | null>(null);
  useEffect(() => {
    async function getData() {
      const response: AxiosResponse = await GetTodo(selectedTodoId);
      setTodo(response.data);
    }
    getData();
  }, []);

  return (
    <>
      {' '}
      {todo ? (
        <Modal key={todo.id} onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{todo.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{todo.description}</ModalBody>
            <ModalBody>{todo.details}</ModalBody>
            <ModalBody>
              {new Date(todo.time).toLocaleDateString('fa-IR')}
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        ''
      )}
    </>
  );
}

// export function useModal() {
//   return useDisclosure();
// }
