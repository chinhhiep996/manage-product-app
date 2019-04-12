import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import history from '../services/History';
import { CartContext } from '../contexts/Cart';
import { ProductsContext } from '../contexts/Products';

const Url = 'http://localhost:3000/products/';

const styles = theme => ({
    fab: {
      margin: theme.spacing.unit * .5,
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 3,
    },
});

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
                        .then(_ => {
                            this.context.fetchProducts();
                            history.push('/products');
                        });
                    })
                    .catch(error => console.error(error))
                }
            }
        )
    }

    render() {
        let { product, classes } = this.props;

        return (
            <Col xs={3}>
                <Card className="mb-4">
                <CardBody>
                    <CardTitle><strong>{product.name}</strong></CardTitle>
                    <CardText>{product.price}</CardText>
                    <CartContext.Consumer>
                        { ({addToCart}) =>
                                        <Tooltip 
                                            title="Add to cart" 
                                            aria-label="Add"
                                            onClick={() => addToCart(product)}
                                        >
                                            <Fab size="small" color="secondary" className={classes.fab}>
                                                <AddShoppingCartIcon />
                                            </Fab>
                                        </Tooltip>
                        }
                    </CartContext.Consumer>
                    <Link to={'/edit/' + product.id}>
                        <Tooltip 
                            title="Edit" 
                            aria-label="Edit"
                        >
                            <Fab size="small" color="action" className={classes.fab}>
                                <EditIcon />
                            </Fab>
                        </Tooltip>
                    </Link>
                    <Tooltip 
                        title="Delete" 
                        aria-label="Delete"
                        onClick={this.deleteProduct}
                    >
                        <Fab size="small" color="primary" className={classes.fab}>
                            <DeleteIcon />
                        </Fab>
                    </Tooltip>
                </CardBody>
                </Card>
            </Col>
        )
    }
}

ProductItem.contextType = ProductsContext;
export default withStyles(styles)(ProductItem);