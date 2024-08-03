import { defineMockData } from 'vite-plugin-mock-dev-server'

export const users = defineMockData('users', [
  { id: 1, name: 'Danny', },
  { id: 2, name: 'Tom', },
])