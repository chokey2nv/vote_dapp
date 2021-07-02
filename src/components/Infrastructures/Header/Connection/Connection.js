import React from 'react'
import { makeStyles } from '@material-ui/core';
const style = makeStyles(({breakpoints, colors}) => ({
    root : {
        display : "flex",
        fontSize : 12,
    }
}))
function Connection() {
    const classes = style()
    return (
        <div className={classes.root}>
            
        </div>
    )
}
Connection.propTypes = {
    
}
export default Connection;
export {Connection};