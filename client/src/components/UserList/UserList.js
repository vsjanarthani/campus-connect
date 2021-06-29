import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(() => ({
    container: {
        background: "whitesmoke",
        flexGrow: 1,
    },
    listItem: {
        color: "#003262",
        paddingLeft: '0.5rem',
        textTransform: 'none',
        "&:hover": {
            color: "orange",
        },
        "& .MuiTypography-body1": {

            '@media (max-width:1200px)': {
                fontSize: '0.9rem',
            },
            '@media (min-width:1200px)': {
                fontSize: '1.1rem',
            },
        },
    },
}));

const getUsers = [
    {
        "username": "Jordan.Mosciski16",
        "email": "Jordan.Mosciski16.Williamson@gmail.com",
        "image": "https://res.cloudinary.com/janarthani/image/upload/v1620088367/007_ooqqgu.png",
    },
    {
        "username": "Elton54",
        "email": "Elton5452@hotmail.com",
        "image": "https://res.cloudinary.com/janarthani/image/upload/v1620088367/007_ooqqgu.png",
    },
    {
        "username": "Dominic_Harris13",
        "email": "Dominic_Harris13.Hermiston@hotmail.com",
        "image": "https://res.cloudinary.com/janarthani/image/upload/v1620088367/007_ooqqgu.png",
    },
    {
        "username": "Damion_Christiansen",
        "email": "Damion_Christiansen.Langworth@gmail.com",
        "image": "https://res.cloudinary.com/janarthani/image/upload/v1620088367/007_ooqqgu.png",
    },
    {
        "username": "Nella.Doyle",
        "email": "Nella.Doyle_Hand@yahoo.com",
        "image": "https://res.cloudinary.com/janarthani/image/upload/v1620088367/007_ooqqgu.png",
    },
    {
        "username": "Marta_Shanahan31",
        "email": "Marta_Shanahan31.Lubowitz57@hotmail.com",
        "image": "https://res.cloudinary.com/janarthani/image/upload/v1620088367/007_ooqqgu.png",
    },
    {
        "username": "Cassie.Streich19",
        "email": "Cassie.Streich1996@yahoo.com",
        "image": "https://res.cloudinary.com/janarthani/image/upload/v1620088367/007_ooqqgu.png",
    },
    {
        "username": "Schuyler30",
        "email": "Schuyler30.Conn@gmail.com",
        "image": "https://res.cloudinary.com/janarthani/image/upload/v1620088367/007_ooqqgu.png",
    },
    {
        "username": "Jerrell45",
        "email": "Jerrell4596@gmail.com",
        "image": "https://res.cloudinary.com/janarthani/image/upload/v1620088367/007_ooqqgu.png",
    },
];

const UserList = () => {
    const classes = useStyles();
    return (
        <Box className={classes.container} component="div">
            <List>
                {getUsers.map((item) => (
                    <div key={item.username}>
                        <ListItem
                            className={classes.listItem}
                            component={Button}>
                            <Avatar alt={item.username} src={item.image} />
                            <ListItemText primary={item.username} />
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        </Box>
    );

}

export default UserList
