import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const Electronics = () => {
  const fetchProductsByCategory = async () => {
    const products = await fetch('https://fakestoreapi.com/products/category/electronics');
    const data = await products.json();
    return data;
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['productsByCategory'],
    queryFn: fetchProductsByCategory,
  });

  // Show loading message while fetching products
  if (isPending) {
    return <LoadingMessage>Loading products...</LoadingMessage>;
  }
  // Show error message if there is an error
  if (isError) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  }

  return (
    <ProductsCategory>
      <Title>Electronics</Title>
      <ProductsContainer>
        {data.map(product => (
          <Product key={product.id}>
            <ProductImage src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </Product>
        ))}
      </ProductsContainer>
    </ProductsCategory>
  );
};

export default Electronics;

// Used Styled Components
const ProductsCategory = styled.div
`
  padding: 2rem;
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

const ProductsContainer = styled.div
`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled.h2
`
  text-align: center;
`;

const LoadingMessage = styled.h1
`
  text-align: center;
`;

const ErrorMessage = styled.h1
`
  text-align: center;
  color: red;
`;
