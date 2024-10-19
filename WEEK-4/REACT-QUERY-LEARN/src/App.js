import useProducts from './hooks/useProducts';
import { useMutation } from '@tanstack/react-query';
import { Link, Route, Routes } from 'react-router-dom';
import ProductsByCategory from './Electronics';
import styled from 'styled-components';

const App = () => {
  // Now we are using useMutation for the purpose of updating
  const mutation = useMutation({
    mutationFn: () => fetch('https://fakestoreapi.com/products', {
      method: "POST",
      body: JSON.stringify({
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
      }),
    })
  }); //method finish

  // Using useProducts
  const { data, isPending, isError, error } = useProducts();

  // Show loading message while fetching products
  if (isPending) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }
  // Show error message if there is an error
  if (isError) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  }

  // If not pending and no error the following will be displayed
  return (
    <AppContainer>
      <Nav>
        <NavLink to="/">TopDeals</NavLink>
        <NavLink to="/category">Electronics</NavLink>
      </Nav>

      {
        mutation.isPending ? <p>Adding Product...</p> :
          (
            <>
              {
                mutation.isError ? <ErrorMessage>{mutation.error.message}</ErrorMessage> : null
              }
              <Button onClick={() => mutation.mutate()}>Add Product</Button>
              {mutation.isSuccess && <p>Product added...</p>}
            </>
          )
      }

      <Routes>
        <Route
          path="/"
          element={
            <ProductsContainer>
              {data.map((product) => (
                <Product key={product.id}>
                  <ProductImage src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                </Product>
              ))}
            </ProductsContainer>
          }
        />
        <Route path="/category" element={<ProductsByCategory />} />
      </Routes>
    </AppContainer>
  );
}

export default App;

// Used Styled Components
const AppContainer = styled.div
`
  text-align: center;
`;

const Nav = styled.nav
`
  margin-bottom: 20px;
`;

const NavLink = styled(Link)
`
  margin: 0 20px;
  text-decoration: none;
  color: blue;
`;

const ProductsContainer = styled.div
`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Product = styled.div
`
  width: 300px;
  margin: 1rem;
  text-align: center;
`;

const ProductImage = styled.img
`
  width: 250px;
  height: 300px;
`;

const Button = styled.button
`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
`;

const LoadingMessage = styled.h1
`
  text-align: center;
`;

const ErrorMessage = styled.p
`
  color: red;
  text-align: center;
`;