import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import * as elements from 'typed-html';

type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

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
  .get('/todos', () => {
    const todos: Todo[] = [
      { id: 1, content: 'Buy milk', completed: true },
      { id: 2, content: 'Buy eggs', completed: false },
      { id: 3, content: 'Buy bread', completed: false },
    ];

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
