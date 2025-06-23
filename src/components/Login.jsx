import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/config";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      // Authenticate the user
      const session = await authService.login(data);
      if (session) {
        // Fetch the current user's data
        const userData = await authService.getCurrentUser();
        if (userData) {
          // Check if the user has a profile
          const profile = await appwriteService.getProfile(userData.$id);
          let profileId = null;
          if (!profile || profile.documents.length === 0) {
            // If no profile exists, create one with default values
            const newProfile = await appwriteService.createProfile({
              userId: userData.$id,
              name: userData.name || "User",
              email: userData.email,
              bio: "",
              profilePic: "",
            });
            profileId = newProfile.$id; // Store the new profile ID
          } else {
            profileId = profile.documents[0].$id; // Store the existing profile ID
          }
          // Dispatch login action with userData and profileId
          dispatch(authLogin({ userData, profileId }));
          navigate("/");
        } else {
          setError("Failed to fetch user data.");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen rounded-2xl bg-gray-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 dark:bg-gray-800">
       {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo width="120px" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 dark:text-white/60">
          Sign in to your account
        </h2>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 mb-8 dark:text-white/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-700 font-semibold transition duration-200"
          >
            Sign Up
          </Link>
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center mb-6">{error}</p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(login)} className="space-y-6">
          {/* Email Input */}
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md text-lg font-semibold dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;