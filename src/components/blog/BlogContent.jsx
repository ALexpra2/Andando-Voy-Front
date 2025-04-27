import Carousel from '../carousel/Carousel';
import './BlogContent.css';

const BlogContent = ({ posts }) => {
  return (
    <div className="blog-container">
      <h2>Blog</h2>
      {posts.map(post => (
        <article key={post._id} className="blog-article">
          <h3>{post.title}</h3>
          <img src={post.image} alt={post.title} />
          <p>{post.content}</p>
        </article>
      ))}

      <Carousel />
    </div>
  );
};

export default BlogContent;
