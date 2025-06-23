import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column (Title, Slug, Content) */}
                <div className="lg:col-span-2 space-y-6">
                    <Input
                        label="Title"
                        placeholder="Enter the title of your post"
                        className="w-full"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug"
                        placeholder="Enter a unique slug"
                        className="w-full"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE
                        label="Content"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                        className="w-full"
                    />
                </div>

                {/* Right Column (Featured Image, Status, Submit Button) */}
                <div className="space-y-6">
                    <Input
                        label="Featured Image"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        className="w-full"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="w-full"
                        {...register("status", { required: true })}
                    />
                    <Button
                        type="submit"
                        className={`w-full ${
                            post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                        } text-white py-3 rounded-lg transition duration-200`}
                    >
                        {post ? "Update Post" : "Create Post"}
                    </Button>
                </div>
            </div>
        </form>
    );
}