import { ref } from "vue"
import { product_api } from "@/api_factory/modules/products"

export const useFetchProducts = () => {
    const products = ref([])
    const loading = ref(false)

    const fetchProducts = async (params?: any) => {
        loading.value = true
        try {
            const res = await product_api.getAll(params)
            products.value = res.data
        } catch (err) {
            console.error('Fetch products error:', err)
        } finally {
            loading.value = false
        }
    }

    return { products, loading, fetchProducts }
}
