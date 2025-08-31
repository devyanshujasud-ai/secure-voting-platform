import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Vote, Shield, Users, ChartBar, MessageSquare, Info } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: "AI-Powered Security",
      description: "Advanced facial recognition and fraud detection",
    },
    {
      icon: Vote,
      title: "Blockchain Verified",
      description: "Tamper-proof voting with blockchain technology",
    },
    {
      icon: Users,
      title: "Digital Identity",
      description: "Secure voter ID verification using OCR",
    },
    {
      icon: ChartBar,
      title: "Real-time Results",
      description: "Live election results with transparency",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="trust-gradient">
          <div className="container mx-auto px-4 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <Shield className="w-24 h-24 mx-auto mb-6 text-primary" />
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-democratic-purple bg-clip-text text-transparent">
                Secure AI eVoting
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                India's most advanced digital voting platform powered by AI, blockchain technology, 
                and fraud detection for transparent, secure elections.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="saffron" size="lg" className="text-lg px-8">
                  <Link to="/register">Start Voting Process</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to="/info">Learn More</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Why Choose Secure AI eVoting?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Revolutionary technology ensuring election integrity and voter confidence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center card-shadow hover:shadow-lg smooth-transition h-full">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Quick Access</h2>
            <p className="text-xl text-muted-foreground">
              Access all voting platform features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="text-center card-shadow hover:shadow-lg smooth-transition">
                <CardHeader>
                  <Vote className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <CardTitle>Active Polls</CardTitle>
                  <CardDescription>View and participate in elections</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="heritage" className="w-full">
                    <Link to="/polls">View Polls</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center card-shadow hover:shadow-lg smooth-transition">
                <CardHeader>
                  <ChartBar className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <CardTitle>Election Results</CardTitle>
                  <CardDescription>View transparent, verified results</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="tricolor" className="w-full">
                    <Link to="/results">View Results</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center card-shadow hover:shadow-lg smooth-transition">
                <CardHeader>
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <CardTitle>AI Assistant</CardTitle>
                  <CardDescription>Get help with voting process</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="trust" className="w-full">
                    <Link to="/chatbot">Chat Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-6">
            <Shield className="w-8 h-8 mr-2" />
            <span className="text-xl font-bold">Secure AI eVoting</span>
          </div>
          <p className="text-secondary-foreground/80 mb-6">
            Empowering democracy through secure, transparent, and AI-powered voting technology
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/info" className="hover:text-primary smooth-transition">
              <Info className="w-4 h-4 inline mr-2" />
              Information Portal
            </Link>
            <Link to="/chatbot" className="hover:text-primary smooth-transition">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;