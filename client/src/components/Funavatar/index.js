import React from 'react';
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



export default function ImageAvatars(props) {
  const classes = useStyles();
 // avatar select function () { was clicked } use radio button to return item.title radio name will relate via name
 // write a function only one radio button can be checked
  return (
    <div className={classes.root}>
      {props.avatars.map(item => (<div>
      <Avatar alt={item.title} src={item.image} value={item.title} name={item.title} key={item.id}/>
      <input type="radio" name={item.nameStyle} value={item.title} key={item.title}></input>
      </div>
      ))}
    </div>
  );
  
}