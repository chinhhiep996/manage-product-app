import React from 'react';
import swal from 'sweetalert';

export const CartContext = React.createContext();

export const removeCarts = function() {

}

export class CartProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItems: []
        }

        this.addToCart = this.addToCart.bind(this);
        this.removeCarts = this.removeCarts.bind(this);
        this.exportToJsonFile = this.exportToJsonFile.bind(this);
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

    async removeCarts() {
        await this.setState({
            cartItems: []
        });
    }

    exportToJsonFile() {
        if(this.state.cartItems.length === 0) {
            swal({
                title: 'Không có sản phẩm trong giỏ hàng!',
                icon: "warning",
                button: "Thoát"
            })
        } else {
            swal({
                title: "Xuất ra file data.json?",
                text: "Danh sách sản phẩm sẽ bị xóa.",
                icon: "warning",
                buttons: {
                    cancel: "Đồng Ý",
                    confirm: "Hủy",
                }
            }).then(willExport =>
                {
                    if(!willExport) {
                        let dataStr = JSON.stringify(this.state.cartItems);
                        let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
                        let exportFileDefaultName = "data.json";
    
                        let linkElement = document.createElement('a');
                        linkElement.setAttribute('href', dataUri);
                        linkElement.setAttribute('download', exportFileDefaultName);
                        linkElement.click();
                        this.removeCarts();
                    }
                }
            )
        }  
    }

    render() {
        return (
            <CartContext.Provider value={{
                cartItems: this.state.cartItems,
                addToCart: this.addToCart,
                exportToJsonFile: this.exportToJsonFile
            }}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}

export default CartProvider;