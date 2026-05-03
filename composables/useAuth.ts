export const useAuth = () => {
  const user = useState('user', () => null);
  const token = useCookie('auth_token');
  const { fetchApi } = useApiFactory();

  const login = async (credentials: any) => {
    const response: any = await fetchApi('/auth/login', {
      method: 'POST',
      body: credentials,
    });
    user.value = response.user;
    token.value = response.access_token;
    return response;
  };

  const register = async (userData: any) => {
    const response: any = await fetchApi('/auth/register', {
      method: 'POST',
      body: userData,
    });
    user.value = response.user;
    token.value = response.access_token;
    return response;
  };

  const firebaseLogin = async (idToken: string) => {
    const response: any = await fetchApi('/auth/firebase', {
      method: 'POST',
      body: { token: idToken },
    });
    user.value = response.user;
    token.value = response.access_token;
    return response;
  };

  const logout = () => {
    user.value = null;
    token.value = null;
  };

  const forgotPassword = async (email: string) => {
    return await fetchApi('/auth/forgot-password', {
      method: 'POST',
      body: { email },
    });
  };

  return {
    user,
    token,
    login,
    register,
    firebaseLogin,
    forgotPassword,
    logout,
    isAuthenticated: computed(() => !!user.value),
  };
};
