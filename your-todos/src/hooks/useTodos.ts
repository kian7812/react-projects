import { useEffect, useState } from "react"
import { Todo } from "../types/todo"
import { dummyData } from "../data/todos"

export default function useTodos() {
  // const [todos, setTodos] = useState<todo[]>(dummyData) //  is not necessary
  const [todos, setTodos] = useState(() => {
    const savedTodos: Todo[] = JSON.parse(localStorage.getItem('your-todos') || '[]')

    return savedTodos.length > 0 ? savedTodos : dummyData
  })

  useEffect(() => {
    localStorage.setItem('your-todos', JSON.stringify(todos))
  }, [todos])

  function setTodoCompleted(id: number, completed: boolean) {
    setTodos((preTodos) => {
      return preTodos.map(todo => (todo.id === id ? { ...todo, completed } : todo))
    })
  }

  function addTodo(title: string) {
    setTodos((preTodos) => {
      return [
        {
          id: Date.now(),
          title,
          completed: false
        },
        ...preTodos
      ]
    })
  }

  function deleteTodo(id: number) {
    setTodos((preTodos) => {
      return preTodos.filter(todo => todo.id !== id)
    })
  }

  function deleteAllCompleted() {
    setTodos((preTodos) => preTodos.filter(todo => !todo.completed))
  }

  return {
    todos,
    setTodoCompleted,
    addTodo,
    deleteTodo,
    deleteAllCompleted
  }
}