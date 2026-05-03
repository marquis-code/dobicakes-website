import { GATEWAY_ENDPOINT } from '../axios.config'

export const order_api = {
    create: (payload: any) => GATEWAY_ENDPOINT.post('/orders', payload),
    verifyPayment: (reference: string) => GATEWAY_ENDPOINT.post(`/orders/verify/${reference}`),
    checkPaymentStatus: (orderId: string) => GATEWAY_ENDPOINT.get(`/orders/payment-status/${orderId}`),
    getUserOrders: () => GATEWAY_ENDPOINT.get('/orders/user/my-orders'),
    getById: (id: string) => GATEWAY_ENDPOINT.get(`/orders/${id}`),
    getAll: () => GATEWAY_ENDPOINT.get('/orders'),
}
