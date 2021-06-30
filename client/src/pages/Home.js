import React from 'react'
import businessLogos from '../components/Carousel/businesslogos'
import Funavatar from '../components/Funavatar';
import funLogos from '../components/Carousel/funlogos';
import Button from "@material-ui/core/Button";
import { TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    starter: {
        fontsize: '1.5rem',
        fontfamily: 'Poppins'
    },
    alterHeader: {
        fontsize: '1.5rem',
        fontfamily: 'Poppins'
    },
    alterIntro: {
        fontsize: '1.5rem',
        fontfamily: 'Poppins'
    },
    joinbutton: {
        color: "white",
        background: `blue`,
        fontSize: '1.5rem',
        margin: `2vh`,
        fontWeight: 400,
        "&:hover": {
            color: `green`
        }
    },
    field: {
        display: 'flex'
    }
}));

const avatars = businessLogos;
const avatars2 = funLogos;


const Home = () => {

    const classes = useStyles();

    return (
        <div>  
            <Grid>
            <Grid>
                <Typography className={classes.starter}> Let's get you connected!</Typography>  </Grid>

            <Grid><Typography className={classes.alterHeader}>Avatar Alter Egos</Typography></Grid>

            <Grid> <Typography className={classes.alterIntro}>Pick a fave tech:</Typography></Grid>

            <Funavatar avatars={avatars} />

            <Grid> <Typography className={classes.alterIntro}>If you're gonna party, who is it with?</Typography></Grid>
           
            <Funavatar avatars={funLogos} />
            
            <form className={classes.root} noValidate autoComplete="off">
                <Grid>
                    <TextField className={classes.field} id="outlined-basic" label="LinkedIn" variant="outlined" />   </Grid>
                <Grid> <TextField className={classes.field} id="outlined-basic" label="Instagram" variant="outlined" />   </Grid>
                <Grid><Button className={classes.joinbutton}>Connect</Button></Grid>
            </form>
        </Grid>
        </div>
    )
}

export default Home
