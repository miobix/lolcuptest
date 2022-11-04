import React, { useState, Component, useEffect } from "react";
import {
  Button,
  Container,
  Header,
  Form,
  Input,
  Message,
  Comment,
  Checkbox,
  Grid,
  Image,
  Modal,
} from "semantic-ui-react"; //importa elementos de semantic ui
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout";
import { Router } from "../routes";
import { ethers } from "ethers";

const sbtAchv = require("../ethereum/build/pngsbt.json");
//var SBT_ADDRESS = "0xA5b599858D4CAaD43d70df33BC26f47f8e7f9b59"; // achievements address goerli
var SBT_ADDRESS = "0x78e16D4831aEDae07c127DddF33364910079823F";
var SBT_ADDDRESS_POLYGON = "0x78e16D4831aEDae07c127DddF33364910079823F";
var SIGNER_KEY =
  "0x852f31db8c246dad68a0b4f2b8df39ce4c7ef8632bea856a94043d7eafad843a";
var MINTER_KEY =
  "0x2fe67041633794d0a8c0e8bb0817fc8dbee412ec483b46a8ca2cd9114130db3d";
var SIGNER_ADDRESS = "0x472FbC6829BB0bbe82b8E8698e1826040249Dd68";
var INFURA_API_KEY = "450a61d7ae6843cb83191a6189b6d40a";

class PostsIndex extends Component {
  state = {
    loading: false,
    claimed: "Claim Tokens",
    inputWallet: "",
    loadingConnect: false,
    isConnected: false,
    isSbtOwner: "",
    checked: false,
    modalOpen: false,
    newWallet: "",
    newMnemonic: "",
    error: false,
    completed:false
  };

  mintskt = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    if (true) {
      try {
        if (
          this.state.inputWallet != "" &&
          ethers.utils.isAddress(this.state.inputWallet) == false
        ) {
          throw "invalid address";
        }
        if (this.state.inputWallet == "" && this.state.checked == false) {
          throw "empty address";
        }
        if (this.state.inputWallet == "" && this.state.checked == true) {
          const wallet = ethers.Wallet.createRandom();
          console.log("address:", wallet.address);
          console.log("mnemonic:", wallet.mnemonic.phrase);
          console.log("privateKey:", wallet.privateKey);
          this.setState({
            newWallet: wallet.address,
            newMnemonic: wallet.mnemonic.phrase,
            inputWallet: wallet.address,
            modalOpen: true,
          });
        }
        let provider = new ethers.providers.InfuraProvider("matic");
        let minterWallet = new ethers.Wallet(MINTER_KEY);
        let connectedMinter = minterWallet.connect(provider);
        const achvContract = new ethers.Contract(
          SBT_ADDRESS,
          sbtAchv.interface,
          provider
        );
        try {
          let balanceSKT = await achvContract.balanceOf(
            this.state.inputWallet,
            1
          );
          let balanceDRX = await achvContract.balanceOf(
            this.state.inputWallet,
            2
          );

          if (balanceSKT > 0 || balanceDRX > 0) {
            this.setState({ error: true });
            throw "This address already minted";
          }
        } catch (e) {
          console.log(e);
        }
        let maxFeePerGas = ethers.BigNumber.from(2000000000000); //40gwei
        const achWithSigner = achvContract.connect(connectedMinter);
        const transaction = await achWithSigner.signedMint(
          1,
          this.state.inputWallet,
          { gasPrice: maxFeePerGas }
        );
        await transaction.wait();
        this.setState({completed:true})
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please connect wallet");
    }
    this.setState({ loading: false, value: "", claimed: "Claimed!" });
  };

