import { Pager, PageBtn } from "./PaginationLeft";

function PaginationLeft({ pageInfo, setPageInfo }) {
  const {currentPage, totalPages} = pageInfo
  const gotoPrevHandler = () => {
    if (currentPage !== 1) {
      setPageInfo({...pageInfo, currentPage: currentPage-1})
    }
  }
  const gotoNextHandler = () => {
    if (currentPage !== totalPages) {
      setPageInfo({...pageInfo, currentPage: currentPage+1})
    }
  }
  const gotoPageHandler = (num) => {
      setPageInfo({...pageInfo, currentPage: num})
  }

  const restPages = totalPages - currentPage
  const totalPager = totalPages < 5 ? totalPages : 5
  const pageNums = new Array(totalPager).fill(currentPage).map((cur, idx) => {
    if (cur <= 4) {
      return idx + 1
    } else if (restPages <= 3) {
      return totalPages - 4 + idx
    } else return cur - 2 + idx
  })
  const lastNum = pageNums[pageNums.length - 1]
  console.log((pageInfo))

  return (
    <Pager>
      {currentPage !== 1 &&
        <PageBtn className="gotoprev" onClick={gotoPrevHandler} >Prev</PageBtn>
      }
      {currentPage > 4 && <>
        <PageBtn onClick={() => gotoPageHandler(1)}>1</PageBtn>
        <PageBtn clear={1}>...</PageBtn>
      </>
      }
      {pageNums.map((ele) => {
        return <PageBtn key={ele} selected={currentPage === ele} onClick={() => gotoPageHandler(ele)}>{ele}</PageBtn>
      })}
      {totalPager === 5 && lastNum !== totalPages && <>
        <PageBtn clear={1}>...</PageBtn>
        <PageBtn className="last" onClick={() => gotoPageHandler(totalPages)}>{totalPages}</PageBtn>
      </>}
      {currentPage !== totalPages &&
        <PageBtn className="gotoprev" onClick={gotoNextHandler}>Next</PageBtn>
      }
    </Pager>
  )
}

export default PaginationLeft