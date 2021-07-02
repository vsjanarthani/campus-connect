import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));



export default function Funavatar(props) {
  const classes = useStyles();

const handleClick = function() {
  console.log("we got a click, baby!")
}

  return (
    <div className={classes.root}>
      {props.avatars.map(item => (<div>
        <button onClick={handleClick} key={item.id}>
          <Avatar alt={item.title} src={item.image} key={item.title} />
        </button>
      </div>
      ))}
    </div>
  );

}