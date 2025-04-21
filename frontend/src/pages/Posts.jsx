import { useState, useEffect } from "react";
import mypic from "../../pic/my.jpg";
import default_img from "../../pic/default.jpg";
import Post from "../../components/Post";
import services from "../services/index.js";

function Posts() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await services.post.getAll();

        const postsWithImgURL = await Promise.all(
          data.map(async (post) => {
            try {
              const imgURL = await services.picture.getOne(post.userId);
            } catch (error) {
              console.log(
                "Error fetching image, using default instead:",
                error
              );
              const imgURL = default_img;
            }
            return { ...post, avatarURL: imgURL };
          })
        );
        setPosts(postsWithImgURL);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };

    fetchPosts();
  }, []);
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title: title,
      content: content,
    };
    const res = await services.post.createOne(data);
    setTitle("");
    setContent("");
    setIsFormOpen(false);
  };
  return (
    <div className="relative min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Posts</h1>

      {/* Example Post */}
      {posts.map((post) => (
        <Post
          key={post.id}
          avatar={post.avatarURL} // 你可以根據 user.id 去抓對應頭像
          username={post.user.username} // or user.username，如果有的話
          title={post.title}
          content={post.content}
          userId={post.userId} // or post.user.id，如果有的話
          postId={post.id} // or post.id，如果有的話
          setPosts={setPosts} // Pass setPosts to Post component
        />
      ))}

      {/* Floating Button */}
      <button
        onClick={toggleForm}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        ✏️
      </button>

      {/* Slide-out Form */}
      {isFormOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-gray-800 text-white shadow-lg p-6 transform transition-transform duration-300">
          <h2 className="text-xl font-bold mb-4">Create Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Title
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Content
              </label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter content"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          <button
            onClick={toggleForm}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
}

export default Posts;
