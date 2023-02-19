import styled from "styled-components";
import sprites from '../assets/sprites.svg';

// 반응형 웹 적용 시점 - 980px;

const Container = styled.div`
  background-color: var(--black-800);
  color: var(--black-350) ;
`

const FooterContainer = styled.div`
  padding: 32px 12px 12px 12px;
  margin: 0 auto;
  max-width: 1264px;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  h5 {
    margin-bottom: 12px;
    color: var(--black-200);
  }
  
  li, a {
    padding: 4px 0;
    font-size: 12px;
  }
  /* a 태그 관련 기본 스타일링 -> Globalstyle 논의 */
  a {text-decoration: none;color: inherit;}a:visited {background: none;}a:active {background: none;}a:hover {color: var(--black-200)}

  .li-none {
    color: var(--black-800);
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    column-gap: 12px;
    @media only screen and (max-width: 980px) {
    flex-direction: row;
    }
  }
  .footer-logo {
    flex: 0 0 64px;
    @media only screen and (max-width: 980px) {
    display: none;
    }
  }
  .footer-nav {
    display: flex;
    flex: 2 1 auto;
    .footer-nav-row {
      flex: 1 0 auto;
      padding: 0 12px 24px 0; 
    }
    @media only screen and (max-width: 980px) {
    flex-direction: column;
    }
  }
  .footer-team {
    flex: 1 1 100px;
    @media only screen and (max-width: 980px) {
    margin-top: 24px;
    }
  }
  .teams {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    column-gap: 12px;
    @media only screen and (max-width: 980px) {
    flex-direction: row;
    }
  }
  
  @media only screen and (max-width: 980px) {
    flex-direction: column;
    padding: 24px;
    }
`

const LogoDiv = styled.div`
  width: 32px;
  height: 50px;
  background-image: url(${props => props.url});
`

function Footer() {
  return (
    <Container>
      <FooterContainer>
        <div className="footer-logo">
          <LogoDiv url={sprites}/>
        </div>
        <div className="footer-nav">
          <div className="footer-nav-row">
            <h5>STACK OVERFLOW</h5>
            <ul>
              <li>Questions</li>
              <li>Help</li>
            </ul>
          </div>
          <div className="footer-nav-row">
            <h5>PRODUCTS</h5>
            <ul>
              <li>Teams</li>
              <li>Advertising</li>
              <li>Collectives</li>
              <li>Talent</li>
            </ul>
          </div>
          <div className="footer-nav-row">
            <h5>COMPANY</h5>
            <ul>
              <li>About</li>
              <li>Press</li>
              <li>Work Here</li>
              <li>Legal</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Us</li>
              <li>Cookie Settings</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
          <div className="footer-nav-row">
            <h5>STACK EXCHANGE NETWORK</h5>
            <ul>
              <li>Technology</li>
              <li>Culture & recreation</li>
              <li>Life & arts</li>
              <li>Science</li>
              <li>Professional</li>
              <li>Business</li>
              <li className="li-none">d</li>
              <li>API</li>
              <li>Data</li>
            </ul>
          </div>
        </div>
        <div className="footer-team">
          <h5>
            Team.BottledJade
          </h5>
          <div className="teams">
            <a href="https://github.com/boahn">안병옥(팀장)</a>
            <a href="https://github.com/yjyaang">양예진(부팀장)</a>
            <a href="https://github.com/kdmstj">강은서</a>
            <a href="https://github.com/JOAAAAAAAAAAA">김민지</a>
            <a href="https://github.com/YUNH7">조윤희</a>
            <a href="https://github.com/Gr8G1">현지원</a>
          </div>
        </div>
      </FooterContainer>
    </Container>
  );
}

export default Footer;