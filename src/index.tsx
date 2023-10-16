import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import * as elements from 'typed-html';
import { listTodos } from './domain/todos/todo.service';
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

    return (
      <div>
        {todos.map((todo: Todo) => (
          <p>{todo.content}</p>
        ))}
      </div>
    );
  })
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
