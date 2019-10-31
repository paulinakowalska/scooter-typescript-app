import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Admin from '../Admin/Admin';
import Home from '../Home/Home';
import About from '../About/About';
import Account from '../Account/Account';
import PageNotFount from '../PageNotFound/PageNotFound';

const RouteList = styled.div`
    max-width: ${props => props.theme.width};
    margin: 0 auto;
    padding: ${props => props.theme.space.medium} 0;
`;

class Routes extends Component {
    render() {
        return (
            <RouteList>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/account" component={Account} />
                    <Route component={PageNotFount} />
                </Switch>
            </RouteList>
        );
    }
}

export default Routes;
