import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import theme from './theme';
import { ThemeProvider } from 'emotion-theming';
import Header from './components/header/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import Funeral from './pages/Funeral';

function App() {
    return (
        <ThemeProvider theme={theme}>
        <Header/>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/funeral">
                          <Funeral />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
