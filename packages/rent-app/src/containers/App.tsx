import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from '../ThemeCss';
import { reset } from '../reset';
import { ContextProvider } from '../context/ContextProvider';

import Header from '../components/Header/Header';
import Routes from '../containers/Routes/Routes';

const GlobalStyle = createGlobalStyle`
    ${reset}
    
    body {
      font-family: ${props => props.theme.fonts.fontFamily};
    }
`;

const App: React.FunctionComponent = () => (
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

export default App;
