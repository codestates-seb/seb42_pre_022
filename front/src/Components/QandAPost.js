import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editPostActions } from "../Reducers/editPostReducer";
import { ReactComponent as UpVoteIcon } from "../assets/upVoteIcon.svg";
import { ReactComponent as DownVoteIcon } from "../assets/downVoteIcon.svg";
import { ReactComponent as BookmarkIcon } from "../assets/bookmarkIcon.svg";
import { ReactComponent as HistoryIcon } from "../assets/historyIcon.svg";
import styled from "styled-components";
import UserCard from "./UserCard";
import CommentsDiv from "./CommentsDiv";
import TagsDiv from "./TagsDiv";
import deleteData from "../util/deleteData";

const QAWrapDiv = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  > div:first-child {
    padding-right: 16px;
    vertical-align: top;
    grid-column: 1;
  }
  > div:nth-child(2) {
    > div:nth-child(2) {
      display: ${props => props.answer? "none" : "block"};
      margin: 24px 0 12px;
    }
  }

  padding: ${props => props.answer ? "16px 0 !important" : null};
  border-bottom: 1px solid var(${props => props.answer ? "--black-075" : ""});
`
const VoteContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  > div {
    display:flex;
    justify-content: center;
    color: var(--black-500);
    margin: 2px;
    font-size: 1.6rem;
  }
  .bookmark {
    padding: 4px 0;
  }
  
  .history {
    padding: 6px 0;
    margin: 0 auto;
    > svg {
      margin-left: -2px;
    }
  }
`
const VoteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  margin: 2px;
  > svg {
    fill: var(--black-200);
    vertical-align: bottom;
  }
`
const WriterRelatedDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 16px 0;
  font-size: 13px;
  color: var(--black-500);
  justify-content: flex-end;
  flex-flow: row wrap;
  > div {
    margin: 5px 0;
    > a {
      display:inline-block;
      cursor: pointer;
    }
  }
  .qapost {
    width: 96px;
    flex: 1 auto;
    margin-left: -4px;
    > a {
      color: var(--black-500);
      margin: -4px 4px;
      text-decoration: none;
    }
    > a:hover {
      color: var(--black-400);
    }
  }
`
const WriterCardDiv = styled.div`
  width: 200px;
  font-size: 12px;
  margin-top: 0 !important;
  padding: 7px;
  min-height: 64px;

  border-radius: ${props => props.iswriter ? "3px" : null};
  background-color: var(${props => props.iswriter ? "--powder" : null});
`
const QAbodydiv = styled.div`
  padding-right: 16px;
  font-size: 15px;
  line-height: 1.5;
  overflow-wrap: break-word;
  > p {
    margin-bottom: 1.1em;;
  }
  > pre {
    background-color: var(--highlight-bg);
    border-radius: 5px;
    color: var(--highlight-color);
    font-family: var(--ff-mono);
    font-size: 13px;
    line-height: 1.3;
    margin: 0;
    overflow: auto;
    padding: 12px;
    margin-bottom: 1.5em;
  }
`

function QandAPost({ question, answer }) {
  const {login} = useSelector(state => state.loginReducer);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const post = answer ? answer : question
  const id = answer? answer.answerId : question.questionId
  
  const saveAnswer = () => {
    dispatch(editPostActions.changeNowA(answer))
  }
  
  const deletePost = () => {
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      const url = answer ? "answers" : "questions"
      if (!post.answerCount) {
        deleteData(`/${url}/${id}`)
        .then(()=> alert("삭제되었습니다!"))
        .then(()=> navigate("/"))
      } else {
        alert("답변이 달린 질문글은 삭제할 수 없습니다.")
      }
    }
  }

  return (
    <QAWrapDiv answer={answer ? 1 : null}>
      <div>
        <VoteContainerDiv>
          <VoteButton><UpVoteIcon></UpVoteIcon></VoteButton>
          <div>0</div>
          <VoteButton><DownVoteIcon></DownVoteIcon></VoteButton>
          <VoteButton className="bookmark"><BookmarkIcon></BookmarkIcon></VoteButton>
          <VoteButton className="history"><HistoryIcon></HistoryIcon></VoteButton>
        </VoteContainerDiv>
      </div>
      <div>
        <QAbodydiv dangerouslySetInnerHTML={{__html: post.body}}>
        </QAbodydiv>
        <TagsDiv />
        <WriterRelatedDiv writer={1}>
          <div className="qapost"><a>Share</a>{login ? <Link onClick={answer? saveAnswer : null} to={`/${answer? "answers":"questions"}/${id}/edit`}>Edit</Link> : null}<a>Follow</a>{login ? <a onClick={deletePost}>Delete</a> : null}</div>
          <WriterCardDiv className="card" iswriter={null}>
            <span className="linktext">{post.modifiedAt? `edited ${post.modifiedAt}Feb 13 at 6:24`: null}</span>
          </WriterCardDiv>
          <WriterCardDiv className="qawriter card" iswriter={1}>
            <div>asked {post.createdAt}Feb 10 at 18:04</div>
            <UserCard username={post.displayName} reputation="100" />
          </WriterCardDiv>
        </WriterRelatedDiv>
      </div>
      <span></span>
      <CommentsDiv />
    </QAWrapDiv>
  )
}

export default QandAPost;