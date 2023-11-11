import { Todo } from '../domain/todos/todo';
import * as elements from 'typed-html';

function TodoItem({ content, completed }: Todo) {
  return (
    <div class="flex flex-row space-x-3">
      <p>{content}</p>
      <input type="checkbox" checked={completed} />
      <button class="text-red-500">X</button>
    </div>
  );
}

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div>
      {todos.map((todo: Todo) => (
        <TodoItem {...todo} />
      ))}
    </div>
  );
}
