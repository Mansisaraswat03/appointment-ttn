"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Data {
  name?: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const router = useRouter();

  const register = async (data:Data, handleReset: () => void) => {
    try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/users/register`,
          {
            name: data?.name,
            email: data?.email,
            password: data?.password,
          },
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
      router.push("/doctors");
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
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
      router.push("/login");
      router.refresh();
    }
  };

  return { login, logout, register };
};
