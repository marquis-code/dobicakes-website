import { GATEWAY_ENDPOINT } from '@/api_factory/axios.config';

export const useCloudinary = () => {
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await GATEWAY_ENDPOINT.post('/chat/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.url;
    } catch (e: any) {
      console.error('Upload failed:', e?.response?.data || e.message);
      throw e;
    }
  };

  return { uploadImage };
};
