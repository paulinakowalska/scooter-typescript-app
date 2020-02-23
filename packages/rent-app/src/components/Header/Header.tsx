import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Drawer, Button, ListItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const activeClassName = 'active';
const StyledLink = styled(NavLink).attrs({
    activeClassName: activeClassName,
})`
    &.${activeClassName} {
        color: ${props => props.theme.colors.mediumPink};
    }
    padding: ${props => props.theme.space.medium} ${props => props.theme.space.larger};
    text-decoration: none;
    color: ${props => props.theme.colors.darkBlue};
`;

const navLinks = [
    {
        label: 'Home',
        path: '/',
        position: 'left',
    },
    {
        label: 'Calendar',
        path: '/events',
        position: 'left',
    },
    {
        label: 'Users',
        path: '/users',
        position: 'right',
    },
    {
        label: 'Scooters',
        path: '/scooters',
        position: 'right',
    },
    {
        label: 'About',
        path: '/about',
        position: 'right',
    },
    {
        label: 'Account',
        path: '/account',
        position: 'right',
    },
];

const Header = () => {
    const [open, setOpenState] = React.useState(false);

    const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        if (open) {
            setOpenState(false);
        } else {
            setOpenState(true);
        }
    };

    return (
        <HeaderContainer>
            <Button color="primary" size="large" onClick={toggleDrawer}>
                <MenuIcon fontSize="large" />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer}>
                {navLinks.map(({ path, label }, i) => (
                    <ListItem button key={i}>
                        <StyledLink exact to={path} key={i}>
                            {label}
                        </StyledLink>
                    </ListItem>
                ))}
            </Drawer>
        </HeaderContainer>
    );
};

export default Header;
