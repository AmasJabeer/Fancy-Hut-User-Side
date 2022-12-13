import React from 'react'
import ProductLoop from '../product-loop/ProductLoop.component'
import TrendingProductsLoop from '../product-loop/TrendingProductsLoop'
const ProductSection = () => {
  return (
    <div className='m-5'>
      <h3>BEST SELLING PRODUCTS</h3>
      <hr/>
      <div className='row'>
      {/*<ProductLoop/>*/}
          <TrendingProductsLoop/>
      </div>
    </div>
  )
}

export default ProductSection
