import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.info.light,
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

const tiers = [
  {
    title: 'DPFree',
    price: '0',
    description: ['01 tài khoản', '2 GB Lưu trữ trên mây','3 tiến trình', '1 tháng sử dụng'],
    buttonText: 'Đến với chúng tôi',
    buttonVariant: 'outlined',
  },
  {
    title: 'DPeZ',
    subheader: 'Phổ biến',
    price: '30',
    description: [
      '10 tài khoản',
      '1 TB Lưu trữ trên mây',
      '30 tiến trình',
      'Hỗ trợ giờ hành chính',
    ],
    buttonText: 'Bắt đầu lên thôi',
    buttonVariant: 'contained',
  },
  {
    title: 'DPagenZ',
    price: '60',
    description: [
      '20 tài khoản',
      '3 TB Lưu trữ trên mây',
      '100 tiến trình',
      'Hỗ trợ 24/7',
    ],
    buttonText: 'Liên hệ chúng tôi',
    buttonVariant: 'outlined',
  },
];
// const footers = [
//   {
//     title: 'Công ty',
//     description: ['Làm việc nhóm', 'Tận tâm', 'Liên hệ'],
//   },
//   {
//     title: 'Tính năng',
//     description: ['Truyền tải', 'Trực tuyến', 'Nhanh chóng', 'Bảo mật', 'Toàn vẹn'],
//   },
//   {
//     title: 'Nguồn lực',
//     description: ['Năng động', 'Nhanh nhẹn', 'Kinh nghiệm'],
//   },
//   {
//     title: 'Chính sách',
//     description: ['Chính sách bảo mật', 'Điều khoản sử dụng'],
//   },
// ];

function Pricing(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      
      <main className={classes.layout}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Gói sản phẩm
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" component="p">
            Dữ liệu lên mây 
            <br></br>
            Báo cáo trên tay
          </Typography>
        </div>
        {/* End hero unit */}
        <Grid container spacing={40} alignItems="flex-end">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'DPeZ' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                  
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      tr/th
                    </Typography>
                  </div>
                  {tier.description.map(line => (
                    <Typography variant="subtitle1" align="center" key={line}>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button fullWidth variant={tier.buttonVariant} color="primary">
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
    
      
      {/* Footer */}
      {/* <footer className={classNames(classes.footer, classes.layout)}>
        <Grid container spacing={32} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              {footer.description.map(item => (
                <Typography key={item} variant="subtitle1" color="textSecondary">
                  {item}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </footer> */}
      {/* End footer */}
    </React.Fragment>
  );
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pricing);