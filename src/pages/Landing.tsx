import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Plus, Sparkles, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-6 flex items-center justify-between"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">TodoFlow</span>
        </motion.div>
        
        <AuthButton 
          trigger={
            <Button size="lg" className="shadow-lg">
              Get Started Free
            </Button>
          }
        />
      </motion.nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Simple. Fast. Beautiful.
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Organize Your Life
              <br />
              <span className="text-primary">One Task at a Time</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The most intuitive todo app that helps you stay focused, organized, and productive. 
              Simple enough for daily use, powerful enough for complex projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <AuthButton 
              trigger={
                <Button size="lg" className="text-lg px-8 py-6 shadow-xl">
                  <Plus className="w-5 h-5 mr-2" />
                  Start Organizing Now
                </Button>
              }
            />
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Zap className="w-5 h-5 mr-2" />
              See How It Works
            </Button>
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-card border rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-4 text-sm text-muted-foreground">TodoFlow</div>
              </div>
              
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="line-through text-muted-foreground">Review quarterly goals</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="flex items-center gap-3 p-3 bg-background rounded-lg border"
                >
                  <div className="w-5 h-5 border-2 border-muted-foreground rounded-full"></div>
                  <span>Prepare presentation for Monday</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex items-center gap-3 p-3 bg-background rounded-lg border"
                >
                  <div className="w-5 h-5 border-2 border-muted-foreground rounded-full"></div>
                  <span>Call dentist for appointment</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features wrapped in a beautiful, intuitive interface
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Plus className="w-8 h-8" />,
                title: "Quick Add",
                description: "Add tasks instantly with our lightning-fast input system"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Smart Organization",
                description: "Automatically organize and prioritize your tasks"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Real-time Sync",
                description: "Access your todos anywhere, anytime, on any device"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to get organized?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users who have transformed their productivity with TodoFlow
          </p>
          <AuthButton 
            trigger={
              <Button size="lg" className="text-lg px-8 py-6 shadow-xl">
                <Plus className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
            }
          />
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="border-t bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-primary-foreground" />
            </div>
            <span>TodoFlow - Organize your life, one task at a time</span>
          </div>
        </div>
      </footer>
    </div>
  );
}