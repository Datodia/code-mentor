"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { axiosInstance } from "@/lib/axios-instance";
import useUserStore from "@/store/user.store";
import { useRouter, usePathname } from "next/navigation";
import { Role } from "@/enums/role.enum";

const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  const { user, setUser } = useUserStore();
  const token = getCookie("accessToken") as string;


  const getCurrentUser = async (token: string) => {
    try {
      const resp = await axiosInstance.get("/auth/current-user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if(resp.status !== 200){
        router.push("/auth/sign-in");
      }
      if (resp.data.role !== Role.ADMIN && pathName.startsWith("/dashboard")) {
        router.push("/auth/sign-in/admin");
        return;
      }
      setUser(resp.data);
    } catch (error) {
        router.push("/auth/sign-in");
    } 
  };

  useEffect(() => {
    getCurrentUser(token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
