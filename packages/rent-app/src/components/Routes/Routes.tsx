import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import About from '../About/About';
import Scooters from '../Scooters/Scooters';
import Users from '../Users/Users';
import Events from '../Events/Events';
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
                    <Route exact path="/" component={Events} />
                    <Route path="/about" component={About} />
                    <Route path="/account" component={Account} />
                    <Route path="/scooters" component={Scooters} />
                    <Route path="/users" component={Users} />
                    <Route component={PageNotFount} />
                </Switch>
            </RouteList>
        );
    }
}

export default Routes;
