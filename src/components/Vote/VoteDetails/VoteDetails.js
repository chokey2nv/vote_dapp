import { makeStyles } from '@material-ui/core'
import React from 'react'
const style = makeStyles(({colors, breakpoints}) => ({
    root : {
        
    }
}))
export default function VoteDetails () {
    const classes = style();
    return (
        <div className={classes.root}>
            vote details
        </div>
    )
}