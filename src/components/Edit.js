import React, {Component} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Col, Container, Badge } from 'reactstrap';
import swal from 'sweetalert';

import { ProductsContext } from '../contexts/Products';

const productUrl = 'http://localhost:3000/products/';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameEdit: '',
            priceEdit: 0,
            open: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount () {
        const { id } = this.props.match.params;

        axios.get(`${productUrl + id}`)
            .then((response) => {
                this.setState(() => ({
                    nameEdit: response.data.name,
                    priceEdit: response.data.price
                })
                );
            })
            .catch((error) => console.log(error));
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
        const { id } = this.props.match.params;
        const dataEdit = {
            name: this.state.nameEdit,
            price: Number(this.state.priceEdit)
        } 
        axios.put(`${productUrl + id}`, dataEdit)
            .then(response => {
                swal({
                    title: 'Cập nhật sản phẩm thành công!',
                    icon: "success",
                    button: "Hoàn tất"
                })
                .then(_ => {
                    this.context.fetchProducts();
                    this.props.history.push('/products');
                });
            })
            .catch(error => {
                swal({
                    title: 'Cập nhật sản phẩm thất bại!',
                    icon: "danger",
                    button: "Kêt thúc"
                })
            });
        event.preventDefault();
    }

    render() {
        let {nameEdit, priceEdit} = this.state;

        return (
            <Container>
                <h1><Badge color="secondary">CHỈNH SỬA SẢN PHẨM</Badge></h1>
                <Col lg={6}>
                    <Form onSubmit={this.handleSubmit} className="container">
                        <FormGroup>
                            <Label for="name">Tên sản phẩm</Label>
                            <Input 
                                type="text" 
                                name="nameEdit"
                                id="name" 
                                placeholder="Nhập tên của sản phẩm"
                                value={nameEdit}
                                onChange={this.handleChange}
                             />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Giá sản phẩm</Label>
                            <Input 
                                type="number" 
                                name="priceEdit" 
                                id="price" 
                                placeholder="Nhập giá của sản phẩm"
                                value={priceEdit}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <Button onClick={this.handleClick} 
                            type="submit"
                            color="danger"
                        >
                            Cập nhật sản phẩm
                        </Button>
                    </Form>
                </Col>
            </Container>
        );
    }
}

Edit.contextType = ProductsContext;
export default Edit;