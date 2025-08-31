import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Mic, 
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI voting assistant. I can help you with questions about the voting process, eligibility, security, and troubleshooting. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "How do I register to vote?",
    "Is my vote secure and private?",
    "What if I face technical issues?",
    "How can I verify my vote?",
    "What are the voting requirements?",
    "How does blockchain voting work?"
  ];

  // Mock AI responses based on common voting questions
  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("register") || message.includes("registration")) {
      return "To register for voting:\n\n1. Visit the registration page\n2. Enter your email, phone, and voter ID number\n3. Upload your voter ID card for AI verification\n4. Complete face verification\n5. Pass fraud detection checks\n\nOnce verified, you'll receive confirmation and can participate in elections!";
    }
    
    if (message.includes("secure") || message.includes("privacy") || message.includes("safe")) {
      return "Your vote security is our top priority:\n\n• 256-bit encryption protects all data\n• Blockchain technology ensures tamper-proof records\n• AI facial recognition prevents impersonation\n• Your identity is separated from your vote\n• Only anonymized voter hashes are stored\n• Real-time fraud detection monitors for suspicious activity\n\nYour vote is completely private and secure!";
    }
    
    if (message.includes("technical") || message.includes("problem") || message.includes("issue") || message.includes("error")) {
      return "If you encounter technical issues:\n\n1. Refresh your browser and try again\n2. Ensure stable internet connection\n3. Clear browser cache if needed\n4. Check camera permissions for face verification\n5. Contact support if problems persist\n\nOur system has 99.9% uptime and backup systems to ensure reliable voting!";
    }
    
    if (message.includes("verify") || message.includes("receipt") || message.includes("proof")) {
      return "After voting, you receive:\n\n• Blockchain transaction hash as proof\n• Digital receipt with vote timestamp\n• Verification that your vote was counted\n• Access to blockchain explorer for public verification\n\nYou can always check that your vote was properly recorded while maintaining anonymity!";
    }
    
    if (message.includes("requirement") || message.includes("eligible") || message.includes("qualify")) {
      return "Voting requirements:\n\n• Must be 18 years or older\n• Valid voter ID card\n• Registered in electoral rolls\n• Device with camera and internet\n• Valid email and phone number\n• Complete identity verification process\n\nMeet these requirements? You're ready to vote securely online!";
    }
    
    if (message.includes("blockchain") || message.includes("technology") || message.includes("how")) {
      return "Our blockchain voting system:\n\n• Each vote becomes an encrypted transaction\n• Immutable records prevent tampering\n• Public verification without revealing identity\n• Real-time vote counting and results\n• Cryptographic proof of election integrity\n• Transparent and auditable by anyone\n\nThis ensures the most secure and transparent elections possible!";
    }
    
    if (message.includes("help") || message.includes("support") || message.includes("contact")) {
      return "I'm here to help! You can:\n\n• Ask me any voting-related questions\n• Get step-by-step guidance\n• Learn about security features\n• Troubleshoot technical issues\n• Understand the voting process\n\nFeel free to ask anything about digital voting - I'm available 24/7!";
    }
    
    // Default response for unrecognized questions
    return "I'd be happy to help you with that! I can assist with:\n\n• Voter registration process\n• Security and privacy questions\n• Technical troubleshooting\n• Vote verification\n• Eligibility requirements\n• Blockchain technology\n\nCould you please be more specific about what you'd like to know?";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputMessage.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(messageText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your AI voting assistant. I can help you with questions about the voting process, eligibility, security, and troubleshooting. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real app, implement speech-to-text here
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    // In a real app, implement text-to-speech here
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-2">AI Voting Assistant</h1>
            <p className="text-xl text-muted-foreground">
              Get instant help with voting questions and technical support
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Quick Questions Sidebar */}
            <div className="lg:col-span-1">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Questions</CardTitle>
                  <CardDescription>
                    Click any question to get instant answers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full text-left justify-start h-auto p-3 text-sm"
                      onClick={() => handleSendMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="card-shadow h-[600px] flex flex-col">
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">AI Assistant</CardTitle>
                      <Badge variant="default" className="text-xs">
                        Online • Available 24/7
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={toggleSpeaking}
                      className="p-2"
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={clearConversation}
                      className="p-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                {/* Messages Area */}
                <CardContent className="flex-1 overflow-y-auto space-y-4 max-h-96">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.text}
                        </p>
                        <p className={`text-xs mt-2 ${
                          message.sender === 'user' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>

                      {message.sender === 'user' && (
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-secondary-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Input Area */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleListening}
                      className={`p-2 ${isListening ? 'text-destructive' : ''}`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about voting..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    
                    <Button 
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim() || isTyping}
                      variant="saffron"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    AI Assistant is here to help • Press Enter to send • Available 24/7
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="card-shadow text-center">
              <CardContent className="p-6">
                <Bot className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Intelligent Responses</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered answers to all your voting questions with context-aware responses
                </p>
              </CardContent>
            </Card>

            <Card className="card-shadow text-center">
              <CardContent className="p-6">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">24/7 Availability</h3>
                <p className="text-sm text-muted-foreground">
                  Get help anytime during the voting process with instant responses
                </p>
              </CardContent>
            </Card>

            <Card className="card-shadow text-center">
              <CardContent className="p-6">
                <Volume2 className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Multi-modal Support</h3>
                <p className="text-sm text-muted-foreground">
                  Voice input and audio responses for accessibility and convenience
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Chatbot;