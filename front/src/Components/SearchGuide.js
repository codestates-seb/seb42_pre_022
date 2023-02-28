import styled from "styled-components";


function SearchGuide() {
  const SearchGuideBox = styled.div`
  position: absolute;
  inset: 0px auto auto 0px;
  margin: 0px;
  transform: translate3d(-23.2px, 42.4px, 0px);
  min-width: calc(97.2307692rem / 12 * 4);
  max-width: 100%;
  padding: 0;
  background-color: var(--white);
  border: 1px solid var(--bc-medium);
  box-shadow: 0 1px 3px hsla(0,0%,0%,0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06), 0 3px 8px hsla(0, 0%, 0%, 0.09);
  display: block;
  width: 100%;
  border-radius: 5px;
  color: var(--fc-dark);
  font-size: 13px;
  white-space: normal;
  z-index: 2000;
  >div:nth-child(1){
    position: absolute;
    left: 0px;
    transform: translate3d(163.2px, 0px, 0px);
    display: block;
    height: 12px;
    width: 12px;
    z-index: -1;
    top: -6px;
    color:var(--white);
    :before{
      content: '';
      transform: rotate(45deg);
      display: block;
      height: 12px;
      position: absolute;
      width: 12px;
      z-index: -1;
    }
    :after{
      content: '';
      transform: rotate(45deg);
      box-shadow: -1px -1px 1px 0 hsla(0,0%,0%,0.12);
      top: 1px;
      background: currentColor;
      border-radius: 1.5px;
      display: block;
      height: 12px;
      position: absolute;
      width: 12px;
      z-index: -1;
    }
  }
  >div:nth-child(2){
    display: none;
    padding: 24px;
  }
  >span{
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    overflow-wrap: normal;
  }
  >div:nth-child(3){
    max-height: calc(97.2307692rem / 12 * 4);
    overflow-y: auto;
    display: none;
  }
`
const SearchHint = styled.div`
  padding: 12px;
  display: flex;
  color: var(--fc-medium);
  >div{
    flex-basis: 50%;
    color: var(--fc-medium);
    >div{
      margin-bottom: ${(props) => props.end ? "0" : "12px"};
      font-size: 13px;
      >span:nth-child(2){
        color: var(--black-500)
      }
    }
  }
`


  return (
    <SearchGuideBox>
      <div></div>
      <div></div>
      <span></span>
      <div></div>
      <SearchHint>
        <div>
          <div end={1}><span>answer:0</span><span>unanswered</span></div>
        </div>
        <div>
          <div end={1}><span>[tag]</span><span>search within a tag</span></div>
        </div>
      </SearchHint>
    </SearchGuideBox>
  )
}

export default SearchGuide;
