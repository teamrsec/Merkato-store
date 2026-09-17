import api from './api';

export const categoryService = {
  async getCategories() {
    try {
      const res = await api.get('/categories');
      return res.categories || [];
    } catch (error) {
      console.warn('Failed to fetch categories:', error.message);
      return [];
    }
  },

  async getCategoryById(id) {
    try {
      const res = await api.get(`/categories/${id}`);
      return res.category || null;
    } catch (error) {
      console.warn(`Failed to fetch category ${id}:`, error.message);
      return null;
    }
  }
};

export default categoryService;
