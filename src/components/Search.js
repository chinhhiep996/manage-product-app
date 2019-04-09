import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { ProductsContext } from '../contexts/Products';

const styles = theme => ({
  searchSort: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  searchField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    width: 450
  },
  dense: {
    marginTop: 8,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

const currencies = [
  {
    value: 'MD',
    label: 'Sắp xếp mặc định',
  },
  {
    value: 'TC',
    label: 'Giá thấp tới cao',
  },
  {
    value: 'CT',
    label: 'Giá cao xuống thấp',
  }
];

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }

    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  handleSubmitSearch(event) {
    event.preventDefault();
  }

  handleChangeSearch(event) {
    this.setState({
      search: event.target.value
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <ProductsContext.Consumer>
            { ({handleSubmitSearch, handleChangeSoft, keySort}) =>
              <div className={classes.searchSort}>
                <form onSubmit={this.handleSubmitSearch} className={classes.container} noValidate autoComplete="off">
                  <TextField
                      id="outlined-search"
                      label="Tìm kiếm tên sản phẩm"
                      type="search"
                      className={classes.searchField}
                      value={this.state.search}
                      onChange={this.handleChangeSearch}
                      margin="normal"
                      variant="outlined"
                      name="search"
                  />
                  <Button onClick={() => handleSubmitSearch(this.state.search)}
                    variant="contained" 
                    type="submit" 
                    color="primary" 
                    className={classes.button}
                  >
                    Tìm kiếm
                  </Button>
                </form>
                <form>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Sắp xếp"
                    className={classes.textField}
                    value={keySort}
                    name="sort"
                    onChange={(event) => handleChangeSoft(event.target.value)}
                    SelectProps={{
                        MenuProps: {
                        className: classes.menu,
                        },
                    }}
                    margin="normal"
                    variant="outlined"
                    >
                    {currencies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                  </TextField>
                </form>
              </div>
            }
        </ProductsContext.Consumer>
      </div>
    );
  }
}

export default withStyles(styles)(Search);