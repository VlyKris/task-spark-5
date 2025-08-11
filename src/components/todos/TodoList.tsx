import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { TodoItem } from "./TodoItem";
import { Loader2 } from "lucide-react";

interface TodoListProps {
  filter: "all" | "active" | "completed";
}

export function TodoList({ filter }: TodoListProps) {
  const todos = useQuery(api.todos.list);

  if (todos === undefined) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 text-muted-foreground"
      >
        <div className="text-6xl mb-4">📝</div>
        <p className="text-lg">
          {filter === "completed"
            ? "No completed tasks yet"
            : filter === "active"
            ? "No active tasks"
            : "No tasks yet. Add one above!"}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </AnimatePresence>
    </div>
  );
}
