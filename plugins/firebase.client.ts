import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
  };

  let auth = null;

  if (firebaseConfig.apiKey) {
    try {
      const app = initializeApp(firebaseConfig);
      auth = getAuth(app);
    } catch (e) {
      console.error('Firebase initialization failed:', e);
    }
  } else {
    console.warn('Firebase API Key missing. Social auth will be disabled.');
  }

  return {
    provide: {
      firebaseAuth: auth
    }
  };
});
