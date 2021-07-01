import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import GitHub from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(() => ({
    bottomNavContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: "fixed",
        background: '#003262',
        bottom: "0",
        left: "0",
        width: "100%",
        minHeight: "10%",
        borderTop: '2px',
        borderColor: '#ccc',
        zIndex: 2,
        '@media (min-width:600px)': {
            minHeight: "5%",
        },
    },
    footer: {
        color: "whitesmoke",
        '@media (max-width:1200px)': {
            fontSize: '1rem',
        },
        '@media (min-width:1200px)': {
            fontSize: '1.5rem',
        },
    },
    icon: {
        color: `white`
    }
}));



const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.bottomNavContainer}>
            <Button className={classes.icon}
              href="https://github.com/Clayto30/campus-connect"
              target="_blank"> <GitHub /></Button>
        </div>
    );
};

export default Footer

