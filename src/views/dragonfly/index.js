// material-ui
import React from 'react'
//import { IconCloudDownload,IconTrash} from '@tabler/icons';
 

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ChecksongDataTable from './Checksongtable';
//import SongIdentifi from './SongIdentifi';



// ==============================|| Dragonfly Page ||============================== //


const Dragonflypage = () => {
    
    return (
        <MainCard>
           <ChecksongDataTable></ChecksongDataTable>
           {/* <SongIdentifi/> */}
        </MainCard>
    )
}
export default Dragonflypage;
