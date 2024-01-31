import { useCallback, useContext, useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
	const { data: diaryList } = useContext(DiaryStateContext);
	const { setUser } = useContext(DiaryDispatchContext);
	const [data, setData] = useState([]);
	const [curDate, setCurDate] = useState(new Date());
	const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	// 마운트
	useEffect(() => {
		const titleElement = document.getElementsByTagName("title")[0];
		titleElement.innerHTML = `감정 일기장`;
		setIsLoading(true);
	}, []);

	// 업데이트
	useEffect(() => {
		if (!diaryList) return;
		if (diaryList.length === 0) return setData([]);
		const firstDay = new Date(
			curDate.getFullYear(),
			curDate.getMonth(),
			1
		).getTime();
		const lastDay = new Date(
			curDate.getFullYear(),
			curDate.getMonth() + 1,
			0,
			23,
			59,
			59
		).getTime();
		setData(
			diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
		);
	}, [diaryList, curDate]);

	const increaseMonth = useCallback(() => {
		setCurDate(
			(curDate) =>
				new Date(
					curDate.getFullYear(),
					curDate.getMonth() + 1,
					curDate.getDate()
				)
		);
	}, []);

	const decreaseMonth = useCallback(() => {
		setCurDate(
			(curDate) =>
				new Date(
					curDate.getFullYear(),
					curDate.getMonth() - 1,
					curDate.getDate()
				)
		);
	}, []);

	const handleLogout = useCallback(() => {
		if (window.confirm("로그아웃 하시겠습니까?")) {
			localStorage.removeItem("user");
			setUser(null);
			navigate("/Login", { replace: true });
			window.alert("로그아웃 되었습니다.");
		}
	}, [navigate, setUser]);

	return isLoading ? (
		<div>
			<MyHeader
				headText={headText}
				leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
				rightChild={<MyButton text={">"} onClick={increaseMonth} />}
			/>
			<DiaryList diaryList={data} />
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					marginTop: "20px",
				}}
			>
				<MyButton
					text={"Logout"}
					type={"negative"}
					onClick={handleLogout}
				/>
			</div>
		</div>
	) : (
		<Loading />
	);
};

export default Home;
