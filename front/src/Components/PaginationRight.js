import styled from "styled-components"
import { PageBtn } from "./PaginationLeft"
import { useSelector, useDispatch } from "react-redux";
import { selectPagesize } from "../Reducers/paginationReducer";


const PageSizer = styled.div`
  margin: 20px 0;
  float: right;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`

function PaginationRight () {  
  const pages = useSelector((state)=> state.pages);
  const dispatch = useDispatch();
  const changePagesizeHandler = (num) =>{
    dispatch(selectPagesize(num))
  }
  return(
    <PageSizer>
      <PageBtn selected={pages.pagesize===1} onClick={()=>{changePagesizeHandler(1)}}>1</PageBtn>
      <PageBtn selected={pages.pagesize===3} onClick={()=>{changePagesizeHandler(3)}}>3</PageBtn>
      <PageBtn selected={pages.pagesize===5} onClick={()=>{changePagesizeHandler(5)}}>5</PageBtn>
      <PageBtn clear={1}>per page</PageBtn>
    </PageSizer>
  )

}

export default PaginationRight