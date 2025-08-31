import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle, 
  Vote, 
  ChartBar, 
  User, 
  Calendar, 
  Clock,
  ArrowRight,
  Download,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [activePolls, setActivePolls] = useState(2);

  useEffect(() => {
    // Load user data from localStorage
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const verificationStatus = {
    registration: userData?.registered || false,
    voterIdVerified: userData?.voterIdVerified || false,
    faceVerified: userData?.faceVerified || false,
    fraudCheck: true,
    eligible: userData?.verificationComplete || false
  };

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="w-5 h-5 text-success" />
    ) : (
      <AlertCircle className="w-5 h-5 text-warning" />
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Voter Dashboard</h1>
              <p className="text-xl text-muted-foreground">
                Welcome to your secure digital voting portal
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-semibold">Secure Portal</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - User Info & Status */}
            <div className="lg:col-span-1 space-y-6">
              {/* User Profile */}
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Voter Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                    <p className="font-medium">{userData?.name || "Sample User"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Voter ID</Label>
                    <p className="font-mono">{userData?.voterId || "ABC1234567"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p>{userData?.email || "user@example.com"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                    <p>{userData?.phone || "+91 XXXXX XXXXX"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Status */}
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Verification Status
                  </CardTitle>
                  <CardDescription>
                    Complete verification to enable voting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Registration</span>
                    {getStatusIcon(verificationStatus.registration)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Voter ID Verified</span>
                    {getStatusIcon(verificationStatus.voterIdVerified)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Face Verification</span>
                    {getStatusIcon(verificationStatus.faceVerified)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fraud Check</span>
                    {getStatusIcon(verificationStatus.fraudCheck)}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Voting Eligible</span>
                      <Badge variant={verificationStatus.eligible ? "default" : "secondary"}>
                        {verificationStatus.eligible ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                  </div>

                  {!verificationStatus.faceVerified && (
                    <Button asChild variant="heritage" className="w-full mt-4">
                      <Link to="/face-verification">
                        Complete Face Verification
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Digital Certificate */}
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="text-base">Digital Certificate</CardTitle>
                  <CardDescription>
                    Eco-friendly paperless verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <p className="font-medium mb-2">Verified Digital Identity</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Certificate ID: {userData?.biometricHash?.slice(0, 16) || "CERT_" + Date.now()}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Actions & Quick Access */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="card-shadow hover:shadow-lg smooth-transition">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Vote className="w-5 h-5 text-primary" />
                      Active Elections
                    </CardTitle>
                    <CardDescription>
                      {activePolls} elections available for voting
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">General Election 2024</p>
                          <p className="text-sm text-muted-foreground">Ends in 5 days</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">Local Municipality</p>
                          <p className="text-sm text-muted-foreground">Ends in 12 days</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                    </div>
                    <Button 
                      asChild 
                      variant="vote" 
                      className="w-full mt-4"
                      disabled={!verificationStatus.eligible}
                    >
                      <Link to="/polls">
                        {verificationStatus.eligible ? "Vote Now" : "Complete Verification"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="card-shadow hover:shadow-lg smooth-transition">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ChartBar className="w-5 h-5 text-primary" />
                      Election Results
                    </CardTitle>
                    <CardDescription>
                      View transparent, blockchain-verified results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">Previous Election</p>
                          <p className="text-sm text-muted-foreground">Completed 2 months ago</p>
                        </div>
                        <Badge variant="secondary">Final</Badge>
                      </div>
                      <div className="text-center py-4">
                        <p className="text-2xl font-bold text-primary">98.7%</p>
                        <p className="text-sm text-muted-foreground">Blockchain Verification Match</p>
                      </div>
                    </div>
                    <Button asChild variant="tricolor" className="w-full">
                      <Link to="/results">
                        View Results
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your voting history and platform interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Face verification completed</p>
                        <p className="text-sm text-muted-foreground">Biometric verification successful</p>
                      </div>
                      <span className="text-sm text-muted-foreground">Today</span>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Voter ID verified</p>
                        <p className="text-sm text-muted-foreground">OCR verification passed</p>
                      </div>
                      <span className="text-sm text-muted-foreground">Today</span>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Account registered</p>
                        <p className="text-sm text-muted-foreground">Welcome to secure voting platform</p>
                      </div>
                      <span className="text-sm text-muted-foreground">Today</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Blockchain Information */}
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-5 h-5 blockchain-gradient rounded"></span>
                    Blockchain Security
                  </CardTitle>
                  <CardDescription>
                    Your votes are secured with blockchain technology
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary">100%</p>
                      <p className="text-sm text-muted-foreground">Tamper Proof</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary">256-bit</p>
                      <p className="text-sm text-muted-foreground">Encryption</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary">Real-time</p>
                      <p className="text-sm text-muted-foreground">Verification</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm">
                      <strong>Your Voter Hash:</strong> {userData?.biometricHash || "Generated after verification"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      This anonymized hash secures your identity on the blockchain
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <label className={className}>{children}</label>
);

export default Dashboard;