  mintdrx = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    if (true) {
      try {
        if (
          this.state.inputWallet != "" &&
          ethers.utils.isAddress(this.state.inputWallet) == false
        ) {
          throw "invalid address";
        }
        if (this.state.inputWallet == "" && this.state.checked == false) {
          throw "empty address";
        }
        if (this.state.inputWallet == "" && this.state.checked == true) {
          const wallet = ethers.Wallet.createRandom();
          console.log("address:", wallet.address);
          console.log("mnemonic:", wallet.mnemonic.phrase);
          console.log("privateKey:", wallet.privateKey);
          this.setState({
            newWallet: wallet.address,
            newMnemonic: wallet.mnemonic.phrase,
            inputWallet: wallet.address,
            modalOpen: true,
          });
        }
        let provider = new ethers.providers.InfuraProvider("matic");
        let minterWallet = new ethers.Wallet(MINTER_KEY);
        let connectedMinter = minterWallet.connect(provider);
        const achvContract = new ethers.Contract(
          SBT_ADDRESS,
          sbtAchv.interface,
          provider
        );
        try {
          let balanceSKT = await achvContract.balanceOf(
            this.state.inputWallet,
            1
          );
          let balanceDRX = await achvContract.balanceOf(
            this.state.inputWallet,
            2
          );

          if (balanceSKT > 0 || balanceDRX > 0) {
            this.setState({ error: true });
            throw "This address already minted";
          }
        } catch (e) {
          console.log(e);
        }
        let maxFeePerGas = ethers.BigNumber.from(2000000000000); //40gwei
        const achWithSigner = achvContract.connect(connectedMinter);
        const transaction = await achWithSigner.signedMint(
          2,
          this.state.inputWallet,
          { gasPrice: maxFeePerGas }
        );
        await transaction.wait();
        this.setState({completed:true})
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please connect wallet");
    }
    this.setState({ loading: false, value: "", claimed: "Claimed!" });
  };
  render() {
    const { active } = this.state;

    return (
      <Layout>
        <br />
        <Container text>
          <Header textAlign="center" as="h2">
            SBT button test
            <br />
            <br />
            <Grid columns={3} divided>
              <Grid.Row fluid>
                <Input
                  placeholder="Wallet address"
                  label="Token ID"
                  labelPosition="left"
                  value={this.state.inputWallet}
                  onChange={
                    (event) =>
                      this.setState({
                        inputWallet: event.target.value,
                      }) //updatea el valor de lo ingresado en el input a medida q se escribe
                  }
                />
              </Grid.Row>

              <Grid.Row width={10}>
                <Checkbox
                  label="Create a wallet for me"
                  onChange={(e, data) =>
                    this.setState({ checked: data.checked })
                  }
                  checked={this.state.checked}
                />
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={7}>
                  <Modal
                    centered={false}
                    open={this.state.modalOpen}
                    onClose={() => this.setState({ modalOpen: false })}
                    onOpen={() => this.setState({ modalOpen: true })}
                  >
                    <Modal.Header>New Wallet Details</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        Copy the contents of your new wallet below. This message
                        will not be shown again.
                        <br />
                        <br />
                        Wallet address: {this.state.newWallet}.<br />
                        <br />
                        Mnemonic Phrase: {this.state.newMnemonic}.
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        onClick={() => this.setState({ modalOpen: false })}
                      >
                        Got it!
                      </Button>
                    </Modal.Actions>
                  </Modal>

                  <Modal
                    centered={false}
                    open={this.state.error}
                    onClose={() => this.setState({ error: false })}
                    onOpen={() => this.setState({ error: true })}
                  >
                    <Modal.Header>Error!</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        This wallet already minted. Thank you for participating!
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button onClick={() => this.setState({ error: false })}>
                        Confirm
                      </Button>
                    </Modal.Actions>
                  </Modal>

                  <Modal
                    centered={false}
                    open={this.state.completed}
                    onClose={() => this.setState({ completed: false })}
                    onOpen={() => this.setState({ completed: true })}
                  >
                    <Modal.Header>Completed!</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        We have sent a Token to the above address, thank you for trying our process!
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button onClick={() => this.setState({ completed: false })}>
                        Confirm
                      </Button>
                    </Modal.Actions>
                  </Modal>



                  <Button
                    loading={this.state.loading}
                    primary
                    onClick={this.mintskt}
                    error={!!this.state.errorMessage}
                    toggle
                    active={active}
                  >
                    T1 mint
                  </Button>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Button
                    loading={this.state.loading}
                    primary
                    onClick={this.mintdrx}
                    error={!!this.state.errorMessage}
                    toggle
                    active={active}
                  >
                    DRX mint
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Header>
          <Container fluid text textAlign="center">
            <br />

            <br />
            <br />

            <br />
            <br />

            <br />
            <br />
          </Container>
        </Container>
      </Layout>
    );
  }
}

export default PostsIndex;
