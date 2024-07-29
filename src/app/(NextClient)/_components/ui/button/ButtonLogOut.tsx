"use client";

import Http from "@/app/_lib/http";
import { onLogout } from "@/app/_lib/redux/authentication.slice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const ButtonLogOut = () => {
      const dispatch = useDispatch();
      const router = useRouter();

      const handleLogout = async () => {
            const response = await Http.post<{ message: string }>("/v1/api/auth/logout", {}, { baseUrl: "" });
            if (response) {
                  dispatch(onLogout());
                  router.push("/");
            }
      };

      // return <button onClick={handleLogout}>ButtonLogOut</button>;
      return <div onClick={() => router.refresh()}>Trang chủ</div>;
};

export default ButtonLogOut;
