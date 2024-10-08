import React from 'react'
import axios from 'axios'
import { Spinner, Alert, Button, Card } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'

const GetJson = () => {

    const fetchPlaceholders = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

        return response.data
    }

    const { data:placeholders, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['placeholders'],
        queryFn: fetchPlaceholders,
        enabled: false,
        retry: 3,
        staleTime: 3000,
        gcTime: 3000
    });

    if (isLoading) {
        return <Spinner animation='border' variant='dark'/>
    }

    if (isError) {
        return <Alert>{error.message}</Alert>
    }

    const deleteResource = async () => {
        const response = await axios.delete('https://jsonplaceholder.typicode.com/posts/1', {
          body: JSON.stringify({
            title: title,
            body: body,
            userId: Date.now(),
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        return response.data
      }

      const updateResource = async () => {
        const response = await axios.put('https://jsonplaceholder.typicode.com/posts', {
            title: title,
            body: body,
            userId: Date.now(),
          });
    
        return response.data;
      };

  return (
    <div>
        <Button className='m-2' variant='primary' onClick={refetch}>View Placeholders</Button>

        {placeholders && placeholders.map((placeholder) => (
            <Card key={placeholder.id} style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{placeholder.title}</Card.Title>
                    <Card.Text>{placeholder.body}</Card.Text>
                    <Card.Text>{placeholder.userId}</Card.Text>
                    <Button variant='warning' onClick={updateResource}>Edit Post</Button>
                    <Button className='ms-2' variant='danger' onClick={deleteResource}>Delete Post</Button>
                </Card.Body>
            </Card>
        ))}
    </div>
  )
}

export default GetJson