export function listTodos() {
  return Promise.resolve([
    { id: 1, content: 'Buy milk', completed: true },
    { id: 2, content: 'Buy eggs', completed: false },
    { id: 3, content: 'Buy bread', completed: false },
  ])
}
