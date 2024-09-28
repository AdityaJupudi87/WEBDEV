import { useQuery } from '@tanstack/react-query'


// Creating a custom hook to call the api
// API NAME: fakestore
const useProducts = () =>{

    // fetchProducts function will be calling the api
    const fetchProducts = async() =>{
        const products = await fetch('https://fakestoreapi.com/products');
        const data = await products.json();
        return data;
    }
/* 
Products have the following:
id:1,
title:'...',
price:'...',
category:'...',
description:'...',
image:'...'
*/

// now as we fetched the data, we can use it using useQuery
// in useQuery we pass the queryKey and queryFn
// Using queryKey the data is stored internally and we can use it later by this reference 
// we store them in a result object and the states available are: 1)isPending 2)isError 3)isSuccess

    const {data, isPending, isError, error} = useQuery({
        queryKey : ['products'],
        queryFn : fetchProducts,
    })

    // Here as we can see the code writing got easier because if we use traditional concepts like fetch and async/await
    // we should manage the above by seperately creating states whereas here we are manaing simply together

    return{
        data,
        isPending,
        isError,
        error,
    }

}

export default useProducts;