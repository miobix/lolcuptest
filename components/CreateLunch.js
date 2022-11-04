import React, { Component } from "react";
import { Form, Input, Button, Message, Dropdown } from "semantic-ui-react";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const categoryOptions = [
  { key: "Monday", text: "Monday", value: 1 },
  { key: "Tuesday", text: "Tuesday", value: 2 },
  { key: "Wednesday", text: "Wednesday", value: 3 },
  { key: "Thursday", text: "Thursday", value: 4 },
  { key: "Friday", text: "Friday", value: 5 },
  { key: "Saturday", text: "Saturday", value: 6 },
];
let CatId;

class CreateLunch extends Component {
  state = {
    content: "",
    category:"",
    errorMessage: "",
    loading: false,
  };

  handleDropDown = (event, data) => {
    this.setState({category: event.target.value})
    CatId = data.value;
   };

  onSubmit = async (event, data) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    //recordar q al al llamar funciones, meterlas en un try
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createBasePost(this.state.content, CatId)
        .send({
          from: accounts[0],
        });
      Router.replaceRoute(`/lunchmenu`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false, value: "" });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
     
        <Form.Field>
          <label>Content</label>
          <Input
            value={this.state.content}
            onChange={(event) =>
              this.setState({ content: event.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Category</label>
          <div>
            <Dropdown
              placeholder="Select Category"
              fluid
              selection
              options={categoryOptions}
              value={this.state.category}
              onChange={this.handleDropDown}
              

            />

          </div>
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading} floated="right">
          Create Post
        </Button>
      </Form>
    );
  }
}

export default CreateLunch;
