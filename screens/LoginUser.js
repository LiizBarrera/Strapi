export const loginUser = async (identifier, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al iniciar sesión');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error iniciando sesión:', error);
      throw error;
    }
  };
  