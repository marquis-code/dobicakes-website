import { GATEWAY_ENDPOINT } from '../axios.config'

export const marketing_api = {
    getBanners: () => GATEWAY_ENDPOINT.get('/marketing/banners'),
    validatePromo: (code: string) => GATEWAY_ENDPOINT.post('/marketing/promos/validate', { code }),
}
