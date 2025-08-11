import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { CheckCircle, Circle, ListTodo } from "lucide-react";
import { useQuery } from "convex/react";

export function TodoStats() {
  const todos = useQuery(api.todos.list);

  if (!todos) return null;

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  const stats = [
    {
      label: "Total",
      value: totalTodos,
      icon: <ListTodo className="w-5 h-5" />,
      color: "text-primary",
    },
    {
      label: "Active",
      value: activeTodos,
      icon: <Circle className="w-5 h-5" />,
      color: "text-blue-500",
    },
    {
      label: "Completed",
      value: completedTodos,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-card border rounded-lg p-4 text-center"
        >
          <div className={`flex items-center justify-center mb-2 ${stat.color}`}>
            {stat.icon}
          </div>
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
