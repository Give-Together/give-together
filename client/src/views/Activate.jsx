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
  NavbarBrand,
  FormGroup,
  Input,
  Nav,
  Container,
  CardHeader,
  NavItem,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Row,
  Col,
  Button
} from "reactstrap";

// core components
import Footer from "../components/Footer/Footer.jsx";
import { ToastContainer, toast } from "react-toastify";
import getWeb3 from "../getWeb3";
import "react-toastify/dist/ReactToastify.css";
import Notify from "bnc-notify";
import { notifyConfig } from "../firestore";

class Activate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconTabs: 1,
      textTabs: 4,
      activateAmount: 0,
      withdrawAmount: 0,
      depositColor: "has-success",
      transactionText: null,
      daiBalance: null,
      rdaibalance: null,
      type: "Activate",
    };
  }

  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };

  notifySuccess = msg => toast.success(msg);
  notifyWarn = msg => toast.warn(msg);
  notifyError = msg => toast.error(msg);

  componentDidMount = async () => {
    this.connectWeb3();
  };

  connectWeb3 = async () => {
    try {
      // Get network provider and web3 instance.
      var web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      var accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      var networkId = await web3.eth.net.getId();

      if (web3 && networkId == 1) {
        // netId 1 is the mainnet
        this.notifySuccess("Connecting to Mainnet");
      } else {
        switch (networkId) {
          case 3:
            this.notifyWarn("Incorrect network Ropsten");
            break;
          case 4:
            this.notifyWarn("Incorrect network Rinkeby");
            break;
          case 5:
            this.notifyWarn("Incorrect network Goerli");
            break;
          case 42:
            this.notifyWarn("Incorrect network Kovan");
            break;
          default:
            this.notifyError("No Web3 Provider or unknown network");
            break;
        }
      }

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3,
        accounts,
        networkId
      });

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
      const instance = new this.state.web3.eth.Contract(rDaiABI, rDaiAddr);
      this.setState({
        contract: instance
      });
      var daiBalance = await this.checkDaiBalance(this.state.accounts[0]);
      var rdaiBalance = await this.checkrDaiBalance(this.state.accounts[0]);
      this.setState({
        daiBalance: daiBalance,
        rdaiBalance: rdaiBalance
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
    }
  };

  handleChangeActivate = async e => {
    this.setState({
      activateAmount: e.target.value
    });
    if (this.state.web3) {
      var daiBalance = await this.checkDaiBalance(this.state.accounts[0]);
      var rdaiBalance = await this.checkrDaiBalance(this.state.accounts[0]);
      this.setState({
        daiBalance: daiBalance,
        rdaiBalance: rdaiBalance
      });
      if (Number(daiBalance) >= Number(this.state.activateAmount)) {
        this.setState({
          depositColor: "has-success"
        });
      } else {
        this.setState({
          depositColor: "has-danger"
        });
      }
    } else {
      this.setState({
        depositColor: "has-danger"
      });
    }
  };

  handleChangeWithdraw = async e => {
    this.setState({
      withdrawAmount: e.target.value
    });
    if (this.state.web3) {
      var rdaiBalance = await this.checkrDaiBalance(this.state.accounts[0]);
      this.setState({
        rdaiBalance: rdaiBalance
      });
      if (Number(rdaiBalance) >= Number(this.state.withdrawAmount)) {
        this.setState({
          depositColor: "has-success"
        });
      } else {
        this.setState({
          depositColor: "has-danger"
        });
      }
    } else {
      this.setState({
        depositColor: "has-danger"
      });
    }
  };

  activateDai = async () => {
    const hat = 61;
    var gasPrice = await this.state.web3.eth.getGasPrice();
    this.notifyWarn("Activate by paying Gas");
    this.state.contract.methods
      .mintWithSelectedHat(
        this.state.web3.utils.toWei(this.state.activateAmount),
        hat
      )
      .send({
        from: this.state.accounts[0],
        gasPrice: gasPrice
      })
      .on("transactionHash", function(hash) {
        console.log("Transaction Hash: " + hash);
        var notify = Notify({
          dappId: notifyConfig, // [String] The API key created by step one above
          networkId: 1 // [Integer] The Ethereum network ID your Dapp uses.
        });
        notify.config({
          darkMode: true,
          desktopPosition: "topRight"
        });
        notify.hash(hash);
      })
      .then(result => {
        console.log("Success: " + result.transactionHash);
      });
  };

  withdrawDai = async () => {
    var gasPrice = await this.state.web3.eth.getGasPrice();
    this.notifyWarn("Withdraw by paying Gas");
    console.log(this.state.web3.utils.toWei(this.state.withdrawAmount));
    this.state.contract.methods
      .redeem(this.state.web3.utils.toWei(this.state.withdrawAmount))
      .send({
        from: this.state.accounts[0],
        gasPrice: gasPrice
      })
      .on("transactionHash", function(hash) {
        console.log("Transaction Hash: " + hash);
        var notify = Notify({
          dappId: notifyConfig, // [String] The API key created by step one above
          networkId: 1 // [Integer] The Ethereum network ID your Dapp uses.
        });
        notify.config({
          darkMode: true,
          desktopPosition: "topRight"
        });
        notify.hash(hash);
      })
      .then(result => {
        console.log("Success: " + result.transactionHash);
      });
  };

  checkDaiBalance = async address => {
    var DaiABI = [
      {
        inputs: [
          { internalType: "uint256", name: "chainId_", type: "uint256" }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "src",
            type: "address"
          },
          {
            indexed: true,
            internalType: "address",
            name: "guy",
            type: "address"
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "wad",
            type: "uint256"
          }
        ],
        name: "Approval",
        type: "event"
      },
      {
        anonymous: true,
        inputs: [
          {
            indexed: true,
            internalType: "bytes4",
            name: "sig",
            type: "bytes4"
          },
          {
            indexed: true,
            internalType: "address",
            name: "usr",
            type: "address"
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "arg1",
            type: "bytes32"
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "arg2",
            type: "bytes32"
          },
          { indexed: false, internalType: "bytes", name: "data", type: "bytes" }
        ],
        name: "LogNote",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "src",
            type: "address"
          },
          {
            indexed: true,
            internalType: "address",
            name: "dst",
            type: "address"
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "wad",
            type: "uint256"
          }
        ],
        name: "Transfer",
        type: "event"
      },
      {
        constant: true,
        inputs: [],
        name: "DOMAIN_SEPARATOR",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "PERMIT_TYPEHASH",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "address", name: "", type: "address" }
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
          { internalType: "address", name: "usr", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" }
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "usr", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" }
        ],
        name: "burn",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ internalType: "address", name: "guy", type: "address" }],
        name: "deny",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "usr", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" }
        ],
        name: "mint",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "src", type: "address" },
          { internalType: "address", name: "dst", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" }
        ],
        name: "move",
        outputs: [],
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
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "nonces",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "holder", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "uint256", name: "expiry", type: "uint256" },
          { internalType: "bool", name: "allowed", type: "bool" },
          { internalType: "uint8", name: "v", type: "uint8" },
          { internalType: "bytes32", name: "r", type: "bytes32" },
          { internalType: "bytes32", name: "s", type: "bytes32" }
        ],
        name: "permit",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "usr", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" }
        ],
        name: "pull",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "usr", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" }
        ],
        name: "push",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ internalType: "address", name: "guy", type: "address" }],
        name: "rely",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
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
          { internalType: "uint256", name: "wad", type: "uint256" }
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "src", type: "address" },
          { internalType: "address", name: "dst", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" }
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "version",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "wards",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      }
    ];
    var DaiAddr = "0x6b175474e89094c44da98b954eedeac495271d0f";
    const daiInstance = new this.state.web3.eth.Contract(DaiABI, DaiAddr);
    var balance = await daiInstance.methods.balanceOf(address).call();
    return this.state.web3.utils.fromWei(balance);
  };

  checkrDaiBalance = async address => {
    var balance = await this.state.contract.methods.accounts(address).call();
    return this.state.web3.utils.fromWei(balance.rAmount);
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
          <Row>
            <h4 className="px-4 py-2 mt-3">{this.displayNetwork()} </h4>
          </Row>
        </div>
        <div className="wrapper">
          <div className="page-header">
            <div className="content-center" style={{ marginTop: "-5rem" }}>
              <Row className="row-grid justify-content-between align-items-center text-left">
                <div
                  className="section section-tabs"
                  style={{ margin: "0 auto" }}
                >
                  <Container>
                    <Col>
                      <div className="wrapper">
                        <Card className="card-stats">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center"
                            }}
                          >
                            <CardHeader>
                              <h3 className="text-center">
                                {this.state.type} your Donation
                              </h3>
                              <Row className="row-grid justify-content-between">
                                <Nav
                                  className="nav-tabs-info"
                                  role="tablist"
                                  tabs
                                >
                                  <NavItem>
                                    <Button
                                      onClick={e => {
                                        this.toggleTabs(e, "textTabs", 4);
                                        this.setState({
                                          type: "Activate"
                                        });
                                      }}
                                    >
                                      Deposit
                                    </Button>
                                  </NavItem>
                                  <NavItem>
                                    <Button
                                      onClick={e => {
                                        this.toggleTabs(e, "textTabs", 5);
                                        this.setState({
                                          type: "Withdraw"
                                        });
                                      }}
                                    >
                                      Withdraw
                                    </Button>
                                  </NavItem>
                                </Nav>
                              </Row>
                            </CardHeader>
                          </div>
                          <CardBody>
                            <TabContent
                              className="tab-space"
                              activeTab={"link" + this.state.textTabs}
                            >
                              <TabPane tabId="link4" className="text-center">
                                <p className="pb-3">
                                  Activate your DAI by turning it into rDAI you
                                  will accrue interest that is automatically
                                  donated to a new charity each week. All at no
                                  loss to you! Read more about it{" "}
                                  <Link to="/about">here</Link>.
                                </p>
                                <Row
                                  className="row-grid justify-content-between align-items-center text-left"
                                  style={{ width: "50%", margin: "0 auto" }}
                                >
                                  <Col lg="12" sm="12">
                                    <FormGroup
                                      className={this.state.depositColor}
                                    >
                                      <Input
                                        value={this.state.activateAmount}
                                        onChange={this.handleChangeActivate.bind(
                                          this
                                        )}
                                        placeholder="DAI Amount"
                                        type="text"
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Button
                                  className="t-4"
                                  onClick={async () => {
                                    var daiBalance = await this.checkDaiBalance(
                                      this.state.accounts[0]
                                    );
                                    this.setState({
                                      daiBalance: daiBalance
                                    });
                                    if (
                                      Number(daiBalance) >=
                                      Number(this.state.activateAmount)
                                    ) {
                                      this.setState({
                                        depositColor: "has-success"
                                      });
                                      this.activateDai();
                                    } else {
                                      this.setState({
                                        depositColor: "has-danger"
                                      });
                                      this.notifyError("Not enough DAI");
                                    }
                                  }}
                                >
                                  Activate
                                </Button>
                              </TabPane>
                              <TabPane tabId="link5" className="text-center">
                                <p className="pb-3">
                                  Exchange your rDAI Donation back to DAI and
                                  stop donating your interest
                                </p>
                                <Row
                                  className="row-grid justify-content-between align-items-center text-left"
                                  style={{ width: "50%", margin: "0 auto" }}
                                >
                                  <Col lg="12" sm="12">
                                    <FormGroup
                                      className={this.state.depositColor}
                                    >
                                      <Input
                                        value={this.state.withdrawAmount}
                                        onChange={this.handleChangeWithdraw.bind(
                                          this
                                        )}
                                        placeholder="DAI Amount"
                                        type="text"
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Button
                                  onClick={async () => {
                                    var rdaiBalance = await this.checkrDaiBalance(
                                      this.state.accounts[0]
                                    );
                                    this.setState({
                                      rdaiBalance: rdaiBalance
                                    });
                                    if (
                                      Number(rdaiBalance) >=
                                      Number(this.state.withdrawAmount)
                                    ) {
                                      this.setState({
                                        depositColor: "has-success"
                                      });
                                      this.withdrawDai();
                                    } else {
                                      this.setState({
                                        depositColor: "has-danger"
                                      });
                                      this.notifyError("Not enough rDAI");
                                    }
                                  }}
                                  className="t-4"
                                >
                                  Withdraw
                                </Button>
                              </TabPane>
                            </TabContent>
                          </CardBody>
                          {this.state.web3 ? (
                            <div className="text-center">
                              <h5>
                                DAI Balance:{" "}
                                {Math.max(
                                  Math.round(this.state.daiBalance * 10) / 10
                                ).toFixed(2)}
                              </h5>
                              {/* <h5>
                                rDAI Contribution:{" "}
                                {Math.max(
                                  Math.round(this.state.rdaiBalance * 10) / 10
                                ).toFixed(2)}
                              </h5> */}
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "center"
                                }}
                              >
                                <h5>
                                  <Button
                                    onClick={() =>
                                      window.open(
                                        "https://uniswap.exchange/swap",
                                        "_blank"
                                      )
                                    }
                                  >
                                    Swap ETH for DAI
                                  </Button>
                                </h5>
                                <h5>
                                  <Button onClick={() => this.connectWeb3()}>
                                    Connect Wallet
                                  </Button>
                                </h5>
                              </Row>
                            </div>
                          ) : (
                            <Row
                              style={{
                                display: "flex",
                                justifyContent: "center"
                              }}
                            >
                              <h5>
                                <Button
                                  onClick={() =>
                                    window.open(
                                      "https://uniswap.exchange/swap",
                                      "_blank"
                                    )
                                  }
                                >
                                  Swap ETH for DAI
                                </Button>
                              </h5>
                              <h5>
                                <Button onClick={() => this.connectWeb3()}>
                                  Connect Wallet
                                </Button>
                              </h5>
                            </Row>
                          )}
                        </Card>
                      </div>
                    </Col>
                  </Container>
                </div>
              </Row>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default Activate;
