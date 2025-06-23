import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import conf from "../conf/conf";
import { Query } from "appwrite";

function PostCard({ $id, title, featuredImage }) {
  const userData = useSelector((state) => state.auth.userData);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // For save functionality
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]); // For comments
  const [newComment, setNewComment] = useState(""); // For content of comment
  const [noOfLikes, setNoOfLikes] = useState(0);
  const [noOfComments, setNoOfComments] = useState(0);

  //for like the pictures
  useEffect(() => {
    const checkLike = async () => {
      const like = await appwriteService.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdLikes,
        [Query.equal("userId", userData.$id), Query.equal("postId", $id)]
      );
      setIsLiked(like.documents.length > 0);
    };
    checkLike();
  }, [ $id, isLiked, setIsLiked]);
  
  const handleLike = async () => {
    // setLoading(true)
    
    if (isLiked) {
      await appwriteService.unlikePost(userData.$id, $id);
      // fetchLikeCount();
    } else {
      await appwriteService.likePost(userData.$id, $id);
      // fetchLikeCount();
    }
    setIsLiked(!isLiked);
    // setLoading(false)
  };
  
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
          const count = await appwriteService.noOfCountsOfLikes($id);
          setNoOfLikes(count);
          
      } catch (error) {
          console.error("Error fetching like count:", error);
      }
    };
    fetchLikeCount()
  },[$id,isLiked,setIsLiked,handleLike]);


 //comments on the picture
  const handleCommentClick = async () => {
    if (!showComments) {
      const postComments = await appwriteService.getComments($id);
      setComments(postComments);
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await appwriteService.addComment(userData.$id, $id, newComment);
      setNewComment("");
      const updatedComments = await appwriteService.getComments($id);
      setComments(updatedComments);
    }
  };

  useEffect(() => {
    const fetchCommentsCount = async () => {
        try {
            const count = await appwriteService.noOfCountsOfComments($id);
            setNoOfComments(count);
        } catch (error) {
            console.error("Error fetching like count:", error);
        }
    };
    fetchCommentsCount();
    
  }, [$id,showComments,newComment,handleAddComment]);


  return (
    <div className="w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/post/${$id}`}>
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      </Link>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 truncate">{title}</h2>
        <div className="flex items-center justify-between mt-4">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 ${
              isLiked ? "text-red-600" : "text-gray-600"
            }`}
          >
            <span>❤️</span>
            <span>{noOfLikes}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={handleCommentClick}
            className="flex items-center space-x-2 text-gray-600"
          >
            <span>💬</span>
            <span>{noOfComments}</span>
          </button>
          
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4">
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-600">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.$id} className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-gray-800">{comment.content}</p>
                    <p className="text-sm text-gray-600">By: {comment.userId}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment */}
            <div className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddComment}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Add Comment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;