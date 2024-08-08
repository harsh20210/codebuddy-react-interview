import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import success from "../Util/success.gif";

const steps = ['Form 1', 'Form 2', 'Form 3'];

export default function Settper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Form1 handleNextClickEvent={handleNext} handleComplete={handleComplete} />;
      case 1:
        return <Form2 handleNextClickEvent={handleNext} handleComplete={handleComplete} handleBack = {handleBack}  />;
      case 2:
        return <Form3 handleNextClickEvent={handleNext} handleComplete={handleComplete}  handleBack = {handleBack} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div className="mt-5 gap-[5px] flex flex-col items-center justify-center bg-white p-6">
            <img src={success} width={200} height={200} alt='loading...' />
          <h1 className="font-semibold text-[30px]">Thank you</h1>
          <h2>The form was submitted successfully</h2>
           <Button variant="outlined" onClick={handleReset}>Back</Button>
          </div>
        ) : (
          <div className="p-[10px] bg-[#f4f5f5] shadow-md rounded-[10px] mt-[30px]" >
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}  >
            {getStepContent(activeStep)}
            </Typography>
          </div>
        )
        }
      </div>
    </Box>
  );
}
