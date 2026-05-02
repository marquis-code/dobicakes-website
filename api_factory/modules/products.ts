import { GATEWAY_ENDPOINT } from '../axios.config'

export const product_api = {
    getAll: (params?: any) => GATEWAY_ENDPOINT.get('/products', { params }),
    getById: (id: string) => GATEWAY_ENDPOINT.get(`/products/${id}`),
}
