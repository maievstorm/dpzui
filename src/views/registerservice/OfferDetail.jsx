import { useEffect, useState } from "react";
import { useLocation, useNavigate,useParams  } from "react-router"
import Button from '@mui/material/Button';
import OfferPlanService from 'services/OfferPlanService';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { addLog } from "services/LogService";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import {
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody
} from '@mui/material';



export default function OrderDetail() {

    const location = useLocation();
    const navigate = useNavigate();
    let params = useParams();
    const OfferId = parseInt(params?.product);

    const BacktoOffer = () => {
        navigate('/registerservice')
    }

    // const [listOffer, setListOffer] = useState([])
    const [userinfo, setUserinfo] = useState([])
    const [OfferSelected, setOfferSelected] = useState([])
    const [rows, setRows] = useState([])
    useEffect(() => {
        OfferPlanService.getOffer()
            .then(res => {
                // setListOffer(res.data.pre) 
                let data = (res.data.pre).filter((offer) => offer.offer_id === OfferId)[0]

                

                setOfferSelected((res.data.pre).filter((offer) => offer.offer_id === OfferId)[0])
                let listTable = JSON.parse(data?.description)
                let listrow = []
                for (var key in listTable) {

                    listrow.push({
                        'key': key,
                        'value': listTable[key]
                    })
                }
                setRows(listrow)
            })
            .catch(err => console.log(err))
    }, []);



    useEffect(() => {
        OfferPlanService.getUserinfo()
            .then(res => {
                setUserinfo(res.data.data)

            })
            .catch(err => console.log(err))
    }, [])



    const submit = () => {

        let today = new Date()
        let data = {
            user_account_id: userinfo.id,
            'user_name': userinfo.user_name,
            'fullname': userinfo.last_name + ' ' + userinfo.first_name,
            'email': userinfo.email,
            'upassword': null,
            'offer_id': OfferSelected?.offer_id,
            'plan_id': OfferSelected.plan_id,
            'request_date': today,
            'request_status': 0,
            'request_type': 1
        }


        OfferPlanService.applyService(data);
        addLog('request_resource', data)
        navigate('/thanks');


    }
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#f4f5f7",
            color: "#707275",
            fontWeight: 600,
            fontSize: ".875rem",
            textAlign: "left"
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 10,
        },
    }));

    function toVND(num) {
        return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }

    function createData(sr, name, quantity, price, amount) {
        return { sr, name, quantity, price, amount };
    }





    return (


        <Box >
            <Card sx={{
                minWidth: 275,
                borderRadius: "0.75rem",
                p: 3
            }}>
                <CardContent>
                    <Box>
                        <Box >
                            <Typography variant="h6" >
                                {OfferSelected?.offer_name}
                            </Typography>
                            <Typography component="div">
                                <span style={{
                                    color: "#707275",
                                    fontWeight: 500,
                                    marginTop: "0.5rem",
                                    fontSize: "0.75rem",
                                    paddingRight: "10px"
                                }}>
                                    Trạng thái:
                                </span>
                                <span>
                                    <Button
                                        variant="contained"
                                        elevation={0}
                                        sx={{
                                            bgcolor: "#fdf5b2",
                                            color: "#c27702",
                                            lineHeight: "1.25rem",
                                            fontSize: "0.75rem",
                                            textTransform: "none",
                                            boxShadow: "0",
                                            borderRadius: "9999px",
                                            display: "inline-flex",
                                            boxSizing: "border-box",
                                            px: "0.5rem",
                                            py: "0px"
                                        }}>
                                        Pending
                                    </Button>
                                </span>
                            </Typography>
                        </Box>
                        <Box sx={{ float: "right" }}>
                            <Typography sx={{ fontWeight: "700" }}>DpZ</Typography>
                            <Typography sx={{ fontSize: "0.875rem", color: "#707275" }}>

                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <Paper sx={{ textAlign: "left" }} elevation={0}>
                                    <Typography sx={{
                                        textTransform: "uppercase",
                                        fontWeight: "bold",
                                        color: "#4c4f52",
                                        fontSize: "0.875rem"
                                    }}>Ngày đăng ký</Typography>
                                    <Typography sx={{ fontSize: "0.875rem", color: "#707275" }}>
                                        {new Date().toLocaleString()}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper sx={{ textAlign: "center" }} elevation={0}>
                                    <Typography sx={{
                                        textTransform: "uppercase",
                                        fontWeight: "bold",
                                        color: "#4c4f52",
                                        fontSize: "0.875rem"
                                    }}>Mã đăng ký</Typography>
                                    <Typography sx={{ fontSize: "0.875rem", color: "#707275" }}>#{OfferSelected?.offer_id}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper sx={{ textAlign: "right", marginBottom: "20px" }} elevation={0}>

                                    <Typography sx={{
                                        textTransform: "uppercase",
                                        fontWeight: "bold",
                                        color: "#4c4f52",
                                        fontSize: "0.875rem"
                                    }}>Người đăng ký</Typography>
                                    <Typography sx={{ fontSize: "0.875rem", color: "#707275" }}>
                                        {userinfo.last_name + ' ' + userinfo.first_name}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper} elevation={0} sx={{ borderColor: "#d5d6d7" }} variant="outlined">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow style={{ textTransform: "uppercase" }}>
                                        <StyledTableCell>stt.</StyledTableCell>
                                        <StyledTableCell align="right">Tên dịch vụ</StyledTableCell>
                                        <StyledTableCell align="right">Số lượng</StyledTableCell>
                                        {/* <StyledTableCell align="right">Đơn giá</StyledTableCell>
                                            <StyledTableCell align="right">Giá</StyledTableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Typography sx={{ color: "#707275" }}>
                                                    {index}
                                                </Typography>
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="left">
                                                <Typography sx={{ color: "#707275" }}>
                                                    {row.key}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">{row.value}</TableCell>
                                            {/* <TableCell align="left">{toVND(row.price)}</TableCell>
                                                <TableCell align="left">
                                                    <Typography sx={{ fontWeight: 700, color: "#f05252" }}>
                                                        {toVND(row.quantity * row.price)}
                                                    </Typography>

                                                </TableCell> */}
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell align="right" colSpan={5}>
                                            <Typography sx={{ fontWeight: 700, color: "#f05252" }}>Tổng cộng: {OfferSelected?.current_price} Tr.VND/Tháng
                                            </Typography>

                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>


                    <Box sx={{ mt: 2 }}>
                        <Button name={OfferSelected?.offer_id}
                            variant="outlined"
                            color="primary"
                            onClick={() => submit()}>Đăng ký</Button>


                    </Box>

                </CardContent>
            </Card>



        </Box>
    )
}