import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { QUERY_KEY } from "../consts/queryKey";
import { getWeather } from "../apis/api";
import { userNameRepository } from "../repository/userNameRepository";
import useDiaLog from "../hooks/useDiaLog";
import { S } from "./style";

const HomePage = () => {
  const [isBackGroundBlur, setIsBackGroundBlur] = useState(true);
  const { data: weatherData } = useQuery([QUERY_KEY.weather], () => getWeather());
  const { onPressNavigateBlog } = useDiaLog();

  useEffect(() => {
    const userName = userNameRepository.getUserName();
    if (!userName) {
      return setIsBackGroundBlur(true);
    } else setIsBackGroundBlur(false);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const userName = e.target.userName.value.trim();
    if (!userName) return alert("이름을 입력해주세요");
    userNameRepository.setUserName(userName);
    setIsBackGroundBlur(false);
    e.target.userName.value = "";
  };

  return (
    <>
      {isBackGroundBlur && (
        <S.BlurBackGround>
          <S.UserNameForm onSubmit={onSubmit}>
            <input type="text" name="userName" placeholder="Enter your name" />
            <button type="submit">Submit</button>
          </S.UserNameForm>
        </S.BlurBackGround>
      )}
      <div>
        <h1>Home Page</h1>
        <p>오늘의 기온</p>
        {/* <p>{weather?.find((el) => el.category === "T1H").obsrValue}도</p> */}
        <S.Button onClick={onPressNavigateBlog}>블로그 보러가기</S.Button>
      </div>
    </>
  );
};
export default HomePage;
