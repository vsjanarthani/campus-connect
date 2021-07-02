import React from 'react';
import "./userList.css";
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../utils/queries';
import { useMessageDispatch, useMessageState } from '../../utils/messagecontext';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
// import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';

// const useStyles = makeStyles(() => ({
//     container: {
//         background: "whitesmoke",
//         flexGrow: 1,
//     },
//     listItem: {
//         color: "#003262",
//         paddingLeft: '0.5rem',
//         textTransform: 'none',
//         "&:hover": {
//             color: "orange",
//         },
//         "& .MuiTypography-body1": {

//             '@media (max-width:1200px)': {
//                 fontSize: '0.9rem',
//             },
//             '@media (min-width:1200px)': {
//                 fontSize: '1.1rem',
//             },
//         },
//     },
// }));

const UserList = () => {
    const classes = useStyles();
    const dispatch = useMessageDispatch()
    const { users } = useMessageState()
    // const selectedUser = users?.find((u) => u.selected === true)?.username

    const { loading } = useQuery(GET_USERS, {
        onCompleted: (data) =>
            dispatch({ type: 'SET_USERS', payload: data.getUsers }),
        onError: (err) => console.log(err),
    })

    let usersMarkup
    if (!users || loading) {
        usersMarkup = <p>Loading..</p>
    } else if (users.length === 0) {
        usersMarkup = <p>No users have joined yet</p>
    } else if (users.length > 0) {
        usersMarkup = users.map((user) => {
            // const selected = selectedUser === user.username
            return (
                <div key={user.username}>
                    <ListItem
                        className="conversation"
                        // className={classes.listItem}
                        onClick={() =>
                            dispatch({ type: 'SET_SELECTED_USER', payload: user.username })}
                        component={Button}>
                        <Avatar alt={user.username} src={user.imageUrl || "https://res.cloudinary.com/janarthani/image/upload/v1620088367/007_ooqqgu.png"} />
                        <ListItemText primary={user.username} className="conversationName"/>
                        <ListItemText secondary={user.latestMessage
                            ? user.latestMessage.content
                            : 'Connected..'} />
                    </ListItem>
                    <Divider />
                </div>
            )
        })
    }
    return (
        <Box className={classes.container} component="div">
            <List>
                {usersMarkup}
            </List>
        </Box>
    );
}
export default UserList;

// https://icons8.com/icon/set/characters/office - Good reference for random free icon links
