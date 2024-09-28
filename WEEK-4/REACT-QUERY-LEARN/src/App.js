import './App.css';
import useProducts from './hooks/useProducts'
import {useMutation} from '@tanstack/react-query'
import { Link, Route, Routes } from 'react-router-dom';
import ProductsByCategory from './Electronics';

function App() {
  // Now we are using useMutation for the purpose of updating
  const mutation = useMutation({
    mutationFn: () => fetch('https://fakestoreapi.com/products',{
      method:"POST",
      body: JSON.stringify(
        {
          title: 'test product',
          price: 13.5,
          description: 'lorem ipsum set',
          image: 'https://i.pravatar.cc',
          category: 'electronic'
        }
      )

    })
  }) //method finish

  // Using useProducts
  const {data,isPending,isError,error} = useProducts();

  if(isPending)
  {
    return <h1>Loading...</h1>
  }
  if(isError)
  {
    return <h1>{error.message}</h1>;
  }

// If not pending and no error the following will be displayed
  return (
    <>
      <nav>
        <Link to="/">TopDeals</Link>
        <Link to="/category">Electronics</Link>
      </nav>
    {
      mutation.isPending ? <p>Adding Product...</p> : 
      (
        <>
        {
          mutation.isError ? <p>{mutation.error.message}</p> : null
        }
         <button onClick={() => mutation.mutate()}>Add Product</button>
         { mutation.isSuccess && <p>Product added...</p>}

        </>
      )
    }
    
    <Routes>
        <Route
          path="/"
          element={
            <div className="products">
              {data.map((product) => {
                return (
                  <div key={product.id} className="product">
                    <img src={product.image} alt={product.title} />
                    <h3>{product.title}</h3>
                    <p>{product.price}</p>
                  </div>
                );
              })}
            </div>
          }
        />
        <Route path="/category" element={<ProductsByCategory />} />
      </Routes>
    </>

  );
}

export default App;
