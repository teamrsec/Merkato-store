/**
 * Modular Ethiopian Delivery Architecture & Zone Management
 */

import { ethiopianLocations } from '../data/locations';

export class DeliveryService {
  constructor() {
    this.zones = ethiopianLocations;
  }

  getDeliveryFee(zoneId, orderWeightKg = 1) {
    const zone = this.zones.find((z) => z.id === zoneId) || this.zones[0];
    const baseFee = zone.deliveryFee;
    const weightSurcharge = orderWeightKg > 5 ? (orderWeightKg - 5) * 20 : 0;
    return baseFee + weightSurcharge;
  }

  getEstimatedDelivery(zoneId) {
    const zone = this.zones.find((z) => z.id === zoneId) || this.zones[0];
    return {
      timeEn: zone.estimatedTime,
      timeAm: zone.estimatedTimeAm,
      isSameDay: zone.isAddis
    };
  }

  dispatchOrder(orderId, zoneId) {
    const zone = this.zones.find((z) => z.id === zoneId) || this.zones[0];
    const courierNames = [
      { name: "Yared Tadesse", phone: "+251 912 884433", vehicle: "Motorcycle AA-3-4920" },
      { name: "Abebe Kassahun", phone: "+251 911 332211", vehicle: "Motorcycle AA-2-8819" },
      { name: "Daniel Girma", phone: "+251 920 776655", vehicle: "Van Delivery AA-4-1029" }
    ];

    const assigned = courierNames[Math.floor(Math.random() * courierNames.length)];
    return {
      orderId,
      dispatchedAt: new Date().toISOString(),
      courier: assigned,
      zone: zone.subCityEn,
      status: "DISPATCHED"
    };
  }
}

export const deliveryService = new DeliveryService();

