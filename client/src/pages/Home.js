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
        width: `65vw`,
        justifyContent: "center",
    },
    starter: {
        fontsize: '1.5rem',
        fontfamily: 'Poppins',
        justifyContent: 'center',
        marginTop: `1vh`,
    },
    alterHeader: {
        fontsize: '1.5rem',
        marginTop: `2vh`,
        weight: `600`
    },
    alterIntro: {
        fontsize: '1.5rem',
        fontfamily: 'Poppins',
        margin: `1vh`
    },
    joinbutton: {
        lineheight: '50px',
        height: '50px',
        textalign: 'center',
        width: '250px',
        cursor: 'pointer',
        backgroundColor: 'purple',
        color: 'blue',
        transition: 'all 0.3s',
        position: 'center',
    },
    span: {
        transition: 'all 0.3s',
    },
    logopick: {
        width: '100vw'
    }
,

    field: {
        display: 'flex',
        margin: `1vh`,
     
    }
}));

const avatars = businessLogos;
const avatars2 = funLogos;


const Home = () => {

    const classes = useStyles();

    return (
        <div>  
            <Box className={classes.contain}>
            <Grid>
                <Typography className={classes.starter} > Get Connected</Typography>  </Grid>

            <Grid><Typography className={classes.alterHeader}>Avatar Alter Egos</Typography></Grid>

            <Grid> <Typography className={classes.alterIntro}>Pick a fave tech:</Typography></Grid>
            <Funavatar avatars={avatars} /> 

            <Grid> <Typography className={classes.alterIntro}>If you're gonna party, who is it with?</Typography></Grid>
           
            <Funavatar className={classes.logopick} avatars={funLogos} />
            <Typography className={classes.alterHeader}>Social Profiles</Typography>
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

                    
                <Grid><Button className={classes.joinbutton}><span>Connect</span></Button></Grid>
        
        </Box>
        </div>
    )
}

export default Home
