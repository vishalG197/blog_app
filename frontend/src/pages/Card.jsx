import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import {
  Box,
  Heading,
  Text,
  Badge,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
  Select,
} from "@chakra-ui/react";
const Card = ({ item, fetchBlog }) => {
  const [comment, setComment] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    title: item.title,
    content: item.content,
    category: item.category,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    //console.log(id)
    try {
      const authToken = localStorage.getItem("token");
      console.log(authToken);
      //patch("/blogs/:id/comment"
      fetch(`https://blog-bzw0.onrender.com/api/blogs/${item._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(editedData),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          // Handle the response here
          console.log(response);
        })
        .then(() => {
          fetchBlog();
        });
    } catch (error) {
      console.log(error.message);
    }

    setIsEditing(false);
  };

  const handleComment = (id) => {
    try {
      const authToken = localStorage.getItem("token");
      console.log(authToken);
      //patch("/blogs/:id/comment"
      fetch(`https://blog-bzw0.onrender.com/api/blogs/${id}/comment`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ content: comment }),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          // Handle the response here
          console.log(response);
        })
        .then(() => {
          fetchBlog();
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteBlog = (id) => {
    try {
      const authToken = localStorage.getItem("token");
      console.log(authToken);
      //patch("/blogs/:id/comment"
      fetch(`https://blog-bzw0.onrender.com/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          // Handle the response here
          console.log(response);
        })
        .then(() => {
          fetchBlog();
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLike = (id) => {
    try {
      const authToken = localStorage.getItem("token");
      console.log(authToken);
      //patch("/blogs/:id/comment"
      fetch(`https://blog-bzw0.onrender.com/api/blogs/${item._id}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          // Handle the response here
          console.log(response);
        })
        .then(() => {
          fetchBlog();
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Box
        key={item._id}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        m={4}
        maxW="90%"
        boxShadow="md"
      >
        <Flex justifyContent="space-between">
          <Heading as="h2" fontSize="xl" mb={2}>
            {item.title}
          </Heading>
          <Box>
            <Button
              colorScheme="teal"
              size="sm"
              mr={2}
              onClick={() => {
                handleEditClick();
              }}
            >
              Edit
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => {
                deleteBlog(item._id);
              }}
            >
              Delete
            </Button>
          </Box>
        </Flex>
        <Text fontSize="md" color="gray.600" mb={4}>
          {item.content}
        </Text>
        <Badge variant="outline" colorScheme="teal">
          Category: {item.category}
        </Badge>
        <Text color="gray.500" fontSize="sm" mt={2}>
          Date: {item.date}
        </Text>
        <Flex justifyContent={"space-between"}>
          <Heading as="h2" size="md" color="red" fontWeight={"bold"} mt={2}>
            Likes: {item.likes}
          </Heading>
          <Button
            bg="teal.200"
            onClick={() => {
              handleLike();
            }}
          >
            Like it
          </Button>
        </Flex>

        <Flex justifyContent="space-between">
          <Input
            type="text"
            placholder="Type your comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button
            bg="orange.500"
            onClick={() => {
              handleComment(item._id);
            }}
          >
            Comment
          </Button>
        </Flex>
        <Flex justifyContent="space-between">
          <Box mt={4}>
            <Text fontWeight="bold">Comments:</Text>
            {item.comments.map((comment, index) => (
              <Box
                key={index}
                mt={2}
                borderTop="1px"
                borderColor="gray.300"
                pt={2}
              >
                <Text>
                  <span style={{ fontWeight: "bold", marginRight: "8px" }}>
                    {comment.username}:
                  </span>
                  {comment.content}
                </Text>
              </Box>
            ))}
          </Box>
        </Flex>
      </Box>
      {/* Edit Modal */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={editedData.title}
                onChange={(e) =>
                  setEditedData({ ...editedData, title: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Content</FormLabel>
              <Textarea
                value={editedData.content}
                onChange={(e) =>
                  setEditedData({ ...editedData, content: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                value={editedData.category}
                onChange={(e) =>
                  setEditedData({ ...editedData, category: e.target.value })
                }
              >
                <option value="Entertainment">Entertainment</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                {/* Add more categories as needed */}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSaveClick}>
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Card;
