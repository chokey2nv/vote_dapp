import { snackbarConstants, snackbarStrings } from "./reducer";

export const snackbarActions = {
    close : dispatch => {
        snackbarActions.payload({
            [snackbarStrings.message] : "",
            [snackbarStrings.snackbarProps] : {
                open : false,
            },
        })(dispatch)
    },
    successNotice : (message, option = {}) => dispatch => {
        const {
            [snackbarStrings.snackbarProps] : snackbarProps,
            ..._option
        } = option;
        snackbarActions.payload({
            [snackbarStrings.message] : message,
            [snackbarStrings.alertProps] : {
                severity : "success",
            },
            [snackbarStrings.snackbarProps] : {
                open : true,
                autoHideDuration : 10000,
                ...snackbarProps
            },
            ..._option
        })(dispatch)
    },
    warningNotice : (message, option = {}) => dispatch => {
        snackbarActions.payload({
            [snackbarStrings.message] : message,
            [snackbarStrings.alertProps] : {
                severity : "warning"
            },
            [snackbarStrings.snackbarProps] : {
                open : true,
                autoHideDuration : 10000
            },
            ...option
        })(dispatch)
    },
    errorNotice : (message, option ={}) => dispatch => {
        snackbarActions.payload({
            [snackbarStrings.message] : message,
            [snackbarStrings.alertProps] : {
                severity : "error"
            },
            [snackbarStrings.snackbarProps] : {
                open : true,
                autoHideDuration : 10000
            },
            ...option
        })(dispatch)
    },
    payload : payload => dispatch => dispatch({
        type : snackbarConstants.SET_SNACKBAR,
        payload
    })
}
export const successToast = snackbarActions.successNotice;
export const errorToast = snackbarActions.errorNotice;
export const warningToast = snackbarActions.warningNotice;