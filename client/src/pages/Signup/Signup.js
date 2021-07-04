import React, { useState } from 'react';
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
import { LOGIN_USER } from '../../utils/queries';
import { useAuthDispatch } from '../../utils/auth';

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
		'@media (min-width:1200px)': {
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
		marginTop: '1rem',
		color: '#003262',
		borderColor: 'grey'
	},
	field: {
		margin: '1rem 0rem'
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
	const [alertMsg, setAlertMsg] = useState('');
	const [severity, setSeverity] = useState('');
	const [open, setOpen] = useState(false);
	const [variables, setVariables] = useState({
		username: '',
		email: '',
		password: ''
	});
	const [errors, setErrors] = useState({});

	const [addUser, { loading }] = useMutation(ADD_USER, {
		onError: err => {
			setErrors(err.graphQLErrors[0].extensions.errors);
			setOpen(true);
			setAlertMsg(errors);
			setSeverity('error');
		},
		onCompleted(data) {
			console.log(data);
			dispatch({ type: 'SIGNUP', payload: data.addUser });
			window.location.href = '/onboard';
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
			<Box
				component="form"
				className={classes.form}
				onSubmit={handleFormSubmit}
			>
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
