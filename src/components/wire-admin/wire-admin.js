import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DynamicTable from '@atlaskit/dynamic-table';
import { getToken } from '../helpers/use_token';


const head = {
  cells: [
    {
      key: "id",
      content: "Id",
      isSortable: true,
    },
    {
      key: "orden",
      content: "Orden",
      isSortable: true,
    },
    {
      key: ""
    }
  ]
}

export default class WireAdmin extends Component {
  render() {
    return (
      <div>
        Wire Administration
      </div>
    );
  }
}