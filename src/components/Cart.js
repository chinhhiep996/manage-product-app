import React, {Component} from 'react';
import { Table, Container, Button } from 'reactstrap';

import {CartContext} from '../contexts/Cart';
import exportToJsonFile from '../js/ExportJson';

export default class Example extends Component {
    render() {
      return (
            <Container>
                <Table hover bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <CartContext.Consumer>
                        { ({cartItems}) => 
                        cartItems.map((item, index) => 
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                        </tr>)}
                    </CartContext.Consumer>
                </tbody>
                </Table>
                <CartContext.Consumer>
                    {
                        (cartItems) => 
                            <Button onClick={() => exportToJsonFile(cartItems)} 
                                color="primary" 
                                size="lg" 
                                block
                            >
                                Export To Json File
                            </Button>
                    }
                </CartContext.Consumer>
            </Container>
        );
    }
}