import React from 'react';
import swal from 'sweetalert';

export const CartContext = React.createContext();

export class CartProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItems: []
        }

        this.addToCart = this.addToCart.bind(this);
    }

    async addToCart(product) {
        let {cartItems} = this.state;
        const index = cartItems.findIndex(cartItem => cartItem.id === product.id);
        if(index >= 0) {
            cartItems[index].quantity = cartItems[index].quantity + 1;
            await this.setState({
                cartItems: cartItems
            });
        } else {
            await this.setState({
                cartItems: this.state.cartItems.concat({
                    ...product, 
                    quantity: 1
                })
            });
        }
        swal({
            title: 'Thêm vào danh sách thành công!',
            icon: "success",
            button: "Hoàn tất"
        });
    }

    render() {
        return (
            <CartContext.Provider value={{
                cartItems: this.state.cartItems,
                addToCart: this.addToCart
            }}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}

export default CartProvider;