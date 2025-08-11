import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

export function AddTodo() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const createTodo = useMutation(api.todos.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim() === "") {
      toast.error("Please enter a task");
      return;
    }

    setIsLoading(true);
    try {
      await createTodo({ text: text.trim() });
      setText("");
      toast.success("Task added!");
    } catch (error) {
      toast.error("Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6"
    >
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 h-12 text-lg"
        disabled={isLoading}
      />
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="h-12 px-6"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add
        </Button>
      </motion.div>
    </motion.form>
  );
}
