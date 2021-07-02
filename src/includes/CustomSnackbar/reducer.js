export const snackbarStrings = {
    snackbarProps : "snackbarProps",
    alertProps : "alertProps",
    message : "message"
}
export const snackbarConstants = {
    SET_SNACKBAR : "SET_SNACKBAR",
}
export const snackbarReducer = (state={}, action) => {
    const {type, payload} = action;
    switch(type){
        case snackbarConstants.SET_SNACKBAR : 
            return {...state, ...payload};
        default : return state;
    }
}