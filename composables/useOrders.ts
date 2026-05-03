import { order_api } from '@/api_factory/modules/orders';

export const useOrders = () => {
  const { clearCart } = useCart();

  const placeOrder = async (orderData: any) => {
    try {
      const res = await order_api.create(orderData);
      return res.data;
    } catch (error: any) {
      console.error('Order creation failed:', error);
      throw error;
    }
  };

  const verifyOrder = async (reference: string) => {
    try {
      const res = await order_api.verifyPayment(reference);
      if (res.data) {
        clearCart();
      }
      return res.data;
    } catch (error: any) {
      console.error('Payment verification failed:', error);
      throw error;
    }
  };

  const getOrder = async (id: string) => {
    try {
      const res = await order_api.getById(id);
      return res.data;
    } catch (error: any) {
      console.error('Fetch order failed:', error);
      throw error;
    }
  };

  const getMyOrders = async () => {
    try {
      const res = await order_api.getUserOrders();
      return res.data;
    } catch (error: any) {
      console.error('Fetch user orders failed:', error);
      return [];
    }
  };

  const checkPaymentStatus = async (orderId: string) => {
    try {
      const res = await order_api.checkPaymentStatus(orderId);
      return res.data;
    } catch (error: any) {
      console.error('Payment status check failed:', error);
      throw error;
    }
  };

  return {
    placeOrder,
    verifyOrder,
    getOrder,
    getMyOrders,
    checkPaymentStatus,
  };
};
