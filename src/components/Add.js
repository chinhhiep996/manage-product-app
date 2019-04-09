import React, {Component} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Col, Container, Badge } from 'reactstrap';
import swal from 'sweetalert';

import { ProductsContext } from '../contexts/Products';

const productUrl = 'http://localhost:3000/products/';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        const dataEdit = {
            name: this.state.name,
            price: Number(this.state.price)
        } 
        axios.post(`${productUrl}`, dataEdit)
            .then(response => {    
                swal({
                    title: 'Thêm sản phẩm thành công!',
                    icon: "success",
                    button: "Hoàn tất"
                })
                .then(_ => {
                    this.context.fetchProducts();
                    this.props.history.push('/products');
                });
            })
            .catch(error => console.error(error));
        event.preventDefault();
    }

    render() {
        let {name, price} = this.state;

        return (
            <Container>
                <h1><Badge color="secondary">THÊM SẢN PHẨM</Badge></h1>
                <Col lg={6}>
                    <Form onSubmit={ this.handleSubmit }>
                        <FormGroup>
                            <Label for="name">Tên sản phẩm</Label>
                            <Input 
                                type="text" 
                                name="name"
                                id="name" 
                                placeholder="Nhập tên của sản phẩm"
                                value={ name }
                                onChange={ this.handleChange }
                             />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Giá sản phẩm</Label>
                            <Input 
                                type="number" 
                                name="price" 
                                id="price" 
                                placeholder="Nhập giá của sản phẩm"
                                value={ price }
                                onChange={ this.handleChange }
                            />
                        </FormGroup>
                        <Button onClick={ this.handleClick } type="submit" color="danger">
                            Thêm sản phẩm
                        </Button>
                    </Form>
                </Col>
            </Container>
        );
    }
}

Add.contextType = ProductsContext;
export default Add;