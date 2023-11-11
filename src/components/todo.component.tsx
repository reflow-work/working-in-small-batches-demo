import { Todo } from '../domain/todos/todo';
import * as elements from 'typed-html';

export function TodoItem({ id, content, completed }: Todo) {
  return (
    <div class="flex flex-row space-x-3">
      <p>{content}</p>
      <input
        type="checkbox"
        checked={completed}
        hx-post={`/todos/toggle/${id}`}
        hx-target={'closest div'}
        hx-swap="outerHTML"
      />
      <button
        class="text-red-500"
        hx-delete={`/todos/${id}`}
        hx-target={'closest div'}
        hx-swap="outerHTML"
      >
        X
      </button>
    </div>
  );
}

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div>
      <h2 class="text-xl font-bold">Todos</h2>
      {todos.map((todo: Todo) => (
        <TodoItem {...todo} />
      ))}
      <TodoForm />
    </div>
  );
}

function TodoForm() {
  return (
    <form
      class="flex flex-row space-x-3"
      hx-post="/todos"
      hx-swap="beforebegin"
      _="on submit target.reset()"
    >
      <input type="text" name="content" class="border border-black" />
      <button type="submit">Add</button>
    </form>
  );
}
