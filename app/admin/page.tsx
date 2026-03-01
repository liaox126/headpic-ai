"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface User {
  email: string;
  plan: string | null;
  credits: { remaining: number; total: number; maxStyles: number };
  stripeCustomerId: string | null;
  createdAt: string;
  lastLogin: string;
}

interface Subscriber {
  email: string;
  subscribedAt: string;
}

interface Payment {
  amount: number;
  email: string | null;
  date: string;
  plan: string | null;
}

interface AdminData {
  users: User[];
  subscribers: Subscriber[];
  stripe: {
    totalRevenue: number;
    paymentCount: number;
    recentPayments: Payment[];
  };
  metrics: {
    totalUsers: number;
    paidUsers: number;
    freeUsers: number;
    totalCreditsUsed: number;
  };
}

type SortField = "createdAt" | "lastLogin" | "email" | "plan";
type SortDir = "asc" | "desc";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCurrency(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function AdminPage() {
  const searchParams = useSearchParams();
  const secret = searchParams.get("secret");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [tab, setTab] = useState<"users" | "subscribers" | "revenue">("users");

  useEffect(() => {
    if (!secret) {
      setError("Missing secret parameter");
      setLoading(false);
      return;
    }
    fetch(`/api/admin/stats?secret=${encodeURIComponent(secret)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [secret]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-red-400 text-lg">{error || "Failed to load"}</div>
      </div>
    );
  }

  const sortedUsers = [...data.users].sort((a, b) => {
    let cmp = 0;
    if (sortField === "email") cmp = a.email.localeCompare(b.email);
    else if (sortField === "plan")
      cmp = (a.plan || "free").localeCompare(b.plan || "free");
    else cmp = new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime();
    return sortDir === "asc" ? cmp : -cmp;
  });

  const sortedSubscribers = [...data.subscribers].sort(
    (a, b) =>
      new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()
  );

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => {
        if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
        else {
          setSortField(field);
          setSortDir("desc");
        }
      }}
      className="flex items-center gap-1 hover:text-white transition-colors"
    >
      {label}
      {sortField === field && (
        <span className="text-blue-400">{sortDir === "asc" ? "↑" : "↓"}</span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-8">Admin Dashboard</h1>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Total Users" value={data.metrics.totalUsers} />
          <MetricCard label="Paid Users" value={data.metrics.paidUsers} />
          <MetricCard label="Free Users" value={data.metrics.freeUsers} />
          <MetricCard
            label="Credits Used"
            value={data.metrics.totalCreditsUsed}
          />
        </div>

        {/* Revenue Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
            <div className="text-sm text-gray-400 mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-emerald-400">
              {formatCurrency(data.stripe.totalRevenue)}
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
            <div className="text-sm text-gray-400 mb-1">Total Payments</div>
            <div className="text-3xl font-bold text-white">
              {data.stripe.paymentCount}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-900 rounded-lg p-1 w-fit">
          {(["users", "subscribers", "revenue"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {t === "users"
                ? `Users (${data.users.length})`
                : t === "subscribers"
                ? `Subscribers (${data.subscribers.length})`
                : `Transactions (${data.stripe.recentPayments.length})`}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {tab === "users" && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-left">
                    <th className="px-4 py-3">
                      <SortButton field="email" label="Email" />
                    </th>
                    <th className="px-4 py-3">
                      <SortButton field="plan" label="Plan" />
                    </th>
                    <th className="px-4 py-3">Credits</th>
                    <th className="px-4 py-3">
                      <SortButton field="createdAt" label="Registered" />
                    </th>
                    <th className="px-4 py-3">
                      <SortButton field="lastLogin" label="Last Login" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user) => (
                    <tr
                      key={user.email}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs">
                        {user.email}
                      </td>
                      <td className="px-4 py-3">
                        <PlanBadge plan={user.plan} />
                      </td>
                      <td className="px-4 py-3 tabular-nums">
                        {user.credits.remaining}/{user.credits.total}
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {formatDate(user.lastLogin)}
                      </td>
                    </tr>
                  ))}
                  {sortedUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Subscribers Tab */}
        {tab === "subscribers" && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-left">
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Subscribed At</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedSubscribers.map((sub) => (
                    <tr
                      key={sub.email}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs">
                        {sub.email}
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {formatDate(sub.subscribedAt)}
                      </td>
                    </tr>
                  ))}
                  {sortedSubscribers.length === 0 && (
                    <tr>
                      <td
                        colSpan={2}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No subscribers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Revenue Tab */}
        {tab === "revenue" && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-left">
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.stripe.recentPayments.map((p, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {formatDate(p.date)}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">
                        {p.email || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <PlanBadge plan={p.plan} />
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-emerald-400">
                        {formatCurrency(p.amount)}
                      </td>
                    </tr>
                  ))}
                  {data.stripe.recentPayments.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function PlanBadge({ plan }: { plan: string | null }) {
  const colors: Record<string, string> = {
    starter: "bg-blue-900/50 text-blue-300 border-blue-800",
    pro: "bg-purple-900/50 text-purple-300 border-purple-800",
    ultimate: "bg-amber-900/50 text-amber-300 border-amber-800",
  };
  const style = plan ? colors[plan] || "bg-gray-800 text-gray-300 border-gray-700" : "bg-gray-800 text-gray-500 border-gray-700";
  return (
    <span className={`px-2 py-0.5 rounded text-xs border ${style}`}>
      {plan || "free"}
    </span>
  );
}
