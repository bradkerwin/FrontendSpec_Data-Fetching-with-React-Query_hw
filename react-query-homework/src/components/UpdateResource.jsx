import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Alert, Button, Form, Card, Spinner } from 'react-bootstrap'

const UpdateResource = () => {

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState('')

  const updateResource = async () => {
    const response = await axios.put('https://jsonplaceholder.typicode.com/posts', {
        title: title,
        body: body,
        userId: Date.now(),
      });

    return response.data;
  };
  
  return (
    <div></div>
  )
}

export default UpdateResource