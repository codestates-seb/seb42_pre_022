import { CmtTextarea } from "../Styles/Divs";
import { useRef, useEffect } from "react";

function CommentTextarea({ setComment, writeMode, writeComment }) {
  const textareaRefa = useRef();

  const handleResizeHeight = () => {
    textareaRefa.current.style.height = 'auto';
    textareaRefa.current.style.height = textareaRefa.current.scrollHeight + 1 + 'px'
  }

  const handleComment = (e) => {
    setComment(e.target.value);
    handleResizeHeight();
  }

  useEffect(() => {
    if (writeMode) {
      textareaRefa.current.focus();
    }
  }, [writeMode])
  
  return (
    <>
      <CmtTextarea ref={textareaRefa} onChange={handleComment} defaultValue={writeComment}/>
      {writeComment.length > 100 && <p className="error">코멘트는 100자까지 입력할 수 있습니다</p>}
    </>
  )

}

export default CommentTextarea;
