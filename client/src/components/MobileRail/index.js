import React from "react";
//Material UI Items
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import UserList from '../../components/UserList/UserList';
import { MessageProvider } from '../../utils/messagecontext';

import Chatter from "../../components/ChatBody/ChatSubmit";
import ForumIcon from '@material-ui/icons/Forum';
import Send from '@material-ui/icons/Send';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles(() => ({

    menuRail: {
        width: '280 px',
        textAlign: 'left',
        fontFamily: 'Poppins',
        weight: `800`,
        background: "#F5F5F5",
        height: "100%",
        marginTop: '20px'

    },
    active: {
        color: '#003363',
        fontFamily: 'Poppins',
      
    },
    listItem: {
        "&:hover": {
            color: "black"
        },
        marginTop: `2rem`,
        fontSize: `1rem`,
        color: `black`,
        fontFamily: 'Poppins',
        marginBottom: `2rem`,
        
    },
    myname:{ 
        display: "flex",
        flexWrap: "no-wrap",
        width: "240px"

    },
    railname: {
        fontSize: `1rem`,
        fontFamily: 'Poppins',
   
        marginLeft: `20px`,
        marginTop: `10px`,
        marginBottom: `10px`,

 
        color: `black`,
        weight: `extrabold`,
        justifyContent: `center`

    },
   
    avatar: {
        width: `5rem`,
        height: `5rem`,
        justifyContent: `center`
    }
}));

const Rail = ({ navigationLinks }) => {
    const classes = useStyles();

    return (
        <Box className={classes.menuRail} component="div">
        <Divider />      <Divider /><Grid className="myname" >  
              <Typography className={classes.railname}> <Avatar alt= "https://res.cloudinary.com/janarthani/image/upload/v1620088367/007_ooqqgu.png" />Username Here</Typography>
              </Grid> <Divider /><Divider />
           
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
               
                       <UserList />
                   </div>
         </div>
           </div>
            
        </Box>
    );
}

export default Rail

