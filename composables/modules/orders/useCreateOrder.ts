import { ref } from "vue"
import { order_api } from "@/api_factory/modules/orders"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateOrder = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()

    const createOrder = async (payload: any) => {
        loading.value = true
        try {
            const res = await order_api.create(payload)
            showToast({ title: "Success", message: "Order placed successfully", toastType: "success" })
            return res.data
        } catch (err: any) {
            showToast({ 
                title: "Error", 
                message: err.response?.data?.message || "Failed to place order", 
                toastType: "error" 
            })
            return null
        } finally {
            loading.value = false
        }
    }

    return { loading, createOrder }
}
