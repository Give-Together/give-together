/*!

=========================================================
* BLK Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col md="3">
              <div className="text-center">
                <Link to="/">
                  <h1 className="title">Give Together</h1>
                </Link>
              </div>
              <h5>
                <a href="https://www.creative-tim.com/product/blk-design-system-react">
                  Design Kit by Creative Tim
                </a>
              </h5>
              <div>
                <h4>Support Us</h4>
                <h5>
                  <a href="https://etherscan.io/address/0xdA7a203806A6be3C3c4357c38e7b3aaAc47F5dD2">
                    0xdA7a203806A6be3C3c4357c38e7b3aaAc47F5dD2
                  </a>
                </h5>
              </div>
              <div>
                <h5>This project is in beta and has not been audited</h5>
              </div>
            </Col>
            <Col md="3">
              <Nav>
                <NavItem>
                  <NavLink to="/" tag={Link}>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/activate" tag={Link}>
                    Donate
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col md="3">
              <Nav>
                <NavItem>
                  <NavLink href="/about#contact">Contact Us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/about">About Us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://medium.com/give-together"
                    target="_blank"
                  >
                    Blog
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col md="3">
              <div className="text-center">
                <h3 className="title">Follow us:</h3>
              </div>
              <div className="btn-wrapper profile">
                <Button
                  className="btn-icon btn-simple btn-round btn-neutral"
                  color="default"
                  href="https://join.status.im/chat/public/givetogether-app"
                  target="_blank"
                  id="tooltip62213592"
                >
                  <svg
                    width="26"
                    height="26"
                    style={{ marginTop: "0.25em" }}
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <rect width="26" height="26" rx="2"></rect>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.564 12.5345C14.4448 12.6282 15.3256 12.7219 16.4085 12.6602C19.3425 12.4931 21.1198 10.9547 20.9937 8.6551C20.8652 6.31539 18.5007 4.87391 16.1349 5.0087C12.2794 5.22815 9.44428 8.68621 9.12497 12.6386C9.64857 12.5133 10.1997 12.4385 10.7194 12.4089C11.8024 12.3473 12.6832 12.4409 13.564 12.5345ZM6.00598 17.6495C6.12764 19.7943 8.3677 21.1156 10.6091 20.992C14.2616 20.7908 16.9476 17.6209 17.25 13.9979C16.754 14.1128 16.2319 14.1815 15.7395 14.2085C14.7136 14.265 13.879 14.1792 13.0445 14.0933C12.2101 14.0075 11.3756 13.9217 10.3497 13.9782C7.57021 14.1313 5.88632 15.5415 6.00598 17.6495Z"
                        fill="white"
                      ></path>
                    </g>
                  </svg>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip62213592">
                  Chat
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="https://twitter.com/givetogetherapp"
                  id="tooltip622135962"
                  target="_blank"
                >
                  <i className="fab fa-twitter" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip622135962">
                  Follow us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="https://discord.gg/4FnWFmu"
                  id="tooltip318450378"
                  target="_blank"
                >
                  <i className="fab fa-discord" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip318450378">
                  Chat with us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="https://github.com/Give-Together"
                  id="tooltip3184503781"
                  target="_blank"
                >
                  <i className="fab fa-github" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip3184503781">
                  Check out our Code
                </UncontrolledTooltip>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
