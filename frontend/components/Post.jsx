import { useState } from "react";
import services from "../src/services/index.js";

function Post({ avatar, username, title, content, userId, postId, setPosts }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    // Save logic can be added here
    const response = await services.post.updateOne({
      postId,
      title: editedTitle,
      content: editedContent,
    });
    if (response.status === 200) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, title: editedTitle, content: editedContent } // Update the post with new title and content
            : post
        )
      );
      setIsEditing(false); // Close the edit mode
    } else {
      // Handle error if necessary
      console.error("Failed to update the post.");
    }
  };

  const handleLeave = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const response = await services.post.deleteOne({ postId });

    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
  };

  return (
    <div className="flex items-start bg-gray-800 text-white shadow-md rounded-lg p-4 mb-4">
      {/* Left: Avatar */}
      <img
        src={avatar}
        alt="Avatar"
        className="w-16 h-16 rounded-full object-cover mr-4"
      />

      {/* Right: Post Content */}
      <div className="flex-1">
        {/* Username */}
        <p className="text-sm text-gray-400 font-medium">User: {username}</p>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full mb-2 px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              rows="4"
            ></textarea>
            <button
              onClick={handleSave}
              className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleLeave}
              className="mt-2 bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-bold">{editedTitle}</h3>
            <p className="text-gray-300">{editedContent}</p>
          </div>
        )}
      </div>

      {/* Edit Button */}
      <button
        onClick={toggleEdit}
        className="ml-4 text-blue-400 hover:text-blue-600"
      >
        ✏️
      </button>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="ml-2 text-red-400 hover:text-red-600"
      >
        🗑️
      </button>
    </div>
  );
}

export default Post;
