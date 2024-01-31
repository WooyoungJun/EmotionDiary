import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import { emotionList } from "../util/emotion";
import React, { useContext } from "react";
import { DiaryStateContext } from "../App";

const DiaryItem = ({ item }) => {
	const { user } = useContext(DiaryStateContext);
	const navigate = useNavigate();

	const strDate = new Date(parseInt(item.date)).toLocaleDateString();

	const goDetail = () => {
		navigate(`/Diary/${item.id}`, {
			state: { item },
		});
	};

	return (
		<div className="DiaryItem">
			<div
				className={emotionList[item.emotion - 1].emotion_className}
				onClick={goDetail}
			>
				<img
					alt={"emotion 이미지"}
					src={emotionList[item.emotion - 1].emotion_img}
				/>
			</div>
			<div className="info_wrapper" onClick={goDetail}>
				<div className="diary_date">{strDate}</div>
				<div className="diary_content_preview">
					{item.content.slice(0, 25)}
				</div>
			</div>
			<div className="btn_wrappter">
				{item.uid === user.email && (
					<MyButton
						text={"수정하기"}
						onClick={() => navigate(`/Edit/${item.id}`)}
					/>
				)}
			</div>
		</div>
	);
};

export default React.memo(DiaryItem);
