import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import GiveTogetherContract from "./contracts/GiveTogether.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {
    charity: ["0x", "Charity", "Website"],
    balance: null,
    web3: null,
    accounts: null,
    contract: null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = GiveTogetherContract.networks[networkId];
      const instance = new web3.eth.Contract(
        GiveTogetherContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
        { web3, accounts, contract: instance, networkId },
        this.runExample
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // Try's to call methods on the contract
    // if it is on the network
    console.log(contract);
    console.log(contract.methods);
    try {
      // For writes use send needed for gas
      // await contract.methods.set(5).send({ from: accounts[0] });
      // Get the value from the contract to prove it worked.

      // Getting current charity
      const currentCharityAddr = await contract.methods.currentCharity().call();
      console.log(currentCharityAddr);

      // Getting name of charity
      const charity = await contract.methods
        .getCharities(currentCharityAddr)
        .call();
      console.log(charity);
      // Update state with the result.
      this.setState({ charity: charity });

      // Getting balance of contract
      var balance = await this.state.web3.eth.getBalance(
        "0x822BBe00D92c21544923af9d660921B5f4Af8dFc"
      );
      console.log(balance);
      // Update state with the result.
      this.setState({ balance: balance });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h2>Current Balance: {this.state.balance}</h2>
        <h3>Current Charity {this.state.charity[1]}</h3>
        <h5>Donate Directly {this.state.charity[0]}</h5>
        <a href={this.state.charity[2]}>{this.state.charity[1]}</a>
        <h3>You are on Network: {this.state.networkId}</h3>
      </div>
    );
  }
}

export default App;
