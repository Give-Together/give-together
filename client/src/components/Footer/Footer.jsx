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
                <h5>
                  This project is in beta and has not been audited
                </h5>
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
