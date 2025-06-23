import React, {useState, useEffect} from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard, SearchBar } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  const handleSearch = (results) => {
    setSearchResults(results.documents);
  };

  const clearSearch = () => {
    setSearchResults([]);
  };

  useEffect(() => {
    setDisplayedPosts(
      Array.isArray(searchResults) && searchResults.length > 0
        ? searchResults
        : posts
    );
  }, [searchResults, posts]);

  return (
    <div className="w-full bg-gray-100 rounded-2xl flex flex-col items-center justify-center dark:bg-slate-950">
      <div className="w-full px-4 py-3 bg-white shadow-md rounded-2xl flex items-center justify-center">
        <div className="flex-1">
          <SearchBar onSearch={handleSearch} />
        </div>
        {searchResults.length > 0 && (
          <button
            onClick={clearSearch}
            className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 shadow-md"
          >
            Clear Search
          </button>
        )}
      </div>

      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 p-4">
          {displayedPosts.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No posts found.</p>
          ) : (
            displayedPosts.map((post) => <PostCard
            key={post.$id}
            $id={post.$id}
            title={post.title}
            featuredImage={post.featuredImage}
          />)
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts