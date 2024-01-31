import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import { auth } from "../firebase";
import MyHeader from "./MyHeader";
import { DiaryDispatchContext } from "../App";
import Loading from "./Loading";

const EmailAndPasswordForm = ({ text }) => {
	const { setUser } = useContext(DiaryDispatchContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const navigate = useNavigate();
	const [backButton, setBack] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const backFunc = useCallback(() => {
		if (text !== "Login") navigate("/Login", { replace: true });
	}, [navigate, text]);

	// 마운트 시 backButton 구성
	useEffect(() => {
		setBack(
			text !== "Login" ? (
				<MyButton text={"<"} onClick={backFunc} />
			) : (
				<div />
			)
		);
		setIsLoading(true);
	}, [backFunc, text]);

	const handleEmail = useCallback((e) => setEmail(e.target.value), []);

	const handlePassword = useCallback((e) => setPassword(e.target.value), []);

	const handleSignIn = useCallback(
		async (email, password) => {
			if (email !== "" && password !== "") {
				try {
					const userCredential = await signInWithEmailAndPassword(
						auth,
						email,
						password
					);
					localStorage.setItem(
						"user",
						JSON.stringify(userCredential.user)
					);
					setUser(userCredential.user);
					alert("로그인 완료");
					navigate("/Home", { replace: true });
				} catch (error) {
					setMsg(error.code);
					console.log(error.code);
				}
			} else {
				alert("모든 항목을 입력하세요.");
			}
		},
		[navigate, setUser]
	);

	const handleSignUp = useCallback(
		async (email, password) => {
			if (email !== "" && password !== "") {
				try {
					const userCredential = await createUserWithEmailAndPassword(
						auth,
						email,
						password
					);
					localStorage.setItem(
						"user",
						JSON.stringify(userCredential.user)
					);
					setUser(userCredential.user);
					alert("회원가입 완료");
					navigate("/Home", { replace: true });
				} catch (error) {
					setMsg(error.code);
					console.log(error.code);
				}
			} else {
				alert("모든 항목을 입력하세요.");
			}
		},
		[navigate, setUser]
	);

	const handleSign = useCallback(() => {
		text === "Login"
			? handleSignIn(email, password)
			: handleSignUp(email, password);
	}, [handleSignIn, handleSignUp, text, email, password]);

	return isLoading ? (
		<div className="LoginPage">
			<section className="login_wrapper">
				<MyHeader
					headText={`Emotion Diary ${text}`}
					leftChild={backButton}
				/>
				<h4>Email</h4>
				<input
					className="text_input"
					type="text"
					value={email}
					onChange={handleEmail}
				/>
				<h4>Password</h4>
				<input
					className="text_input"
					type="password"
					value={password}
					onChange={handlePassword}
				/>
				<MyButton text={text} onClick={handleSign} />
				<p
					style={{
						color: "red",
						fontWeight: "bold",
						fontSize: "22px",
					}}
				>
					{msg}
				</p>
				{text === "Login" ? (
					<h1>
						Don't have an account?{"        "}
						<MyButton
							text={"회원가입"}
							onClick={() => navigate("/SignUp")}
						/>
					</h1>
				) : (
					<div />
				)}
			</section>
		</div>
	) : (
		<Loading />
	);
};

export default EmailAndPasswordForm;
