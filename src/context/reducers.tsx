import { Todo } from '../models';

export type Actions =
  | {
      type: 'add';
      payload: string;
    }
  | {
      type: 'remove';
      payload: number;
    }
  | {
      type: 'done';
      payload: number;
    }
  | {
      type: 'edit';
      payload: { id: number; value: string };
    };

export const todosReducer = (state: Todo[], action: Actions): Todo[] => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isDone: false },
      ];

    case 'edit':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.value }
          : todo
      );

    case 'remove':
      return state.filter((todo) => todo.id !== action.payload);

    case 'done':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );

    default:
      return state;
  }
};
