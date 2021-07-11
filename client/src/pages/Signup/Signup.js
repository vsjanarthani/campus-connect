import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import { useAuthDispatch } from '../../utils/auth';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(_theme => ({
	container: {
		height: '100vh'
	},
	form: {
		maxWidth: 650,
		'@media (max-width:600px)': {
			width: 250,
			marginTop: '2rem',
			padding: 5
		},
		'@media (min-width:600px)': {
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			position: 'absolute',
			maxWidth: 750
		}
	},
	input: {
		color: '#003262',
		'@media (max-width:600px)': {
			fontSize: '1rem'
		}
	},
	button: {
		maxWidth: 750,
		fontFamily: `Poppins`,
		width: `100%`,
		borderRadius: `6px`,
		bordercolor: `grey`,
		border: '1px solid #D9EDFF',
		color: `white`,
		background: 'linear-gradient(180deg, #43688F 0%, #0A3460 100%)',
		boxshadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
		fontSize: '1.3rem',
		marginTop: `1vh`,

		height: `56px`,
		textalign: 'center',
		lineheight: '50px',
		'&:hover': {
			transition: `0.5s`,
			background: 'linear-gradient(180deg, #0A3460 0%, #43688F 100%)',
			boxshadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
		}
	},
	field: {
		margin: '1rem 0rem'
	},
	signLogLink: {
		color: `#003262`,
		textDecoration: `underline`,
		fontWeight: `700`,
		'&:hover': {
			color: '#fcb418'
		}
	}
}));

const InputField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'grey'
		},
		'& label': {
			color: '#003262',
			'@media (max-width:600px)': {
				fontSize: '0.9rem'
			}
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'grey'
			},
			'&:hover fieldset': {
				borderColor: 'coffee'
			},
			'&.Mui-focused fieldset': {
				color: 'whitesmoke',
				borderColor: 'grey'
			}
		}
	}
})(TextField);

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Signup = props => {
	const classes = useStyles();
	const history = useHistory();
	const [alertMsg, setAlertMsg] = useState('');
	const [severity, setSeverity] = useState('');
	const [open, setOpen] = useState(false);
	const [variables, setVariables] = useState({
		username: '',
		email: '',
		password: ''
	});

	const [addUser, { loading }] = useMutation(ADD_USER, {
		onError: err => {
			setOpen(true);
			setAlertMsg(err?.graphQLErrors[0]?.message);
			setSeverity('error');
		},
		onCompleted(data) {
			dispatch({ type: 'SIGNUP', payload: data.addUser });
			history.push('/onboard');
		}
	});

	const dispatch = useAuthDispatch();

	const handleFormSubmit = async e => {
		e.preventDefault();

		try {
			await addUser({
				variables: { ...variables }
			});
		} catch (error) {
			setOpen(true);
			setAlertMsg(error);
			setSeverity('error');
			console.log(error);
		}

		// clear form values
		setVariables({
			username: '',
			password: '',
			email: ''
		});
	};

	return (
		<Grid container justify="center">
			<Box
				component="form"
				className={classes.form}
				onSubmit={handleFormSubmit}
			>
				<Typography>
					Welcome, let's connect you to your bootcamp cohort!
				</Typography>
				<InputField
					fullWidth={true}
					variant="outlined"
					label="Username"
					name="username"
					type="username"
					required
					inputProps={{ className: classes.input }}
					className={classes.field}
					value={variables.username}
					onChange={e =>
						setVariables({ ...variables, username: e.target.value })
					}
				/>
				<InputField
					fullWidth={true}
					label="Email"
					variant="outlined"
					required
					name="email"
					type="email"
					value={variables.email}
					onChange={e => setVariables({ ...variables, email: e.target.value })}
					inputProps={{ className: classes.input }}
					className={classes.field}
				/>
				<InputField
					fullWidth={true}
					label="Password"
					name="password"
					type="password"
					required
					variant="outlined"
					value={variables.password}
					onChange={e =>
						setVariables({ ...variables, password: e.target.value })
					}
					inputProps={{ className: classes.input }}
					className={classes.field}
				/>
				<Button
					variant="outlined"
					fullWidth={true}
					endIcon={<CreateIcon />}
					type="submit"
					className={classes.button}
				>
					{loading ? 'loading..' : 'Signup'}
				</Button>
				<Typography>
					Already have an account? Log in{' '}
					<Link to="./login" className={classes.signLogLink}>
						here
					</Link>
					.
				</Typography>
			</Box>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={() => setOpen(false)}
				className={classes.alertbox}
			>
				<Alert
					onClose={() => setOpen(false)}
					severity={severity}
					className={classes.alertbox}
				>
					{alertMsg}
				</Alert>
			</Snackbar>
		</Grid>
	);
};

export default Signup;

//PLACEHOLDER TEXT FOR GO TO LOGIN PAGE
// NEEDS STYLING
//NEEDS CONSISTENT WIDTH/CENTERING
// THINK WE SHOULD GET RID OF AS MANY EXTRA SIGN UP OPTIONS IN THE NAV AS WE CAN, OR AT LEAST SIMPLIFY THEM
//WILL MAKE IT EASIER FOR US ON MOBILE
