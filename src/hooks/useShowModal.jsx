import { useState } from "react";

const useShowModal = () => {
  const [isOpenCommentList, setIsOpenCommentList] = useState(false);

  const onClickMoreComments = async () => {
    setIsOpenCommentList(true);
  };

  const onClickHiddenComments = () => {
    setIsOpenCommentList(false);
  };

  return { isOpenCommentList, onClickMoreComments, onClickHiddenComments };
};

export default useShowModal;
