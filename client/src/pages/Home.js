import React from 'react'
import businessLogos from '../components/Carousel/businesslogos'

import Box from "@material-ui/core/Box";
import Funavatar from '../components/Funavatar';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import InputAdornment from '@material-ui/core/InputAdornment';
import funLogos from '../components/Carousel/funlogos';
import Button from "@material-ui/core/Button";
import { TextField, Grid, makeStyles, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({


    contain: {
        marginTop: `10vh`,
        fortFamily: `Poppins`,
      marginLeft: `5vh`,
      marginRight: `5vh`,
        width: `65vw`,
        justifyContent: "center",
    },
    starter: {
        justifyContent: 'center',
        margin: `1vh`,
        fontWeight: 900,
        fontSize: `2rem`
    },
    alterHeader: {
        fontSize: '1.5rem',
        marginTop: `2vh`,
        weight: `600`
    },
    alterIntro: {
        fontsize: '1.5rem',
        fontfamily: 'Poppins',
        margin: `1vh`
    },

      download: {
        display: 'inline block',
        width: `228px`,
        textdecoration: 'none',
        borderradius: `4px`,
        border: '2px solid #D9EDFF',
        color: `white`,
      
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        fontSize: '1.5rem',
        marginTop: `1vh`,
        marginLeft: `.5vw`,
        height: `56px`,
        textalign: 'center',
        lineheight: '50px',
        padding: '0 30px',
        webkittransition: 'all 0.3s',
        transition: 'all 0.3s',
    
     
    },
    boxy:{
      border: `black`,
      borderweight: `2px`
    },
    span: {
        transition: 'all 0.3s',
    },
    logopick: {
        width: '100vw'
    


     
    },
    field: {
      margin: `1vh`
    
    }
}));

const avatars = businessLogos;
const avatars2 = funLogos;


const Home = () => {

    const classes = useStyles();

    return (
        <div>  
            <Box container className={classes.contain}>
            <Grid>
                <Typography  component='h1' className={classes.starter} > Get Connected</Typography>  </Grid>

            <Grid><Typography className={classes.alterHeader}>Avatar Alter Egos</Typography></Grid>

            <Grid> <Typography className={classes.alterIntro}>Pick a fave tech:</Typography></Grid>
            <Funavatar avatars={avatars} /> 

            <Grid> <Typography className={classes.alterIntro}>If you're gonna party, who is it with?</Typography></Grid>
           
            <Funavatar className={classes.logopick} avatars={funLogos} />
            <Typography className={classes.alterHeader}>Social Profiles</Typography>
            <Box className={classes.boxy}>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid>

                <TextField
        className={classes.field} variant="outlined" 
        id="input-with-icon-textfield"
        label="LinkedIn Profile"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkedInIcon />
            </InputAdornment>
          ),
        }}
      />
      </Grid><Grid>
        <TextField
        className={classes.field} variant="outlined" 
        id="input-with-icon-textfield"
        label="Instragram Profile"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <InstagramIcon />
            </InputAdornment>
          ),
        }}
      />

</Grid></form>

</Box>        
                <Grid><Button className={classes.download}><span>Connect</span></Button></Grid>
        
        </Box>
        </div>
    )
}

export default Home
