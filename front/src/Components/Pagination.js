import { Pager, PageBtn } from "./PaginationLeft";

function PaginationLeft({ pageInfo, setPageInfo }) {
  const gotoPrevHandler = () => {
    if (pageInfo.currentPage !== 1) {
      // dispatch(gotoPrev())
    }
  }
  const gotoNextHandler = () => {
    if (pageInfo.currentPage !== pageInfo.totalPages) {
      // dispatch(gotoNext())
    }
  }
  const gotoPageHandler = (num) => {
    // dispatch(selectPage(num))
  }

  const restPages = pageInfo.totalPages - pageInfo.currentPage
  const totalPager = pageInfo.totalPages < 5 ? pageInfo.totalPages : 5
  const pageNums = new Array(totalPager).fill(pageInfo.currentPage).map((cur, idx) => {
    if (cur <= 4) {
      return idx + 1
    } else if (restPages <= 3) {
      return pageInfo.totalPages - 4 + idx
    } else return cur - 2 + idx
  })
  const lastNum = pageNums[pageNums.length - 1]

  return (
    <Pager>
      {pageInfo.currentPage !== 1 &&
        <PageBtn className="gotoprev" onClick={gotoPrevHandler} >Prev</PageBtn>
      }
      {pageInfo.currentPage > 4 && <>
        <PageBtn onClick={() => gotoPageHandler(1)}>1</PageBtn>
        <PageBtn clear={1}>...</PageBtn>
      </>
      }
      {pageNums.map((ele) => {
        return <PageBtn key={ele} selected={pageInfo.currentPage === ele} onClick={() => gotoPageHandler(ele)}>{ele}</PageBtn>
      })}
      {totalPager === 5 && lastNum !== pageInfo.totalPages && <>
        <PageBtn clear={1}>...</PageBtn>
        <PageBtn className="last" onClick={() => gotoPageHandler(pageInfo.totalPages)}>{pageInfo.totalPages}</PageBtn>
      </>}
      {pageInfo.currentPage !== pageInfo.totalPages &&
        <PageBtn className="gotoprev" onClick={gotoNextHandler}>Next</PageBtn>
      }
    </Pager>
  )
}

export default PaginationLeft