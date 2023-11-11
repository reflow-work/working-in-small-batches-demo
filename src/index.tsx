import { Elysia, t } from 'elysia';
import { html } from '@elysiajs/html';
import * as elements from 'typed-html';
import { TodoItem, TodoList } from './components/todo.component';
import { listTodos, toggleTodo } from './domain/todos/todo.service';
import { Todo } from './domain/todos/todo';

const app = new Elysia()
  .use(html())
  .get('/', ({ html }) =>
    html(
      <BaseHtml>
        <div class="flex w-full h-screen justify-center items-center">
          <div hx-get="/todos" hx-trigger="load" hx-swap="innerHTML"></div>
        </div>
      </BaseHtml>
    )
  )
  .get('/todos', async () => {
    const todos: Todo[] = await listTodos();

    return <TodoList todos={todos} />;
  })
  .post(
    '/todos/toggle/:id',
    async ({ params }) => {
      const todo: Todo = await toggleTodo(params.id);

      return <TodoItem {...todo} />;
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

const BaseHtml = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>THE BETH STACK</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/htmx.org@1.9.3"></script>
</head>
<body>
  ${children}
</body>
</html>
`;
