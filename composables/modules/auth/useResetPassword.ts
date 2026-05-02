import { auth_api } from '@/api_factory/modules/auth'

export const useResetPassword = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()
    const router = useRouter()

    const resetPassword = async (payload: any) => {
        loading.value = true
        try {
            await auth_api.resetPassword(payload)
            showToast({
                title: 'Success',
                message: 'Your password has been reset successfully. Please login with your new password.',
                toastType: 'success'
            })
            router.push('/auth/login')
            return true
        } catch (error: any) {
            showToast({
                title: 'Error',
                message: error.response?.data?.message || 'Failed to reset password',
                toastType: 'error'
            })
            return false
        } finally {
            loading.value = false
        }
    }

    return { resetPassword, loading }
}
