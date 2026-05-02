import { ref } from "vue"
import { marketing_api } from "@/api_factory/modules/marketing"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const usePromos = () => {
    const loading = ref(false)
    const discountInfo = ref(null)
    const { showToast } = useCustomToast()

    const validatePromo = async (code: string) => {
        loading.value = true
        try {
            const res = await marketing_api.validatePromo(code)
            discountInfo.value = res.data
            showToast({ title: "Success", message: "Promo code applied", toastType: "success" })
            return res.data
        } catch (err: any) {
            discountInfo.value = null
            showToast({ 
                title: "Error", 
                message: err.response?.data?.message || "Invalid promo code", 
                toastType: "error" 
            })
            return null
        } finally {
            loading.value = false
        }
    }

    return { loading, discountInfo, validatePromo }
}
