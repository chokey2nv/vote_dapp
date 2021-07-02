import { makeStyles, ListItem, List, ListItemText } from '@material-ui/core'
import React from 'react'
const style = makeStyles(({colors, breakpoints}) => ({
    root : {
        background : colors.black,
        color : colors.text,
        display : "flex",
        flexDirection : "column",
        alignItems : "center",
        justifyContent : "center",
        marginTop : 20,
        padding : 10,
        width : "100%",
        borderRadius : 10
    },
    list : {
        width : "100%",
    },
    listItem : {
        display : "flex",
        justifyContent : "space-between",
        color : colors.accent
    }
}))
export default function VoteDetails (props) { console.log(props);
    const classes = style(),
    {voteFee, vote, votesForYes, votesForNo, proposalId} = props || {},
    detailMap = [
        {name : "Votes for YES", value : votesForYes},
        {name : "votes for NO", value : votesForNo},
        {name : "Your Vote", value : vote === "0" ? "None" : (vote === "1" ? "NO" : "YES")}
    ]
    return (
        <div className={classes.root}>
            <div className={classes.header}>Proposal Details</div>
            <List className={classes.list}>
                {detailMap && detailMap.map((item, index) => <ListItem key={index}>
                    <ListItemText secondary={<div className={classes.listItem}>
                        <span className={classes.name}>{item.name}</span>
                        <span className={classes.name}>{item.value}</span>
                    </div>}/>
                </ListItem>)}
            </List>
        </div>
    )
}