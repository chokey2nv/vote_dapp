import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { CircularProgress, Divider, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { WALLET_KEYS } from '../../../../../../utils'
const style = makeStyles(theme => ({
    root : {
        background : theme.colors.background,
        padding : 10,
        border : "solid 1px " + theme.colors.accent,
    },
    listItem : {
        borderRadius : 0,
        padding : 10,
        [theme.breakpoints.only("xs")] : {
            maxWidth : 300,
        },
    },
    list : {
        color : theme.colors.accent,
        minWidth : 300,
        fontSize : 14,
    },
    listSecondary : {
        color : theme.colors.textSecondary,
        fontSize : 12,
    },
    header : {
        display : "flex",
        justifyContent : "space-between",
        alignItems : "center",
        color : theme.colors.textSecondary,
        margin : 20,
    },
    iconBtn : {
        padding : 5
    },
    icon : {
        width : 25,
        height : 25,
        color : theme.colors.textSecondary,
    },
    divider : {
        background : theme.colors.textSecondary,
    },
    back : {
        color : theme.colors.aceent,
    },
    progress : {
        height : 20,
        width : 20,
        color : theme.colors.accent
        
    },
    avatar : {
        width : 50,
        height : 50
    }
}))
function ConnectionProgress({onClose, wallet}) {
    const dispatch = useDispatch(),
    classes = style();
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.back} onClick={onClose}>Back</div>
                {onClose && <IconButton className={classes.iconBtn} onClick={onClose}>
                    <Close fontSize="small" className={classes.icon}/>
                </IconButton>}
            </div>
            <Divider className={classes.divider}/>
            <List>
                <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                        <CircularProgress className={classes.progress}/>
                    </ListItemAvatar>
                    <ListItemText primary="Initializing" primaryTypographyProps={{
                        className : classes.list
                    }}/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText 
                        primary={wallet === WALLET_KEYS.METAMASK ? "Metamask" : "Binance Wallet (Trust Wallet)"}
                        primaryTypographyProps={{
                            className : classes.list
                        }}
                        secondary="Easy-to-use browser extension" secondaryTypographyProps={{
                        className : classes.listSecondary
                    }}/>    
                    <ListItemSecondaryAction>
                        <img className={classes.avatar} src={`/assets/${wallet === WALLET_KEYS.METAMASK ? "metamask" : "binance"}.png`}/>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </div>
    )
}
ConnectionProgress.propTypes = {
    
}
export default ConnectionProgress;
export {ConnectionProgress};