import { ref } from 'vue';

export const isLoggedIn = ref(false);

export const useAuth = () => {
  const login = () => {
    isLoggedIn.value = true;
  };

  const logout = () => {
    isLoggedIn.value = false;
  };

  return {
    isLoggedIn,
    login,
    logout
  };
};


