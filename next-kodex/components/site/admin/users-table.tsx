"use client";

import { useState } from "react";
import {
  Check,
  X,
  Trash2,
  Search,
  ShieldCheck,
  Clock,
  AlertTriangle,
  UserCheck,
  Filter,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  approveUser,
  rejectUser,
  suspendUser,
  deleteUser,
  updateUserRole,
} from "@/lib/actions/admin.action";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date | string;
  _count: {
    posts: number;
  };
}

interface UsersTableProps {
  users: UserItem[];
  currentUserId: string;
}

export function UsersTable({ users, currentUserId }: UsersTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const pendingCount = users.filter((u) => u.status === "PENDING").length;

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || u.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleApprove = async (userId: string) => {
    setLoadingId(userId);
    try {
      const res = await approveUser(userId);
      if (res.error) alert(res.error);
      router.refresh();
    } catch (e) {
      alert("Error approving user");
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (userId: string) => {
    if (!window.confirm("Are you sure you want to reject this registration application?")) return;
    setLoadingId(userId);
    try {
      const res = await rejectUser(userId);
      if (res.error) alert(res.error);
      router.refresh();
    } catch (e) {
      alert("Error rejecting user");
    } finally {
      setLoadingId(null);
    }
  };

  const handleSuspend = async (userId: string) => {
    if (!window.confirm("Suspend this user account? They will not be able to log in.")) return;
    setLoadingId(userId);
    try {
      const res = await suspendUser(userId);
      if (res.error) alert(res.error);
      router.refresh();
    } catch (e) {
      alert("Error suspending user");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm("Permanently delete this user and all their articles? This action cannot be undone.")) return;
    setLoadingId(userId);
    try {
      const res = await deleteUser(userId);
      if (res.error) alert(res.error);
      router.refresh();
    } catch (e) {
      alert("Error deleting user");
    } finally {
      setLoadingId(null);
    }
  };

  const handleRoleChange = async (userId: string, newRole: "ADMIN" | "AUTHOR") => {
    setLoadingId(userId);
    try {
      const res = await updateUserRole(userId, newRole);
      if (res.error) alert(res.error);
      router.refresh();
    } catch (e) {
      alert("Error updating role");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            User Verification &amp; Access
            {pendingCount > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-bold animate-pulse">
                {pendingCount} Pending
              </span>
            )}
          </h1>
          <p className="text-slate-500 mt-1">
            Super Admin Governance: Review applicant registrations, verify accounts, and manage permissions.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button
            type="button"
            onClick={() => setStatusFilter("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === "ALL"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Accounts ({users.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("PENDING")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              statusFilter === "PENDING"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
          >
            <Clock size={13} />
            Pending ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("APPROVED")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              statusFilter === "APPROVED"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            <UserCheck size={13} />
            Approved ({users.filter((u) => u.status === "APPROVED").length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("REJECTED")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === "REJECTED"
                ? "bg-red-600 text-white shadow-xs"
                : "bg-red-50 text-red-700 hover:bg-red-100"
            }`}
          >
            Rejected ({users.filter((u) => u.status === "REJECTED").length})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Verification Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Posts
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => {
                const isSelf = user.id === currentUserId;
                const isSuper = user.role === "SUPER_ADMIN";
                const isPending = user.status === "PENDING";
                const isApproved = user.status === "APPROVED";

                return (
                  <tr
                    key={user.id}
                    className={`hover:bg-slate-50/60 transition-colors ${
                      isPending ? "bg-amber-50/20" : ""
                    }`}
                  >
                    {/* User Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm text-white shrink-0 ${
                          isSuper ? "bg-amber-600" : "bg-slate-900"
                        }`}>
                          {user.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{user.name}</span>
                            {isSelf && (
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      {isSuper ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                          <ShieldCheck size={13} />
                          Super Admin
                        </span>
                      ) : (
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(
                              user.id,
                              e.target.value as "ADMIN" | "AUTHOR"
                            )
                          }
                          disabled={loadingId === user.id}
                          className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-2.5 py-1 outline-none font-bold focus:border-orange-500 cursor-pointer"
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="AUTHOR">AUTHOR</option>
                        </select>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <StatusBadge status={user.status} />
                    </td>

                    {/* Created Date */}
                    <td className="px-6 py-4 text-xs font-medium text-slate-500 whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Post Count */}
                    <td className="px-6 py-4 text-xs font-bold text-slate-700">
                      {user._count?.posts || 0}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {isPending && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleApprove(user.id)}
                              disabled={loadingId === user.id}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer disabled:opacity-50"
                              title="Approve applicant registration"
                            >
                              <Check size={13} />
                              <span>Approve</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReject(user.id)}
                              disabled={loadingId === user.id}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                              title="Reject registration"
                            >
                              <X size={13} />
                              <span>Reject</span>
                            </button>
                          </>
                        )}

                        {!isSuper && !isPending && isApproved && (
                          <button
                            type="button"
                            onClick={() => handleSuspend(user.id)}
                            disabled={loadingId === user.id}
                            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all cursor-pointer"
                            title="Suspend user account"
                          >
                            <AlertTriangle size={16} />
                          </button>
                        )}

                        {!isSuper && !isPending && !isApproved && (
                          <button
                            type="button"
                            onClick={() => handleApprove(user.id)}
                            disabled={loadingId === user.id}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                            title="Re-activate account"
                          >
                            <Check size={13} />
                            <span>Activate</span>
                          </button>
                        )}

                        {!isSelf && !isSuper && (
                          <button
                            type="button"
                            onClick={() => handleDelete(user.id)}
                            disabled={loadingId === user.id}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                            title="Delete user and posts"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 text-sm">
              {searchQuery || statusFilter !== "ALL"
                ? "No users match the current search or status filter."
                : "No registered users found."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "APPROVED":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Approved
        </span>
      );
    case "PENDING":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Pending Review
        </span>
      );
    case "REJECTED":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Rejected
        </span>
      );
    case "SUSPENDED":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          Suspended
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600">
          {status}
        </span>
      );
  }
}
