import React from 'react';
import {
    AppBar, Toolbar, List, Typography
} from '@material-ui/core';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthDispatch } from '../../utils/auth';
import { useAuthState } from '../../utils/auth';
import Switch from '@material-ui/core/Switch';
import Clock from 'react-live-clock';
// Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateIcon from '@material-ui/icons/Create';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles((theme) => ({
    appbar: {
        flexGrow: 1,
        margin: 0,
        width: '100%',
        height: "8vh",
        background: '#003262',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '1rem'
       
    },
    clock: {
        fontFamily: `Poppins`
    },
    listItem: {
        marginRight: theme.spacing(2),
        color: "whitesmoke",
        "&:hover": {
            color: "orange",
        },
        "& .MuiTypography-body1": {
            '@media (max-width:1200px)': {
                fontSize: '0.9rem',
            },
            '@media (min-width:1200px)': {
                fontSize: '1.1rem',
            },
        },
    },
    title: {
        color: "whitesmoke",
        fontFamily: "Poppins",
        fontWeight: 800,
        '@media (max-width:1200px)': {
            fontSize: '1.2rem',
        },
        '@media (min-width:1200px)': {
            fontSize: '1.5rem',
        },
    },
}));

const Header = () => {

    const classes = useStyles();
    const authDispatch = useAuthDispatch();
    const { user } = useAuthState();
    const logout = event => {
        event.preventDefault();
        authDispatch({ type: 'LOGOUT' })
        window.location.href = '/'
    };

    return (
        <Box component="nav">
            <AppBar position="static" className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <Typography
                        component={Button}
                        href="/">
                        <span className={classes.title}>Campus Connect</span>
                    </Typography>
                    <List>
                        {!user ? (
                            <>
                             <Clock  className={classes.clock} format={'h:mm a'}style={{fontSize: '1.2em'}}ticking={true} /> 
                                <Button className={classes.listItem} href="/login"><DoubleArrowIcon /> Login</Button>
                                <Button className={classes.listItem} href="/signup"><CreateIcon /> Signup</Button>
                            </>
                        ) : (
                            <>
                            <Clock  className={classes.clock} format={'h:mm a'}style={{fontSize: '1.2em'}}ticking={true} /> 
                             <Switch //https://material-ui.com/components/switches/
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                />


                                <Button className={classes.listItem} href="/chat"><ChatIcon /> Chat</Button>
                                <Button className={classes.listItem} href="/" onClick={logout}><ExitToAppIcon /> Logout</Button>
                            </>
                        )}
                    </List>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header