const env = process.env;
const public_url = env.PUBLIC_URL || "";

export const emotionList = [
	{
		emotion_id: 1,
		emotion_className: "emotion_img_wrapper emotion_img_wrapper_1",
		emotion_img: public_url + `/assets/emotion1.png`,
		emotion_descript: "완전 좋음",
	},
	{
		emotion_id: 2,
		emotion_className: "emotion_img_wrapper emotion_img_wrapper_2",
		emotion_img: public_url + `/assets/emotion2.png`,
		emotion_descript: "좋음",
	},
	{
		emotion_id: 3,
		emotion_className: "emotion_img_wrapper emotion_img_wrapper_3",
		emotion_img: public_url + `/assets/emotion3.png`,
		emotion_descript: "그럭저럭",
	},
	{
		emotion_id: 4,
		emotion_className: "emotion_img_wrapper emotion_img_wrapper_4",
		emotion_img: public_url + `/assets/emotion4.png`,
		emotion_descript: "나쁨",
	},
	{
		emotion_id: 5,
		emotion_className: "emotion_img_wrapper emotion_img_wrapper_5",
		emotion_img: public_url + `/assets/emotion5.png`,
		emotion_descript: "끔찍함",
	},
];
