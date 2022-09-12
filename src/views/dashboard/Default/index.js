import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
//import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';

import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import OfferPlanService from 'services/OfferPlanService';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [datauseage, setDatauseage] = useState([]);
    const [series, setDataseries] = useState([]);
    



    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
        OfferPlanService.getMyresourceusage()
            .then(res => {

               // setprice_total_year(res.data.data[0]?.price_total_year)
                let data = res.data.data
               
                let dataInfo = {

                }
                // console.log(data)
          
                data.map(item=>{
                    let month = parseInt(item.rpt_month) - 1
                    if( dataInfo[item.item_type] === undefined){
                        dataInfo[item.item_type] = Array(12).fill(0)
                        dataInfo[item.item_type][month] = item.price
                    }
                    else{
                        dataInfo[item.item_type][month] = item.price
                    }
                })

                let resData = []

                for(var item in dataInfo){
                    resData.push({
                        'name':item,
                        'data': dataInfo[item]
                    })
                }
                
                 setDataseries(resData)
            
                 setDatauseage(data);

            }).catch(err => { console.log(err) })
    }, []);

    // console.log('datauseage',datauseage)

    // console.log('series',series)

  
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} series={series} datauseage={datauseage}  />
                    </Grid>
                    {/* <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <TotalGrowthBarChart isLoading={isLoading} series={series} datauseage={datauseage} />
                    </Grid>
                    {/* <Grid item xs={12} md={4}>
                        <PopuarCard isLoading={isLoading} />
                    </Grid> */}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
