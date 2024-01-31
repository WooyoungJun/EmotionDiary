import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
import Toggle from "./Toggle";

const DiaryEditor = ({ isEdit, originData }) => {
	const { user } = useContext(DiaryStateContext);
	const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

	const navigate = useNavigate();
	const contentRef = useRef();

	const [date, setDate] = useState(getStringDate(new Date()));
	const [emotion, setEmotion] = useState(3);
	const [content, setContent] = useState("");
	const [isPrivate, setPrivate] = useState(true);

	const handleEmotion = useCallback((emotion) => {
		setEmotion(emotion);
	}, []);

	const handleSubmit = useCallback(() => {
		if (content.length < 1) {
			contentRef.current.focus();
			return;
		}
		if (
			window.confirm(
				isEdit
					? "일기를 수정하시겠습니까?"
					: "새로운 일기를 작성하시겠습니까?"
			)
		) {
			const makeDate = new Date().getTime();
			if (isEdit) {
				onEdit(originData.id, makeDate, emotion, content, isPrivate);
			} else {
				onCreate(user, makeDate, emotion, content, isPrivate);
			}
			navigate("/Home", { replace: true });
		}
	}, [
		user,
		emotion,
		content,
		isPrivate,
		isEdit,
		navigate,
		onCreate,
		onEdit,
		originData,
	]);

	const handleRemove = useCallback(() => {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			onRemove(originData.id);
			navigate("/Home", { replace: true });
		}
	}, [onRemove, navigate, originData]);

	// 마운트
	useEffect(() => {
		if (isEdit) {
			setDate(getStringDate(new Date(parseInt(originData.date))));
			setEmotion(originData.emotion);
			setContent(originData.content);
			setPrivate(originData.isPrivate);
		}
	}, [setDate, setEmotion, setContent, setPrivate, isEdit, originData]);

	return (
		<div className="DiaryEditor">
			<MyHeader
				headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
				leftChild={
					<MyButton
						text={"< 뒤로가기"}
						onClick={() => navigate(-1)}
					/>
				}
				rightChild={
					isEdit &&
					originData.id === user.email && (
						<MyButton
							text={"삭제하기"}
							type={"negative"}
							onClick={handleRemove}
						/>
					)
				}
			/>
			<div>
				<section>
					<h4>오늘의 날짜</h4>
					<div className="input_box">
						<input
							className="input_date"
							type="date"
							value={date}
							onChange={(e) => {
								setDate(e.target.value);
							}}
							readOnly
						/>
					</div>
				</section>
				<section>
					<h4>오늘의 감정</h4>
					<div className="emotion_list_wrapper">
						{emotionList.map((it) => {
							return (
								<EmotionItem
									key={it.emotion_id}
									{...it}
									onClick={handleEmotion}
									isSelected={it.emotion_id === emotion}
								/>
							);
						})}
					</div>
				</section>
				<section>
					<h4>오늘의 일기</h4>
					<div className="input_box text_wrapper">
						<textarea
							ref={contentRef}
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="오늘은 어땠나요?"
						/>
					</div>
				</section>
				<section>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							marginBottom: "10px",
						}}
					>
						<Toggle
							isPrivate={isPrivate}
							setPrivate={setPrivate}
							trueTitle={"private"}
							falseTitle={"public"}
						/>
					</div>
					<div className="control_box">
						<MyButton
							text={"취소하기"}
							onClick={() => navigate(-1)}
						/>
						<MyButton
							text={"작성완료"}
							type={"positive"}
							onClick={handleSubmit}
						/>
					</div>
				</section>
			</div>
		</div>
	);
};

export default DiaryEditor;
