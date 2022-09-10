// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ManageBackUp from './ManageBackUp';
// ==============================|| Bigdata Page ||============================== //

const Databackuppage = () => (
    <MainCard title="Sao lưu dữ liệu">
         <ManageBackUp />
    </MainCard>
);

export default Databackuppage;
