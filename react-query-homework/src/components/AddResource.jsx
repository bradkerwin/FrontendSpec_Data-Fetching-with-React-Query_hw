import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Alert, Button, Form, Card, Spinner } from 'react-bootstrap'

const AddResource = () => {

  const [newResource, setNewResource] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addResource = async () => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: title,
        body: body,
        userId: Date.now(),
      });
    
    return response.data;
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: addResource,
    onSuccess: (data) => {
      console.log(data);
      setNewResource(data);
    },
  });

  if (isLoading) {
    return <Spinner />
  };

  if (isError) {
    return <Alert>{error.message}</Alert>
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate();
  }

  return (
    <>
      { newResource && (
      <Card key={newResource.id} style={{ width: '18rem' }}>
          <Card.Body>
              <Card.Title>{newResource.title}</Card.Title>
              <Card.Text>{newResource.body}</Card.Text>
              <Card.Text>{newResource.userId}</Card.Text>
          </Card.Body>
      </Card>
)}

        <Form onSubmit={handleSubmit}>
            <Form.Group className="m-3" controlId="formPostTitle">
                <Form.Label><b>Title</b></Form.Label>
                <Form.Control value={title} type="text" placeholder="Post Title" autoComplete='off' onChange={(event)=> setTitle(event.target.value)} />
            </Form.Group>
            <Form.Group className="m-3" controlId="formPostBody">
                <Form.Label><b>Body</b></Form.Label>
                <Form.Control value={body} type="text" placeholder="Post Body" autoComplete='off' onChange={(event)=> setBody(event.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
    </>
  )
}

export default AddResource;