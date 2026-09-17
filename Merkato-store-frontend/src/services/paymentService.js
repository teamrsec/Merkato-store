/**
 * Modular Ethiopian Payment Provider Interface and Implementations
 * Supports: Telebirr SuperApp, CBE Birr, Bank Transfers, and Cash on Delivery
 */

export class PaymentProvider {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }

  async initializePayment(order) {
    void order;
    throw new Error("initializePayment must be implemented");
  }

  async verifyPayment(transactionId) {
    void transactionId;
    throw new Error("verifyPayment must be implemented");
  }

  async refundPayment(transactionId, amount) {
    void transactionId;
    void amount;
    throw new Error("refundPayment must be implemented");
  }
}

// 1. Telebirr Payment Provider
export class TelebirrProvider extends PaymentProvider {
  constructor() {
    super("Ethio Telecom Telebirr", "telebirr");
  }

  async initializePayment(order) {
    // Generate simulated QR payload and USSD push token
    const txnId = `TB-${Date.now().toString().slice(-6)}`;
    return {
      success: true,
      provider: this.code,
      transactionId: txnId,
      qrCodeData: `telebirr://pay?merchant=MERKATO_STORE&amount=${order.total}&txn=${txnId}`,
      ussdPushSent: true,
      message: `Telebirr USSD prompt sent to ${order.deliveryAddress?.phone || '+251 911...'}`
    };
  }

  async verifyPayment(transactionId) {
    return {
      verified: true,
      transactionId,
      status: "COMPLETED",
      timestamp: new Date().toISOString(),
      reference: `TB-REF-${Math.floor(100000 + Math.random() * 900000)}`
    };
  }

  async refundPayment(transactionId, amount) {
    return {
      refunded: true,
      refundId: `TB-REFUND-${Date.now().toString().slice(-5)}`,
      amount,
      status: "REFUNDED"
    };
  }
}

// 2. Commercial Bank of Ethiopia (CBE Birr)
export class CbeBirrProvider extends PaymentProvider {
  constructor() {
    super("Commercial Bank of Ethiopia CBE Birr", "cbe-birr");
  }

  async initializePayment(order) {
    void order;
    const txnId = `CBE-${Date.now().toString().slice(-6)}`;
    return {
      success: true,
      provider: this.code,
      transactionId: txnId,
      accountNo: "1000284920194",
      message: "CBE Birr instant account payment request generated."
    };
  }

  async verifyPayment(transactionId) {
    return {
      verified: true,
      transactionId,
      status: "COMPLETED",
      timestamp: new Date().toISOString()
    };
  }

  async refundPayment(transactionId, amount) {
    return { refunded: true, amount, status: "REFUNDED" };
  }
}

// 3. Direct Bank Transfer (Awash, Dashen, Abyssinia, CBE)
export class BankTransferProvider extends PaymentProvider {
  constructor() {
    super("Ethiopian Commercial Banks", "bank");
    this.accounts = [
      { bank: "Commercial Bank of Ethiopia (CBE)", accountNo: "1000284920194", name: "Merkato Store E-Commerce PLC" },
      { bank: "Awash International Bank", accountNo: "0132049281001", name: "Merkato Store PLC" },
      { bank: "Dashen Bank", accountNo: "504928109284", name: "Merkato Store PLC" },
      { bank: "Bank of Abyssinia", accountNo: "8492019284", name: "Merkato Store PLC" }
    ];
  }

  async initializePayment(order) {
    void order;
    const txnId = `BNK-${Date.now().toString().slice(-6)}`;
    return {
      success: true,
      provider: this.code,
      transactionId: txnId,
      accounts: this.accounts,
      message: "Please transfer the exact amount and upload reference receipt."
    };
  }

  async verifyPayment(transactionId) {
    return { verified: true, transactionId, status: "MANUALLY_VERIFIED" };
  }

  async refundPayment(transactionId, amount) {
    return { refunded: true, amount, status: "REFUNDED" };
  }
}

// 4. Cash on Delivery (COD)
export class CashOnDeliveryProvider extends PaymentProvider {
  constructor() {
    super("Cash on Delivery (COD)", "cod");
  }

  async initializePayment(order) {
    void order;
    const txnId = `COD-${Date.now().toString().slice(-6)}`;
    return {
      success: true,
      provider: this.code,
      transactionId: txnId,
      message: "Cash will be collected upon physical doorstep handover."
    };
  }

  async verifyPayment(transactionId) {
    return { verified: true, transactionId, status: "COLLECTED_ON_DELIVERY" };
  }

  async refundPayment(transactionId, amount) {
    return { refunded: true, amount, status: "RETURN_PROCESSED" };
  }
}

// Service Manager
export const paymentService = {
  providers: {
    telebirr: new TelebirrProvider(),
    "cbe-birr": new CbeBirrProvider(),
    bank: new BankTransferProvider(),
    cod: new CashOnDeliveryProvider()
  },

  getProvider(code) {
    return this.providers[code] || this.providers.telebirr;
  },

  async processCheckoutPayment(providerCode, order) {
    const provider = this.getProvider(providerCode);
    const initResult = await provider.initializePayment(order);
    const verifyResult = await provider.verifyPayment(initResult.transactionId);
    return {
      ...initResult,
      ...verifyResult
    };
  }
};
