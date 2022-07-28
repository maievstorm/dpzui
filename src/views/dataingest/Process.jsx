import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import config from '../../config';

const steps = ['Đăng ký tiến trình','Đăng ký CSDL', 'Tạo truy vấn tổng hợp', 'Xác nhận thông tin','Hoàn thành'];

export default function HorizontalLinearStepper({navigation,conf}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    // set api
    if(activeStep === steps.length - 2){
      const body = {
        "conf": {conf},
      }
      if(conf.DagId.length>3)
      {
        console.log(conf)
            axios({
                method: 'post',
                url:  config.airflowapi+'/dags/dag_create_job_file/dagRuns',
                 
                auth: {
                    username: 'hung',
                    password: '123456a@'
                  },
                data: body
              }); 

              const invoicebody=
              {
                  "item_name":conf.DagId,
                  "item_type":'airflow',
                  "customer_invoice_data":JSON.stringify(body),
                  "subscription_id":1,
                  "plan_history_id":1,
                  "invoice_period_start_date": new Date().toLocaleString() + '',
                  "invoice_period_end_date":new Date().toLocaleString() + '',
                  "invoice_description":conf.DagId,
                  "invoice_amount":100,
                  "invoice_created_ts":new Date().toLocaleString() + '',
                  "invoice_due_ts":new Date().toLocaleString() + '',
                  "invoice_paid_ts":new Date().toLocaleString() + ''
              }
               
           console.log(invoicebody)
              axios({
                  method: 'post',
                  url: config.rootapi+'/invoice',           
                  data: invoicebody
              });  

      }
         


    }
    if(activeStep !== steps.length - 1){
      navigation.next()
    }
    

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    navigation.previous()
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box> */}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {activeStep !== steps.length - 1 &&
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Trở về
            </Button>}
            <Box sx={{ flex: '1 1 auto' }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 2 ? 'Tạo tiến trình' : activeStep === steps.length - 1?'Finish':'Tiếp'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
