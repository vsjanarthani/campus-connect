import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_USER } from '../../utils/queries';
import { useAuthDispatch } from '../../utils/auth';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((_theme) => ({
    container: {
        height: "100vh",
    },
    form: {
        maxWidth: 650,
        '@media (max-width:600px)': {
            width: 250,
            marginTop: '2rem',
            padding: 5,
        },
        '@media (min-width:1200px)': {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            maxWidth: 750,
        },
    },
    input: {
        color: "#003262",
        '@media (max-width:600px)': {
            fontSize: '1rem',
        },
    },
    button: {
        fontFamily: `Poppins`,
			width:`100%`,
			borderRadius: `6px`,
			bordercolor: `grey`,
			border: '1px solid #D9EDFF',
			color: `white`,
			background: "linear-gradient(180deg, #43688F 0%, #0A3460 100%)",
			boxshadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
			fontSize: '1.3rem',
			marginTop: `1vh`,
			maxWidth: `640px`,
	
			height: `56px`,
			textalign: 'center',
			lineheight: '50px',
			"&:hover": {
				transition: `0.5s`,
				background: 'linear-gradient(180deg, #0A3460 0%, #43688F 100%)',  
				boxshadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',      }
	
    },
    field: {
        margin: "1rem 0rem",
    },

}));

const InputField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "grey",
        },
        "& label": {
            color: "#003262",
            '@media (max-width:600px)': {
                fontSize: '0.9rem',
            },
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "grey",
            },
            "&:hover fieldset": {
                borderColor: "coffee",
            },
            "&.Mui-focused fieldset": {
                color: "whitesmoke",
                borderColor: "grey",
            },
        },
    },
})(TextField);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [severity, setSeverity] = useState('');
    const dispatch = useAuthDispatch()
    const [variables, setVariables] = useState({
        username: '',
        password: '',
    });
    const [login, { loading }] = useLazyQuery(LOGIN_USER, {
        onError: (err) => {
            console.log(err.graphQLErrors[0].message)
            setOpen(true);
            setAlertMsg(err.graphQLErrors[0].message);
            setSeverity('error');
        },
        onCompleted(data) {
            dispatch({ type: 'LOGIN', payload: data.login })
            window.location.href = '/chat'
        },
    })

    // update state based on form input changes
    const handleChange = event => {
        const { name, value } = event.target;

        setVariables({
            ...variables,
            [name]: value
        });
    };

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();
        console.log(variables);
        try {
            await login({
                variables: { ...variables }
            });

        } catch (error) {
            setOpen(true)
            setAlertMsg(error);
            setSeverity('error')
            console.error(error);
        }

        // clear form values
        setVariables({
            username: '',
            password: ''
        });
    };

    return (
        <Grid container justify="center">
           
            <Box component="form" className={classes.form} onSubmit={handleFormSubmit}>
            <Typography> Welcome to Campus Connect!</Typography>
                <InputField
                    fullWidth={true}
                    label="Username"
                    variant="outlined"
                    required
                    name='username'
                    type='username'
                    value={variables.username}
                    onChange={handleChange}
                    inputProps={{ className: classes.input }}
                    className={classes.field}
                />
                <InputField
                    fullWidth={true}
                    label="Password"
                    name='password'
                    required
                    variant="outlined"
                    value={variables.password}
                    onChange={handleChange}
                    inputProps={{ className: classes.input }}
                />
                <Button
                    variant="outlined"
                    fullWidth={true}
                    endIcon={<DoubleArrowIcon />}
                    type="submit"
                    className={classes.button}>
                    {loading ? 'loading..' : 'Login'}
                </Button>
                <Typography> New here? <Link to='./signup'>Sign up</Link>!</Typography>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} className={classes.alertbox}>
                <Alert onClose={() => setOpen(false)} severity={severity} className={classes.alertbox}>
                    {alertMsg}
                </Alert>
            </Snackbar>
        </Grid>

    )
}

export default Login