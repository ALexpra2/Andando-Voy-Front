
// hooks/useLogout.js
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const useLogout = () => {
  const logout = async () => {
    try {
      await signOut(auth);
      console.log('✅ Usuario desconectado');
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
    }
  };

  return logout;
};

export default useLogout;
