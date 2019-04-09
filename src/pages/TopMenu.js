import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import { CartContext } from '../contexts/Cart';

class TopMenu extends React.Component {
    render() {
        return(
            <div>
                <Navbar color="light" light expand="md">
                    <Container>
                    <NavbarBrand>
                        Learn React
                    </NavbarBrand>

                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink>
                                <Link to="/home">Trang Chủ</Link>
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink>
                                <Link to="/products">Sản Phẩm</Link>
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink>
                                <CartContext.Consumer>
                                    {({cartItems}) => 
                                        <Link to="/cart">Danh Sách ({cartItems.length})</Link>
                                    }
                                </CartContext.Consumer>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default TopMenu;