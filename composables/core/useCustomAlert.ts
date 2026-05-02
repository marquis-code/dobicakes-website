export const useCustomAlert = () => {
  const isOpen = useState('custom_alert_open', () => false);
  const alertConfig = useState<any>('custom_alert_config', () => ({}));

  const showAlert = (config: { 
    title: string; 
    message: string; 
    type?: 'success' | 'error' | 'warning' | 'info';
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
    confirmCallback?: () => void;
    cancelCallback?: () => void;
  }) => {
    alertConfig.value = {
      type: 'info',
      ...config
    };
    isOpen.value = true;
  };

  const closeAlert = () => {
    isOpen.value = false;
  };

  return { showAlert, closeAlert };
};
