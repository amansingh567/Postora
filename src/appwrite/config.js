import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    
    // uploading all the thing except image

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return { documents: [] };
        }
    }

    // file upload service means uploading a image

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
      return this.bucket.getFileView(
          conf.appwriteBucketId,
          fileId
      )
  }

    //for profile handling
    
    async createProfile({ userId, name, email, bio, profilePic }) {
        try {
          return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionIdProfile,
            ID.unique(),
            {
              userId,
              name,
              email,
              bio,
              profilePic,
            }
          );
        } catch (error) {
          console.log("Appwrite service :: createProfile :: error", error);
          return false;
        }
    }
    
    async updateProfile(profileId, { name, bio, profilePic }) {
        try {
          return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionIdProfile,
            profileId,
            {
              name,
              bio,
              profilePic,
            }
          );
        } catch (error) {
          console.log("Appwrite service :: updateProfile :: error", error);
          return false;
        }
    }
    
    async getProfile(userId) {
        try {
          return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionIdProfile,
            [Query.equal("userId", userId)]
          );
        } catch (error) {
          console.log("Appwrite service :: getProfile :: error", error);
          return false;
        }
    }

    async getProfileById(profileId) {
      try {
        return await this.databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionIdProfile,
          profileId
        );
      } catch (error) {
        console.log("Appwrite service :: getProfileById :: error", error);
        return false;
      }
    }

    async uploadfileProfile(file) {
        try {
          return await this.bucket.createFile(
            conf.appwriteBucketIdProfile, 
            ID.unique(),
            file
          );
        } catch (error) {
          console.log("Appwrite service :: uploadFile :: error", error);
          return false;
        }
    }

    getFilePreviewProfile(fileId){
      return this.bucket.getFileView(
          conf.appwriteBucketIdProfile,
          fileId
      )
  }

    //for likes and comment handling

    async likePost (userId, postId) {
        try {
          await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionIdLikes,
            ID.unique(),
            { userId, postId }
          );
      
          return await this.noOfCountsOfLikes(postId);
        } catch (error) {
          console.error("Error liking post:", error);
          throw error;
        }
    };
  
    async unlikePost (userId, postId) {
        try {
          const like = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionIdLikes,
            [Query.equal("userId", userId), Query.equal("postId", postId)]
          );
      
          if (like.documents.length > 0) {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdLikes,
                like.documents[0].$id
            );
      
            return await this.noOfCountsOfLikes(postId);
          }
        } catch (error) {
          console.error("Error unliking post:", error);
          throw error;
        }
    };

    async noOfCountsOfLikes(postId){
      try {
        const likes=await this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionIdLikes,
          [Query.equal("postId",postId)]
        )
        return likes.total;
      } catch (error) {
        console.log("Error finding no of counts ",error);
      }
    }

    async noOfCountsOfComments(postId){
      try {
        const comment=await this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionIdComments,
          [Query.equal("postId",postId)]
        )
        return comment.total;
      } catch (error) {
        console.log("Error finding no of counts ",error);
      }
    }

    async addComment(userId, postId, content) {
      try {
        await this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionIdComments,
          ID.unique(),
          { userId, postId, content }
        );
        
      } catch (error) {
        console.log("error during adding comments ",error);
      }
    };
  
    async getComments(postId) {
    const comments = await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionIdComments,
      [Query.equal("postId", postId)]
    );
    return comments.documents;
    };


}


const service = new Service()
export default service