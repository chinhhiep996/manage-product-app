import React from 'react';
import {Link} from 'react-router-dom';

function NoMatch({ location }) {
    return (
      <div>
        <h3>
          Đường dẫn <code>{location.pathname}</code> không tìm thấy
        </h3>
        <Link to="/products/" >
            <h4>Quay về trang sản phẩm</h4>
        </Link>
      </div>
    );
}

export default NoMatch;