import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Spinner, Button } from 'react-bootstrap'

const DeleteResource = () => {

  const [newResource, setNewResource] = useState(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState('')

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
  

  return (
    <>
    
    </>
  )
}

export default DeleteResource