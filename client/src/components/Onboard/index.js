import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHub from '@material-ui/icons/GitHub';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { TextField, Grid, makeStyles, Typography } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Funavatar from '../Funavatar';
import funLogos from '../Funavatar/funlogos';
import businessLogos from '../Funavatar/businesslogos';
import { useAuthState } from '../../utils/auth';
import { Link } from 'react-router-dom';
import { CREATE_PROFILE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles(_theme => ({
	root: {
		width: '90vw',
		justifyContent: `center`,
		marginLeft: `auto`,
		marginRight: `auto`,
		flexDirection: `column`,
		'@media (min-width:1200px)': {
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			position: 'absolute',
			maxWidth: 750
		}
	},
	contain: {
		width: `70vw`
	},
	header: {
		justifyContent: 'center',
		fontFamily: `Poppins`,
		margin: `1vh`,
		marginLeft: `1vw`,
		marginTop: `5vh`,
		fontWeight: 800,
		fontSize: `1.3rem`
	},
	scroller: {
		overflow: 'auto',
		backgroundColor: `#F5F5F5`,
		paddingTop: `1vh`,
		paddingBottom: `1vh`,
		maxWidth: `640px`,
		justifyItems: `center`
	},
	subHeader: {
		fontSize: '1.2rem',
		fontFamily: `Roboto`,
		marginLeft: `1vw`,
		marginTop: `2vh`,
		marginBottom: `1vh`,
		weight: `600`
	},
	textDetail: {
		fontsize: '.8rem',
		fontfamily: 'Roboto',
		margin: `1vh`
	},

	connectButton: {
		fontFamily: `Poppins`,
		width: '90vw',
		borderRadius: `6px`,
		bordercolor: `grey`,
		border: '1px solid #D9EDFF',
		color: `white`,
		background: 'linear-gradient(180deg, #43688F 0%, #0A3460 100%)',
		boxshadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
		fontSize: '1.3rem',
		marginTop: `1vh`,
		maxWidth: `640px`,

		height: `56px`,
		textalign: 'center',
		lineheight: '50px',
		'&:hover': {
			background: 'linear-gradient(180deg, #0A3460 0%, #43688F 100%)'
		}
	},
	field: {
		marginTop: `1vh`,
		margin: `auto`,
		width: '90vw',
		maxWidth: `640px`
	},
	hide: {
		display: `none`
	},
	logoBox: {
		height: 56,
		display: `flex`,
		alignItems: `center`,
		flexWrap: `wrap`
	},
	warned: {
		color: `#ba000d`,
		fontWeight: `fontWeightBold`
	}
}));

const Onboard = () => {
	const classes = useStyles();
	const { user } = useAuthState();
	const [alertMsg, setAlertMsg] = useState('');
	const [formState, setFormState] = useState({
		businessLogo: '',
		funLogo: '',
		linkedin: '',
		gitHub: '',
		imageUrl: ''
	});
	const [createProfile, { error }] = useMutation(CREATE_PROFILE);
	const handleClick = function (avatar, type) {
		if (type === 'business') {
			setFormState({
				...formState,
				businessLogo: avatar
			});
		} else if (type === 'funlogo') {
			setFormState({
				...formState,
				funLogo: avatar
			});
		}
	};
	const connectButtonClick = function () {
		if (
			!formState.businessLogo ||
			!formState.funLogo
		) {
			setAlertMsg('Please choose Avatar/ Alter Egos!');
			throw error;
		}

		try {
			createProfile({
				variables: {
					businessLogo: formState.businessLogo,
					funLogo: formState.funLogo,
					github: formState.gitHub,
					linkedin: formState.linkedin,
					imageUrl: formState.imageUrl
				}
			});
		} catch (e) {
			console.log(e);
		}
		window.location.href = '/';
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value
		});
	};

	return (
		<Box className={classes.root}>
			<Grid container>
				<Typography component="h1" className={classes.header}>
					{' '}
					{user?.data?.username}'s Profile{' '}
				</Typography>{' '}
			</Grid>

			<Grid>
				<Typography className={classes.subHeader}>Avatar Alter Egos</Typography>
			</Grid>

			<Grid>
				{' '}
				<Typography className={classes.textDetail}>
					Pick a fave tech:
				</Typography>
			</Grid>
			<div className={classes.scroller}>
				<Funavatar
					avatars={businessLogos}
					onClick={(value, value2) => handleClick(value, value2)}
				/>
			</div>
			<div className={classes.logoBox}>
				<Typography className={classes.textDetail}>
					Your fave tech is:
				</Typography>
				<Avatar
					alt={'Your chosen business logo'}
					src={formState.businessLogo}
				/>
			</div>
			<Grid>
				{' '}
				<Typography className={classes.textDetail}>
					If you're gonna party, what's your vibe?
				</Typography>
			</Grid>
			<div className={classes.scroller}>
				<Funavatar
					avatars={funLogos}
					onClick={(value, value2) => handleClick(value, value2)}
				/>
			</div>
			<div className={classes.logoBox}>
				<Typography className={classes.textDetail}>
					You would party with:
				</Typography>
				<Avatar alt={'Your chosen fun logo'} src={formState.funLogo} />
			</div>
			<Typography className={classes.warned} id="sub-header">
				{alertMsg}
			</Typography>
			<Typography className={classes.subHeader}>Social Profiles</Typography>
			<Box className={classes.boxy}>
				<form noValidate autoComplete="off">
					<Grid>
						<TextField
							className={classes.field}
							variant="outlined"
							id="input-with-icon-textfield"
							name="imageUrl"
							label="Image Url"
							placeholder="Image Url"
							onChange={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<PhotoCameraIcon />
									</InputAdornment>
								)
							}}
						/>
					</Grid>
					<Grid>
						<TextField
							className={classes.field}
							variant="outlined"
							id="input-with-icon-textfield"
							name="linkedin"
							label="LinkedIn Profile"
							placeholder="/in/LinkedInName"
							onChange={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LinkedInIcon />
									</InputAdornment>
								)
							}}
						/>
					</Grid>
					<Grid>
						<TextField
							className={classes.field}
							variant="outlined"
							id="input-with-icon-textfield"
							label="GitHub"
							placeholder="@YourGitHub"
							name="github"
							onChange={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<GitHub />
									</InputAdornment>
								)
							}}
						/>{' '}
						<Grid>
							<Button
								className={classes.connectButton}
								onClick={connectButtonClick}
								component={Link}
								to="/"
							>
								Connect
							</Button>
						</Grid>
					</Grid>
				</form>
			</Box>
		</Box>
	);
};

export default Onboard;
