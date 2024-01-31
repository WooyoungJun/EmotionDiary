import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const Diary = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const data = location.state.item;
	const { user } = useContext(DiaryStateContext);

	useEffect(() => {
		const titleElement = document.getElementsByTagName("title")[0];
		titleElement.innerHTML = `감정 일기장 - ${data.id}번 일기`;
	}, [data]);

	if (!data) {
		return <div className="DiaryPage">로딩중입니다...</div>;
	} else {
		const curEmotion = emotionList.find(
			(it) => parseInt(data.emotion) === parseInt(it.emotion_id)
		);
		return (
			<div className="DiaryPage">
				<MyHeader
					headText={`${getStringDate(new Date(data.date))} 기록`}
					leftChild={
						<MyButton
							text={"< 뒤로가기"}
							onClick={() => navigate(-1)}
						/>
					}
					rightChild={
						data.uid === user.email && (
							<MyButton
								text={"수정하기"}
								onClick={() => navigate(`/edit/${data.id}`)}
							/>
						)
					}
				/>
				<article>
					<section>
						<h4>오늘의 감정</h4>
						<div className={curEmotion.emotion_className}>
							<img
								src={curEmotion.emotion_img}
								alt="감정 이미지"
							/>
							<div className="emotion_descript">
								{curEmotion.emotion_descript}
							</div>
						</div>
					</section>
					<section>
						<h4>오늘의 일기</h4>
						<div className="diary_content_wrapper">
							<p>{data.content}</p>
						</div>
					</section>
				</article>
			</div>
		);
	}
};

export default Diary;
