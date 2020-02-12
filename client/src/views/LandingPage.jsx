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
  Card,
  CardBody,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  NavbarBrand,
  Row,
  Col
} from "reactstrap";

// core components
import Learn from "../components/Sections/Learn.jsx";
import Footer from "../components/Footer/Footer.jsx";

import getWeb3 from "../getWeb3";
import GiveTogetherContract from "../contracts/GiveTogether.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { convertUnix } from "../utils/ConvertUnix";
import { getQRCode } from "../utils/getQR";
import { PopoverQR } from "../components/Elements/Popover";
import { isMobile } from "react-device-detect";

import firestore from "../firestore.js";
import firebase from "firebase/app";
import "firebase/firestore";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    const db = firebase.firestore();
    this.state = {
      db: db,
      charity: null,
      balance: null,
      web3: null,
      accounts: null,
      contract: null,
      contractAddress: "0x7590b741a344f2425a931bB3949d66938e352Bd3",
      charityList: [],
      numCharities: null,
      totalDonation: null,
      totalInterest: null,
      timeTillDonation: null,
      currentCharityAddr: null,
      listSize: null,
      loadBtnText: "Load more"
    };
  }

  notifySuccess = network => toast.success("Connecting to " + network);
  notifyMsg = msg => toast.error(msg, { position: "bottom-right" });
  notifyWarn = network => toast.warn("Incorrect network " + network);
  notifyError = network => toast.error("No Web3 Provider or unknown network");

  componentDidMount = async () => {
    document.body.classList.toggle("landing-page");
    this.connectWeb3();
    if (!this.state.networkId) {
      let charitiesRef = this.state.db.collection("charities");
      var list = [];
      var snapshot = await charitiesRef.get();
      snapshot.forEach(doc => {
        list.push({
          address: doc.data().address,
          name: doc.data().name,
          website: doc.data().website
        });
      });
      this.setState({
        listSize: Math.floor(list.length / 3),
        charityList: list
      });
    }
  };

  connectWeb3 = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // Local Testing with Truffle Develop
      // const deployedNetwork = GiveTogetherContract.networks[networkId];
      // const contractAddress = deployedNetwork.address;

      if (web3 && networkId == 1) {
        // netId 1 is the mainnet
        this.notifySuccess("Mainnet");
      } else {
        switch (networkId) {
          case 3:
            this.notifyWarn("Ropsten");
            break;
          case 4:
            this.notifyWarn("Rinkeby");
            break;
          case 5:
            this.notifyWarn("Goerli");
            break;
          case 42:
            this.notifyWarn("Kovan");
            break;
          default:
            this.notifyError("Unknown");
            break;
        }
      }

      const instance = new web3.eth.Contract(
        GiveTogetherContract.abi,
        this.state.contractAddress
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
        {
          web3,
          accounts,
          contract: instance,
          networkId
        },
        // Getting values to update webpage
        this.getCharityComponents
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
    }
  };

  getCharityComponents = async () => {
    const { accounts, contract } = this.state;
    try {
      // Getting current charity
      const currentCharityAddr = await contract.methods.currentCharity().call();
      // Getting name of charity
      const charity = await contract.methods
        .getCharities(currentCharityAddr)
        .call();

      // Getting balance of contract
      var balance = await this.state.web3.eth.getBalance(
        this.state.contractAddress
      );

      var rDaiABI = [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "strategy",
              type: "address"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "conversionRate",
              type: "uint256"
            }
          ],
          name: "AllocationStrategyChanged",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256"
            }
          ],
          name: "Approval",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "newCode",
              type: "address"
            }
          ],
          name: "CodeUpdated",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "account",
              type: "address"
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "oldHatID",
              type: "uint256"
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "newHatID",
              type: "uint256"
            }
          ],
          name: "HatChanged",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "hatID",
              type: "uint256"
            }
          ],
          name: "HatCreated",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256"
            }
          ],
          name: "InterestPaid",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "hatId",
              type: "uint256"
            },
            {
              indexed: false,
              internalType: "bool",
              name: "isDistribution",
              type: "bool"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "redeemableAmount",
              type: "uint256"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "internalSavingsAmount",
              type: "uint256"
            }
          ],
          name: "LoansTransferred",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address"
            }
          ],
          name: "OwnershipTransferred",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256"
            }
          ],
          name: "Transfer",
          type: "event"
        },
        {
          constant: true,
          inputs: [],
          name: "ALLOCATION_STRATEGY_EXCHANGE_RATE_SCALE",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "INITIAL_SAVING_ASSET_CONVERSION_RATE",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "MAX_NUM_HAT_RECIPIENTS",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "MAX_UINT256",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "PROPORTION_BASE",
          outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "SELF_HAT_ID",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "_guardCounter",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "_owner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "accountStats",
          outputs: [
            {
              internalType: "uint256",
              name: "cumulativeInterest",
              type: "uint256"
            }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "accounts",
          outputs: [
            { internalType: "uint256", name: "hatID", type: "uint256" },
            { internalType: "uint256", name: "rAmount", type: "uint256" },
            { internalType: "uint256", name: "rInterest", type: "uint256" },
            { internalType: "uint256", name: "lDebt", type: "uint256" },
            {
              internalType: "uint256",
              name: "sInternalAmount",
              type: "uint256"
            }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "spender", type: "address" }
          ],
          name: "allowance",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" }
          ],
          name: "approve",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: true,
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            {
              internalType: "address",
              name: "allocationStrategy_",
              type: "address"
            }
          ],
          name: "changeAllocationStrategy",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [{ internalType: "uint256", name: "hatID", type: "uint256" }],
          name: "changeHat",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            {
              internalType: "address",
              name: "contractAddress",
              type: "address"
            },
            { internalType: "uint256", name: "hatID", type: "uint256" }
          ],
          name: "changeHatFor",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            {
              internalType: "address[]",
              name: "recipients",
              type: "address[]"
            },
            { internalType: "uint32[]", name: "proportions", type: "uint32[]" },
            { internalType: "bool", name: "doChangeHat", type: "bool" }
          ],
          name: "createHat",
          outputs: [
            { internalType: "uint256", name: "hatID", type: "uint256" }
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "getAccountStats",
          outputs: [
            {
              components: [
                { internalType: "uint256", name: "hatID", type: "uint256" },
                { internalType: "uint256", name: "rAmount", type: "uint256" },
                { internalType: "uint256", name: "rInterest", type: "uint256" },
                { internalType: "uint256", name: "lDebt", type: "uint256" },
                {
                  internalType: "uint256",
                  name: "sInternalAmount",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rInterestPayable",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "cumulativeInterest",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "lRecipientsSum",
                  type: "uint256"
                }
              ],
              internalType: "struct RTokenStructs.AccountStatsView",
              name: "stats",
              type: "tuple"
            }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "getCurrentAllocationStrategy",
          outputs: [
            {
              internalType: "address",
              name: "allocationStrategy",
              type: "address"
            }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "getCurrentSavingStrategy",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "getGlobalStats",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "totalSupply",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "totalSavingsAmount",
                  type: "uint256"
                }
              ],
              internalType: "struct RTokenStructs.GlobalStats",
              name: "",
              type: "tuple"
            }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "getHatByAddress",
          outputs: [
            { internalType: "uint256", name: "hatID", type: "uint256" },
            {
              internalType: "address[]",
              name: "recipients",
              type: "address[]"
            },
            { internalType: "uint32[]", name: "proportions", type: "uint32[]" }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [{ internalType: "uint256", name: "hatID", type: "uint256" }],
          name: "getHatByID",
          outputs: [
            {
              internalType: "address[]",
              name: "recipients",
              type: "address[]"
            },
            { internalType: "uint32[]", name: "proportions", type: "uint32[]" }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [{ internalType: "uint256", name: "hatID", type: "uint256" }],
          name: "getHatStats",
          outputs: [
            {
              components: [
                { internalType: "uint256", name: "useCount", type: "uint256" },
                {
                  internalType: "uint256",
                  name: "totalLoans",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "totalSavings",
                  type: "uint256"
                }
              ],
              internalType: "struct RTokenStructs.HatStatsView",
              name: "stats",
              type: "tuple"
            }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "getMaximumHatID",
          outputs: [
            { internalType: "uint256", name: "hatID", type: "uint256" }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "getSavingAssetBalance",
          outputs: [
            { internalType: "uint256", name: "rAmount", type: "uint256" },
            {
              internalType: "uint256",
              name: "sOriginalAmount",
              type: "uint256"
            }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "hatStats",
          outputs: [
            { internalType: "uint256", name: "useCount", type: "uint256" },
            { internalType: "uint256", name: "totalLoans", type: "uint256" },
            {
              internalType: "uint256",
              name: "totalInternalSavings",
              type: "uint256"
            }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "ias",
          outputs: [
            {
              internalType: "contract IAllocationStrategy",
              name: "",
              type: "address"
            }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            {
              internalType: "contract IAllocationStrategy",
              name: "allocationStrategy",
              type: "address"
            },
            { internalType: "string", name: "name_", type: "string" },
            { internalType: "string", name: "symbol_", type: "string" },
            { internalType: "uint256", name: "decimals_", type: "uint256" }
          ],
          name: "initialize",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            {
              internalType: "contract IAllocationStrategy",
              name: "allocationStrategy",
              type: "address"
            }
          ],
          name: "initialize",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "initialized",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "interestPayableOf",
          outputs: [
            { internalType: "uint256", name: "amount", type: "uint256" }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "isOwner",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { internalType: "uint256", name: "mintAmount", type: "uint256" }
          ],
          name: "mint",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { internalType: "uint256", name: "mintAmount", type: "uint256" },
            {
              internalType: "address[]",
              name: "recipients",
              type: "address[]"
            },
            { internalType: "uint32[]", name: "proportions", type: "uint32[]" }
          ],
          name: "mintWithNewHat",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { internalType: "uint256", name: "mintAmount", type: "uint256" },
            { internalType: "uint256", name: "hatID", type: "uint256" }
          ],
          name: "mintWithSelectedHat",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "name",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "owner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: false,
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "payInterest",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "proxiableUUID",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
          payable: false,
          stateMutability: "pure",
          type: "function"
        },
        {
          constant: true,
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "receivedLoanOf",
          outputs: [
            { internalType: "uint256", name: "amount", type: "uint256" }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "receivedSavingsOf",
          outputs: [
            { internalType: "uint256", name: "amount", type: "uint256" }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { internalType: "uint256", name: "redeemTokens", type: "uint256" }
          ],
          name: "redeem",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [],
          name: "redeemAll",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "redeemTo", type: "address" },
            { internalType: "uint256", name: "redeemTokens", type: "uint256" }
          ],
          name: "redeemAndTransfer",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "redeemTo", type: "address" }
          ],
          name: "redeemAndTransferAll",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "savingAssetConversionRate",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "savingAssetOrignalAmount",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "symbol",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "token",
          outputs: [
            { internalType: "contract IERC20", name: "", type: "address" }
          ],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "totalSupply",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "dst", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" }
          ],
          name: "transfer",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [{ internalType: "address", name: "dst", type: "address" }],
          name: "transferAll",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "src", type: "address" },
            { internalType: "address", name: "dst", type: "address" }
          ],
          name: "transferAllFrom",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: true,
          inputs: [
            { internalType: "address", name: "", type: "address" },
            { internalType: "address", name: "", type: "address" }
          ],
          name: "transferAllowances",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "src", type: "address" },
            { internalType: "address", name: "dst", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" }
          ],
          name: "transferFrom",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "newOwner", type: "address" }
          ],
          name: "transferOwnership",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "newCode", type: "address" }
          ],
          name: "updateCode",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        }
      ];
      var rDaiAddr = "0x261b45D85cCFeAbb11F022eBa346ee8D1cd488c0";
      const rDaiContract = new this.state.web3.eth.Contract(rDaiABI, rDaiAddr);
      var totalInterest = await rDaiContract.methods
        .interestPayableOf(this.state.contractAddress)
        .call();

      // Getting total donation and time till donation
      var totalDonation = await contract.methods.totalDonation().call();
      fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
        .then(function(response) {
          return response.json();
        })
        .then(function(result) {
          totalDonation = Math.round(
            (totalDonation / 1000000000000000000)
          );
          totalInterest = totalInterest / 1000000000000000000;
        });
      const currentDate = await contract.methods.currentDate().call();
      var donationTime = convertUnix(currentDate);

      // Getting list of charities
      var numCharities = await contract.methods.getNumCharities().call();
      var charityList = [];
      for (var i = 0; i < numCharities; i++) {
        var charityAddr = await contract.methods.charityAccts(i).call();
        var charityValues = await contract.methods
          .charities(charityAddr)
          .call();
        charityList.push({
          address: charityAddr,
          name: charityValues.name,
          website: charityValues.website
        });
      }

      this.setState({
        charity: charity,
        currentCharityAddr: currentCharityAddr,
        balance: balance,
        totalDonation: totalDonation,
        timeTillDonation: donationTime,
        charityList: charityList,
        listSize: Math.floor(charityList.length / 3),
        numCharities: numCharities,
        totalInterest: totalInterest
      });
    } catch (error) {}
  };

  updateListSize = () => {
    if (this.state.listSize < this.state.charityList.length) {
      this.setState({
        listSize: this.state.charityList.length,
        loadBtnText: "See less"
      });
    } else {
      this.setState({
        listSize: Math.floor(this.state.charityList.length / 3),
        loadBtnText: "Load more"
      });
    }
  };

  displayNetwork = () => {
    var networkId;
    var imgId = "red";
    switch (this.state.networkId) {
      case 1:
        networkId = "Mainnet";
        imgId = "green";
        break;
      case 3:
        networkId = "Ropsten";
        break;
      case 4:
        networkId = "Rinkeby";
        break;
      case 5:
        networkId = "Goerli";
        break;
      case 42:
        networkId = "Kovan";
        break;
      default:
        networkId = "Unknown";
        break;
    }
    return (
      <p>
        {" "}
        <img
          src={require("../assets/img/" + imgId + ".png")}
          width="10"
          className="mr-1"
        />
        {networkId}
      </p>
    );
  };

  render() {
    return (
      <>
        <NavbarBrand>
          <Link to="/">
            <h2 className="px-4 py-2">Give Together</h2>
          </Link>
          <ToastContainer />
        </NavbarBrand>
        <div className="pull-right">
          <h4 className="px-4 py-2 mt-3">{this.displayNetwork()}</h4>
        </div>
        <div className="wrapper">
          <div className="page-header">
            <div className="content-center">
              <Row className="row-grid justify-content-between align-items-center text-center">
                <Col>
                  <div>
                    <h1 className="text-white">
                      No Loss Donations
                      <h2 className="text-white">New charity each week</h2>
                    </h1>
                    {this.state.web3 && this.state.charity ? (
                      <div>
                        <h3>
                          This weeks charity{" "}
                          <u>
                            <a href={this.state.charity[2]} target="_blank">
                              {this.state.charity[1]}
                            </a>
                          </u>{" "}
                          <br />
                          Donate Directly{" "}
                          <a
                            href={
                              "https://www.etherscan.io/address/" +
                              this.state.currentCharityAddr
                            }
                            target="_blank"
                          >
                            {this.state.currentCharityAddr.slice(0, 5) + "..."}
                          </a>
                          <div className="pt-2">
                            {getQRCode(this.state.currentCharityAddr)}
                          </div>
                        </h3>
                        <h4 className="text-white">
                          This weeks interest <br />
                          <u>${this.state.totalInterest}</u> <br />
                          Powered by{" "}
                          <a href="https://rdai.money" target="_blank">
                            rDai
                          </a>
                        </h4>
                      </div>
                    ) : (
                      <h4 className="text-white">
                        Powered by{" "}
                        <a href="https://rdai.money" target="_blank">
                          rDai
                        </a>{" "}
                        <br />
                        Use a{" "}
                        <a href="https://www.brave.com">
                          Web3 enabled browser
                        </a>{" "}
                        to start donating
                      </h4>
                    )}
                  </div>
                  <p className="text-white mb-3"></p>
                  <div className="btn-wrapper mb-3">
                    <Link to="/activate">
                      <Button className="btn-round" color="success" size="sm">
                        Get Started
                        <i className="tim-icons icon-minimal-right" />
                      </Button>
                    </Link>
                  </div>
                  <div className="btn-wrapper">
                    <div className="button-container">
                      <Button
                        className="btn-icon btn-simple btn-round btn-neutral"
                        color="default"
                        href="https://twitter.com/givetogetherapp"
                      >
                        <i className="fab fa-twitter" />
                      </Button>
                      <Button
                        className="btn-icon btn-simple btn-round btn-neutral"
                        color="default"
                        href="https://discord.gg/4FnWFmu"
                      >
                        <i className="fab fa-discord" />
                      </Button>
                      <Button
                        className="btn-icon btn-neutral btn-round btn-simple"
                        color="default"
                        href="https://github.com/Give-Together"
                        target="_blank"
                      >
                        <i className="fab fa-github" />
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <Link to="/#how">
                <i
                  className="fa fa-arrow-circle-down"
                  aria-hidden="true"
                  style={{
                    fontSize: "5rem",
                    color: "white",
                    marginTop: "5rem"
                  }}
                ></i>
              </Link>
            </div>
          </div>
          <section id="how">
            <Container className="mt-5">
              <Row className="row-grid justify-content-between">
                {this.state.web3 ? (
                  <React.Fragment>
                    <Col className="mt-lg-5" md="5">
                      <Row>
                        <Col className="px-2 py-2" lg="6" sm="12">
                          <Card className="card-stats">
                            <CardBody>
                              <Row>
                                <Col md="4" xs="5">
                                  <div className="icon-big text-center icon-warning">
                                    <i className="tim-icons icon-trophy text-warning" />
                                  </div>
                                </Col>
                                <Col md="8" xs="7">
                                  <div className="numbers">
                                    <CardTitle tag="p">
                                      {this.state.timeTillDonation}
                                    </CardTitle>
                                    <p />
                                    <p className="card-category">
                                      Donation Time
                                    </p>
                                  </div>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col className="px-2 py-2" lg="6" sm="12">
                          <Card className="card-stats">
                            <CardBody>
                              <Row>
                                <Col md="4" xs="5">
                                  <div className="icon-big text-center icon-warning">
                                    <i className="tim-icons icon-coins text-warning" />
                                  </div>
                                </Col>
                                <Col md="8" xs="7">
                                  <div className="numbers">
                                    <CardTitle tag="p">
                                      ${this.state.totalDonation}
                                    </CardTitle>
                                    <p />
                                    <p className="card-category">All Time</p>
                                  </div>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-2 py-2" lg="6" sm="12">
                          <Card className="card-stats">
                            <CardBody>
                              <Row>
                                <Col md="4" xs="5">
                                  <div className="icon-big text-center icon-warning">
                                    <i className="tim-icons icon-gift-2 text-info" />
                                  </div>
                                </Col>
                                <Col md="8" xs="7">
                                  <div className="numbers">
                                    <CardTitle tag="p">
                                      {this.state.numCharities}
                                    </CardTitle>
                                    <p />
                                    <p className="card-category">Charities</p>
                                  </div>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </Col>
                    <Col md="6">
                      <div className="pl-md-5 mt-4">
                        <h1>How?</h1>
                        <h4>
                          rDai is a revolutionary cryptocurrency that allows you
                          to generate interest while holding on the exact amount
                          you invested. rDai also allows you to designate who to
                          send you interest to. With this are many use cases
                          like donating to charity automatically!
                        </h4>
                        <br />
                      </div>
                    </Col>
                  </React.Fragment>
                ) : (
                  <div>
                    <Col md="12">
                      <div className="pl-md-5 mt-4">
                        <h1>How?</h1>
                        <h4>
                          rDai is a revolutionary cryptocurrency that allows you
                          to generate interest while holding on the exact amount
                          you invested. rDai also allows you to designate who to
                          send you interest to. With this are many use cases
                          like donating to charity automatically!
                        </h4>
                        <br />
                      </div>
                    </Col>
                  </div>
                )}
              </Row>
            </Container>
          </section>
          <Learn />
          <section>
            <Container>
              {!isMobile ? (
                <Col md="12">
                  <h2 className="text-center" id="charities">
                    Charities
                  </h2>
                  <ListGroup className="m-5">
                    {this.state.charityList
                      .slice(0, this.state.listSize)
                      .map(charity => (
                        <ListGroupItem
                          key={charity.address}
                          style={{
                            color: "white",
                            border: "none",
                            opacity: "0.9"
                          }}
                          className="bg-dark"
                        >
                          <Col>
                            <Row>
                              <br />
                              <PopoverQR address={charity.address} />
                              <h4
                                style={{
                                  marginLeft: "0.5rem",
                                  wordWrap: "break-word",
                                  fontSize: "1.25vw"
                                }}
                              >
                                {charity.address}
                              </h4>
                            </Row>
                          </Col>
                          <Col>
                            <a href={charity.website} target="_blank">
                              {charity.website}
                            </a>
                          </Col>
                          <Col>
                            <a
                              href={"https://etherscan.io/" + charity.address}
                              target="_blank"
                            >
                              {charity.address}
                            </a>
                          </Col>
                        </ListGroupItem>
                      ))}
                    <div
                      style={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center"
                      }}
                    >
                      <button
                        className="btn-primary btn-round mt-3"
                        style={{ width: "10rem", outline: "none" }}
                        onClick={() => this.updateListSize()}
                      >
                        {this.state.loadBtnText}
                      </button>
                    </div>
                    <h5 className="text-center mt-4">
                      More detailed information about supported charities can be
                      found{" "}
                      <a href="https://github.com/Give-Together/give-together/blob/master/Charities.md">
                        here
                      </a>
                    </h5>
                  </ListGroup>
                </Col>
              ) : (
                <h5 className="text-center mt-4">
                  More detailed information about supported charities can be
                  found{" "}
                  <a href="https://github.com/Give-Together/give-together/blob/master/Charities.md">
                    here
                  </a>
                </h5>
              )}
            </Container>
          </section>
          <Footer />
        </div>
      </>
    );
  }
}

export default LandingPage;
