import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from '@material-ui/core';
import { Suspense } from 'react';
import { Router, Switch} from 'react-router-dom';
import { DisplayFallback, Layout, Setup } from './components';
import { history } from './helpers';
import { appTheme, routes } from './utils';
import { CustomSnackbar } from './includes';
import $ from 'jquery';
function App() {
    const theme = useTheme(); 
    useEffect(() => {
        $("html").css("background", appTheme.page);
        $("html").css("color", appTheme.text);
    }, []);
    return <Router history={history}>
        <ThemeProvider theme={{
            ...theme, colors : appTheme
        }}>
            <Suspense fallback={<DisplayFallback/>}>
                <Switch>
                    {routes && routes.map((route, index)=><Layout {...route} key={index}/>)}
                </Switch>
            </Suspense>
            <CustomSnackbar/>
            <Setup/>
        </ThemeProvider>
    </Router>
}

export default App;
