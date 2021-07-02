import React from 'react'
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core'
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import { walletStrings, WALLET_REDUCER_NAME } from '../wallet';
import ConnectionInstruction from '../ConnectionInstruction/ConnectionInstruction';
const style = makeStyles(({breakpoints, colors}) => ({
    root : {
    },
    display : {
    },
    appPager : {
        margin : "0px 20px",
        minHeight : 300,
        // height : "calc(100vh - 170px)",
        display : 'flex',
        alignItems : "center",
        justifyContent : "center",
    },
    stage : {
        marginTop : 70,
        marginBottom : 50,
        minHeight : 200,
        [breakpoints.down("sm")] : {
            padding : "20px 10px"
        },
        [breakpoints.up("md")] : {
            padding : "20px 50px"
        },
        [breakpoints.up("lg")] : {
            padding : "20px 80px"
        },
        [breakpoints.up("xl")] : {
            padding : "20px 100px"
        }
    }
}))
function Layout({component : Component, ...props}) {
    const classes = style(),
    address = useSelector(state=>state[WALLET_REDUCER_NAME][walletStrings.address]);
    return (
        <Route {...props} className={classes.root} component={routeProps=>{
            return <div className={classes.display}>
                <Header
                    classes={{
                        container : classes.appPager
                    }}
                />
                <div className={classNames(classes.appPager, classes.stage)}>
                    {address ? <Component {...routeProps} /> : <ConnectionInstruction/>}
                </div>
            </div>
        }}/>
    )
}
Layout.propTypes = {
    
}
export default Layout;
export {Layout};