import React, { useEffect, useState } from "react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import "./commonStyle.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Carddesign from "./Carddesign";
import Button from '@mui/material/Button';
import { emailValidate , passwordMatch } from "../Util/validation";
import { updateForm1 } from "../Redux/formSlice";
import { useDispatch , useSelector } from 'react-redux';
import Swal from "sweetalert2";

export default function Form1({handleNextClickEvent , handleComplete}) {
  const { form1 } = useSelector((state) => state.form);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");   
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [validationError, setValidationError] = useState({
    email:"",
    password:""
  });

  useEffect(() => {
    setEmail(form1.email);
    setPassword(form1.password);
  } , [form1])

  const handleChangeEvent = () => {
      if( email === "" && password === "" ) {
        Swal.fire({
          icon: "error",
          title: `Email and password are required`,
          showConfirmButton: true,
          timer: 1000,
        });
        return;
      }

      dispatch(updateForm1({ email , password }) )
      Swal.fire({
        icon: "success",
        title: `Form 1 completed`,
        showConfirmButton: true,
        timer: 1000,
      });
      handleComplete()
  }

  const handleInputChange = (e) => {
    const {name , value} = e.target;
    if(name === "email") {
      setEmail(value);
      setValidationError({
        ...validationError,
        email:""
      })
    } else {
      setPassword(value.trim());
      setValidationError({
        ...validationError,
        password:""
      })
    }
  }

  const handleBlurCondition = (key) => {
    if(key === "email" ) {
        const result = emailValidate(email);
        if(result) {
          setValidationError({
            ...validationError,
            email:"Must be a valid email ID"
          })
        } else {
          setValidationError({
            ...validationError,
            email:""
          })
        }
    } else {
      const resultOfPassword = passwordMatch(password);
      if(resultOfPassword) {
        setValidationError({
          ...validationError,
          password:"Invalid password."
        })
      } else {
        setValidationError({
          ...validationError,
          password:""
        })
      }
    }
  }

  return (
    <>
      <Carddesign number="1" title="Credential Info." />
      <form className="mainDivForTextField">
        <div className="parentmainDivForTextField">
          <label
            className="labelForForm"
          >
            <AlternateEmailIcon className="text-[20px]" />
            Email Id<sup className="colorRed">*</sup>:
          </label>
          <div>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => handleInputChange(e)}
              onBlur={() => handleBlurCondition("email")}
            />
          </div>
        </div>
        {validationError.email && 
      <p className="errorMessage" >
      {validationError?.email}
      </p>}
        <div className="parentmainDivForTextField">
          <label
           className="labelForForm"
          >
            <KeyIcon className="text-[20px]" />
            Password<sup className="colorRed">*</sup>:
          </label>
          <div className="flex items-center gap-[5px]">
            <input
              type={showpassword ? "text" : "password"}
              value={password}
              onChange={(e) => handleInputChange(e) }
              onBlur={() => handleBlurCondition("password")}
            />
            {showpassword ? (
              <VisibilityIcon
                onClick={() => setShowpassword(!showpassword)}
                className="text-[20px] text-gray-500"
              />
            ) : (
              <VisibilityOffIcon
                className="text-[20px] text-gray-500"
                onClick={() => setShowpassword(!showpassword)}
              />
            )}
          </div>
        </div>
        <p className="text-gray-400 text-[14px]">
        Required. <br/> 
        Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters.
        </p>
        {validationError.password && 
      <p className="errorMessage" >
      {validationError?.password}
      </p>}
      </form>

      <div className="buttonStyleForForm2">
      <Button variant="outlined" disabled>Back</Button>
      <div className="flex gap-[10px]">
      <Button variant="contained" onClick={handleNextClickEvent}>Next</Button>
      <Button disabled={Object.values(validationError).some(value => value !== "")} variant="contained" onClick={ handleChangeEvent}>Save and Next</Button>
      </div>
      </div>
    </>
  );
}
