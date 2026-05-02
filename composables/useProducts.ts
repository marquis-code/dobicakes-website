export const useProducts = () => {
  const products = useState('products', () => []);
  const { fetchApi } = useApiFactory();

  const fetchProducts = async (category?: string) => {
    const url = category ? `/products?category=${category}` : '/products';
    const response: any = await fetchApi(url);
    products.value = response;
    return response;
  };

  const getProduct = async (id: string) => {
    return await fetchApi(`/products/${id}`);
  };

  return {
    products,
    fetchProducts,
    getProduct,
  };
};
