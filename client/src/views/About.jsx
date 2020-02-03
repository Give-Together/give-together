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
import React, { useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  NavbarBrand,
  Row,
  Collapse
} from "reactstrap";

import Footer from '../components/Footer/Footer';

const About = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  function handleClick(page) {
    window.open(
      page,
      "_blank"
    );
  };

  return (
    <>
      <NavbarBrand>
        <a href="/">
          <h2 className="px-4 py-2">Give Together</h2>
        </a>
      </NavbarBrand>
      <div className="wrapper" style={{ paddingBottom: "5rem" }}>
        <h1 className="text-center">FAQ</h1>
        <div>
          <Container>
            <Card className="card-stats">
              <CardBody>
                <h4>
                  This is the frequently asked questions section hopefully your
                  question is answered here. If not you can ask it directly in
                  our <a href="https://discord.gg/4FnWFmu">Discord</a> or
                  message us on{" "}
                  <a href="https://twitter.com/givetogetherapp">Twitter</a>.
                  Thank you for supporting new charities through your interest!
                </h4>
                <div>
                  <Button
                    color="dark"
                    onClick={toggle}
                    style={{ marginBottom: "1rem" }}
                  >
                    How does this work?
                  </Button>
                  <Collapse isOpen={isOpen}>
                    <Card>
                      <CardBody>
                        <p color="light">
                          Give Together asks you to activate your DAI in order
                          to start donating at no loss to you. Once your DAI is
                          activated it will be converted to{" "}
                          <a href="https://www.rdai.money">rDAI</a> which is a
                          wrapper of Compound's{" "}
                          <a href="https://compound.finance/ctokens">cDAI</a>{" "}
                          which earns interest from the Compound Protocol. rDAI
                          builds on top of this and allows you to set a
                          benificiary of your interest (known as a{" "}
                          <a href="https://github.com/rtoken-project/rtoken-contracts#1-hat-types">
                            Hat
                          </a>{" "}
                          ) when you activate your DAI on Give Together your
                          benificiary is set to the Give Together{" "}
                          <a href="">Smart Contract</a> which once your interest
                          is redeemed to it and it is the end of the current
                          week all of the proceeds will be sent directly to the
                          charity of the week. You can find the list of
                          charities <a href="/#charities">here</a>.
                        </p>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
                <div>
                  <Button
                    color="dark"
                    onClick={toggle}
                    style={{ marginBottom: "1rem" }}
                  >
                    What is Compound?
                  </Button>
                  <Collapse isOpen={isOpen}>
                    <Card>
                      <CardBody>
                        <p color="light">
                          <a href="https://www.compound.finance">Compound</a> is
                          "Compound is an open-source, autonomous protocol built
                          for developers, to unlock a universe of new financial
                          applications. Interest and borrowing, for the open
                          financial system". Through nifty cryptoeconomics
                          Compound allows you to earn interest on your
                          cryptocurrencys (at time of writing the interest rate
                          is about 5.9%). Give Together uses compound through{" "}
                          <a href="https://www.rdai.money">rDAI</a> to generate
                          interest and donate it to a new charity each week. All
                          at no loss to you!
                        </p>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
                <div>
                  <Button
                    color="dark"
                    onClick={toggle}
                    style={{ marginBottom: "1rem" }}
                  >
                    When can I withdraw?
                  </Button>
                  <Collapse isOpen={isOpen}>
                    <Card>
                      <CardBody>
                        <p color="light">
                          You can withdraw your money at any time{" "}
                          <a href="/withdraw">here</a>.
                        </p>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
                <div>
                  <Button
                    color="dark"
                    onClick={toggle}
                    style={{ marginBottom: "1rem" }}
                  >
                    Will I lose any money from this?
                  </Button>
                  <Collapse isOpen={isOpen}>
                    <Card>
                      <CardBody>
                        <p color="light">
                          You will not loose any money from activating your DAI
                          on Give Together. We only donate the interest that you
                          accrue though holding{" "}
                          <a href="https://www.rdai.money">rDAI</a>.
                        </p>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
                <div>
                  <Button
                    color="dark"
                    onClick={toggle}
                    style={{ marginBottom: "1rem" }}
                  >
                    Does Give Together make money?1
                  </Button>
                  <Collapse isOpen={isOpen}>
                    <Card>
                      <CardBody>
                        <p color="light">
                          Currently we do no make any money 100% of interest
                          accrued goes to the weeks charity. If you would like
                          to support us thank you and you can donate to{" "}
                          <a href="https://etherscan.io/address/0xdA7a203806A6be3C3c4357c38e7b3aaAc47F5dD2">
                            0xdA7a203806A6be3C3c4357c38e7b3aaAc47F5dD2
                          </a>
                        </p>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
                <div>
                  <Button
                    color="dark"
                    onClick={toggle}
                    style={{ marginBottom: "1rem" }}
                  >
                    Can I apply this to my taxes?
                  </Button>
                  <Collapse isOpen={isOpen}>
                    <Card>
                      <CardBody>
                        <p color="light">
                          {" "}
                          You can refer to the IRS's information about
                          cryptocurrency taxes with charitable donations{" "}
                          <a href="https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions">
                            here
                          </a>
                          .
                        </p>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              </CardBody>
            </Card>
          </Container>
        </div>
      </div>
      <div className="wrapper" style={{ paddingBottom: "5rem" }}>
        <h1 className="text-center" id="contact">
          Contact
        </h1>
        <div>
          <Container>
            <Card className="card-stats">
              <CardBody>
                <h4 className="text-center">
                  We would love to connect with you and answer any questions you
                  may have
                </h4>
                <div style={{ width: "50%", margin: "0 auto" }}>
                  <Row className="row-grid justify-content-between align-items-center text-left">
                    <a
                      href="https://twitter.com/givetogetherapp"
                      target="_blank"
                    >
                      <Button
                        color="dark"
                        style={{ marginBottom: "1rem" }}
                        className="text-center"
                      >
                        <i
                          className="fab fa-twitter"
                          style={{ paddingRight: "1rem" }}
                        />{" "}
                        Twitter
                      </Button>
                    </a>
                    <a href="https://discord.gg/4FnWFmu" target="_blank">
                      <Button color="dark" style={{ marginBottom: "1rem" }}>
                        <i
                          className="fab fa-discord"
                          style={{ paddingRight: "1rem" }}
                        />{" "}
                        Discord
                      </Button>
                    </a>
                    <a href="https://github.com/Give-Together" target="_blank">
                      <Button color="dark" style={{ marginBottom: "1rem" }}>
                        <i
                          className="fab fa-github"
                          style={{ paddingRight: "1rem" }}
                        />{" "}
                        Github
                      </Button>
                    </a>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
