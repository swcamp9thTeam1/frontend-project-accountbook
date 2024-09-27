import { ref } from 'vue';

export const isLoggedIn = ref(false);

export const useAuth = () => {
  const login = () => {
    isLoggedIn.value = true;
  };

  const logout = () => {
    isLoggedIn.value = false;
    localStorage.clear();
  };

  return {
    isLoggedIn,
    login,
    logout
  };
};


