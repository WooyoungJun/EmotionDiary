import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "./firebase";
import {
	doc,
	query,
	collection,
	getDocs,
	setDoc,
	orderBy,
	limit,
	deleteDoc,
	updateDoc,
} from "firebase/firestore";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Loading from "./components/Loading";

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const App = () => {
	const [user, setUser] = useState();
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	// const [idxNav, setIdxNav] = useState("/Login");

	const navigate = useCallback(useNavigate(), []);

	const getData = () => {
		const getFireStoreData = async () => {
			try {
				const querySnapshot = await getDocs(
					query(collection(db, "diary"), orderBy("id", "desc"))
				);
				if (querySnapshot.size === 0) return [];
				return querySnapshot.docs.map((doc) => doc.data());
			} catch (error) {
				console.log("Error fetching data from Firestore:", error);
				return [];
			}
		};
		getFireStoreData().then((result) => setData(result));
	};

	// App 생성 시 초기 설정(INIT)
	useEffect(() => {
		const init = () => {
			// 저장된 user 없으면 login(현재 창) 유지
			if (localStorage.getItem("user") === null) {
				return setIsLoading(true);
			}

			// 저장된 user 불러오기(자동 로그인)
			const curUser = JSON.parse(localStorage.getItem("user"));
			setUser(curUser);
			getData();
			navigate("/Home");
			setIsLoading(true);
		};
		init();
	}, [navigate]);

	const onCreate = useCallback(
		async (user, date, emotion, content, isPrivate) => {
			try {
				const diaryCollectionRef = collection(db, "diary");
				const querySnapshot = await getDocs(
					query(diaryCollectionRef, orderBy("id", "desc"), limit(1))
				);
				const idSnapShot = querySnapshot.docs[0];
				const currentCnt = idSnapShot ? idSnapShot.data().id : 0;
				const newItem = {
					date,
					emotion,
					content,
					isPrivate,
					uid: user.email,
					id: currentCnt + 1,
				};
				console.log(newItem);
				try {
					await setDoc(
						doc(diaryCollectionRef, `${newItem.id}`),
						newItem
					);
				} catch (error) {
					console.log("Error in setDoc: ", error);
				}
				console.log(`create 완료`);
			} catch (err) {
				console.log("Error in Get Diary: ", err);
			}
			getData();
		},
		[]
	);

	const onRemove = useCallback(async (targetId) => {
		try {
			const diaryCollectionRef = collection(db, "diary");
			const diaryDocRef = doc(diaryCollectionRef, `${targetId}`);
			try {
				await deleteDoc(diaryDocRef);
				console.log(
					`Document with id ${targetId} successfully removed.`
				);
			} catch (error) {
				console.log("Error removing document : ", error);
			}

			console.log(`Remove 완료: ${targetId}`);
		} catch (err) {
			console.log("Error in Remove Diary: ", err);
		}
		getData();
	}, []);

	const onEdit = useCallback(
		async (targetId, date, emotion, content, isPrivate) => {
			try {
				const diaryCollectionRef = collection(db, "diary");
				const diaryDocRef = doc(diaryCollectionRef, `${targetId}`);
				try {
					await updateDoc(diaryDocRef, {
						modifyDate: date,
						emotion,
						content,
						isPrivate,
					});
					console.log(
						`Document id ${targetId} successfully updated.`
					);
				} catch (error) {
					console.log("Error updating document : ", error);
				}

				console.log(`Edit 완료: ${targetId}`);
			} catch (err) {
				console.log("Error in Edit Diary: ", err);
			}
			getData();
		},
		[]
	);

	return isLoading ? (
		<DiaryStateContext.Provider value={{ data, user }}>
			<DiaryDispatchContext.Provider
				value={{ onCreate, onEdit, onRemove, setUser }}
			>
				<div className="App">
					<Routes>
						<Route index element={<Navigate to="/Login" />} />
						<Route path="/Login" element={<Login />} />
						<Route path="/SignUp" element={<SignUp />} />
						<Route path="/Home" element={<Home />} />
						<Route path="/New" element={<New />} />
						<Route path="/Edit/:id" element={<Edit />} />
						<Route path="/Diary/:id" element={<Diary />} />
					</Routes>
				</div>
			</DiaryDispatchContext.Provider>
		</DiaryStateContext.Provider>
	) : (
		<Loading />
	);
};

export default App;
