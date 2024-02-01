import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './DataTable.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default class DataTable extends Component {
  handleEditClick = (row) => {
    this.props.onEditClick(row);
  };

  handleDeleteClick = (row) => {
    this.props.onDeleteClick(row);
  };

  render() {
    const { data } = this.props;

    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'fName', headerName: 'First name', width: 130 },
      { field: 'lName', headerName: 'Last name', width: 130 },
      { field: 'mobile', headerName: 'Mobile', width: 130 },
      { field: 'dob', headerName: 'Date of Birth', width: 130 },
      { field: 'address', headerName: 'Address', width: 130 },
      { field: 'state', headerName: 'State', width: 130 },
      { field: 'country', headerName: 'Country', width: 130 },
      { field: 'city', headerName: 'City', width: 130 },
      { field: 'gender', headerName: 'Gender', width: 130 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 130,
        renderCell: (params) => (
          <div className="action-buttons">
            <button
              className="edit-button"
              onClick={() => this.handleEditClick(params.row)}
            >
              <EditIcon />
            </button>
            <button className="delete-button" onClick={() => this.handleDeleteClick(params.row)}>
              <DeleteIcon />
            </button>
          </div>
        ),
      },
    ];

    return (
      <div className='container' style={{ height: 400, width: '95%' }}>
        <DataGrid rows={data} columns={columns} pageSize={5} />
      </div>
    );
  }
}
