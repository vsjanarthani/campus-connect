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
    width: '300px'
    
    },
    media: {
      height: '100px',
      justifySelf: `baseline`,
      
   
    },
    notfound: {
        margin: `10vw`,
        marginTop: '15vh'
    }
  });

const NoMatch = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.notfound}>
      <Card className={classes.root}>
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
