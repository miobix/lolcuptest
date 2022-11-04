import React, { Component } from "react";
import { Form, Input, Button, Message, Dropdown } from "semantic-ui-react";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const categoryOptions = [
  { key: "CCC", text: "CCC", value: 1 },
  { key: "Pangea", text: "Pangea", value: 2 },
  { key: "Canverse", text: "Canverse", value: 3 },
];

class CreatePostForm extends Component {
  state = {
    content: "",
    category:"",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    //recordar q al al llamar funciones, meterlas en un try
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createBasePost(this.state.content, 1)
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
              onChange={(event) =>
                this.setState({ category: event.target.value })
              }
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

export default CreatePostForm;
