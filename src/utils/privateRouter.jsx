import { userNameRepository } from "../repository/userNameRepository";

const privateRouter = () => {
  const userName = userNameRepository.getUserName();
  if (!userName) {
    alert("로그인이 필요합니다");
    window.location.href = "/";
  }
};

export default privateRouter;
