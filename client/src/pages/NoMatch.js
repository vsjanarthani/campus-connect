import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
  height: '100vh',
  width: '100vw',
   
    
    },
    media: {
      height: '150px',
   
      
   
    },
    card: {
      maxWidth: 650,
      '@media (max-width:600px)': {
          width: 350,
          marginTop: '5rem',
          padding: '15px',
      },
      '@media (min-width:1200px)': {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          padding: '15px',
          maxWidth: 750

    }}
   
  });

const NoMatch = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.root}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://res.cloudinary.com/www-actionnetwork-com/image/upload/v1625103882/404_qd3puc.png"
            title="404"
          />
          <CardContent>

            <Typography variant="body2" color="textSecondary" component="p">
              Oh no! We couldn't find that page. Want to head home?
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions> 
                  <Button href="/"
              target="_blank" size="small" color="primary"> 
            Back to Connect Home
          </Button>
        </CardActions>
      </Card>
      </Grid>
    );
  }

export default NoMatch;
