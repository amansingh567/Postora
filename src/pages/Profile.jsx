import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import authService from "../appwrite/auth";

function Profile() {
  const { userId, profileId } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const user = await authService.getCurrentUser();
        const response = await appwriteService.getProfile(user.$id);
        setProfile({
          profilePic: response.documents[0].profilePic,
          bio: response.documents[0].bio,
          name: response.documents[0].name,
          email: response.documents[0].email,
          id: response.documents[0].$id,
        });
      } catch (error) {
        console.error("Error in profile route:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 bg-gray-400 min-h-screen dark:bg-slate-950">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Profile
        </h1>
        {profile ? (
          <div className="space-y-8">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg">
                <img
                  src={
                    appwriteService.getFilePreviewProfile(profile.profilePic)
                  }
                  alt="Profile"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-6 text-center">
              <div>
                <p className="text-2xl font-semibold text-gray-800">
                  {profile.name}
                </p>
                <p className="text-lg text-gray-600 mt-2">{profile.email}</p>
              </div>
              <div>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Bio:</span> {profile.bio}
                </p>
              </div>
            </div>

            {/* Update Profile Button */}
            <div className="flex justify-center">
              <Link
                to={`/update-profile/${profile.id}`}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md text-lg font-semibold"
              >
                Update Profile
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No profile found. Please create one.
          </p>
        )}
      </div>
     </div>
  );
}

export default Profile;