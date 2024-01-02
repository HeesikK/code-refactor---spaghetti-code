import { useEffect } from "react";
import PostPageNation from "../components/pagenation/Pagenation.Post";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { QUERY_KEY } from "../consts/queryKey";
import { getPaginationPost } from "../apis/api";
import useDiaLog from "../hooks/useDiaLog";
import privateRouter from "../utils/privateRouter";

const PostListPage = () => {
  const [params] = useSearchParams();
  const { onClickPost } = useDiaLog();
  const { data: postData } = useQuery([QUERY_KEY.posts, params.get("page")], () => getPaginationPost(params));
  const paginationPostData = postData?.Posts;

  useEffect(() => {
    privateRouter();
  }, []);

  return (
    <table>
      <caption>Post List Page</caption>
      <tr>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
      </tr>
      {paginationPostData?.map((post) => (
        <tr key={post.id} onClick={() => onClickPost(post.id)}>
          <td>{post.title}</td>
          <td>{post.content}</td>
          <td>{post.User.nickName}</td>
        </tr>
      ))}
      <PostPageNation />
    </table>
  );
};
export default PostListPage;
