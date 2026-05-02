import { ref } from "vue"
import { order_api } from "@/api_factory/modules/orders"

export const useFetchOrderById = () => {
    const order = ref(null)
    const loading = ref(false)

    const fetchOrderById = async (id: string) => {
        loading.value = true
        try {
            const res = await order_api.getById(id)
            order.value = res.data
        } catch (err) {
            console.error('Fetch order error:', err)
        } finally {
            loading.value = false
        }
    }

    return { order, loading, fetchOrderById }
}
