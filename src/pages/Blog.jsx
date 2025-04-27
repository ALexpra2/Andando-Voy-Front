import { useEffect, useState } from 'react';
import axios from 'axios';
import BlogContent from '../components/blog/BlogContent'; // nuevo import


const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/blog`)
      .then(res => setPosts(res.data));
  }, []);

  return <BlogContent posts={posts} />;
};

export default Blog;
