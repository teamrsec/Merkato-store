import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShieldCheck,
  TrendingUp,
  Store,
  CheckCircle2,
  DollarSign,
  Truck
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    orders,
    setOrders,
    sellers,
    locations,
    t,
    formatPrice,
    addToast
  } = useStore();

  const [activeAdminTab, setActiveAdminTab] = useState('overview'); // 'overview', 'orders', 'users', 'sellers', 'payments', 'delivery', 'marketing', 'support'

  // Mock Users
  const [usersList, setUsersList] = useState([
    { id: 'usr-1', name: 'Amanuel Kebede', phone: '+251 911 458920', email: 'amanuel@example.com', role: 'CUSTOMER', status: 'ACTIVE', ordersCount: 4 },
    { id: 'usr-2', name: 'Selamawit Craft Store', phone: '+251 912 884433', email: 'selamawit@merkatostore.et', role: 'SELLER', status: 'ACTIVE', ordersCount: 128 },
    { id: 'usr-3', name: 'Bole Tech Importers', phone: '+251 920 112233', email: 'boletech@merkatostore.et', role: 'SELLER', status: 'ACTIVE', ordersCount: 210 },
    { id: 'usr-4', name: 'Kassahun Tilahun', phone: '+251 933 778899', email: 'kassahun@example.com', role: 'CUSTOMER', status: 'ACTIVE', ordersCount: 1 },
    { id: 'usr-5', name: 'Yared Dispatcher', phone: '+251 912 884433', email: 'yared@merkatostore.et', role: 'DELIVERY_AGENT', status: 'ACTIVE', ordersCount: 65 }
  ]);

  // Mock Support Tickets
  const [supportTickets] = useState([
    { id: 'TCK-102', customer: 'Dawit Bekele', subject: 'Telebirr payment confirmation query', status: 'RESOLVED', agent: 'Bethel M.', priority: 'Medium' },
    { id: 'TCK-103', customer: 'Selamawit Girma', subject: 'Same-day delivery to Bole Japan time window', status: 'OPEN', agent: 'Unassigned', priority: 'High' },
    { id: 'TCK-104', customer: 'Abel Teshome', subject: 'Regional delivery packaging question', status: 'IN_PROGRESS', agent: 'Amanuel K.', priority: 'Normal' }
  ]);

  // Update order status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: newStatus,
              timeline: [
                ...o.timeline,
                { status: newStatus, label: newStatus.replace(/_/g, ' '), time: 'Just now', completed: true }
              ]
            }
          : o
      )
    );
    addToast(`Order #${orderId} status updated to ${newStatus.replace(/_/g, ' ')}`, 'success');
  };

  // Toggle user status
  const handleToggleUserStatus = (userId) => {
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' }
          : u
      )
    );
    addToast('User status updated successfully', 'info');
  };

  // Process refund
  const handleRefund = (orderId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: 'refunded', paymentStatus: 'Refunded via Telebirr (TXN: REF-8392)' }
          : o
      )
    );
    addToast(`Refund initiated for Order #${orderId} via Telebirr gateway`, 'success');
  };

  return (
    <div className="bg-[#F8FAFC] py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('adminPortal')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Merkato Store Central Operations Control
            </h1>
            <p className="text-xs text-slate-400">
              Full marketplace operations: Users, KYC Verification, Order fulfillment, Telebirr Gateway Switch & Analytics.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Ethio Telecom Telebirr & CBE Gateway: Online (100% Uptime)</span>
          </div>
        </div>

        {/* Top 4 Business Analytics KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">{t('totalGMV')}</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-2xl font-black text-slate-900">ETB 14,840,200</span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-1">+24.5% vs last month</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Total Orders</span>
              <Truck className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-2xl font-black text-slate-900">{orders.length + 1240} Placed</span>
            <span className="text-[10px] text-slate-400 block mt-1">98.2% on-time delivery in Addis</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Registered Sellers</span>
              <Store className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="text-2xl font-black text-slate-900">{sellers.length + 120} Merchants</span>
            <span className="text-[10px] text-indigo-600 font-bold block mt-1">100% Verified in Merkato & Bole</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Conversion Rate</span>
              <TrendingUp className="w-4 h-4 text-rose-600" />
            </div>
            <span className="text-2xl font-black text-slate-900">4.82%</span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-1">Avg Order Value: ETB 3,450</span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex flex-wrap border-b border-slate-200 gap-4 sm:gap-6 bg-white p-2 rounded-2xl border">
          {[
            { id: 'overview', label: `Orders Manager (${orders.length})` },
            { id: 'users', label: `Users & Roles (${usersList.length})` },
            { id: 'sellers', label: `Seller KYC Approvals (${sellers.length})` },
            { id: 'payments', label: 'Payment Gateway Logs' },
            { id: 'delivery', label: `Delivery Zones (${locations.length})` },
            { id: 'support', label: `Support Tickets (${supportTickets.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id)}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeAdminTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. ORDERS MANAGER TAB */}
        {activeAdminTab === 'overview' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-black text-base text-slate-900">Live Orders Lifecycle Manager</h3>
              <span className="text-xs text-slate-500">Auto-synced with Telebirr & Couriers</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Destination</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Payment</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50">
                      <td className="py-3 font-mono font-bold text-slate-900">{o.id}</td>
                      <td className="py-3 font-medium text-slate-800">
                        {o.deliveryAddress?.fullName || 'Customer'}
                        <span className="block text-[10px] text-slate-400">{o.deliveryAddress?.phone}</span>
                      </td>
                      <td className="py-3 text-slate-600">{o.deliveryAddress?.subCity || 'Bole'}</td>
                      <td className="py-3 font-extrabold text-emerald-800">{formatPrice(o.total)}</td>
                      <td className="py-3 uppercase font-bold text-[10px] text-slate-700">{o.paymentMethod}</td>
                      <td className="py-3">
                        <select
                          value={o.status}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                          className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800"
                        >
                          <option value="order_placed">Order Placed</option>
                          <option value="payment_confirmed">Payment Confirmed</option>
                          <option value="preparing">Preparing in Merkato</option>
                          <option value="shipped">Dispatched to Courier</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>
                      <td className="py-3 text-right space-x-2">
                        {o.status !== 'refunded' && (
                          <button
                            onClick={() => handleRefund(o.id)}
                            className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-[10px] font-bold cursor-pointer"
                          >
                            Refund
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. USERS & ROLES TAB */}
        {activeAdminTab === 'users' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-black text-base text-slate-900">User Accounts & Role Permissions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Phone & Email</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Orders/Sales</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="py-3 font-bold text-slate-900">{u.name}</td>
                      <td className="py-3 text-slate-600 font-mono">{u.phone}</td>
                      <td className="py-3 font-bold">
                        <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10px]">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-slate-700">{u.ordersCount} actions</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleToggleUserStatus(u.id)}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. SELLER KYC APPROVALS TAB */}
        {activeAdminTab === 'sellers' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-black text-base text-slate-900">Verified Ethiopian Merchants & KYC Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sellers.map((s) => (
                <div key={s.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <img src={s.logo} alt={s.name} className="w-14 h-14 rounded-2xl object-cover border bg-white" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-slate-900 truncate">{s.name}</h4>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{s.location}</p>
                    <p className="text-xs text-slate-600 mt-1">{s.description}</p>
                    <div className="flex items-center gap-4 mt-3 pt-2 border-t text-xs font-bold">
                      <span className="text-amber-600">⭐ {s.rating}</span>
                      <span className="text-slate-700">{s.salesCount} Verified Orders</span>
                      <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                        KYC Approved
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PAYMENT GATEWAY LOGS TAB */}
        {activeAdminTab === 'payments' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-black text-base text-slate-900">Ethiopian Payment Switch Transaction Log</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-slate-900">TXN: TB-938210 (Telebirr SuperApp)</span>
                  <p className="text-slate-500">Order #ETH-84920 | Payer: +251 911 458920</p>
                </div>
                <span className="font-extrabold text-sm text-emerald-800">ETB 2,850 (SUCCESS)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-slate-900">TXN: CBE-102941 (CBE Birr Instant)</span>
                  <p className="text-slate-500">Order #ETH-51029 | Payer: +251 920 112233</p>
                </div>
                <span className="font-extrabold text-sm text-slate-900">ETB 18,500 (SUCCESS)</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. DELIVERY ZONES */}
        {activeAdminTab === 'delivery' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-black text-base text-slate-900">Ethiopian Delivery Zones & Dispatch Fees</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {locations.map((loc) => (
                <div key={loc.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-slate-900">{loc.subCityEn}</span>
                    <span className="font-extrabold text-xs text-emerald-800 font-mono">{loc.deliveryFee} ETB</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{loc.estimatedTime}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. SUPPORT TICKETS */}
        {activeAdminTab === 'support' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-black text-base text-slate-900">Customer Support Ticket Queue</h3>
            <div className="space-y-3">
              {supportTickets.map((tck) => (
                <div key={tck.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{tck.id}</span>
                      <span className="font-bold text-slate-800">{tck.subject}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Customer: {tck.customer} | Assigned Agent: {tck.agent}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {tck.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
