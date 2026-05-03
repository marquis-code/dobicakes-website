export const useProducts = () => {
  const products = useState('products', () => []);
  const { fetchApi } = useApiFactory();

  const fetchProducts = async (category?: string) => {
    const url = category ? `/products?category=${category}&limit=50` : '/products?limit=50';
    const response: any = await fetchApi(url);
    products.value = response.data || [];
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
