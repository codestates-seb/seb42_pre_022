import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons"
import sprites from '../assets/sprites.svg';

const Sidebar = styled.div`
  margin-left: 24px;
  width: 300px;
`

const SideWidget = styled.div`
  margin-bottom: 16px;
  width: 100%;
  background-color: var(--yellow-050);
  border: 1px solid var(--yellow-200);
  border-radius: 3px;
  ul {
    list-style: none;
  }
  .widget-title {
    padding: 12px 15px;
    font-size: 13px;
    font-weight: 700;
    color: var(--black-600);
    background-color: var(--yellow-100);
    border-radius: 3px;
    border-top: 1px solid var(--black-075);
    border-bottom: 1px solid var(--black-075);
  }
  .widget-content {
    padding: 0 16px;
    margin: 12px 0;
    font-size: 13px;
    color: var(--black-700);
    display: flex;
    .sponsored {
      color: var(--black-500);
    }
    .icon-stack {
      margin-right: 5px;
      padding-top: 2px;
    }
    .icon-message {
      color: var(--blue-600);
      margin-right: 5px;
      padding-top: 2px;
    }
  }
`
const PencilDiv = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  background-image: url(${props => props.url});
  background-position: -22px 193px;
`

function Aside() {
  return (
    <Sidebar>
      <SideWidget>
        <ul>
          <li className="widget-title">The Overflow Blog</li>
          <li className="widget-content">
            <PencilDiv url={sprites} />
            <div>
              Serverless scales well, but most databases don’t
              <div className="sponsored">sponsored post</div>
            </div>
          </li>
          <li className="widget-content">
            <PencilDiv url={sprites} />
            <div>
              Monitoring debt builds up faster than software teams can pay it off
            </div>
          </li>
          <li className="widget-title">Featured on Meta</li>
          <li className="widget-content">
            <FontAwesomeIcon icon={faMessage} className="icon-message" />
            <div>Ticket smash for [status-review] tag: Part Deux</div>
          </li>
          <li className="widget-content">
            <FontAwesomeIcon icon={faMessage} className="icon-message" />
            <div>We've added a "Necessary cookies only" option to the cookie consent popup</div>
          </li>
          <li className="widget-content">
            <FontAwesomeIcon icon={faStackOverflow} className="icon-stack" />
            <div>We’ve made changes to our Privacy Notice for Collectives™</div>
          </li>
          <li className="widget-content">
            <FontAwesomeIcon icon={faStackOverflow} className="icon-stack" />
            <div>Temporary policy: ChatGPT is banned</div>
          </li>
          <li className="widget-content">
            <FontAwesomeIcon icon={faStackOverflow} className="icon-stack" />
            <div>The [amazon] tag is being burninated</div>
          </li>
          <li className="widget-content">
            <FontAwesomeIcon icon={faStackOverflow} className="icon-stack" />
            <div>Microsoft Azure Collective launch and proposed tag changes</div>
          </li>
        </ul>
      </SideWidget>
    </Sidebar>
  );
}

export default Aside;