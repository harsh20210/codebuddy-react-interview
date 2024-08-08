import React, { useEffect, useState } from "react";
import "./commonStyle.css";
import Carddesign from "./Carddesign";
import Button from "@mui/material/Button";
import {
  firstNameMatch,
  lastNameMatch,
  addressMatch,
} from "../Util/validation";
import { updateForm2 } from "../Redux/formSlice";
import { useDispatch, useSelector } from "react-redux";
import PeopleIcon from "@mui/icons-material/People";
import Person2Icon from "@mui/icons-material/Person2";
import HomeIcon from "@mui/icons-material/Home";
import Swal from "sweetalert2";


export default function Form2({ handleNextClickEvent, handleBack , handleComplete }) {
  const { form1 , form2 } = useSelector((state) => state.form);

  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(form2.firstName);
  const [lastName, setLastName] = useState(form2.lastName);
  const [address, setAddress] = useState(form2.address);
  const [validationError, setValidationError] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });
  const [conditionToCheckForm1 , setConditionToCheckForm1] = useState(false)


  useEffect(() => {
    if(form1.email == "" && form1.password == "" ) {
      setConditionToCheckForm1(true)
    } else {
      setConditionToCheckForm1(false)
    }
    }
   , [form1])

  const handleChangeEvent = () => {
    if (firstName === "" && lastName === "") {
      Swal.fire({
        icon: "error",
        title: `First name and last name are required`,
        showConfirmButton: true,
        timer: 1000,
      });
      return;
    }
     
    dispatch(updateForm2({ firstName, lastName , address}));
    handleComplete();
    Swal.fire({
      icon: "success",
      title: `Form 2 completed`,
      showConfirmButton: true,
      timer: 1000,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName") {
      setFirstName(value);
      setValidationError({
        ...validationError,
        firstName: "",
      });
    } else if (name === "lastName") {
      setLastName(value);
      setValidationError({
        ...validationError,
        lastName: "",
      });
    } else {
      setAddress(value);
      setValidationError({
        ...validationError,
        address: "",
      });
    }
  };

  const handleBlurCondition = (key) => {
    if (key === "firstName") {
      const result = firstNameMatch(firstName);
      if (result) {
        setValidationError({
          ...validationError,
          firstName:
            "only alphabets. Minimum of 2 character and maximum 50.",
        });
      } else {
        setValidationError({
          ...validationError,
          firstName: "",
        });
      }
    } else if (key === "lastName") {
      const resultOflastName = lastNameMatch(lastName);
      if (resultOflastName) {
        setValidationError({
          ...validationError,
          lastName: "only alphabets.",
        });
      } else {
        setValidationError({
          ...validationError,
          lastName: "",
        });
      }
    } else {
      const resultOfaddress = addressMatch(address);
      if (resultOfaddress) {
        setValidationError({
          ...validationError,
          address: "Minimum length 10.",
        });
      } else {
        setValidationError({
          ...validationError,
          address: "",
        });
      }
    }
  };

  return (
    <>
      <Carddesign number="2" title="Personal Info." />
      <span className="errorMessage">{conditionToCheckForm1 && 'Please note that Form 1 is incomplete.' }</span>
      <form className="mainDivForTextField">
        <div className="parentmainDivForTextField">
          <label className="labelForForm">
            <PeopleIcon className="text-[20px]" />
            First Name<sup className="colorRed">*</sup>:
          </label>
          <div>
            <input
              type="text"
              value={firstName}
              name="firstName"
              onChange={(e) => handleInputChange(e)}
              onBlur={() => handleBlurCondition("firstName")}
            />
          </div>
        </div>
        {validationError.firstName && (
          <p className="errorMessage">{validationError?.firstName}</p>
        )}

        <div className="parentmainDivForTextField">
          <label className="labelForForm">
            <Person2Icon className="text-[20px]" />
            Last Name:
          </label>
          <div className="flex items-center gap-[5px]">
            <input
              type="text"
              value={lastName}
              name="lastName"
              onChange={(e) => handleInputChange(e)}
              onBlur={() => handleBlurCondition("lastName")}
            />
          </div>
        </div>
        {validationError.lastName && (
          <p className="errorMessage">{validationError?.lastName}</p>
        )}

        <div className="parentmainDivForTextField">
          <label className="labelForForm">
            <HomeIcon className="text-[20px]" />
            Address<sup className="colorRed">*</sup>:
          </label>
          <div className="flex items-center gap-[5px]">
            <input
              type="text"
              value={address}
              name="address"
              onChange={(e) => handleInputChange(e)}
              onBlur={() => handleBlurCondition("address")}
            />
          </div>
        </div>
        {validationError.address && (
          <p className="errorMessage">{validationError?.address}</p>
        )}
      </form>

      <div className="buttonStyleForForm2">
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
        <div className="flex gap-[10px]">
      <Button variant="contained" onClick={handleNextClickEvent}>Next</Button>

        
        <Button
          disabled={Object.values(validationError).some(
            (value) => value !== ""
          )}
          variant="contained"
          onClick={handleChangeEvent}
        >
          Save
        </Button>
        </div>
      </div>
    </>
  );
}
