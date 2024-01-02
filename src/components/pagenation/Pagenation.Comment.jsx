import { useSearchParams } from "react-router-dom";
import { QUERY_KEY } from "../../consts/queryKey";
import { useQuery } from "react-query";
import { getPaginationComment } from "../../apis/api";
import { LIMIT_PAGE } from "../../consts/pageNation";

const CommentPageNation = () => {
  const [params, setParams] = useSearchParams();
  const { data: commentData } = useQuery([QUERY_KEY.comments, params.get("page")], () => getPaginationComment(params));
  const paginationData = commentData?.PageNation;

  const onClickPage = (page) => {
    setParams({
      page,
    });
  };

  const isPrevPageVisible = paginationData?.startPage !== 1;
  const isNextPageVisible = Math.ceil(paginationData?.currentPage / LIMIT_PAGE) !== Math.ceil(paginationData?.totalPage / LIMIT_PAGE);

  return (
    <div>
      {isPrevPageVisible && <button onClick={() => setParams({ page: paginationData.startPage - 1 })}>이전</button>}
      {paginationData &&
        Array(paginationData.endPage - paginationData.startPage + 1)
          .fill()
          .map((_, i) => paginationData.startPage + i)
          .map((page) => (
            <button key={page} onClick={() => onClickPage(page)}>
              {page}
            </button>
          ))}
      {isNextPageVisible && <button onClick={() => setParams({ page: paginationData.endPage + 1 })}>다음</button>}
    </div>
  );
};
export default CommentPageNation;
