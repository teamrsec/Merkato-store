import api from './api';

export const sellerService = {
  async getSellers() {
    try {
      const res = await api.get('/sellers');
      return res.sellers || [];
    } catch (error) {
      console.warn('Failed to fetch sellers:', error.message);
      return [];
    }
  },

  async getSellerById(id) {
    try {
      const res = await api.get(`/sellers/${id}`);
      return res.seller || null;
    } catch (error) {
      console.warn(`Failed to fetch seller ${id}:`, error.message);
      return null;
    }
  },

  async updateSeller(id, sellerData) {
    const res = await api.put(`/sellers/${id}`, sellerData);
    return res.seller;
  }
};

export default sellerService;
