import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import theme from './theme';
import { ThemeProvider } from 'emotion-theming';
import Login from './pages/Login';
import Home from './pages/Home';
import Funeral from './pages/Funeral';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div>
                    <Switch>
                        <Route path="/funeral">
                            <Funeral />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/">
                            <Login />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
