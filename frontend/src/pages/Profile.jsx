import service from "../services/index.js";
import { useState } from "react";

function Profile({ currUser, setCurrUser }) {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImageName(file.name);
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!image) return;
    const data = await service.user.uploadImage(image);
    setImage(null);
    setImageName("");
  };

  return (
    <form
      onSubmit={uploadImage}
      className="bg-gray-900 p-6 min-h-screen shadow-lg"
    >
      <div className="space-y-12">
        <div className="border-b border-gray-600 pb-12">
          <h2 className="text-base font-semibold text-gray-100">Profile</h2>
          <p className="mt-1 text-sm text-gray-400">
            Welcome, {currUser.username}!
          </p>

          {/* Profile Photo */}
          <div className="mt-10 flex flex-col items-center">
            {currUser.img === "" ? (
              <p>upload your photo</p>
            ) : (
              <img
                src={currUser.img}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-lg mb-4"
              />
            )}
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-gray-700 font-semibold text-blue-300 focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 hover:text-blue-200"
            >
              <span>Change Photo</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept=".jpg,.jpeg,.png"
                className="sr-only"
                onChange={handleImageChange}
              />
            </label>
            <p className="text-xs text-gray-500 mt-2">PNG, JPG only</p>
            <p className="text-gray-300">{imageName}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold text-gray-300 hover:text-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default Profile;
