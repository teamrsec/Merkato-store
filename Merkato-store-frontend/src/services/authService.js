import api from './api';

export const authService = {
  async register(userData) {
    const res = await api.post('/auth/register', userData);
    if (res.token) {
      localStorage.setItem('merkato_token', res.token);
    }
    return res.user;
  },

  async login(identifier, password) {
    const res = await api.post('/auth/login', { identifier, password });
    if (res.token) {
      localStorage.setItem('merkato_token', res.token);
    }
    return res.user;
  },

  async getMe() {
    const res = await api.get('/auth/me');
    return res.user;
  },

  async updateProfile(profileData) {
    const res = await api.put('/auth/profile', profileData);
    return res.user;
  },

  async getAllUsers() {
    const res = await api.get('/auth/users');
    return res.users || [];
  },

  logout() {
    localStorage.removeItem('merkato_token');
  }
};

export default authService;
