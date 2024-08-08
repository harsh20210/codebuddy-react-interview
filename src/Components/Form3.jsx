import React, { useEffect, useState } from "react";
import "./commonStyle.css";
import Carddesign from "./Carddesign";
import Button from "@mui/material/Button";
import { mobileValidate } from "../Util/validation";
import { updateForm1, updateForm2 } from "../Redux/formSlice";
import { useDispatch, useSelector } from "react-redux";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Form3({ handleNextClickEvent, handleBack , handleComplete }) {
  const { form1, form2 } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validationError, setValidationError] = useState({
    countryCode: "",
    phoneNumber: "",
  });
  const [conditionToCheckForm1, setConditionToCheckForm1] = useState(false);
  const [conditionToCheckForm2, setConditionToCheckForm2] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  useEffect(() => {
    if (form1.email == "" && form1.password == "") {
      setConditionToCheckForm1(true);
    } else {
      setConditionToCheckForm1(false);
    }

    if (
      form2.firstName === "" &&
      form2.lastName === "" &&
      form2.address === ""
    ) {
      setConditionToCheckForm2(true);
    } else {
      setConditionToCheckForm2(false);
    }
  }, [form1]);

  const functionToReset = () => {
    dispatch(updateForm1({ email: "", password: "" }));
    dispatch(updateForm2({ firstName: "", lastName: "", address: "" }));
    handleComplete();
    setTimeout(() => {
      navigate('/posts')
    },4000)
  }

  const postApi = async () => {
    try {
      const response = await fetch(`https://codebuddy.review/submit`, {
        method: "POST",
        body: JSON.stringify({
          "emailId": form1.email,
          "password": form1.password,
          "firstName": form2.firstName,
          "lastName": form2.lastName,
          "address": form2.address,
          "countryCode":countryCode ,
          "phoneNumber": phoneNumber
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      if(data.message === "Success") {
        functionToReset()
      } else {
        Swal.fire({
          icon: "error",
          title: `${data.message}`,
          showConfirmButton: true,
          timer: 1000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `Something went wrong`,
        showConfirmButton: true,
        timer: 3000,
      });
    }
  };

  const handleChangeEvent = () => {
    if (phoneNumber === "") {
      Swal.fire({
        icon: "error",
        title: `Phone number are required.`,
        showConfirmButton: true,
        timer: 1000,
      });
      return;
    }
    
    if (termsAndConditions === false) {
      Swal.fire({
        icon: "error",
        title: `Please accept the terms and conditions.`,
        showConfirmButton: true,
        timer: 1000,
      });
      return;
    }

    if (conditionToCheckForm1 === true) {
      Swal.fire({
        icon: "error",
        title: `Please complete Form 1.`,
        showConfirmButton: true,
        timer: 1000,
      });
      return;
    }

    if (conditionToCheckForm2 === true) {
      Swal.fire({
        icon: "error",
        title: `Please complete Form 2.`,
        showConfirmButton: true,
      });
      return;
    }
    postApi();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (!isNaN(value) && /^\d{0,10}$/.test(value)) {
        setPhoneNumber(value);
      }
      setValidationError({
        ...validationError,
        phoneNumber: "",
      });
    } else {
      setCountryCode(value);
      setValidationError({
        ...validationError,
        countryCode: "",
      });
    }
  };

  const handleBlurCondition = (key) => {
    if (key === "phoneNumber") {
      const result = mobileValidate(String(phoneNumber));
      if (result) {
        setValidationError({
          ...validationError,
          phoneNumber: "10 digit numeric phone number.",
        });
      } else {
        setValidationError({
          ...validationError,
          phoneNumber: "",
        });
      }
    }
  };

  return (
    <>
      <Carddesign number="3" title="Contact Info." />
      <span className="errorMessage">
        {conditionToCheckForm1 &&
          "Please note that Form 1 is incomplete."}
      </span>
      <p className="errorMessage">
        {conditionToCheckForm2 &&
          "Please note that Form 2 is incomplete."}
      </p>
      <form className="mainDivForTextField">
        <div className="parentmainDivForTextField">
          <label className="labelForForm">
            <LocalPhoneIcon className="text-[20px]" />
            Phone Number<sup className="colorRed">*</sup>:
          </label>
          <div className="flex items-center gap-[5px]">
            <select
              onChange={handleInputChange}
              value={countryCode}
              className="styleForSelectIteam"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
            </select>
            <input
              type="number"
              className="styleForNumberInput"
              value={phoneNumber}
              name="phoneNumber"
              onChange={(e) => handleInputChange(e)}
              onBlur={() => handleBlurCondition("phoneNumber")}
            />
          </div>
        </div>
        <p
          style={{ fontSize: "14px", color: "rgb(189 188 188)" }}
        >{`Phone: ${countryCode} - ${phoneNumber} `}</p>
        {validationError.phoneNumber && (
          <p className="errorMessage">{validationError?.phoneNumber}</p>
        )}

        <div className="flex items-center">
          <Checkbox
            onChange={(e) => setTermsAndConditions(e.target.checked)}
            checked={termsAndConditions}
          />
          Yes, I have read and consent to the terms and conditions.
        </div>
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
          Finish
        </Button>
        </div>
      </div>
    </>
  );
}
