"use client";

import React from "react";

const ProfilePage = ({ params }: { params: { user_atlas: string } }) => {
	const { user_atlas } = params;

	return <div>ProfilePage {user_atlas}</div>;
};

export default ProfilePage;
