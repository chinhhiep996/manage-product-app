import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import history from '../services/History';

import { CartContext } from '../contexts/Cart';

const Url = 'http://localhost:3000/products/';

class ProductItem extends Component {
    constructor(props) {
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this);
    }

    deleteProduct() {
        swal({
            title: "Bạn có chắc chắn?",
            text: "Nếu bạn ấn Đồng Ý sản phẩm sẽ bị xóa vĩnh viễn?",
            icon: "warning",
            buttons: {
                cancel: "Đồng Ý",
                confirm: "Hủy",
            }
        }).then(willDelete => 
            {
                if(!willDelete) {
                    axios.delete(Url + this.props.product.id)
                    .then(response => {    
                        swal({
                            title: 'Xóa sản phẩm thành công!',
                            icon: "success",
                            button: "Hoàn tất"
                        })
                        .then(_ => history.push('/products'));
                    })
                    .catch(error => console.error(error))
                }
            }
        )
    }

    render() {
        let {product} = this.props;

        return (
            <div>
                <Card className="mb-4">
                <CardBody>
                    <CardTitle>{product.name}</CardTitle>
                    <CardText><strong>{product.price}</strong></CardText>
                    <CartContext.Consumer>
                        { ({addToCart}) =>
                        <Button onClick={() => addToCart(product)}>
                            Thêm vào danh sách
                        </Button>
                        }
                    </CartContext.Consumer>
                    <Link to={'/edit/' + product.id}>
                        <Button 
                        className="ml-4 btn btn-success"
                        >
                        Chỉnh sửa sản phẩm
                        </Button>
                    </Link>
                    <Button 
                        className="ml-4 btn btn-danger"
                        onClick={this.deleteProduct}
                        >
                        Xóa sản phẩm
                    </Button>
                </CardBody>
                </Card>
            </div>
        )
    }
}

export default ProductItem;