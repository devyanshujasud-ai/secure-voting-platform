import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Vote, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const Polls = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);

  const polls = [
    {
      id: "general-2024",
      title: "General Election 2024",
      description: "National parliamentary elections for India",
      type: "National",
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      status: "active",
      totalVoters: 900000000,
      votedCount: 450000000,
      constituency: "Mumbai North",
      candidates: [
        { id: "c1", name: "Rajesh Kumar", party: "Indian National Congress", symbol: "🖐️" },
        { id: "c2", name: "Priya Sharma", party: "Bharatiya Janata Party", symbol: "🪷" },
        { id: "c3", name: "Amit Patel", party: "Aam Aadmi Party", symbol: "🧹" },
        { id: "c4", name: "Sunita Singh", party: "Independent", symbol: "🗳️" }
      ]
    },
    {
      id: "municipal-2024",
      title: "Municipal Corporation Election",
      description: "Local municipal body elections for civic governance",
      type: "Municipal",
      startDate: "2024-02-01",
      endDate: "2024-02-05",
      status: "active",
      totalVoters: 2500000,
      votedCount: 800000,
      constituency: "Ward 15, Mumbai",
      candidates: [
        { id: "m1", name: "Vikram Joshi", party: "Shiv Sena", symbol: "🏹" },
        { id: "m2", name: "Meera Desai", party: "Indian National Congress", symbol: "🖐️" },
        { id: "m3", name: "Rohit Gupta", party: "Independent", symbol: "🌟" }
      ]
    },
    {
      id: "state-assembly",
      title: "State Assembly Election",
      description: "Maharashtra state legislative assembly elections",
      type: "State",
      startDate: "2024-03-10",
      endDate: "2024-03-15",
      status: "upcoming",
      totalVoters: 85000000,
      votedCount: 0,
      constituency: "Bandra East",
      candidates: [
        { id: "s1", name: "Kavita Reddy", party: "Nationalist Congress Party", symbol: "⏰" },
        { id: "s2", name: "Arjun Yadav", party: "Bharatiya Janata Party", symbol: "🪷" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "upcoming": return "secondary";
      case "completed": return "outline";
      default: return "secondary";
    }
  };

  const getVotingProgress = (voted: number, total: number) => {
    return ((voted / total) * 100).toFixed(1);
  };

  const handleVoteClick = (pollId: string) => {
    // Check if user is verified
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData.verificationComplete) {
      toast({
        title: "Verification Required",
        description: "Please complete face verification to vote.",
        variant: "destructive",
      });
      navigate("/face-verification");
      return;
    }

    setSelectedPoll(pollId);
    navigate(`/vote/${pollId}`);
  };

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
            <Vote className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-2">Active Elections</h1>
            <p className="text-xl text-muted-foreground">
              Participate in secure, transparent democratic elections
            </p>
          </div>

          {/* Elections Grid */}
          <div className="space-y-8">
            {polls.map((poll, index) => (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-shadow hover:shadow-lg smooth-transition">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-2xl">{poll.title}</CardTitle>
                          <Badge variant={getStatusColor(poll.status)}>
                            {poll.status.charAt(0).toUpperCase() + poll.status.slice(1)}
                          </Badge>
                        </div>
                        <CardDescription className="text-base">
                          {poll.description}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Election Type</p>
                        <Badge variant="outline">{poll.type}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Election Details */}
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Start Date</p>
                          <p className="font-medium">{new Date(poll.startDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">End Date</p>
                          <p className="font-medium">{new Date(poll.endDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Constituency</p>
                          <p className="font-medium">{poll.constituency}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Eligible Voters</p>
                          <p className="font-medium">{poll.totalVoters.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Voting Progress */}
                    {poll.status === "active" && (
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Voting Progress</span>
                          <span className="text-sm text-muted-foreground">
                            {getVotingProgress(poll.votedCount, poll.totalVoters)}%
                          </span>
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${getVotingProgress(poll.votedCount, poll.totalVoters)}%` 
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {poll.votedCount.toLocaleString()} out of {poll.totalVoters.toLocaleString()} voters
                        </p>
                      </div>
                    )}

                    {/* Candidates Preview */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Candidates ({poll.candidates.length})
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {poll.candidates.slice(0, 4).map((candidate) => (
                          <div 
                            key={candidate.id}
                            className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                          >
                            <span className="text-2xl">{candidate.symbol}</span>
                            <div>
                              <p className="font-medium">{candidate.name}</p>
                              <p className="text-sm text-muted-foreground">{candidate.party}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {poll.candidates.length > 4 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          +{poll.candidates.length - 4} more candidates
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                      {poll.status === "active" ? (
                        <Button 
                          onClick={() => handleVoteClick(poll.id)}
                          variant="vote" 
                          size="lg"
                          className="flex-1"
                        >
                          <Vote className="w-4 h-4 mr-2" />
                          Cast Your Vote
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : poll.status === "upcoming" ? (
                        <Button variant="secondary" size="lg" className="flex-1" disabled>
                          <Clock className="w-4 h-4 mr-2" />
                          Voting Opens {new Date(poll.startDate).toLocaleDateString()}
                        </Button>
                      ) : (
                        <Button variant="outline" size="lg" className="flex-1" disabled>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Voting Completed
                        </Button>
                      )}
                      
                      <Button variant="outline" size="lg" className="sm:w-auto">
                        View Details
                      </Button>
                    </div>

                    {/* Security Notice */}
                    {poll.status === "active" && (
                      <div className="bg-primary/5 rounded-lg p-4 flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h5 className="font-medium text-primary mb-1">Blockchain Secured</h5>
                          <p className="text-sm text-muted-foreground">
                            Your vote will be recorded on the blockchain with end-to-end encryption 
                            and real-time verification for maximum transparency and security.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <Card className="card-shadow bg-warning/5 border-warning/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-warning mt-1" />
                  <div>
                    <h3 className="font-semibold text-warning mb-2">Important Voting Guidelines</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Ensure you complete face verification before voting</li>
                      <li>• You can only vote once per election</li>
                      <li>• Your vote is anonymous but blockchain-verified</li>
                      <li>• Voting records are immutable and transparent</li>
                      <li>• Technical support is available through our AI chatbot</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Polls;