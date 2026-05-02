import { auth_api } from '@/api_factory/modules/auth'

export const useForgotPassword = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()

    const forgotPassword = async (email: string) => {
        loading.value = true
        try {
            await auth_api.forgotPassword(email)
            showToast({
                title: 'Check Your Email',
                message: 'A password reset link has been sent to your email address.',
                toastType: 'success'
            })
            return true
        } catch (error: any) {
            showToast({
                title: 'Error',
                message: error.response?.data?.message || 'Failed to send reset link',
                toastType: 'error'
            })
            return false
        } finally {
            loading.value = false
        }
    }

    return { forgotPassword, loading }
}
