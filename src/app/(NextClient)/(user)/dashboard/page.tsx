"use client";
import React, { useContext, useEffect, useState } from "react";
import DashBoardLeft from "./_components/layout/DashBoardLeft";
import DashBoardRight from "./_components/layout/DashBoardRight";
import { SidebarContext } from "./SidebarContext";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/_services/user.service";
import { useDispatch } from "react-redux";
import { onFetchUser } from "@/app/_lib/redux/features/authentication.slice";
import { set } from "zod";

const DashBoardPage = () => {
	return <DashBoardRight />;
};

export default DashBoardPage;
