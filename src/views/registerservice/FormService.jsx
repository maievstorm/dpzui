import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import UserService from 'services/UserService';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OfferPlanService from 'services/OfferPlanService';
import { Grid, Card, CardHeader, CardContent, CardActions, Typography } from '@mui/material';




export default function FormService() {
    const [offerList, setOfferId] = useState([])
    const [listOffer, setListOffer] = useState([])
    useEffect(() => {
        OfferPlanService.getOffer()
            .then(res => {
                setListOffer(res.data.pre)
            })
            .catch(err => console.log(err))
    }, [])

    const submit = () => {
        let today = new Date()
        let data = {
            user_account_id: null,
            'user_name': UserService.getUsername(),
            'fullname': null,
            email: null,
            upassword: null,
            'offer_id': offerList.offer_id,
            'plan_id': null,
            'request_date': today,
            'request_status': 0,
            type: 1
        }



    }

    



    return (
        <>
            {/* <Stack spacing={2}>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Dịch vụ</FormLabel>
                <Select
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={e => setOfferId(e.target.value)}
                >
                    {
                        listOffer.map((item,index)=>{
                            return <MenuItem index={index} value={item.offer_id}  label={item?.offer_name} >{item?.offer_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
            <>{offerList}</>
            <Button sx={{width:200}} variant="contained" endIcon={<SendIcon />} onClick={submit}>
                Mở rộng
            </Button>
        </Stack> */}

            <Grid container spacing={40} alignItems="flex-end">
                {listOffer.map(offer => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid item key={offer.offer_name} xs={12} sm={offer.offer_name === 'DPZENT offer' ? 12 : 6} md={4}>
                        <Card>
                            <CardHeader
                                title={offer.offer_name}
                                subheader={offer.offer_name}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}

                            />
                            <CardContent>
                                <Typography component="h2" variant="h3" color="textPrimary">
                                    {offer.current_price}Tr
                                </Typography>

                                <Typography variant="subtitle1" align="center" >

                                </Typography>
                                {offer.description.split('|').map(line => (
                                    <Typography variant="subtitle1" align="center" key={line}>
                                        {line}
                                    </Typography>
                                ))}


                            </CardContent>
                            <CardActions >
                                <Button fullWidth   color="primary">
                                    abc
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>

    )
}