import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, Snackbar as CoreSnackbar} from '@material-ui/core'
import { Alert as MuiAlert} from "@material-ui/lab";
import { snackbarStrings } from './reducer';
import { snackbarActions } from './actions';
const style = makeStyles(theme => ({
    root : {
    }
}))
function Alert(props){
    return <MuiAlert elevation={6} variant="filled" {...props}/>
}
function CustomSnackbar(props) {
    const 
    dispatch = useDispatch(),
    {snackbarReducer} = useSelector(state=>state),
    {
        [snackbarStrings.message] : message,
        [snackbarStrings.snackbarProps] : snackbarProps,
        [snackbarStrings.alertProps] : alertProps,
    } = snackbarReducer,
    onClose = () => snackbarActions.close(dispatch),
    classes = style();
    return (
        <div className={classes.root}>
            <CoreSnackbar anchorOrigin={{
                vertical : "top",
                horizontal : "right"
            }} {...snackbarProps} onClose={onClose}>
                <Alert {...alertProps}>{message}</Alert>
            </CoreSnackbar>
        </div>
    )
}
CustomSnackbar.propTypes = {
    message : PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number,]),
    snackbarProps : PropTypes.shape({
        open : PropTypes.bool,
        autoHideDuration : PropTypes.number,
        onClose : PropTypes.func,
    }),
    alertProps : PropTypes.shape({
        onClose : PropTypes.func,
        severity : PropTypes.oneOf(["warning", "success", "info", "error"]),
    })
}
export default CustomSnackbar;
export {CustomSnackbar};