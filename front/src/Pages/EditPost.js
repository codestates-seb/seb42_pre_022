import styled from "styled-components";
import Aside from "../Components/Aside";
import TagsDiv from "../Components/TagsDiv";
import CommentsDiv from "../Components/CommentsDiv";
import WriteBoard from "../Components/WriteBoard";
import { SearchInput } from "../Components/SearchBar";
import { useParams, useLocation, Link } from "react-router-dom";
import { BasicBlueButton } from "../Styles/Buttons";
import useGET from "../util/useGET";
import patchData from "../util/patchData";

const EditContainerMain = styled.main`
  display: table;
  width: 100%;
  > div:nth-child(2) {
    float: right;
  }
  @media only screen and (max-width: 980px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
      float: none !important;
    }
    > div:nth-child(2) {
      margin: 5px 0;
    }
  }
`
const EditPostDiv = styled.div`
  width: calc(100% - 326px);
  float: left;
  > label {
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 4px;
    font-size: 1.15rem;
    color: var(--black-900);
    font-weight:600;
    padding: 0 2px;
  }
  > input {
    width: 100%;
    padding-left: 0.7em;
  }
  .submit {
    display: flex;
    align-items: center;
    margin-top: 20px;
    > a {
      padding: 8px 0.8em;
      margin: 0 4px;
      cursor: pointer;
    }
  }
  @media only screen and (max-width: 980px) {
    float: none !important;
    width: 100% !important;
  }
`

function EditPost() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const [question] = useGET(`/questions/${id}`)
  // console.log({ pathname, id, question })
  const patchPost = () => {
    patchData(`/questions/${id}`, {title:"제목4 수정", body: "본문4 수정"})
  }
  return (
    <div className="content">
      <EditContainerMain>
        <EditPostDiv>
          <label for="title">Title</label>
          <SearchInput id="title" defaultValue={question.title} />
          <label>Body</label>
          <WriteBoard defaultValue={question.body} />
          <label>Tags</label>
          <TagsDiv />
          <div className="submit">
            <BasicBlueButton onClick={patchPost} to={`/questions/${id}`}>Save edits</BasicBlueButton>
            <Link className="linktext" to={`/questions/${id}`}>Cancel</Link>
          </div>
          <CommentsDiv />
        </EditPostDiv>
        <Aside />
      </EditContainerMain>
    </div>
  )
}

export default EditPost;