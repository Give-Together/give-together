import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

class Learn extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="section">
          <Container>
            <Row className="justify-content-center">
              <Row className="row-grid justify-content-center">
                <Col lg="3">
                  <div className="info">
                    <div className="icon icon-primary">
                      <i className="tim-icons icon-money-coins" />
                    </div>
                    <h4 className="info-title">Earn</h4>
                    <hr className="line-primary" />
                    <p>
                      Once you activate your DAI with Give Together your DAI
                      will be exchanged into rDAI a token built on top of cDAI
                      which operates on the{" "}
                      <a
                        href="https://compound.finance/ctokens"
                        target="_blank"
                      >
                        Compound Protocol
                      </a>{" "}
                      earning you interest. rDAI expands on that allowing you to
                      designate beneficiaries of your interest. rDAI is always
                      redeemable at 1:1 for DAI.
                    </p>
                  </div>
                </Col>
                <Col lg="3">
                  <div className="info">
                    <div className="icon icon-warning">
                      <i className="tim-icons icon-chart-pie-36" />
                    </div>
                    <h4 className="info-title">Redeem</h4>
                    <hr className="line-warning" />
                    <p>
                      By activating your DAI on Give Together your interest will
                      be transferred to the Give Together Smart Contract{" "}
                      <a
                        href="https://etherscan.io/address/0xf9ab04846cb73405e2a4ab24f9b66d6c54821043"
                        target="_blank"
                      >
                        here
                      </a>
                      . This contract determines a new charity to give to each
                      week and at the end of the week we will activate the
                      donate function to send the money to the chosen charity.
                    </p>
                  </div>
                </Col>
                <Col lg="3">
                  <div className="info">
                    <div className="icon icon-success">
                      <i className="tim-icons icon-single-02" />
                    </div>
                    <h4 className="info-title">Donate</h4>
                    <hr className="line-success" />
                    <p>
                      Each week a new charity is chosen to receive the interest
                      from the donors on Give Together. The donation will go
                      directly to the charities ETH accounts. A full list of the
                      charities supported can be found{" "}
                      <a
                        href="https://github.com/Give-Together/give-together/blob/master/Charities.md"
                        target="_blank"
                      >
                        here
                      </a>
                      . If you would like to request a charity to be added you
                      can contact us{" "}
                      <a
                        href="https://twitter.com/givetogetherapp"
                        target="_blank"
                      >
                        @GiveTogetherApp
                      </a>
                    </p>
                  </div>
                </Col>
              </Row>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );}
} 


export default Learn;