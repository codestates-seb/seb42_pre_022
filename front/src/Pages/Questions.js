import styled from "styled-components";
import QuestionsList from "../Components/QuestionsList";
import { BasicBlueButton } from "../Styles/Buttons";
import Aside from "../Components/Aside";
import { useEffect, useState, useMemo } from "react";
import ExpandableFilterform from "../Components/ExpandableFilterForm";
import { useSelector, useDispatch } from "react-redux";
import { filteringBy } from "../Reducers/filterquestionReducer";
import useGET from "../util/useGET";
import axios from "axios";
import PaginationLeft from "../Components/PaginationLeft";
import PaginationRight from "../Components/PaginationRight";
import { filteringposts } from "../util/filteringposts";
import { setTotalposts } from "../Reducers/paginationReducer";


const QuestionsContainer = styled.div`
  >div:nth-child(1){
    width: calc(100% - 300px - 24px);
    float: left;
    @media screen and (max-width: 980px){
    width: 100%;
    float: none;
    }
  }
  >div:nth-child(2){
    float: right;
    @media screen and (max-width: 980px){
    float: none;
    clear: both;
    margin: 0 auto;
    width: 100%;
    }
  }
`
const PageHeader = styled.div`
  display: flex;
  margin-bottom: 12px;
  flex-wrap: wrap;
  vertical-align: baseline;
  >h1{
    font-size: 2.07692308rem;
    margin: 0 0 1em;
    margin-right: 12px;
    margin-bottom: 12px;
    line-height: 1.3;
    flex: 1 auto;
    font-weight: normal;
  }
  >div{
    margin-bottom: 12px;
    >a{
      position: relative;
      display: inline-block;
      padding: 0.8em;
    }
  }
`
const QuestionsH2 = styled.div`
  display: flex;
  margin-bottom: 12px;
  align-items: center;
  justify-content: space-between;
  .data{
    font-size: 1.30769231rem;
    margin-right: 12px;
    flex: 1 auto;
  }
`
const DataControllerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const DataController = styled.div`
  vertical-align: baseline;
  font-size: 100%;
  margin-right: 16px;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 1px;
`

const DataControllerBtn = styled.a`
  display: ${(props) => props.end ? "inline-block" : "flex"};
  border: 1px solid transparent;
  border-radius: ${(props) => props.middle ? "0" : "3px"};
  border-top-left-radius: ${(props) => props.end ? "0" : null};
  border-top-right-radius: ${(props) => props.start ? "0" : null};
  border-bottom-right-radius: ${(props) => props.start ? "0" : null};
  border-bottom-left-radius: ${(props) => props.end ? "0" : null};
  margin-right: ${(props) => props.end ? "0" : "-1px"};
  margin-bottom: -1px;
  z-index: 25;
  box-shadow: none;
  border-color: var(--black-400);
  background-color: ${(props) => props.selected ? "var(--black-075)" : "transparent"};
  color: ${(props) => props.selected ? "var(--black-700)" : "var(--black-500)"};
  white-space: nowrap;
  font-size: 12px;
  padding: 0.8em;
  padding-right: ${(props) => props.end ? "calc(.8em * 2.5)" : null};
  cursor: pointer;
  line-height: 15/13;
  position: relative;
  outline: none;
  text-align: center;
  text-decoration: none;
  user-select: none;
  :nth-child(3):after{
    border-color: currentColor transparent;
    border-style: solid;
    border-width: 4px;
    border-bottom-width: 0;
    content: "";
    pointer-events: none;
    position: absolute;
    right: 0.8em;
    top: calc(50% - 2px);
    z-index: 30;
  }
`


const Dropdown = styled.div`
`

const FilterBtn = styled.div`
  a{
  padding: 0.8em;
  display: inline-block;
  position: relative;
  outline: none;
  text-align: center;
  text-decoration: none;
  user-select: none;
  font-size: 12px;
  outline: none;
  text-align: center;
  text-decoration: none;
  user-select: none;
  }
  svg{
  width: 18px;
  height: 18px;
  vertical-align: baseline;
  margin-top: -0.3em;
  margin-bottom: -0.3em;
  transition: opacity 200ms cubic-bezier(.165, .84, .44, 1);
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  user-select: none;
  white-space: nowrap;
  }
  path{
    fill: currentColor;
  }
`

const QuestionsContent = styled.div`
  width: auto;
  float: none;
  margin: 0 0 20px -24px;
  border-top: 1px solid var(--black-100);
  @media screen and (max-width: 980px) {
    margin-left: -16px;
    margin-right: -16px;
    width: calc(100% + 2px * 16px);
  }
`



function Questions() {
  const filter = useSelector((state)=> state.filter);
  const pages = useSelector((state)=> state.pages);
  const dispatch = useDispatch();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const filterOpenHandler = () => {
    setFilterOpen(!isFilterOpen)
  }
  const filteringHandler = (keyword) => {
    dispatch(filteringBy(keyword))
  }

  const [posts, error] = useGET('/questions')
  const [filteredposts, setFilteredposts] = useState(allquestions);
  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}${url}`)
      setData(response.data.body.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}${url}`)
      .then((allquestions)=>{


      })
    setFilteredposts(filteringposts(data,filter))
    dispatch(setTotalposts(data.length))
  }, []);
  // const filteredposts = useMemo(
  //   () => filteringposts(data, filter),
  //   [filter]
  // );
  const start=(pages.currentpage-1)*pages.pagesize
  const end=start+pages.pagesize
  const onepage = filteredposts.slice(start, end)
  return (
    <div className="content">
      <QuestionsContainer>
        <div>
          <PageHeader>
            <h1>All Questions</h1>
            <div>
              <BasicBlueButton>Ask Questions</BasicBlueButton>
            </div>
          </PageHeader>
          <div>
            <QuestionsH2>
              <div className="data">23,502,787 questions</div>
              <div>
                <DataControllerBox>
                  <DataController>
                    <DataControllerBtn onClick={()=>filteringHandler('newest')} start={1} selected={filter.newest}><div>Newest</div></DataControllerBtn>
                    <DataControllerBtn onClick={()=>filteringHandler('unanswered')} middle="true" selected={filter.unanswered} ><div>Unanswered</div></DataControllerBtn>
                    <DataControllerBtn end="true" >More</DataControllerBtn>
                  </DataController>
                  <Dropdown />
                  <FilterBtn onClick={filterOpenHandler}>
                    <BasicBlueButton skyblue={1}><svg viewBox="0 0 18 18"><path d="M2 4h14v2H2V4Zm2 4h10v2H4V8Zm8 4H6v2h6v-2Z" /></svg> Filter 
                    </BasicBlueButton>
                  </FilterBtn>
                </DataControllerBox>
              </div>
            </QuestionsH2>
            <ExpandableFilterform isFilterOpen={isFilterOpen} filter={filter} dispatch={dispatch}/> 
          </div>
          <QuestionsContent>
          {/* fetch전에도 랜더링 되게 하는게 맞을까 초기값 null 로두고 랜더링 안되게하는게 좋을까... */}
            {onepage.map(ele=>{
              return <QuestionsList key={ele.questionId} title={ele.title} body={ele.body} createdAt={ele.createdAt} viewCount={ele.viewCount} answerCount={ele.answerCount}/>
            })}
          </QuestionsContent>
          <PaginationLeft />
          <PaginationRight />
        </div>
        <Aside />
      </QuestionsContainer>
    </div>
  )
}

export default Questions;