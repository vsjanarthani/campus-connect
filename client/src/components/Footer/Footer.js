import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { LinkedIn, GitHub } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import MaximizeIcon from '@material-ui/icons/Maximize';
import footerData from './footerdata';

const Footer = props => {
	const useStyles = makeStyles(theme => ({
		container: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			background: props.data.header,
			paddingBottom: '1rem',
			left: '0',
			width: '100%',
			marginTop: '20px',
			borderTop: '2px',
			borderColor: '#ccc',
			zIndex: 2,
			'@media (min-width:600px)': {
				minHeight: '5%'
			}
		},
		heading: {
			color: 'whitesmoke',
			fontFamily: 'Poppins',
			marginTop: '1rem',
			fontVariant: 'petite-caps',
			'@media (max-width:1200px)': {
				fontSize: '1.1rem'
			},
			'@media (min-width:1200px)': {
				fontSize: '1.3rem'
			}
		},
		name: {
			color: 'whitesmoke',
			fontFamily: 'Poppins',
			marginTop: '0.5rem',
			paddingBottom: '0.8rem',
			'@media (max-width:1200px)': {
				fontSize: '0.9rem'
			},
			'@media (min-width:1200px)': {
				fontSize: '1.rem'
			}
		},
		creators: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column'
		},
		btndiv: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-evenly',
			flexDirection: 'row',
			paddingBottm: '0.5rem'
			// boxShadow: '4px 2px 2px 2px #073057d4',
		},
		avatar: {
			padding: '1rem',
			'@media (max-width:1200px)': {
				width: theme.spacing(6),
				height: theme.spacing(6)
			},
			'@media (min-width:1200px)': {
				width: theme.spacing(7),
				height: theme.spacing(7)
			}
		},
		icon: {
			color: 'whitesmoke'
		}
	}));

	const classes = useStyles();
	const creators = footerData.creators;

	return (
		<div className={classes.container}>
			<Typography className={classes.heading}>Meet the Creators</Typography>
			<div className={classes.btndiv}>
				<MaximizeIcon className={classes.icon} />
				<MaximizeIcon className={classes.icon} />
				<MaximizeIcon className={classes.icon} />
				<MaximizeIcon className={classes.icon} />
			</div>
			<Grid container justify="space-evenly">
				{creators.map(creator => {
					return (
						<div key={creator.name} className={classes.creators}>
							<Typography className={classes.name}>{creator.name}</Typography>

							<Avatar
								className={classes.avatar}
								src={creator.imageUrl}
								alt={creator.name}
							></Avatar>
							<div className={classes.btndiv}>
								<Button
									className={classes.btn}
									target="_blank"
									href={creator.GitHub}
								>
									<GitHub className={classes.icon} />
								</Button>
								<Button
									className={classes.btn}
									target="_blank"
									href={creator.linkedin}
								>
									<LinkedIn className={classes.icon} />
								</Button>
							</div>
						</div>
					);
				})}
			</Grid>
		</div>
	);
};

export default Footer;
