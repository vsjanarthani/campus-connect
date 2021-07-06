import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	box: {
		background: `white` /*button color*/,
		borderRadius: `4px`,
		border: `lightgrey`,
		transition: 'all 0.3s',
		boxShadow: `inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19)`
	}
}));

export default function Funavatar(props) {
	const classes = useStyles();
	console.log(props);
	return (
		<div className={classes.root}>
			{props.avatars.map(item => (
				<div>
					<Tooltip title={item.tip} placement="top">
						<Button
							className={classes.box}
							onClick={event => props.onClick(item.image, item.nameStyle)}
							key={item.id}
						>
							<Avatar alt={item.title} src={item.image} key={item.key} />
						</Button>
					</Tooltip>
				</div>
			))}
		</div>
	);
}
