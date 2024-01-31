import React from "react";

const env = process.env;
const public_url = env.PUBLIC_URL || "";

const Loading = () => {
	return (
		<div className="loading-container">
			<h3>잠시만 기다려주세요. 로딩중입니다</h3>
			<img
				className="loading-spinner"
				src={public_url + "/assets/Spinner.gif"}
				alt={"로딩중"}
			/>
		</div>
	);
};
export default Loading;
