"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";

interface Data {
  name?: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    checkToken();
  }, []);

  const register = async (data: Data, handleReset: () => void) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/users/register`,
        {
          name: data?.name,
          email: data?.email,
          password: data?.password,
        }
      );
      console.log("Signup successful:", response.data);
      toast.success("Signup successful");
      handleReset();
      router.push("/login");
    } catch (error) {
      toast.error("Signup failed");
    }
  };

  const login = async (data: Data, handleReset: () => void) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/users/login`,
        {
          email: data?.email,
          password: data?.password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Login successful");
      handleReset();
      router.replace("/doctors");
      checkToken(); 
      window.location.reload();
      return response.data;
    } catch (error) {
      toast.error("Login failed");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/users/logout`,
        {},
        { withCredentials: true }
      );
      setToken(null);
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
      router.push("/login");
      router.refresh();
    }
  };

  const checkToken = async () => {
    try {
      const response = await axios.get(
        `api/auth/token`,
        {
          withCredentials: true,
        }
      );
      setToken(response.data.token);
      return token;
    } catch (error) {
      console.error("Error fetching token:", error);
      setToken(null);
      return null;
    }
  };

  return { login, logout, register, checkToken, token };
};
