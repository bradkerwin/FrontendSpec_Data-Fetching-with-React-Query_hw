import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GetJson from './components/getJson'
import AddResource from './components/AddResource';
import DeleteResource from './components/DeleteResource';
import UpdateResource from './components/UpdateResource';

function App() {

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GetJson />
      <AddResource />
      <DeleteResource />
      <UpdateResource />
    </QueryClientProvider>
  )
}

export default App
