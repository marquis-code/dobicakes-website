export const useCustomToast = () => {
  const toasts = useState<any[]>('global_toasts', () => []);

  const showToast = (config: { title: string; message: string; toastType: 'success' | 'error' | 'info' | 'warning'; duration?: number }) => {
    const id = Date.now();
    const duration = config.duration || 5000;

    toasts.value.push({ id, ...config });

    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id);
    }, duration);
  };

  return { showToast };
};
