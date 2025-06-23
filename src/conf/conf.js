const conf ={
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteCollectionIdProfile : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_profile),
    appwriteBucketIdProfile : String(import.meta.env.VITE_APPWRITE_BUCKET_ID_profile),
    appwriteCollectionIdLikes : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_likes),
    appwriteCollectionIdComments : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_comments),
    
}


export default conf