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
      <PageBtn selected={pages.pagesize===15} onClick={()=>{changePagesizeHandler(15)}}>15</PageBtn>
      <PageBtn selected={pages.pagesize===30} onClick={()=>{changePagesizeHandler(30)}}>30</PageBtn>
      <PageBtn selected={pages.pagesize===50} onClick={()=>{changePagesizeHandler(50)}}>50</PageBtn>
      <PageBtn clear={1}>per page</PageBtn>
    </PageSizer>
  )

}

export default PaginationRight