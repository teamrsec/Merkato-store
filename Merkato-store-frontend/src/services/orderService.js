import api from './api';

export const orderService = {
  async createOrder(orderData) {
    const res = await api.post('/orders', orderData);
    return res.order;
  },

  async getOrders() {
    try {
      const res = await api.get('/orders');
      return res.orders || [];
    } catch (error) {
      console.warn('Failed to fetch orders:', error.message);
      return [];
    }
  },

  async getOrderById(id) {
    const res = await api.get(`/orders/track/${encodeURIComponent(id)}`);
    return res.order || null;
  },

  async updateOrderStatus(id, status) {
    const res = await api.put(`/orders/${id}/status`, { status });
    return res.order;
  }
};

export default orderService;
