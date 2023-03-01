import { useSelector } from "react-redux";
import styled from "styled-components";

const NoResultBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px;
  >svg{
    color: var(--black-200);
    width: 96px;
    height: 96px;
    vertical-align: bottom;
    >path:nth-child(1){
    opacity: 0.2;
  }
  }
  path{
    fill: currentColor;
  }
`
const NoResultcomment1 = styled.div`
  font-size: 1.4rem;
  text-align: center;
  margin-top: 12px;
`
const NoResultcomment2 = styled.div`
  text-align: center;
  font-size: 13px;
  margin-top: 4px;
`


function NoResult() {
  const filter = useSelector((state)=> state.filter);
  return (
    <NoResultBox>
      <svg viewBox="0 0 96 96">
        <path d="M60.38 76.15a6.2 6.2 0 1 1 8.77-8.77l17.78 17.79a6.2 6.2 0 0 1-8.76 8.76L60.38 76.15Z" />
        <path d="M52.17 13.27a1.5 1.5 0 0 0-1.5 2.6A25.5 25.5 0 0 1 63 32.97a1.5 1.5 0 1 0 2.94-.59 28.5 28.5 0 0 0-13.77-19.1ZM36.64 11c0-.84.67-1.5 1.5-1.5 1.8 0 3.59.19 5.35.53a1.5 1.5 0 1 1-.58 2.95 25.5 25.5 0 0 0-4.78-.48 1.5 1.5 0 0 1-1.5-1.5ZM38 1.5a36.5 36.5 0 1 0 22.3 65.4 6.47 6.47 0 0 0 1.9 4.48l19.15 19.15a6.5 6.5 0 0 0 9.18-9.18L71.38 62.2a6.47 6.47 0 0 0-4.48-1.9A36.5 36.5 0 0 0 38 1.5ZM4.5 38a33.5 33.5 0 1 1 67 0 33.5 33.5 0 0 1-67 0Zm59.83 31.26a3.5 3.5 0 0 1 4.93-4.93l19.15 19.14a3.5 3.5 0 1 1-4.94 4.94L64.33 69.26Z" />
      </svg>
      <NoResultcomment1>We couldn't find anything for {filter.searchedBy}</NoResultcomment1>
      <NoResultcomment2>
        <strong>Search options:</strong> not deleted
      </NoResultcomment2>
      <NoResultcomment2>Try different or less specific keywords.</NoResultcomment2>
    </NoResultBox>
  )
}

export default NoResult;