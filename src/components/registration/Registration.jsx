import React, { Component } from "react";
import "./Registration.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import DataTable from "../DataTable/DataTable";

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: {
        fName: { val: false, msg: "" },
        lName: { val: false, msg: "" },
        mobile: { val: false, msg: "" },
        dob: { val: false, msg: "" },
        address: { val: false, msg: "" },
        state: { val: false, msg: "" },
        country: { val: false, msg: "" },
        city: { val: false, msg: "" },
        gender: { val: false, msg: "" },
      },
      userDetails: {
        id: "",
        fName: "",
        lName: "",
        mobile: "",
        dob: "",
        address: "",
        state: "",
        country: "",
        city: "",
        gender: "",
      },
      data: [
        {
          address: "Indore",
          city: "Indore",
          country: "India",
          dob: "2024-01-08",
          fName: "Jatin",
          gender: "male",
          id: 1706698204069,
          lName: "Chouhan",
          mobile: "9826776138",
          state: "Madhya Pradesh",
        },
      ],
      isEditMode: false,
      editedRow: null,
    };
  }

  handleOnChange = (e) => {
    const { name, value } = e.target;

    this.setState((prevState) => ({
      userDetails: {
        ...prevState.userDetails,
        [name]: value,
      },
    }));
  };

  handleEditClick = (row) => {
    this.setState({
      isEditMode: true,
      editedRow: row,
      userDetails: { ...row }, // Set userDetails with the values of the clicked row
    });
  };
  handleDeleteClick = (row) => {
    const updatedData = this.state.data.filter((r) => r.id !== row.id);

    this.setState({
      data: updatedData,
      isEditMode: false,
      editedRow: null,
      userDetails: {
        id: "",
        fName: "",
        lName: "",
        mobile: "",
        dob: "",
        address: "",
        state: "",
        country: "",
        city: "",
        gender: "",
      },
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.validateFields()) {
      const {
        fName,
        lName,
        mobile,
        dob,
        address,
        state,
        country,
        city,
        gender,
      } = this.state.userDetails;
  
      const newData = {
        id: this.state.isEditMode ? this.state.editedRow.id : Date.now(),
        fName: fName,
        lName: lName,
        mobile: mobile,
        dob: dob,
        address: address,
        state: state,
        country: country,
        city: city,
        gender: gender,
      };
  
      if (this.state.isEditMode) {
        const updatedData = this.state.data.map((row) =>
          row.id === this.state.editedRow.id ? newData : row
        );
  
        this.setState({
          data: updatedData,
          isEditMode: false,
          editedRow: null,
          userDetails: {
            id: "",
            fName: "",
            lName: "",
            mobile: "",
            dob: "",
            address: "",
            state: "",
            country: "",
            city: "",
            gender: "",
          },
        });
      } else {
        this.setState((prevState) => ({
          data: [...prevState.data, newData],
          userDetails: {
            id: "",
            fName: "",
            lName: "",
            mobile: "",
            dob: "",
            address: "",
            state: "",
            country: "",
            city: "",
            gender: "",
          },
        }));
      }
  
      console.log(this.state.data);
    } else {
      console.log("Can't submit");
      console.log(this.state.hasError);
    }
  };

  validateFields = () => {
    const { fName, lName, mobile, dob, address, state, country, city, gender } =
      this.state.userDetails;

    // Create an object to hold the new error state
    const newErrors = {};

    let error = false;

    // Check each field and update the error state
    if (fName.trim() === "") {
      error = true;
      newErrors.fName = { val: true, msg: "Please enter first name" };
    } else {
      newErrors.fName = { val: false, msg: "" };
    }

    if (lName.trim() === "") {
      error = true;
      newErrors.lName = { val: true, msg: "Please enter last name" };
    } else {
      newErrors.lName = { val: false, msg: "" };
    }
    let phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (mobile.trim() === "" || !phoneRegex.test(mobile)) {
      error = true;
      newErrors.mobile = {
        val: true,
        msg: "Please enter a valid mobile number",
      };
    } else {
      newErrors.mobile = { val: false, msg: "" };
    }

    if (dob.trim() === "") {
      error = true;
      newErrors.dob = { val: true, msg: "Please enter date of birth" };
    } else {
      newErrors.dob = { val: false, msg: "" };
    }

    if (address.trim() === "") {
      error = true;
      newErrors.address = { val: true, msg: "Please enter address" };
    } else {
      newErrors.address = { val: false, msg: "" };
    }

    if (state.trim() === "") {
      error = true;
      newErrors.state = { val: true, msg: "Please enter state" };
    } else {
      newErrors.state = { val: false, msg: "" };
    }

    if (country.trim() === "") {
      error = true;
      newErrors.country = { val: true, msg: "Please enter country" };
    } else {
      newErrors.country = { val: false, msg: "" };
    }

    if (city.trim() === "") {
      error = true;
      newErrors.city = { val: true, msg: "Please enter city" };
    } else {
      newErrors.city = { val: false, msg: "" };
    }

    if (gender.trim() === "") {
      error = true;
      newErrors.gender = { val: true, msg: "Please enter gender" };
    } else {
      newErrors.gender = { val: false, msg: "" };
    }

    this.setState((prevState) => ({
      hasError: {
        ...prevState.hasError,
        ...newErrors,
      },
    }));

    return error;
  };


  render() {
    const { data, isEditMode, editedRowId, editedRow } = this.props;
    return (
      <>
        <div className="heading">
          <h1>Registration Form</h1>
        </div>
        <div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: 400 },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="inputRows">
              <div className="inputRow">
                <TextField
                  id="outlined-password-input"
                  label="First Name"
                  name="fName"
                  value={this.state.userDetails.fName}
                  type="text"
                  onChange={this.handleOnChange}
                  autoComplete="current-password"
                  error={this.state.hasError.fName.val}
                  helperText={this.state.hasError.fName.msg}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderColor: this.state.hasError.fName.val
                        ? "red"
                        : "initial",
                    },
                  }}
                />
                <TextField
                  id="outlined-password-input"
                  label="Last Name"
                  name="lName"
                  type="text"
                  autoComplete="current-password"
                  value={this.state.userDetails.lName}
                  onChange={this.handleOnChange}
                  error={this.state.hasError.lName.val}
                  helperText={this.state.hasError.lName.msg}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderColor: this.state.hasError.lName.val
                        ? "red"
                        : "initial",
                    },
                  }}
                />
              </div>
              <div className="inputRow">
                <TextField
                  id="outlined-password-input"
                  label="Mobile"
                  name="mobile"
                  type="text"
                  onChange={this.handleOnChange}
                  value={this.state.userDetails.mobile}
                  error={this.state.hasError.mobile.val}
                  helperText={this.state.hasError.mobile.msg}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderColor: this.state.hasError.mobile.val
                        ? "red"
                        : "initial",
                    },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="date"
                  name="dob"
                  label="Date of Birth"
                  onChange={this.handleOnChange}
                  InputLabelProps={{ shrink: true }}
                  error={this.state.hasError.dob.val}
                  value={this.state.userDetails.dob}
                  helperText={this.state.hasError.dob.msg}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderColor: this.state.hasError.dob.val
                        ? "red"
                        : "initial",
                    },
                  }}
                />
              </div>
              <div className="inputRow" id="address">
                <TextField
                  id="outlined-password-input"
                  label="Address"
                  name="address"
                  type="text"
                  onChange={this.handleOnChange}
                  style={{ width: 817 }}
                  value={this.state.userDetails.address}
                  error={this.state.hasError.address.val}
                  helperText={this.state.hasError.address.msg}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderColor: this.state.hasError.address.val
                        ? "red"
                        : "initial",
                    },
                  }}
                />
              </div>
              <div className="inputRow">
                <TextField
                  id="outlined-password-input"
                  label="State"
                  name="state"
                  type="text"
                  onChange={this.handleOnChange}
                  value={this.state.userDetails.state}
                  autoComplete="current-password"
                  error={this.state.hasError.state.val}
                  helperText={this.state.hasError.state.msg}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderColor: this.state.hasError.state.val
                        ? "red"
                        : "initial",
                    },
                  }}
                />
                <TextField
                  id="outlined-password-input"
                  label="Country"
                  name="country"
                  type="text"
                  onChange={this.handleOnChange}
                  autoComplete="current-password"
                  error={this.state.hasError.country.val}
                  value={this.state.userDetails.country}
                  helperText={this.state.hasError.country.msg}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderColor: this.state.hasError.country.val
                        ? "red"
                        : "initial",
                    },
                  }}
                />
              </div>
              <div className="inputRow city">
                <div className="cityInput">
                  <TextField
                    id="outlined-password-input"
                    label="City"
                    name="city"
                    type="text"
                    onChange={this.handleOnChange}
                    autoComplete="current-password"
                    style={{ width: 632 }}
                    value={this.state.userDetails.city}
                    error={this.state.hasError.city.val}
                    helperText={this.state.hasError.city.msg}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderColor: this.state.hasError.city.val
                          ? "red"
                          : "initial",
                      },
                    }}
                  />
                </div>
                <div className="genderInput">
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="gender"
                    onChange={this.handleOnChange}
                    error={this.state.hasError.gender.val}
                    helperText={this.state.hasError.gender.msg}
                  >
                    {this.state.hasError.gender.val && (
                      <span className="genderError">Please enter gender</span>
                    )}
                    <div className="sexOptions">
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                        checked={(this.state.userDetails.gender==="female")?true:false}
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                        checked={(this.state.userDetails.gender==="male")?true:false}
                      />
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <Button
                variant="contained"
                color="success"
                onClick={this.handleSubmit}
              >
                {this.state.isEditMode ? "Update" : "Submit"}
              </Button>
            </div>
          </Box>
        </div>
        <div className="displayTable">
          <div>
          <DataTable
              data={this.state.data}
              onEditClick={this.handleEditClick}
              onDeleteClick={this.handleDeleteClick}
            />
          </div>
        </div>
      </>
    );
  }
}
