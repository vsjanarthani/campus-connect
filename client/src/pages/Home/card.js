import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    carddiv: {
        maxWidth: 545,
        width: 240,
        margin: 10,
        '@media (min-width:600px)': {
            width: 590,
        },
    },
    para: {
        fontFamily: `roboto`,
        color: '#003262',
        lineHeight: '1.5',
        fontWeight: 300,
        fontSize: '1rem',
        textAlign: 'center',
        margin: theme.spacing(2),
        '@media (min-width:600px)': {
            fontSize: '1.2rem',
        },
        '@media (min-width:1200px)': {
            fontSize: '1.4rem',
        },
    },
    media: {
        height: '350',
        borderRadius: '4%',
    },
    title: {
        fontSize: '1rem',
        textAlign: 'center',
        paddingTop: '2rem',
        color: "#003262",
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
    },
    signature: {
        textAlign: 'right',
        color: '#003262',
        fontFamily: 'cursive',
    },
}));

const Appreciate = ({ to, imageUrl, message, from }) => {
    const classes = useStyles();

    return (
        <Card className={classes.carddiv}>
            <img
                alt="funny gif"
                className={classes.media}
                src={imageUrl}
            />
            <CardContent className={classes.cardbody}>
                <Typography gutterBottom className={classes.title} component="h2">
                    Dear {to}
                </Typography>
                <Typography component="p" className={classes.para} >
                    {message}
                </Typography>
                <Typography component="p" className={classes.signature}>
                    {from}
                </Typography>
            </CardContent>

        </Card>
    )
}

export default Appreciate

