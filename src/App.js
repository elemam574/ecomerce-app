import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams } from "react-router-dom";
import './App.css';
import Image1 from '../src/images/sunset.jpg';
import Image2 from '../src/images/lake.jpg';
import Image3 from '../src/images/landscape.jpg';

function Header(props) {
  return (
    <React.Fragment>
      <header className='header'>
        <div className='container'>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
              <Link className="navbar-brand" to="/">E-Commerce</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </React.Fragment>
  )
}

function Slider() {
  return (
    <>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Image1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={Image2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={Image3} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  )
}

function ProductsList() {
  const apiLink = 'https://fakestoreapi.com/products';
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const getProducts = () => {
    fetch(apiLink)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }
  const getCats = () => {
    fetch(`${apiLink}/categories`)
      .then((res) => res.json())
      .then((data) => setCats(data));
  }

  const getPInCat = (catName) => {
    fetch(`${apiLink}/category/${catName}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }

  useEffect(() => {
    getProducts();
    getCats();
  }, []);



  return (
    <>
      <h2 className='text-center mt-5 pt-5'>Our Products</h2>
      <div className='container'>
        <button onClick={() => getProducts()} className="btn btn-info ms-3 mb-4">All</button>
        {
          cats.map((cat) => {
            return (<button key={cat} onClick={() => {getPInCat(cat)}} className='btn btn-info ms-3 mb-4'>{cat}</button>);
          })
        }
        <div className='row'>
          {products.map((product) => {
            return (
              <div className='col-3' key={product.id}>
                <Product product={product} showButton={true} />
              </div>
            );
          })};
        </div>
      </div>
    </>
  )
}

function Product(props) {
  const { product, showButton } = props;
  return (
    <>
      <div className="card">
        <img src={product.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
          <p>Price: {product.price}$</p>
          {showButton && (
          <Link className="btn btn-primary" to={`/product/${product.id}`}>Details</Link>
        )}
        </div>
      </div>
    </>
  );
}

function About() {
  return (
    <>
      <h1>About Page</h1>
    </>
  )
}

function ProductDetails() {
  const apiLink2 = "https://fakestoreapi.com/products";
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    fetch(`${apiLink2}/${params.productId}`)
      .then((res) => res.json())
      .then((product) => setProduct(product));
  }, [])
  return (
    <>
      <Product product={product} showButton={false}/>
    </>
  )
}
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={
          <>
            <Slider />
            <ProductsList />
          </>
        }
        />

        <Route path='about' element={<About />} />
        <Route path='product/:productId' element={<ProductDetails />} />
      </Routes>

    </>
  );
};

export default App;
