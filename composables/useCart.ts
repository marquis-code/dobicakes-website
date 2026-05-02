export const useCart = () => {
  const cart = useState('cart', () => []);
  
  // Persist to localStorage
  onMounted(() => {
    const storedCart = localStorage.getItem('adaobi_cart');
    if (storedCart) cart.value = JSON.parse(storedCart);
  });

  watch(cart, (newCart) => {
    localStorage.setItem('adaobi_cart', JSON.stringify(newCart));
  }, { deep: true });

  const addToCart = (product: any, quantity: number = 1) => {
    const index = cart.value.findIndex((item: any) => item._id === product._id);
    if (index > -1) {
      cart.value[index].quantity += quantity;
    } else {
      cart.value.push({ ...product, quantity });
    }
  };

  const removeFromCart = (productId: string) => {
    cart.value = cart.value.filter((item: any) => item._id !== productId);
  };

  const clearCart = () => {
    cart.value = [];
  };

  const totalAmount = computed(() => {
    return cart.value.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  });

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalAmount,
    itemCount: computed(() => cart.value.length),
  };
};
