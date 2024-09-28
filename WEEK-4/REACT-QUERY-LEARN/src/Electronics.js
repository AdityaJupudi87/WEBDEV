import { useQuery } from '@tanstack/react-query';

// second page which has electronic deals
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

  if (isPending) {
    return <h1>Loading products...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="products-category">
      <h2>Electronics</h2>
      <div className="products">
        {data.map(product => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronics;
