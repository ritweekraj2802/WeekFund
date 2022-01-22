import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Typography } from 'antd';
import 'antd/dist/antd.css';

const translateType = type => {
  switch (true) {
    case /^uint/.test(type):
      return "number";
    case /^string/.test(type) || /^bytes/.test(type):
      return "text";
    case /^bool/.test(type):
      return "checkbox";
    default:
      return "text";
  }
};

class DepositTaxForm extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;
    this.utils = context.drizzle.web3.utils;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    var initialState = {
      deposit: 0,
    };

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === this.props.method) {
        this.inputs = abi[i].inputs;

        for (var j = 0; j < this.inputs.length; j++) {
          initialState[this.inputs[j].name] = "";
        }

        break;
      }
    }

    this.state = initialState;
  }

  handleSubmit(event) {
    event.preventDefault();

    const convertedInputs = this.inputs.map(input => {
      if (input.type === "bytes32") {
        return this.utils.toHex(this.state[input.name]);
      } else if (input.name === 'tokenId') {
        return this.utils.toHex(this.props.tokenId);
      }
      return this.state[input.name];
    });

    return this.contracts[this.props.contract].methods[
      this.props.method
      ].cacheSend(...convertedInputs, { value: this.state.deposit });
  }

  handleInputChange(event) {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    this.setState({ [event.target.name]: value });
  }

  handleDepositChange(event) {
    this.setState({ deposit: event.target.value });
  }

  render() {
    if (this.props.render) {
      return this.props.render({
        inputs: this.inputs,
        inputTypes: this.inputs.map(input => translateType(input.type)),
        state: this.state,
        handleInputChange: this.handleInputChange,
        handleSubmit: this.handleSubmit,
      });
    }

    const { Text } = Typography;

    return (
      <Form
        onSubmit={this.handleSubmit}
      >
        {this.inputs.map((input, index) => {
          var inputType = translateType(input.type);
          var inputLabel = this.props.labels
            ? this.props.labels[index]
            : input.name;
          // check if input type is struct and if so loop out struct fields as well
          return (input.name !== 'tokenId')
            ? (
            <Form.Item>
              <Input
                key={input.name}
                type={inputType}
                name={input.name}
                value={this.state[input.name]}
                placeholder={inputLabel}
                onChange={this.handleInputChange}
              />
            </Form.Item>
          ) : (
            <div>
              <p><Text>Send Pledge to Creator</Text></p>
              <Form.Item>
              <Input
                key={"deposit-value"}
                type="number"
                name="deposit"
                value={this.state["deposit"]}
                placeholder="Deposit Pledge"
                onChange={this.handleDepositChange.bind(this)}
              />
              </Form.Item>
            </div>
          );
        })}
        <Form.Item>
          <Button
            key="submit"
            type="primary"
            onClick={this.handleSubmit}
          >
            Send Pledge
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

DepositTaxForm.contextTypes = {
  drizzle: PropTypes.object,
};

DepositTaxForm.propTypes = {
  contract: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  sendArgs: PropTypes.object,
  labels: PropTypes.arrayOf(PropTypes.string),
  render: PropTypes.func,
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts,
  };
};

export default drizzleConnect(DepositTaxForm, mapStateToProps);