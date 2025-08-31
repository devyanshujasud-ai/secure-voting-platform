import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Vote as VoteIcon, 
  Shield, 
  CheckCircle, 
  Clock, 
  User,
  ArrowLeft,
  Lock,
  Fingerprint
} from "lucide-react";

const Vote = () => {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [blockchainTxHash, setBlockchainTxHash] = useState<string | null>(null);

  // Mock poll data - in real app, fetch from API
  const pollData = {
    "general-2024": {
      title: "General Election 2024",
      constituency: "Mumbai North",
      endTime: "2024-01-20T18:00:00",
      candidates: [
        { 
          id: "c1", 
          name: "Rajesh Kumar", 
          party: "Indian National Congress", 
          symbol: "🖐️",
          manifesto: "Focus on employment, healthcare, and education reforms"
        },
        { 
          id: "c2", 
          name: "Priya Sharma", 
          party: "Bharatiya Janata Party", 
          symbol: "🪷",
          manifesto: "Infrastructure development and digital governance"
        },
        { 
          id: "c3", 
          name: "Amit Patel", 
          party: "Aam Aadmi Party", 
          symbol: "🧹",
          manifesto: "Anti-corruption and transparency in governance"
        },
        { 
          id: "c4", 
          name: "Sunita Singh", 
          party: "Independent", 
          symbol: "🗳️",
          manifesto: "Women empowerment and rural development"
        }
      ]
    }
  };

  const currentPoll = pollData[pollId as keyof typeof pollData];

  useEffect(() => {
    if (!currentPoll) {
      navigate("/polls");
    }
    
    // Check if user is verified
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData.verificationComplete) {
      toast({
        title: "Verification Required",
        description: "Please complete verification to vote.",
        variant: "destructive",
      });
      navigate("/face-verification");
    }
  }, [currentPoll, navigate, toast]);

  const handleCandidateSelect = (candidateId: string) => {
    if (voteSubmitted) return;
    setSelectedCandidate(candidateId);
  };

  const handleConfirmVote = () => {
    if (!selectedCandidate) return;
    setIsConfirming(true);
  };

  const handleSubmitVote = async () => {
    if (!selectedCandidate) return;
    
    setIsSubmitting(true);

    try {
      // Simulate blockchain vote submission
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock blockchain transaction
      const txHash = "0x" + Math.random().toString(16).substring(2, 66);
      setBlockchainTxHash(txHash);
      
      // Store vote in localStorage (mock)
      const voteData = {
        pollId,
        candidateId: selectedCandidate,
        timestamp: new Date().toISOString(),
        blockchainTx: txHash,
        voterHash: "voter_" + Date.now()
      };
      
      localStorage.setItem(`vote_${pollId}`, JSON.stringify(voteData));
      
      setVoteSubmitted(true);
      
      toast({
        title: "Vote Submitted Successfully!",
        description: "Your vote has been recorded on the blockchain.",
      });

    } catch (error) {
      toast({
        title: "Vote Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTimeRemaining = () => {
    const endTime = new Date(currentPoll?.endTime || "");
    const now = new Date();
    const timeLeft = endTime.getTime() - now.getTime();
    
    if (timeLeft <= 0) return "Voting ended";
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days, ${hours} hours remaining`;
    return `${hours} hours remaining`;
  };

  if (!currentPoll) {
    return <div>Election not found</div>;
  }

  if (voteSubmitted) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card className="card-shadow">
              <CardContent className="p-12">
                <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-success" />
                </div>
                
                <h1 className="text-3xl font-bold mb-4">Vote Submitted Successfully!</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Your vote has been securely recorded on the blockchain
                </p>

                <div className="bg-muted/50 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold mb-4">Blockchain Receipt</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transaction Hash:</span>
                      <span className="font-mono text-sm">{blockchainTxHash?.substring(0, 20)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timestamp:</span>
                      <span>{new Date().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Election:</span>
                      <span>{currentPoll.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-success">✓ Verified</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button onClick={() => navigate("/results")} variant="tricolor" size="lg">
                    View Results
                  </Button>
                  <Button onClick={() => navigate("/dashboard")} variant="outline" size="lg">
                    Return to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button onClick={() => navigate("/polls")} variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Polls
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{currentPoll.title}</h1>
              <p className="text-muted-foreground">Constituency: {currentPoll.constituency}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-warning">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{getTimeRemaining()}</span>
              </div>
            </div>
          </div>

          {!isConfirming ? (
            <>
              {/* Security Notice */}
              <Card className="card-shadow mb-8 bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Secure Voting Environment</h3>
                      <p className="text-sm text-muted-foreground">
                        Your vote is encrypted, anonymous, and recorded on the blockchain for transparency. 
                        You can only vote once per election. Choose carefully.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Candidates */}
              <div className="space-y-4 mb-8">
                <h2 className="text-2xl font-semibold mb-6">Select Your Candidate</h2>
                
                {currentPoll.candidates.map((candidate, index) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card 
                      className={`cursor-pointer smooth-transition ${
                        selectedCandidate === candidate.id 
                          ? "ring-2 ring-primary border-primary bg-primary/5" 
                          : "card-shadow hover:shadow-lg hover:border-primary/30"
                      }`}
                      onClick={() => handleCandidateSelect(candidate.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          <div className="text-center">
                            <div className="text-6xl mb-2">{candidate.symbol}</div>
                            <p className="text-xs text-muted-foreground">Party Symbol</p>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-2xl font-bold">{candidate.name}</h3>
                                <p className="text-lg text-primary font-medium">{candidate.party}</p>
                              </div>
                              
                              {selectedCandidate === candidate.id && (
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-5 h-5 text-primary-foreground" />
                                </div>
                              )}
                            </div>
                            
                            <p className="text-muted-foreground">{candidate.manifesto}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Vote Button */}
              <div className="text-center">
                <Button 
                  onClick={handleConfirmVote}
                  variant="vote"
                  size="lg"
                  disabled={!selectedCandidate}
                  className="text-xl px-12 py-6"
                >
                  <VoteIcon className="w-6 h-6 mr-3" />
                  Confirm Your Vote
                </Button>
                
                {selectedCandidate && (
                  <p className="text-sm text-muted-foreground mt-4">
                    You have selected: <strong>
                      {currentPoll.candidates.find(c => c.id === selectedCandidate)?.name}
                    </strong>
                  </p>
                )}
              </div>
            </>
          ) : (
            /* Confirmation Screen */
            <Card className="card-shadow max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <Lock className="w-16 h-16 mx-auto mb-4 text-warning" />
                <CardTitle className="text-2xl">Confirm Your Vote</CardTitle>
                <CardDescription className="text-lg">
                  Please review your selection before final submission
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Selected Candidate */}
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Your Selected Candidate
                  </h3>
                  
                  {(() => {
                    const candidate = currentPoll.candidates.find(c => c.id === selectedCandidate);
                    return candidate ? (
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{candidate.symbol}</span>
                        <div>
                          <p className="text-xl font-bold">{candidate.name}</p>
                          <p className="text-primary font-medium">{candidate.party}</p>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* Warning */}
                <div className="bg-warning/10 rounded-lg p-4 border border-warning/20">
                  <div className="flex items-start gap-3">
                    <Fingerprint className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-medium text-warning mb-2">Important Notice</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Your vote cannot be changed once submitted</li>
                        <li>• This action will be recorded on the blockchain</li>
                        <li>• Your identity remains anonymous but vote is verifiable</li>
                        <li>• You can only vote once in this election</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={() => setIsConfirming(false)}
                    variant="outline" 
                    size="lg"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Go Back
                  </Button>
                  
                  <Button 
                    onClick={handleSubmitVote}
                    variant="vote" 
                    size="lg"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting Vote...
                      </>
                    ) : (
                      <>
                        <VoteIcon className="w-5 h-5 mr-2" />
                        Submit Final Vote
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Vote;