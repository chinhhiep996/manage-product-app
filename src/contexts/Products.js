import React, {Component} from 'react';
import axios from 'axios';

export const ProductsContext = React.createContext();

axios.defaults.baseURL = 'http://localhost:3000';

export class ProductsProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            keySearch: '',
            keySort: 'MD'
        }

        this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
        this.handleChangeSoft = this.handleChangeSoft.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);
    }

    componentDidMount() {
        axios.get('/products')
            .then((response) => {
                this.setState({
                    products: response.data
                });
            })
            .catch((error) => console.log(error));
    }

    fetchProducts() {
        axios.get('/products')
            .then((response) => {
                this.setState({
                    products: response.data
                });
            })
            .catch((error) => console.error(error));
    }

    handleSubmitSearch(keyword) {
        this.setState({
            keySearch: keyword
        });
    }

    handleChangeSoft(keychoose) {
        this.setState({
            keySort: keychoose
        });
    }

    render() {
        let { products, keySearch, keySort } = this.state;
        let rootProducts = [...products];

        products = products.filter(product => 
            product.name.toLowerCase()
              .indexOf(keySearch.toLowerCase()) !== -1
        );
  
        if(keySort === 'MD') {
            products = [...rootProducts];
        } else if(keySort === 'TC') {
            products.sort((a, b) => a.price - b.price)
        } else if(keySort === 'CT') {
            products.sort((a, b) => b.price - a.price)
        }
  
        products = products.filter(product => 
            product.name.toLowerCase()
                .indexOf(keySearch.toLowerCase()) !== -1
        );

        return (
            <ProductsContext.Provider value={{
                products: products,
                keySearch: this.state.keySearch,
                keySort: this.state.keySort,
                handleSubmitSearch: this.handleSubmitSearch,
                handleChangeSoft: this.handleChangeSoft,
                addProducts: this.addProducts,
                fetchProducts: this.fetchProducts
            }}>
                {this.props.children}
            </ProductsContext.Provider>
        );
    }
}

export default ProductsProvider;