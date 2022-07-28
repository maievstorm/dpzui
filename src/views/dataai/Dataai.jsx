import React from "react";
import { Card, CardActions, CardContent, CardHeader, Grid,Box,Link,Typography } from "@mui/material";

import { makeStyles } from '@mui/styles';

const ListProduct = [
    {
        title: 'Model Dự báo doanh số ký',
        description: ['Dự báo doanh số ký trong 1,2,3 tháng tiếp theo'],

    }
    ,
    {
        title: 'Model Dự báo nghỉ việc',
        description: ['Dự báo cán bộ có khả năng nghỉ việc trong vòng năm tới'],

    },
    {
        title: 'Mô hình dự báo: Late Project',
        description: ['Mô hình đưa ra cảnh báo khi 1 dự án có khả năng trễ hạn và lí do vì sao trễ hạn'],

    }
    ,
    {
        title: 'Model Trích xuất metadata từ CV',
        description: ['Trích xuất các chỉ tiêu thiết yếu hỗ trợ đánh giá và liên lạc ứng viên'],

    }
    ,
    {
        title: 'Model Dự báo Customer Churn',
        description: ['Dự báo khả năng khách hàng dừng sử dụng sản phẩm/dịch vụ trong tháng tiếp theo'],

    },
    {
        title: 'Model Dự báo Next Best Offer',
        description: ['Mô hình khuyến nghị sản phẩm phù hợp cho từng khách hàng'],

    }
];

const useStyles = makeStyles((theme) => ({
    section: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    cardHeader: {
        paddingTop: theme.spacing(3),
    },
}));

function DataaiPage() {
    const classes = useStyles();

    return (
        <>
         <Grid container spacing={3}>
                        {ListProduct.map(prod => (
                            <Grid item xs={12} md={4}>
                                <Card variant="outlined">
                                    <CardHeader title={prod.title} key={prod.title} className={classes.cardHeader}></CardHeader>
                                    <CardContent>
                                        <Box px={1}>
                                            <Typography variant="h3" component="h3" gutterBottom={true}>
                                                {prod.description}
                                                
                                            </Typography>

                                           

                                        </Box>
                                     
                                        <Box mt={2}>
                                           
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                      
                    </Grid>
        </>
    )
}


export default DataaiPage;