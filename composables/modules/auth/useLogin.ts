import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useLogin = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()
    const { setUser } = useUser()

    const login = async (payload: { email: string; password: string }) => {
        loading.value = true
        try {
            const res = await auth_api.login(payload)
            const data = res.data

            if (data.access_token) {
                setUser(data.user, data.access_token)
                showToast({ title: "Success", message: "Login successful", toastType: "success" })
                return data
            }
        } catch (err: any) {
            showToast({ 
                title: "Error", 
                message: err.response?.data?.message || "Login failed", 
                toastType: "error" 
            })
            return null
        } finally {
            loading.value = false
        }
    }

    const socialLogin = async (idToken: string) => {
        loading.value = true
        try {
            const res = await auth_api.socialLogin({ idToken })
            const data = res.data
            if (data.access_token) {
                setUser(data.user, data.access_token)
                showToast({ title: "Success", message: "Google login successful", toastType: "success" })
                return data
            }
        } catch (err: any) {
            showToast({ title: "Error", message: "Social login failed", toastType: "error" })
            return null
        } finally {
            loading.value = false
        }
    }

    return { loading, login, socialLogin }
}
