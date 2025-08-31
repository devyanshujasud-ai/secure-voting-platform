import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Info as InfoIcon, 
  BookOpen, 
  Shield, 
  Users, 
  Fingerprint,
  Globe,
  CheckCircle,
  AlertTriangle,
  HelpCircle
} from "lucide-react";

const Info = () => {
  const votingProcess = [
    {
      step: 1,
      title: "Register",
      description: "Create your digital voter profile with email and phone verification",
      icon: Users
    },
    {
      step: 2,
      title: "Upload Voter ID",
      description: "AI-powered OCR verifies your voter identification card",
      icon: Shield
    },
    {
      step: 3,
      title: "Face Verification",
      description: "Biometric authentication with liveness detection",
      icon: Fingerprint
    },
    {
      step: 4,
      title: "Vote Securely",
      description: "Cast your ballot with blockchain verification",
      icon: CheckCircle
    }
  ];

  const securityFeatures = [
    {
      title: "AI-Powered Verification",
      description: "Advanced facial recognition and liveness detection prevent impersonation",
      icon: Fingerprint
    },
    {
      title: "OCR Document Verification",
      description: "Automated voter ID validation using optical character recognition",
      icon: Shield
    },
    {
      title: "Blockchain Security",
      description: "Immutable vote recording with cryptographic proof",
      icon: Globe
    },
    {
      title: "Fraud Detection",
      description: "Real-time anomaly detection and duplicate vote prevention",
      icon: AlertTriangle
    }
  ];

  const faqs = [
    {
      question: "How secure is online voting?",
      answer: "Our platform uses military-grade encryption, blockchain technology, and AI-powered verification to ensure maximum security. Every vote is cryptographically secured and verifiable."
    },
    {
      question: "Can I change my vote after submission?",
      answer: "No, once your vote is submitted and recorded on the blockchain, it cannot be changed. This ensures the integrity of the electoral process."
    },
    {
      question: "How is my privacy protected?",
      answer: "Your identity is separated from your vote through cryptographic hashing. Only your anonymized voter hash is stored on the blockchain, ensuring complete privacy."
    },
    {
      question: "What if the system fails during voting?",
      answer: "Our system has multiple redundancies and backup systems. In case of technical issues, you can retry voting, and our support team is available to assist."
    },
    {
      question: "How can I verify my vote was counted?",
      answer: "After voting, you receive a blockchain transaction hash that serves as proof of your vote. You can verify this on the blockchain explorer."
    },
    {
      question: "What devices can I use to vote?",
      answer: "You can vote using any device with a camera and internet connection - smartphone, tablet, or computer with webcam."
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <InfoIcon className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-2">Voting Information Portal</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn about India's secure digital voting process, powered by AI and blockchain technology
            </p>
          </div>

          <Tabs defaultValue="process" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="process">Voting Process</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            {/* Voting Process */}
            <TabsContent value="process" className="space-y-8">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    How to Vote - Step by Step Guide
                  </CardTitle>
                  <CardDescription>
                    Complete your secure voting journey in 4 simple steps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {votingProcess.map((step, index) => (
                      <motion.div
                        key={step.step}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center"
                      >
                        <div className="relative mb-6">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <step.icon className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-warning rounded-full flex items-center justify-center text-warning-foreground font-bold text-sm">
                            {step.step}
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                        <p className="text-muted-foreground text-sm">{step.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Eligibility Requirements */}
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Eligibility Requirements</CardTitle>
                  <CardDescription>Who can vote using this platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <h4 className="font-medium">Age Requirement</h4>
                        <p className="text-muted-foreground">Must be 18 years or older on the date of election</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <h4 className="font-medium">Valid Voter ID</h4>
                        <p className="text-muted-foreground">Must possess a valid voter identification card issued by Election Commission</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <h4 className="font-medium">Registered Voter</h4>
                        <p className="text-muted-foreground">Must be registered in the electoral rolls of the respective constituency</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <h4 className="font-medium">Digital Requirements</h4>
                        <p className="text-muted-foreground">Device with camera, internet connection, and valid email/phone number</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="card-shadow h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <feature.icon className="w-5 h-5 text-primary" />
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Security Metrics */}
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Security Metrics & Compliance</CardTitle>
                  <CardDescription>Our platform meets the highest security standards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-muted/30 rounded-lg">
                      <h3 className="text-3xl font-bold text-primary mb-2">256-bit</h3>
                      <p className="text-muted-foreground">AES Encryption</p>
                    </div>
                    <div className="text-center p-6 bg-muted/30 rounded-lg">
                      <h3 className="text-3xl font-bold text-primary mb-2">99.9%</h3>
                      <p className="text-muted-foreground">Uptime Guarantee</p>
                    </div>
                    <div className="text-center p-6 bg-muted/30 rounded-lg">
                      <h3 className="text-3xl font-bold text-primary mb-2">ISO 27001</h3>
                      <p className="text-muted-foreground">Certified</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Technology */}
            <TabsContent value="technology" className="space-y-8">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Blockchain Technology</CardTitle>
                  <CardDescription>How we ensure transparent and tamper-proof voting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Our voting platform utilizes a custom blockchain network specifically designed for electoral processes. 
                    Each vote is recorded as a transaction on the blockchain, providing immutable proof of electoral integrity.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2">Immutable Records</h4>
                      <p className="text-sm text-muted-foreground">Once recorded, votes cannot be altered or deleted</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2">Real-time Verification</h4>
                      <p className="text-sm text-muted-foreground">Instant verification of vote authenticity</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2">Public Auditability</h4>
                      <p className="text-sm text-muted-foreground">Anyone can verify the election results</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>AI-Powered Verification</CardTitle>
                  <CardDescription>Advanced artificial intelligence for voter authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    We employ state-of-the-art AI algorithms for facial recognition, liveness detection, 
                    and document verification to ensure only eligible voters can participate.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Facial Recognition</h4>
                        <p className="text-sm text-muted-foreground">
                          Advanced neural networks compare facial features with voter ID photos
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Liveness Detection</h4>
                        <p className="text-sm text-muted-foreground">
                          Prevents spoofing attacks using photos or videos
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">OCR Verification</h4>
                        <p className="text-sm text-muted-foreground">
                          Optical character recognition validates voter ID documents
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* FAQ */}
            <TabsContent value="faq" className="space-y-6">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>
                    Find answers to common questions about digital voting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="border-b border-border pb-4 last:border-b-0"
                      >
                        <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-primary mb-2">Still have questions?</h3>
                    <p className="text-muted-foreground mb-4">
                      Our AI-powered chatbot is available 24/7 to help you with any voting-related queries
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium"
                      onClick={() => window.location.href = '/chatbot'}
                    >
                      <HelpCircle className="w-4 h-4" />
                      Chat with AI Assistant
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Info;