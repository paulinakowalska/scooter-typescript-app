import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from '../ThemeCss';
import { reset } from '../reset';
import { ContextProvider } from '../context/ContextProvider';

import Header from './Header/Header';
import Routes from './Routes/Routes';

const GlobalStyle = createGlobalStyle`
    ${reset}
    
    body {
      font-family: ${props => props.theme.fonts.fontFamily};
    }
`;

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <ContextProvider>
                    <GlobalStyle />
                    <Router>
                        <Header />
                        <Routes />
                    </Router>
                </ContextProvider>
            </ThemeProvider>
        );
    }
}

export default App;
