import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Tooltip from "@material-ui/core/Tooltip";

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
        <Tooltip
        title={item.tip}
        placement="top"
      >
        <Button onClick={handleClick} key={item.id}>
          <Avatar alt={item.title} src={item.image} key={item.title} />
        </Button></Tooltip>
      </div>
      ))}
    </div>
  );

}