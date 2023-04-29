import React from 'react';
import { Todo } from '../models';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
}

const TodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  // const { state } = TodoState();
  console.log({ todos });
  console.log({ completedTodos });
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos?.map((todo, index) => {
              return (
                <SingleTodo
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  setTodos={setTodos}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos  ${
              snapshot.isDraggingOver ? 'dragcomplete' : 'remove'
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos?.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
