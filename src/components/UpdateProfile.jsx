import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Input, Button } from "../components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function UpdateProfile() {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (profileId) {
      appwriteService.getProfileById(profileId).then((profile) => {
      if (profile) {
        setName(profile.name);
        setBio(profile.bio);
      }
    })
      .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [profileId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fileId = null;
      if (profilePic) {
        const file = await appwriteService.uploadfileProfile(profilePic);
        fileId = file.$id;
      }
      await appwriteService.updateProfile(profileId, {
        name,
        bio,
        profilePic: fileId,
      });
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="w-full py-28 bg-gray-50 min-h-screen dark:bg-slate-950 rounded-2xl">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Update Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Bio Input */}
          <div>
            <Input
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Profile Picture Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2 dark:text-white">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Update Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md text-lg font-semibold dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;