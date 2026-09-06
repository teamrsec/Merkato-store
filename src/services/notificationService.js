/**
 * Central Notification Service
 * Supports: SMS, WhatsApp, Email, Push Notification, and In-App Feed
 */

export class NotificationService {
  constructor() {
    this.subscribers = [];
  }

  sendSms(phone, message) {
    console.log(`[SMS Gateway +251 EthioTelecom] To: ${phone} | Msg: ${message}`);
    return {
      channel: "SMS",
      recipient: phone,
      delivered: true,
      timestamp: new Date().toISOString()
    };
  }

  sendWhatsApp(phone, message) {
    console.log(`[WhatsApp Business] To: ${phone} | Msg: ${message}`);
    return {
      channel: "WhatsApp",
      recipient: phone,
      delivered: true,
      timestamp: new Date().toISOString()
    };
  }

  sendOrderNotification(type, order, user) {
    const phone = order.deliveryAddress?.phone || user?.phone || "+251 911 000000";
    let text = "";

    switch (type) {
      case "ORDER_PLACED":
        text = `Merkato Store: Your order #${order.id} for ETB ${order.total.toLocaleString()} has been placed! Track live in your app.`;
        break;
      case "PAYMENT_CONFIRMED":
        text = `Merkato Store: Telebirr payment verified for #${order.id}. Merchant is preparing your items.`;
        break;
      case "OUT_FOR_DELIVERY":
        text = `Merkato Store: Courier ${order.courier?.name || 'Dispatch'} is on the way to ${order.deliveryAddress?.subCity}. Phone: ${order.courier?.phone || '8899'}`;
        break;
      default:
        text = `Merkato Store update for order #${order.id}.`;
    }

    this.sendSms(phone, text);

    return {
      id: `notif-${Date.now()}`,
      title: type.replace(/_/g, " "),
      message: text,
      date: "Just now",
      read: false,
      type: "order"
    };
  }
}

export const notificationService = new NotificationService();

