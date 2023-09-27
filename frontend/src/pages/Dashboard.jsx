
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Box, Heading, Text, Badge, Flex, Button, space, Input, FormControl, FormLabel } from '@chakra-ui/react';
import Card from './Card';
import {
 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
 

  Textarea,
  Select,
} from '@chakra-ui/react';
// import auth from '../../../backend/middleware/auth';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
const [comment,setComment] = useState([]);


const [isCreating, setIsCreating] = useState(false);
const [newBlogData, setNewBlogData] = useState({
  title: '',
  content: '',
  category: 'Entertainment', // Default category
});

const handleCreateClick = () => {
  setIsCreating(true);
};

const handleCreateSubmit = async () => {
  try {
    const authToken=localStorage.getItem('token');
    console.log(authToken)
    // Make a POST request to create a new blog
    const response = await axios.post('https://blog-bzw0.onrender.com/api/blogs', newBlogData,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json', // Set the content type to JSON
      },
    }
    )
  

    // Handle success, e.g., show a success message, update UI, etc.
    console.log('New blog created:', response.data);
fetchBlog()
    // Close the create modal
    // setIsCreating(false);
  } catch (error) {
    // Handle errors, e.g., show an error message
    console.error('Error creating new blog:', error);
  }
};









  const fetchBlog = async () => {
   

      const authToken=localStorage.getItem('token');
      console.log(authToken)
      // Include the token in the request headers
     

      fetch('https://blog-bzw0.onrender.com/api/blogs', {
        method:"GET",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "content-type": "application/json"
        }
      }).then((res)=>{
        return res.json()
      })
        .then((response) => {
          // Handle the response here
          console.log(response.blog);
          setBlogs(response.blog)
        })
        .catch((error) => {
          // Handle errors here
          console.error(error.message);
        });
  }

  useEffect(() => {
    fetchBlog();
  }, []);

console.log(blogs)




  return (
    <div>
      <Heading>Welcome to home page</Heading>
      <Box>
      <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={newBlogData.title}
                onChange={(e) => setNewBlogData({ ...newBlogData, title: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Content</FormLabel>
              <Textarea
                value={newBlogData.content}
                onChange={(e) => setNewBlogData({ ...newBlogData, content: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                value={newBlogData.category}
                onChange={(e) => setNewBlogData({ ...newBlogData, category: e.target.value })}
              >
                <option value="Entertainment">Entertainment</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                {/* Add more categories as needed */}
              </Select>
            </FormControl>
            <FormControl>
              <Button bg={"blue.600"} color={"white"} onClick={handleCreateSubmit}>Post Blog</Button>
            </FormControl>
            
            


      </Box>
      <Box>
      {blogs.map((item) => (
      <Card  key={item._id}   item={item} fetchBlog={fetchBlog}/>
      ))}
      </Box>
    </div>
  )
}

export default Dashboard
