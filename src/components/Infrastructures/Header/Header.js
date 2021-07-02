import React from 'react'
import { AppBar, makeStyles, Toolbar } from '@material-ui/core'
import { walletStrings, WALLET_REDUCER_NAME } from '../wallet';
import Connect from './Connection/Connect/Connect';
import Connected from './Connection/Connected/Connected';
import { useSelector } from 'react-redux';
const style = makeStyles(theme => ({
    root : {
        
    },
    toolbar : {
        backgroundColor : "transparent",
    },
    container : {
        display : "flex",
        width : "100%",
        alignItems : "center",
        justifyContent : "space-between"
    },
    logo : {
        height : 50,
        width : 50,
    }
}));
/**
 * @desc 
 * please make use of theme.breakpoints in style for media query
 * the theme of the application can be located in "theme.colors", eg. theme.colors.primary,
 * 
 * @param {*} props 
 */
function Header({}) {
    const classes = style();
    const walletReducer = useSelector(state=>state[WALLET_REDUCER_NAME]),
    {[walletStrings.address] : address } = walletReducer;
    return (
        <div className={classes.root}>
            <AppBar elevation={0} classes={{
                colorPrimary : classes.toolbar
            }}>
                <Toolbar>
                    <div className={classes.container}>
                        {!address && <img src="/assets/logo.png" className={classes.logo}/>}
                        {address ? <Connected/> : <Connect/>}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
Header.propTypes = {
    
}
export default Header;
export {Header};