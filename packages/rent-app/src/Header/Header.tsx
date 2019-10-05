import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    background-color: ${props => props.theme.colors.lightPink};
`;

const HeaderNavbar = styled.div`
    width: ${props => props.theme.width};
    font-size: ${props => props.theme.fonts.size.medium};
    margin: ${props => props.theme.space.medium} ${props => props.theme.space.larger};
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
        label: 'About',
        path: '/about',
        position: 'right',
    },
    {
        label: 'Admin',
        path: '/admin',
        position: 'right',
    },
    {
        label: 'Account',
        path: '/account',
        position: 'right',
    },
];

const Header = () => {
    return (
        <HeaderContainer>
            <HeaderNavbar>
                {navLinks.map(({ path, label }, i) => (
                    <StyledLink exact to={path} key={i}>
                        {label}
                    </StyledLink>
                ))}
            </HeaderNavbar>
        </HeaderContainer>
    );
};

export default Header;
