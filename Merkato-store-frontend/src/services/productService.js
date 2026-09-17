import api from './api';

export const productService = {
  async getProducts(params = {}) {
    try {
      const res = await api.get('/products', params);
      return res.products || [];
    } catch (error) {
      console.warn('Falling back to empty/cached products on error:', error.message);
      return [];
    }
  },

  async getFlashDeals() {
    try {
      const res = await api.get('/products/flash-deals');
      return res.products || [];
    } catch (error) {
      console.warn('Failed to fetch flash deals:', error.message);
      return [];
    }
  },

  async getTrending() {
    try {
      const res = await api.get('/products/trending');
      return res.products || [];
    } catch (error) {
      console.warn('Failed to fetch trending products:', error.message);
      return [];
    }
  },

  async getProductByIdOrSlug(idOrSlug) {
    try {
      const res = await api.get(`/products/${idOrSlug}`);
      return res.product || null;
    } catch (error) {
      console.warn(`Failed to fetch product ${idOrSlug}:`, error.message);
      return null;
    }
  },

  async createProduct(productData) {
    const res = await api.post('/products', productData);
    return res.product;
  },

  async updateProduct(id, productData) {
    const res = await api.put(`/products/${id}`, productData);
    return res.product;
  },

  async deleteProduct(id) {
    return await api.delete(`/products/${id}`);
  },

  async addReview(productId, reviewData) {
    const res = await api.post(`/products/${productId}/reviews`, reviewData);
    return res.product;
  }
};

export default productService;
