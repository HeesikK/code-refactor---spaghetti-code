import { useSearchParams } from "react-router-dom";
import { QUERY_KEY } from "../../consts/queryKey";
import { useQuery } from "react-query";
import { getPaginationPost } from "../../apis/api";
import { LIMIT_PAGE } from "../../consts/pageNation";

const PostPageNation = () => {
  const [params, setParams] = useSearchParams();
  const { data: postData } = useQuery([QUERY_KEY.posts, params.get("page")], () => getPaginationPost(params));
  const pageNationData = postData?.PageNation;

  const onClickPage = (page) => {
    setParams({
      page,
    });
  };

  const isPrevPageVisible = pageNationData?.startPage !== 1;
  const isNextPageVisible = Math.ceil(pageNationData?.currentPage / LIMIT_PAGE) !== Math.ceil(pageNationData?.totalPage / LIMIT_PAGE);

  return (
    <div>
      {isPrevPageVisible && <button onClick={() => setParams({ page: pageNationData.startPage - 1 })}>이전</button>}
      {pageNationData &&
        Array(pageNationData.endPage - pageNationData.startPage + 1)
          .fill()
          .map((_, i) => pageNationData.startPage + i)
          .map((page) => (
            <button key={page} onClick={() => onClickPage(page)}>
              {page}
            </button>
          ))}
      {isNextPageVisible && <button onClick={() => setParams({ page: pageNationData.endPage + 1 })}>다음</button>}
    </div>
  );
};
export default PostPageNation;
