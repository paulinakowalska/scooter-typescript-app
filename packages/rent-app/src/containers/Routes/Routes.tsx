import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import About from '../../components/About/About';
import ScootersWrapper from '../ScootersWrapper/ScootersWrapper';
import Account from '../../components/Account/Account';
import PageNotFound from '../../components/PageNotFound/PageNotFound';
import LandingPage from '../../components/LandingPage/LandingPage';
import CalendarWrapper from '../CalendarWrapper/CalendarWrapper';

const RoutesContainer = styled.div`
    max-width: ${props => props.theme.width};
    margin: 0 auto;
    padding: ${props => props.theme.space.medium} 0;
`;

const Routes = () => (
    <RoutesContainer>
        <Switch>
            <Route exact path="/testLogin" component={LandingPage} />
            <ProtectedRoute path="/events" component={CalendarWrapper} />
            <ProtectedRoute path="/about" component={About} />
            <ProtectedRoute path="/account" component={Account} />
            <ProtectedRoute path="/scooters" component={ScootersWrapper} />
            <Route component={PageNotFound} />
        </Switch>
    </RoutesContainer>
);

export default Routes;
