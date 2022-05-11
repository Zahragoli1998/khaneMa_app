import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
const clients = [
  {
    lastname: "client 1",
    _id: 1,
    visited: true
  },
  {
    lastname: "client 2",
    _id: 2,
    visited: true
  },
  {
    lastname: "client 3",
    _id: 3,
    visited: false
  },
  {
    lastname: "client 4",
    _id: 4,
    visited: false
  },
  {
    lastname: "client 5",
    _id: 5,
    visited: false
  }
];

const listOfClients =
  clients !== null &&
  clients.map(client => ({
    value: client._id,
    label: client.company
      ? client.company
      : client.lastname + " " + client.lastname,
    last_visit: client.last_visit,
    wilaya: client.wilaya,
    visited: client.visited,
    isFixed: client.visited // true : false
  }));

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  }
};

export default class FixedOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: []
    };
  }

  onChange = (e, option) => {
    if (option.removedValue && option.removedValue.isFixed) return;

    this.setState({
      clients: e
    });
  };
  render() {
    return (
      <div className="App">
        <Select
          name="clients"
          isMulti
          value={this.state.clients}
          onChange={this.onChange}
          isClearable={!this.state.clients.some(client => client.visited)}
          options={listOfClients || []}
          className="basic-multi-select"
          classNamePrefix="تگ ها"
          styles={styles}
        />
      </div>
    );
  }
}

