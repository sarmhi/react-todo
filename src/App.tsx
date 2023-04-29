import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './models';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  // const { state, dispatch } = TodoState();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      // dispatch({ type: 'add', payload: todo });
      setTodo('');
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>

        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          setCompletedTodos={setCompletedTodos}
          completedTodos={completedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
