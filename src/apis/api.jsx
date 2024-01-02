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
