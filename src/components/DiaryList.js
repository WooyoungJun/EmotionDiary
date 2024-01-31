import React, { useContext, useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import { DiaryStateContext } from "../App";

const sortOptionList = [
	{ value: "latest", name: "최신순" },
	{ value: "oldest", name: "오래된순" },
];

const firstFilterOptionList = [
	{ value: "all", name: "모두 보기" },
	{ value: "onlyMine", name: "내 글만 보기" },
];

const secondFilterOptionList = [
	{ value: "all", name: "전부다" },
	{ value: "good", name: "좋은 감정만" },
	{ value: "bad", name: "나쁜 감정만" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
	return (
		<select
			className="ControlMenu"
			value={value}
			onChange={(e) => onChange(e.target.value)}
		>
			{optionList.map((it, idx) => (
				<option key={idx} value={it.value}>
					{it.name}
				</option>
			))}
		</select>
	);
});

const DiaryList = ({ diaryList }) => {
	const { user } = useContext(DiaryStateContext);
	const navigate = useNavigate();
	const [sortType, setSortType] = useState("latest");
	const [firstFilter, setFirstFilter] = useState("all");
	const [secondFilter, setSecondFilter] = useState("all");

	const getProcessDiaryList = () => {
		const firstFilterCallBack = (item) => {
			const isMine = item.uid === user.email;
			if (firstFilter === "onlyMine") return isMine;
			else return isMine || item.isPrivate === false;
		};

		const secondFilterCallBack = (item) => {
			if (firstFilter === "good") {
				return parseInt(item.emotion) <= 3;
			} else {
				return parseInt(item.emotion) > 3;
			}
		};

		const compare = (a, b) => {
			if (sortType === "latest") {
				return parseInt(b.date) - parseInt(a.date);
			} else {
				return parseInt(a.date) - parseInt(b.date);
			}
		};

		const copyList = JSON.parse(JSON.stringify(diaryList));
		const firstFilterList = copyList.filter((it) =>
			firstFilterCallBack(it)
		);

		const filterdList =
			secondFilter === "all"
				? firstFilterList
				: firstFilterList.filter((it) => secondFilterCallBack(it));

		const sortedList = filterdList.sort(compare);
		return sortedList;
	};

	return (
		<div className="DiaryList">
			<div className="menu_wrapper">
				<div className="left_col">
					<ControlMenu
						value={sortType}
						onChange={setSortType}
						optionList={sortOptionList}
					/>
					<ControlMenu
						value={firstFilter}
						onChange={setFirstFilter}
						optionList={firstFilterOptionList}
					/>
					<ControlMenu
						value={secondFilter}
						onChange={setSecondFilter}
						optionList={secondFilterOptionList}
					/>
				</div>
				<div className="rigth_col">
					<MyButton
						type={"positive"}
						text={"새 일기 쓰기"}
						onClick={() => navigate("/New")}
					/>
				</div>
			</div>
			{getProcessDiaryList().map((it) => {
				return <DiaryItem key={it.id} item={{ ...it }} />;
			})}
		</div>
	);
};

DiaryList.defaultProps = {
	diaryList: [],
};

export default DiaryList;
