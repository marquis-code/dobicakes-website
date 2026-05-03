export default defineNuxtPlugin(async (nuxtApp) => {
  const { user, token } = useAuth();
  const { fetchApi } = useApiFactory();

  // If token exists but user doesn't, fetch user profile
  // This handles the "logged out on refresh" issue
  if (token.value && !user.value) {
    try {
      const profile: any = await fetchApi('/auth/profile');
      user.value = profile;
    } catch (err: any) {
      console.error('Failed to restore session:', err.data || err.message);
      // If profile fetch fails (e.g. token expired), clear state
      token.value = null;
      user.value = null;
    }
  }
});
