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

  const postApi = (url: string, body: any, options: any = {}) => fetchApi(url, { ...options, method: 'POST', body });
  const patchApi = (url: string, body: any, options: any = {}) => fetchApi(url, { ...options, method: 'PATCH', body });
  const deleteApi = (url: string, options: any = {}) => fetchApi(url, { ...options, method: 'DELETE' });

  return { fetchApi, postApi, patchApi, deleteApi };
};
