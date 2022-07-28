import { Button } from "@mui/material";

export default function ActionButtons(props){
    const handleBack = () => {
      props.previousStep();
    };
  
    const handleNext = () => {
      props.nextStep();
    };
  
    const handleFinish = () => {
      props.lastStep();
    };
  
    return (
      <div>
  
        {props.currentStep > 1 && (
  
          <Button onClick={handleBack}>Trở về</Button>
  
        )}
  
        {props.currentStep < props.totalSteps -1 && (
          <Button onClick={handleNext}>Tiếp </Button>
        )}
        {props.currentStep === props.totalSteps - 1 && (
          <Button onClick={handleFinish}>Tạo tiến trình</Button>
        )}
  
  
      </div>
    );
  };