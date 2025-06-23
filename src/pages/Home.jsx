import React from "react";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate=useNavigate()
  return (

    <div className="min-h-screen flex flex-col items-center justify-center p-6 rounded-2xl bg-white/50 dark:bg-slate-800">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-6xl font-bold text-gray-800 mb-6 dark:text-white">
          Welcome to <span className="text-blue-600 ">MyApp</span>
        </h1>
        <p className="text-2xl text-gray-600 mb-8 dark:text-white/50">
          A social platform to share your thoughts, connect with others, and explore new ideas.
        </p>
        {!authStatus &&
          <button 
          onClick={()=>navigate("/signup")}
          className="bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200">
          Sign Up Now
        </button>}
        {authStatus &&
          <button 
          onClick={()=>navigate("/all-posts")}
          className="bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200">
          See All Posts
        </button>}
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Feature 1: Create Posts */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-blue-600 text-4xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Create Posts</h2>
          <p className="text-gray-600">
            Share your thoughts, ideas, and experiences with the community. Add images, videos, and text to make your posts engaging.
          </p>
        </div>

        {/* Feature 2: Like & Comment */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-purple-600 text-4xl mb-4">❤️</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Like & Comment</h2>
          <p className="text-gray-600">
            Engage with others by liking their posts and leaving comments. Start conversations and build connections.
          </p>
        </div>

        {/* Feature 3: Explore */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-green-600 text-4xl mb-4">🌐</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Explore</h2>
          <p className="text-gray-600">
            Discover new posts from other users. Filter by title .
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 dark:text-white">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-blue-600 text-4xl mb-4">1</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Sign Up</h3>
            <p className="text-gray-600">
              Create an account to start sharing and exploring content.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-purple-600 text-4xl mb-4">2</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Create & Share</h3>
            <p className="text-gray-600">
              Write posts, add media, and share your ideas with the community.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-green-600 text-4xl mb-4">3</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Engage</h3>
            <p className="text-gray-600">
              Like, comment, and connect with other users.
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 dark:text-white">Join Our Growing Community</h2>
        <p className="text-xl text-gray-600 mb-8 dark:text-white/50">
          Thousands of users are already sharing their ideas and connecting with others. Be part of the conversation!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-blue-600 text-4xl mb-4">10K+</div>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-purple-600 text-4xl mb-4">50K+</div>
            <p className="text-gray-600">Posts Created</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-green-600 text-4xl mb-4">100K+</div>
            <p className="text-gray-600">Likes Given</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-yellow-600 text-4xl mb-4">20K+</div>
            <p className="text-gray-600">Comments Posted</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 dark:text-white">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-gray-600 italic mb-4">
              "MyApp has changed the way I connect with others. I love how easy it is to share my thoughts and discover new ideas!"
            </p>
            <p className="text-gray-800 font-semibold">— John Doe</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-gray-600 italic mb-4">
              "The community on MyApp is amazing. I’ve made so many friends and learned so much from others."
            </p>
            <p className="text-gray-800 font-semibold">— Jane Smith</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      
    </div>
  );
};

export default HomePage;