import React, { useState } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import StepWizard from "react-step-wizard";
import { Info } from "./stepForm/Info";
import { Query } from "./stepForm/Query";
import { Source } from "./stepForm/Source";
import { Review } from "./stepForm/Review";
import { Finish } from "./stepForm/Finish";
import config from '../../config';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DataIngest from "services/DataIngest";
import { addLog } from "services/LogService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import UserService from 'services/UserService';



const CreateNewFlow = () => {
  const navigate = useNavigate();

  const steps = ['Đăng ký tiến trình', 'Đăng ký CSDL', 'Tạo truy vấn tổng hợp', 'Xác nhận thông tin', 'Hoàn thành'];

  const [stepWizard, setStepWizard] = useState(null);
 // const [user, setUser] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [daginfo, setDagInfo] = useState({})
  const [formSrcFields, setFormSrcFields] = useState()
  const [formQuery, setformQuery] = useState()
  const [conf, setConf] = useState()




  const assignStepWizard = (instance) => {
    setStepWizard(instance);
  };

  const assignDagInfo = (val) => {
    setDagInfo(val)
  };
  const assignSource = (val) => {
    setFormSrcFields(val)
  };


  const assignQuery = (val) => {
    setformQuery(val)

    setConf({
      'DagId': daginfo.DagId,
      "Schedule": daginfo.Schedule,
      'schedule_interval': daginfo.schedule_interval,
      "owner": UserService.getUsername(),
      'tags': daginfo.tags,
      'subscription_id': daginfo.subscription_id,
      'source': formSrcFields,
      'query': val
    })
  };
  

  const handleStepChange = (e) => {
    setActiveStep(e.activeStep - 1);
  };

  const [loading, setLoading] = React.useState(true);

  // fetch data if done set loading = false

  const submit = () => {
    const body = {
      "conf": { conf },
    }
    const invoicebody =
    {
      "item_name": conf.DagId,
      "item_type": 'airflow',
      "customer_invoice_data": JSON.stringify(body),
      "subscription_id": conf.subscription_id,
      "plan_history_id": 1,
      "invoice_period_start_date": new Date().toLocaleString() + '',
      "invoice_period_end_date": new Date().toLocaleString() + '',
      "invoice_description": conf.DagId,
      "invoice_amount": 100,
      "invoice_created_ts": new Date().toLocaleString() + '',
      "invoice_due_ts": new Date().toLocaleString() + '',
      "invoice_paid_ts": new Date().toLocaleString() + ''
    }
   
    axios({
      method: 'post',
      url: config.airflowapi + '/dags/dag_create_job_file/dagRuns',

      auth: {
        username: 'hung',
        password: '123456a@'
      },
      data: body
    })
      .then(res => {
        if (res.status === 200) {
          DataIngest.CreateInvoiceProcess(invoicebody);
          addLog('create_flow',invoicebody)
            .then(res => {
              toast.success("Thêm tiến trình thành công!");

              setTimeout(() => {
                setLoading(false)
                navigate('/dataingest')
              }, 3000);

            })
            .catch(err => {
              toast.error("Thêm tiến trình thất bại!");
              console.log(err)
            })
        }
      })
      .catch(err => console.log(err))


  }
  const backtodataingest = () => {

    navigate('/dataingest');
  }



  return (
    <MainCard>
      <IconButton onClick={() => backtodataingest()}>
        <ArrowBackIcon color="primary" fontSize="medium" />
        Bỏ qua
      </IconButton>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <br></br>
      <StepWizard instance={assignStepWizard} onStepChange={handleStepChange}>
        <Info userCallback={assignDagInfo} />
        <Source userCallback={assignSource} />
        <Query userCallback={assignQuery} srcData={formSrcFields} />
        <Review userCallback={submit} conf={conf} />
        <Finish loading={loading} setLoading={setLoading} />
      </StepWizard>
      <ToastContainer/>
    </MainCard>
  );
};

export default CreateNewFlow;