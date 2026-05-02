import { ref } from "vue"
import { order_api } from "@/api_factory/modules/orders"

export const useFetchOrders = () => {
    const orders = ref([])
    const loading = ref(false)

    const fetchOrders = async () => {
        loading.value = true
        try {
            const res = await order_api.getUserOrders()
            orders.value = res.data
        } catch (err) {
            console.error('Fetch orders error:', err)
        } finally {
            loading.value = false
        }
    }

    return { orders, loading, fetchOrders }
}
