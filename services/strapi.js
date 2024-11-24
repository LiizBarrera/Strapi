
const BASE_URL = 'http://192.168.100.35:1338/api'; // Sustituye por tu IP local



export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/local/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al registrar usuario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error registrando usuario:', error);
    throw error;
  }
};

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

export const fetchFlwer = async (jwt) => {
  try {
    const response = await fetch(`${BASE_URL}/flors`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las flores');
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo flores:', error);
    throw error;
  }
};
