export const useApiFactory = () => {
  const config = useRuntimeConfig();
  const token = useCookie('auth_token');

  const fetchApi = async (url: string, options: any = {}) => {
    const headers = {
      ...options.headers,
      Authorization: token.value ? `Bearer ${token.value}` : '',
    };

    try {
      return await $fetch(`${config.public.apiBase}${url}`, {
        ...options,
        headers,
      });
    } catch (error: any) {
      console.error(`API Error [${url}]:`, error.data || error.message);
      throw error;
    }
  };

  return { fetchApi };
};
