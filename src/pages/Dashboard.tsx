// TODO: THIS IS THE DEFAULT DASHBOARD PAGE THAT THE USER WILL SEE AFTER AUTHENTICATION. ADD MAIN FUNCTIONALITY HERE.
// This is the entry point for users who have just signed in

import { AddTodo } from "@/components/todos/AddTodo";
import { TodoList } from "@/components/todos/TodoList";
import { TodoStats } from "@/components/todos/TodoStats";
import { UserButton } from "@/components/auth/UserButton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Protected } from "@/lib/protected-page";
import { motion } from "framer-motion";
import { CheckCircle, Filter } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filters = [
    { key: "all" as const, label: "All Tasks" },
    { key: "active" as const, label: "Active" },
    { key: "completed" as const, label: "Completed" },
  ];

  return (
    <Protected>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10"
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">TodoFlow</span>
            </motion.div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome back, {user?.name || user?.email}!
              </span>
              <UserButton />
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Your Tasks
              </h1>
              <p className="text-muted-foreground">
                Stay organized and productive with your personal todo list
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TodoStats />
            </motion.div>

            {/* Add Todo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AddTodo />
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-2 mb-6"
            >
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Filter:</span>
              {filters.map((filterOption) => (
                <Button
                  key={filterOption.key}
                  variant={filter === filterOption.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(filterOption.key)}
                  className="transition-all duration-200"
                >
                  {filterOption.label}
                </Button>
              ))}
            </motion.div>

            {/* Todo List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <TodoList filter={filter} />
            </motion.div>
          </div>
        </div>
      </div>
    </Protected>
  );
}