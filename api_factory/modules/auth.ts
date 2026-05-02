import { GATEWAY_ENDPOINT } from '../axios.config'

export const auth_api = {
    login: (payload: { email: string; password: string }) => GATEWAY_ENDPOINT.post('/auth/login', payload),
    register: (payload: any) => GATEWAY_ENDPOINT.post('/auth/register', payload),
    socialLogin: (payload: { token: string }) => GATEWAY_ENDPOINT.post('/auth/firebase', payload),
    getProfile: () => GATEWAY_ENDPOINT.get('/auth/profile'),
    forgotPassword: (email: string) => GATEWAY_ENDPOINT.post('/auth/forgot-password', { email }),
    resetPassword: (payload: any) => GATEWAY_ENDPOINT.post('/auth/reset-password', payload),
}
