import { ref } from "vue"
import { marketing_api } from "@/api_factory/modules/marketing"

export const useBanners = () => {
    const banners = ref([])
    const loading = ref(false)

    const fetchBanners = async () => {
        loading.value = true
        try {
            const res = await marketing_api.getBanners()
            banners.value = res.data
        } catch (err) {
            console.error('Fetch banners error:', err)
        } finally {
            loading.value = false
        }
    }

    return { banners, loading, fetchBanners }
}
