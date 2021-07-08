import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    carddiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 650,
        padding: '1rem',
        '@media (min-width:600px)': {
            width: 590
        }
    },
    para: {
        fontFamily: `cursive`,
        color: '#003262',
        lineHeight: '1.5',
        fontWeight: 300,
        fontSize: '1rem',
        textAlign: 'center',
        margin: theme.spacing(2),
        '@media (min-width:600px)': {
            fontSize: '1.2rem'
        },
        '@media (min-width:1200px)': {
            fontSize: '1.4rem'
        }
    },
    media: {
        maxHeight: 240,
        borderRadius: '4%',
        maxWidth: 240,
        textAlign: 'center',
    },
    title: {
        fontSize: '1rem',
        color: '#C4820E',
        textAlign: 'center',
        paddingTop: '2rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem'
        }
    },
    signature: {
        textAlign: 'right',
        color: '#003262',
        fontFamily: 'Yomogi',
        fontWeight: 800,
        fontSize: '1rem',
    }
}));

const Appreciate = ({ to, imageUrl, message, from }) => {
    const classes = useStyles();

    return (
        <Card className={classes.carddiv}>
            <Typography gutterBottom className={classes.title} component="h2">
                Dear {to}
            </Typography>
            <img alt="funny gif" className={classes.media} src={imageUrl} />
            <CardContent className={classes.cardbody}>

                <Typography component="p" className={classes.para}>
                    {message}
                </Typography>
                <Typography component="p" className={classes.signature}>
                    -{from}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Appreciate;
