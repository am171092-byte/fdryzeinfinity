import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Users, UsersRound, Check, Search } from "lucide-react";

interface AssignUsersStepProps {
  onContinue: () => void;
  onBack: () => void;
  assignedCount: number;
  onAssignedCountChange: (count: number) => void;
}

const availableUsers = [
  { id: "u1", name: "Sarah Mitchell", email: "sarah@acme-corp.com", group: "Operations" },
  { id: "u2", name: "James Chen", email: "james@acme-corp.com", group: "Finance" },
  { id: "u3", name: "Maria Garcia", email: "maria@acme-corp.com", group: "Risk" },
  { id: "u4", name: "David Kim", email: "david@acme-corp.com", group: "Operations" },
  { id: "u5", name: "Lisa Wang", email: "lisa@acme-corp.com", group: "Support" },
];

const availableGroups = [
  { id: "g1", name: "Operations", members: 12 },
  { id: "g2", name: "Finance", members: 8 },
  { id: "g3", name: "Risk & Compliance", members: 6 },
  { id: "g4", name: "Support", members: 15 },
  { id: "g5", name: "HR", members: 4 },
];

const AssignUsersStep = ({ onContinue, onBack, assignedCount, onAssignedCountChange }: AssignUsersStepProps) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "groups">("groups");

  const toggleUser = (id: string) => {
    const next = selectedUsers.includes(id)
      ? selectedUsers.filter((u) => u !== id)
      : [...selectedUsers, id];
    setSelectedUsers(next);
    onAssignedCountChange(next.length + selectedGroups.length);
  };

  const toggleGroup = (id: string) => {
    const next = selectedGroups.includes(id)
      ? selectedGroups.filter((g) => g !== id)
      : [...selectedGroups, id];
    setSelectedGroups(next);
    onAssignedCountChange(selectedUsers.length + next.length);
  };

  const totalAssigned = selectedUsers.length + selectedGroups.length;

  return (
    <div className="w-full max-w-[960px]">
      <div className="card-float overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Left — Assignment */}
          <div className="lg:col-span-2 p-8 border-r border-border">
            <div className="mb-6">
              <h2 className="text-section-title mb-2">Assign Users & Groups</h2>
              <p className="text-muted-foreground text-sm">
                Select which users or groups can access this assistant.
              </p>
            </div>

            {/* Tab Toggle */}
            <div className="flex gap-1 p-1 bg-secondary rounded-xl mb-6 w-fit">
              <button
                onClick={() => setActiveTab("groups")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "groups" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                <UsersRound className="w-4 h-4" />
                Groups
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "users" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                <Users className="w-4 h-4" />
                Individual Users
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>

            {/* Groups */}
            {activeTab === "groups" && (
              <div className="space-y-2">
                {availableGroups.map((group) => (
                  <motion.button
                    key={group.id}
                    onClick={() => toggleGroup(group.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                      selectedGroups.includes(group.id)
                        ? "bg-primary-subtle border-primary"
                        : "bg-secondary border-transparent hover:border-border"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        selectedGroups.includes(group.id) ? "bg-primary/10" : "bg-card"
                      }`}>
                        <UsersRound className={`w-5 h-5 ${selectedGroups.includes(group.id) ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-foreground">{group.name}</h3>
                        <p className="text-xs text-muted-foreground">{group.members} members</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        selectedGroups.includes(group.id) ? "bg-primary text-primary-foreground" : "bg-border"
                      }`}>
                        {selectedGroups.includes(group.id) && <Check className="w-4 h-4" />}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Users */}
            {activeTab === "users" && (
              <div className="space-y-2">
                {availableUsers.map((user) => (
                  <motion.button
                    key={user.id}
                    onClick={() => toggleUser(user.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                      selectedUsers.includes(user.id)
                        ? "bg-primary-subtle border-primary"
                        : "bg-secondary border-transparent hover:border-border"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedUsers.includes(user.id) ? "bg-primary/10" : "bg-card"
                      }`}>
                        <span className={`text-sm font-medium ${selectedUsers.includes(user.id) ? "text-primary" : "text-muted-foreground"}`}>
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-foreground">{user.name}</h3>
                        <p className="text-xs text-muted-foreground">{user.email} • {user.group}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        selectedUsers.includes(user.id) ? "bg-primary text-primary-foreground" : "bg-border"
                      }`}>
                        {selectedUsers.includes(user.id) && <Check className="w-4 h-4" />}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Summary */}
          <div className="p-8 bg-gradient-to-br from-secondary/50 to-secondary">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
              Assignment Summary
            </h3>

            <div className="card-elevated p-5 mb-6">
              <div className="text-4xl font-bold text-foreground mb-1">{totalAssigned}</div>
              <div className="text-sm text-muted-foreground">
                assignment{totalAssigned !== 1 ? "s" : ""} selected
              </div>
            </div>

            {selectedGroups.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Groups</h4>
                <div className="space-y-1">
                  {selectedGroups.map((gid) => {
                    const group = availableGroups.find((g) => g.id === gid);
                    return (
                      <div key={gid} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-success" />
                        {group?.name} ({group?.members} members)
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedUsers.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Users</h4>
                <div className="space-y-1">
                  {selectedUsers.map((uid) => {
                    const user = availableUsers.find((u) => u.id === uid);
                    return (
                      <div key={uid} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-success" />
                        {user?.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <motion.button
                onClick={onContinue}
                disabled={totalAssigned === 0}
                whileHover={totalAssigned > 0 ? { scale: 1.02 } : {}}
                whileTap={totalAssigned > 0 ? { scale: 0.98 } : {}}
                className={`w-full h-11 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                  totalAssigned > 0
                    ? "bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Continue to Publish
                <ChevronRight className="w-4 h-4" />
              </motion.button>
              <button
                onClick={onBack}
                className="w-full h-11 rounded-xl font-medium text-sm bg-card text-foreground hover:bg-muted transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignUsersStep;
