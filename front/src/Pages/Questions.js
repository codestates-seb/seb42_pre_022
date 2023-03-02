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
import { allquestions, filteringposts, sortingposts } from "../util/filteringposts";
import { selectPage, setTotalposts } from "../Reducers/paginationReducer";
import { Link } from "react-router-dom";
import NoResult from "../Components/NoResult";


const QuestionsContainer = styled.div`
  max-width: 1100px;
  width: calc(100% - 164px);
  border: 1px solid var(--black-100);
  background-color: var(--white);
  border-top-width: 0;
  border-bottom-width: 0;
  border-left-width: 1px;
  border-right-width: 0;
  padding: 24px;
  @media screen and (max-width: 980px){
  padding-left: 16px;
  padding-right: 16px;
  }
  @media screen and (max-width: 640px){
  width: 100%;
  border: none;
  }
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
  margin-right: ${(props) => props.noFilter ?null :"16px"};
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 1px;
`

export const DataControllerBtn = styled.a`
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
  &.end::after{
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
  :hover{
    background-color: ${(props) => props.selected ? null : "var(--black-025)"};
    color: ${(props) => props.selected ? null : "var(--black-600)"};
  }
  :active{
    box-shadow: 0 0 0 4px hsla(210,8%,15%,0.1);
    outline: none;
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
const ResultComment1 =styled.div`
  line-height: 1;
  color: var(--fc-light) !important;
  font-size: 12px;
  margin-bottom: 24px;
  >div{
    margin-bottom: 8px;
  }
`


function Questions() {
  const filter = useSelector((state)=> state.filter);
  const pages = useSelector((state)=> state.pages);
  const isLogin = useSelector((state)=> state.loginInfoReducer.login)
  const dispatch = useDispatch();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const filterOpenHandler = () => {
    setFilterOpen(!isFilterOpen)
  }
  const filteringHandler = (keyword) => {
    dispatch(filteringBy(keyword))
    dispatch(selectPage(1))
  }
  const [filterNsortedposts, setFilterNsortedposts] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions`)
      const tags = await response.data.body.data.map((ele)=>{
        return {id:ele.questionId, tag: ele.tagName}
      })
      // if(!!filter.tags.length){
      //   await response.data.body.data.map((ele,idx)=>{
      //     axios.get(`${process.env.REACT_APP_API_URL}/questions/${idx+1}`)
      //       .then((response)=>{
      //         console.log(tags.map((i)=>{
      //           if(i.id === ele.questionId){
      //             return {
      //               ...i, tag:response.data.body.data.tagList.map((ele)=>{
      //               return ele.tagName
      //               })
      //             }
      //           } else return i
      //         }) )
      //       })
      //     return ele
      //   })
      // }

      let filtered = filteringposts(response.data.body.data,filter,tags)
      let sorted = sortingposts(filtered,filter)
      setFilterNsortedposts(sorted)
      dispatch(setTotalposts(filtered.length))
      setFilterOpen(false)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getData()
      },[filter])
  const start=(pages.currentpage-1)*pages.pagesize
  const end=start+pages.pagesize
  const onepage = filterNsortedposts.slice(start, end)

  return (
    <QuestionsContainer>
      <div>
        <PageHeader>
          {filter.isSearched
          ? <h1>{"Search Results"}</h1>
          : <h1>{!!filter.tags.length ?`Questions tagged [${filter.tags}]`:"All Questions"}</h1>
          }
          <div>
            <BasicBlueButton to={isLogin ?"/askquestion" :"/users/login"}>Ask Questions</BasicBlueButton>
          </div>
        </PageHeader>
        {
          filter.isSearched && 
          <>
            <ResultComment1>
              <div>Results for {filter.searchedBy}</div>
              <div>Search options <strong>not deleted</strong></div>
            </ResultComment1>
          </>
        }

        <div>
          <QuestionsH2>
            <div className="data">{pages.totalposts} {filter.isSearched ?"results" :"questions"} {filter.unanswered && "with no answers"}</div>
            <div>
              <DataControllerBox>
                <DataController noFilter={filter.isSearched} >
                  {filter.isSearched
                  ? 
                  <>
                    <DataControllerBtn start={1} selected={filter.newest && !filter.unanswered}><div>Relevance</div></DataControllerBtn>
                  </>
                  :
                  <>
                    <DataControllerBtn onClick={()=>filteringHandler('newest')} start={1} selected={filter.newest && !filter.unanswered}><div>Newest</div></DataControllerBtn>
                    <DataControllerBtn onClick={()=>filteringHandler('unanswered')} middle="true" selected={filter.unanswered && !filter.newest} ><div>Unanswered</div></DataControllerBtn>
                  </>
                  }
                  <DataControllerBtn className="end" end="true" selected={filter.unanswered && filter.newest}>More</DataControllerBtn>
                </DataController>
                <Dropdown />
                {!filter.isSearched &&
                <>
                  <FilterBtn onClick={filterOpenHandler}>
                    <BasicBlueButton skyblue={1}><svg viewBox="0 0 18 18"><path d="M2 4h14v2H2V4Zm2 4h10v2H4V8Zm8 4H6v2h6v-2Z" /></svg> Filter 
                    </BasicBlueButton>
                  </FilterBtn>                
                </>
                }

              </DataControllerBox>
            </div>
          </QuestionsH2>
          <ExpandableFilterform isFilterOpen={isFilterOpen} filter={filter}/> 
        </div>
        <QuestionsContent>
          {filter.isSearched && pages.totalposts === 0 && <NoResult />}
          {!!pages.totalposts && onepage.map(ele=>{
            return <QuestionsList key={ele.questionId} ele={ele}/>
          })}
        </QuestionsContent>
        {!!pages.totalposts &&
        <>
          <PaginationLeft />
          <PaginationRight />
        </>
        }
      </div>
      <Aside />
    </QuestionsContainer>
  )
}

export default Questions;