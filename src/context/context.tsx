import { createContext, useContext, useReducer } from 'react';
import { Todo } from '../models';
import { Actions, todosReducer } from './reducers';

interface ITodoProps {
  children?: React.ReactNode;
}

const TodoContext = createContext(
  {} as { state: Todo[]; dispatch: React.Dispatch<Actions> }
);

const Context = ({ children }: ITodoProps) => {
  const [state, dispatch] = useReducer(todosReducer, [] as Todo[]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default Context;

export const TodoState = () => {
  return useContext(TodoContext);
};
