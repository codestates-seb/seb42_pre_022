import { Pager, PageBtn } from "./PaginationLeft";

function PaginationLeft({ curPage, setCurPage, totalPages }) {
  const lastPage = totalPages ? totalPages : curPage

  const restPages = lastPage - curPage
  const totalPager = lastPage < 5 ? lastPage : 5
  const pageNums = new Array(totalPager).fill(curPage).map((cur, idx) => {
    if (cur <= 4) {
      return idx + 1
    } else if (restPages <= 3) {
      return lastPage - 4 + idx
    } else return cur - 2 + idx
  })
  const lastPageNum = pageNums[pageNums.length - 1]

  return (
    <Pager>
      {curPage !== 1 &&
        <PageBtn className="gotoprev" onClick={() => setCurPage(curPage - 1)} >Prev</PageBtn>
      }
      {curPage > 4 && <>
        <PageBtn onClick={() => setCurPage(1)}>1</PageBtn>
        <PageBtn clear={1}>...</PageBtn>
      </>}
      {pageNums.map((pageNum) => {
        return <PageBtn key={pageNum} selected={curPage === pageNum} onClick={() => setCurPage(pageNum)}>{pageNum}</PageBtn>
      })}
      {totalPager === 5 && lastPageNum !== lastPage && <>
        <PageBtn clear={1}>...</PageBtn>
        <PageBtn className="last" onClick={() => setCurPage(lastPage)}>{lastPage}</PageBtn>
      </>}
      {curPage !== lastPage &&
        <PageBtn className="gotoprev" onClick={() => setCurPage(curPage + 1)}>Next</PageBtn>
      }
    </Pager>
  )
}

export default PaginationLeft