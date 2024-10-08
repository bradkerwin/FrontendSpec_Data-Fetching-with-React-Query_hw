import React, { useState } from "react";
import axios from "axios";
import { Spinner, Alert, Button, Card, Form } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";

const GetJson = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editedPost, setEditedPost] = useState(null);

  const fetchPlaceholders = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    return response.data;
  };

  const {
    data: placeholders,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["placeholders"],
    queryFn: fetchPlaceholders,
    enabled: false,
    retry: 3,
    staleTime: 3000,
    gcTime: 3000,
  });

  if (isLoading) {
    return <Spinner animation="border" variant="dark" />;
  }

  if (isError) {
    return <Alert>{error.message}</Alert>;
  }

  const deleteResource = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    console.log("Post deleted successfully");
    return id;
  };

  const updateResource = async (event, id) => {
    event.preventDefault();
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        title: title,
        body: body,
      }
    );
    console.log("Post updated successfully");

    return response.data;
  };

  const handleEditPost = (post) => {
    setEditedPost(post);
    setBody(post.body)
    setTitle(post.title)
  };

  return (
    <div>
      <Button className="m-2" variant="primary" onClick={refetch}>
        View Placeholders
      </Button>

      {placeholders &&
        placeholders.map((placeholder) => (
          <div>
            <Card key={placeholder.id} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{placeholder.title}</Card.Title>
                <Card.Text>{placeholder.body}</Card.Text>
                <Card.Text>{placeholder.userId}</Card.Text>
                <Button
                  variant="warning"
                  onClick={() => handleEditPost(placeholder)}
                >
                  Edit Post
                </Button>
                <Button
                  className="ms-2"
                  variant="danger"
                  onClick={deleteResource}
                >
                  Delete Post
                </Button>
              </Card.Body>
            </Card>

            {editedPost && editedPost.title === placeholder.title && (
              <Form onSubmit={(event) => updateResource(event, editedPost.id)}>
                <Form.Group className="m-3" controlId="formPostTitle">
                  <Form.Label>
                    <b>Title</b>
                  </Form.Label>
                  <Form.Control
                    value={title}
                    type="text"
                    placeholder="Edit Title"
                    autoComplete="off"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="m-3" controlId="formPostBody">
                  <Form.Label>
                    <b>Body</b>
                  </Form.Label>
                  <Form.Control
                    value={body}
                    type="text"
                    placeholder="Edit Body"
                    autoComplete="off"
                    onChange={(event) => setBody(event.target.value)}
                  />
                </Form.Group>
                <Button className="ms-3" variant="primary" type="submit">
                  Submit Changes
                </Button>
              </Form>
            )}
          </div>
        ))}
    </div>
  );
};

export default GetJson;
