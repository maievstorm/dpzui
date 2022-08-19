// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| Bigdata Page ||============================== //

const Datavisualpage = () => (
    <MainCard title="Trực quan dữ liệu">
  
        <iframe
            width="1600"
            height="1600"
            seamless
            frameBorder="0"
            scrolling="yes"
            src="http://dpadv.apps.xplat.fis.com.vn/superset/dashboard/p/MwaJ9E6lomP"
        >
        </iframe>
    </MainCard>
);

export default Datavisualpage;
