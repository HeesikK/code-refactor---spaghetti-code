# 💻 Spaghetti Code Refactor

## 📌 router 분리
### router/router.jsx
 ```javascript
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import PostListPage from "../pages/Post.List";
import PostDetailPage from "../pages/Post.detail";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/posts", element: <PostListPage /> },
  { path: "/post-detail/:postId", element: <PostDetailPage /> },
]);
```
### 💡리팩토링 내용
+ App.jsx에서 관리하고 있던 router 로직을 분리하여 App.jsx에서 import해서 사용했습니다.

## 📌 재사용되는 값은 consts로
### consts/pageNation.jsx
 ```javascript
export const LIMIT_TAKE = 10;
export const LIMIT_PAGE = 10;
```
### consts/queryKey.jsx
 ```javascript
export const QUERY_KEY = {
  post: "post",
  posts: "posts",
  comments: "comments",
  weather: "weather",
};
```
### 💡리팩토링 내용
+ LIMIT_PAGE, LIMIT_TAKE 값은 pageNation에서 자주 재사용되는 값이므로 consts 폴더로 관리했습니다.
+ react-query를 사용하여 msw 데이터를 호출할때 사용되는 query-key값 또한 자주 재사용되므로 consts 폴더로 관리했습니다.
## 📌 msw 데이터 관리
### apis/api.jsx
 ```javascript
import axios from "axios";
import { weatherConfig } from "../third-party/weather.config";
import { LIMIT_PAGE, LIMIT_TAKE } from "../consts/pageNation";

export const getPostDetailPost = async () => {
  const response = await axios.get("/api/post");
  return response.data;
};

export const getPaginationPost = async (params) => {
  const response = await axios.get("/api/posts", {
    params: {
      page: params.get("page") ?? 1,
      take: params.get("take") ?? LIMIT_TAKE,
      limit: params.get("limit") ?? LIMIT_PAGE,
    },
  });
  return response.data;
};

export const getPaginationComment = async (params) => {
  const response = await axios.get("/api/comments", {
    params: {
      page: params.get("page") ?? 1,
      take: params.get("take") ?? LIMIT_TAKE,
      limit: params.get("limit") ?? LIMIT_PAGE,
    },
  });
  return response.data;
};

export const getWeather = async () => {
  try {
    const response = await axios.get("/getUltraSrtNcst", {
      baseURL: weatherConfig.api,
      params: {
        serviceKey: weatherConfig.secret_key,
        dataType: "JSON",
        base_date: new Date().toISOString().substring(0, 10).replace(/-/g, ""),
        base_time: "0600",
        nx: 60,
        ny: 127,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("failed load weather api");
  }
};

```
### components/pagenation/Pagenation.Comment.jsx
 ```javascript
  const { data: commentData } = useQuery([QUERY_KEY.comments, params.get("page")], () => getPaginationComment(params));
  const paginationData = commentData?.PageNation;
```
### components/pagenation/Pagenation.Post.jsx
 ```javascript
  const { data: postData } = useQuery([QUERY_KEY.posts, params.get("page")], () => getPaginationPost(params));
  const pageNationData = postData?.PageNation;
```
### pages/Home.jsx
 ```javascript
  const { data: weatherData } = useQuery([QUERY_KEY.weather], () => getWeather());
```
### pages/Post.Detail.jsx
 ```javascript
  const { data: postDetailData } = useQuery([QUERY_KEY.post], () => getPostDetailPost());
  const { data: commentData } = useQuery([QUERY_KEY.comments, params.get("page")], () => getPaginationComment(params));
  const paginationCommentData = commentData?.Comments;
```
### pages/Post.List.jsx
 ```javascript
  const { data: postData } = useQuery([QUERY_KEY.posts, params.get("page")], () => getPaginationPost(params));
  const paginationPostData = postData?.Posts;
```
### 💡리팩토링 내용
+ api와 관련된 로직은 api폴더에서 관리했습니다.
+ api 호출 함수(Post 로직)에 params 값을 전달하여 데이터를 호출하면 {PageNation:,Posts:} 형식으로 나오는데 이때 PageNation 값은 pagenation 폴더에서 Posts 값은 pages 폴더에서 사용했습니다.
+ api 호출 함수(Comment 로직)에 params 값을 전달하여 데이터를 호출하면 {PageNation:,Comments:} 형식으로 나오는데 이때 PageNation 값은 pagenation 폴더에서 Comments 값은 pages 폴더에서 사용했습니다.
