import { makeStyles } from '@material-ui/core'
import React from 'react'
const style = makeStyles(({colors}) => ({
    root : {
        display : "flex",
        alignItems : "center'",
        justifyContent : "center",
        height : "100%",
        width : "100%",
        color : colors.primary
    }
}))
export default function DisplayFallback () {
    const classes = style();
    return (
        <div className={classes.root}>
            Loading
        </div>
    )
}
export {DisplayFallback};