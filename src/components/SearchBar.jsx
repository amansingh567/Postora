import React, { useState } from "react";
import appwriteService from "../appwrite/config";
import { Query } from "appwrite";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const query = [Query.search("title", value)];
      const results = await appwriteService.getPosts(query);
      onSearch(results);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center bg-white shadow-md rounded-lg overflow-hidden w-full max-w-lg">
      <input
        type="text"
        placeholder="Search posts..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      />
      <button
        type="submit"
        className="ml-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 transition duration-200"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
