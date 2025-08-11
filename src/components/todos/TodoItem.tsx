import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { Check, Edit2, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

interface TodoItemProps {
  todo: Doc<"todos">;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  
  const toggleTodo = useMutation(api.todos.toggle);
  const updateTodo = useMutation(api.todos.update);
  const deleteTodo = useMutation(api.todos.remove);

  const handleToggle = async () => {
    try {
      await toggleTodo({ id: todo._id });
      toast.success(todo.completed ? "Task marked as incomplete" : "Task completed!");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleUpdate = async () => {
    if (editText.trim() === "") {
      toast.error("Task cannot be empty");
      return;
    }
    
    try {
      await updateTodo({ id: todo._id, text: editText.trim() });
      setIsEditing(false);
      toast.success("Task updated!");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo({ id: todo._id });
      toast.success("Task deleted!");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpdate();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="group flex items-center gap-3 p-4 bg-card border rounded-lg hover:shadow-md transition-all duration-200"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          todo.completed
            ? "bg-primary border-primary text-primary-foreground"
            : "border-muted-foreground hover:border-primary"
        }`}
      >
        {todo.completed && <Check className="w-3 h-3" />}
      </motion.button>

      <div className="flex-1">
        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleUpdate}
            className="border-none p-0 h-auto focus-visible:ring-0"
            autoFocus
          />
        ) : (
          <span
            className={`cursor-pointer transition-all duration-200 ${
              todo.completed
                ? "line-through text-muted-foreground"
                : "text-foreground"
            }`}
            onClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleUpdate}
              className="h-8 w-8 p-0"
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsEditing(false);
                setEditText(todo.text);
              }}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
}
