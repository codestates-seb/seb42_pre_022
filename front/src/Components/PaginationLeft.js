import styled from "styled-components"
import { gotoPrev, gotoNext } from "../Reducers/paginationReducer";
import { useSelector, useDispatch } from "react-redux";

const Pager = styled.div`
  margin: 20px 0;
  float: left;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`
export const PageBtn = styled.a`
  background-color: ${(props) => props.selected ? "hsl(var(--theme-primary-color-h), var(--theme-primary-color-s), var(--theme-primary-color-l))" : "transparent"};
  border: 1px solid;
  border-color: ${(props) => props.clear ? "transparent" : "var(--black-100)"};
  color: ${(props) => props.selected ? "var(--white)" : "var(--fc-medium)"};
  border-radius: 3px;
  line-height: calc(25/13);
  padding: 0 8px;
  text-decoration: none;
  cursor: pointer;
`



function PaginationLeft () {
  const pages = useSelector((state)=> state.pages);
  const dispatch = useDispatch();
  const gotoPrevHandler = () => {
    if(pages.currentpage !== 1){
      dispatch(gotoPrev())
    }
  }
  const gotoNextHandler = () => {
    if(pages.currentpage !== pages.totalpage){
      dispatch(gotoNext())
    }
    
  }
  const pageNums = new Array(5).fill(pages.currentpage).map((ele,idx)=>{
    if(pages.currentpage<=4){
      return idx+1
    } else if(pages.currentpage>=pages.totalpage-4){
      return pages.totalpage-(4-idx)
    } else return ele-(2-idx)
  })


  return (
    <Pager>
      {pages.currentpage !==1 &&
        <PageBtn className="gotoprev" onClick={gotoPrevHandler} >Prev</PageBtn>
      }
      {pages.currentpage >4 && <>
        <PageBtn >1</PageBtn>
        <PageBtn clear={1}>...</PageBtn>
      </>
      }
      {pageNums.map((ele,idx)=>{
        return <PageBtn key={`page${idx}`} selected={pages.currentpage===ele}>{ele}</PageBtn>
       })}
      {pages.currentpage < pages.totalpage-4 && <>
        <PageBtn clear={1}>...</PageBtn>
        <PageBtn className="last">{pages.totalpage}</PageBtn>
      </>}
      {pages.currentpage !== pages.totalpage &&
        <PageBtn className="gotoprev" onClick={gotoNextHandler}>Next</PageBtn>
      }
    </Pager>
  )

}

export default PaginationLeft