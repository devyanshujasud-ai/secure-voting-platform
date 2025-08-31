import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  ChartBar, 
  Shield, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Award,
  Download,
  ExternalLink
} from "lucide-react";

const Results = () => {
  const [selectedElection, setSelectedElection] = useState("general-2024");

  // Mock election results data
  const electionResults = {
    "general-2024": {
      title: "General Election 2024",
      status: "live",
      totalVotes: 450000000,
      totalVoters: 900000000,
      turnout: 50.0,
      winner: "Priya Sharma",
      blockchainVerified: true,
      lastUpdated: "2 minutes ago",
      candidates: [
        { name: "Priya Sharma", party: "BJP", votes: 180000000, percentage: 40.0, color: "#FF6B35" },
        { name: "Rajesh Kumar", party: "INC", votes: 135000000, percentage: 30.0, color: "#4ECDC4" },
        { name: "Amit Patel", party: "AAP", votes: 90000000, percentage: 20.0, color: "#45B7D1" },
        { name: "Sunita Singh", party: "IND", votes: 45000000, percentage: 10.0, color: "#96CEB4" }
      ],
      hourlyData: [
        { time: "08:00", votes: 45000000 },
        { time: "10:00", votes: 95000000 },
        { time: "12:00", votes: 180000000 },
        { time: "14:00", votes: 270000000 },
        { time: "16:00", votes: 360000000 },
        { time: "18:00", votes: 450000000 }
      ]
    },
    "municipal-2024": {
      title: "Municipal Corporation Election",
      status: "completed",
      totalVotes: 800000,
      totalVoters: 2500000,
      turnout: 32.0,
      winner: "Vikram Joshi",
      blockchainVerified: true,
      lastUpdated: "Final results",
      candidates: [
        { name: "Vikram Joshi", party: "SS", votes: 360000, percentage: 45.0, color: "#FF6B35" },
        { name: "Meera Desai", party: "INC", votes: 280000, percentage: 35.0, color: "#4ECDC4" },
        { name: "Rohit Gupta", party: "IND", votes: 160000, percentage: 20.0, color: "#96CEB4" }
      ],
      hourlyData: []
    }
  };

  const currentResults = electionResults[selectedElection as keyof typeof electionResults];

  const COLORS = ['#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];

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
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <ChartBar className="w-10 h-10 text-primary" />
                Election Results
              </h1>
              <p className="text-xl text-muted-foreground">
                Real-time, blockchain-verified election results
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="default" className="text-sm">
                <CheckCircle className="w-4 h-4 mr-1" />
                Blockchain Verified
              </Badge>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </Button>
            </div>
          </div>

          {/* Election Selector */}
          <div className="mb-8">
            <Tabs value={selectedElection} onValueChange={setSelectedElection}>
              <TabsList className="grid md:grid-cols-2 w-full max-w-md">
                <TabsTrigger value="general-2024">General Election</TabsTrigger>
                <TabsTrigger value="municipal-2024">Municipal Election</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="card-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Votes</p>
                    <p className="text-2xl font-bold">{currentResults.totalVotes.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Voter Turnout</p>
                    <p className="text-2xl font-bold">{currentResults.turnout}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Leading Candidate</p>
                    <p className="text-lg font-bold">{currentResults.winner}</p>
                  </div>
                  <Award className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={currentResults.status === "live" ? "default" : "secondary"}>
                      {currentResults.status === "live" ? "Live Results" : "Final Results"}
                    </Badge>
                  </div>
                  <Shield className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Vote Distribution</CardTitle>
                <CardDescription>Votes received by each candidate</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={currentResults.candidates}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [value.toLocaleString(), "Votes"]}
                      labelFormatter={(label) => `Candidate: ${label}`}
                    />
                    <Bar dataKey="votes" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Vote Share</CardTitle>
                <CardDescription>Percentage distribution of votes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={currentResults.candidates}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="votes"
                    >
                      {currentResults.candidates.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [value.toLocaleString(), "Votes"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Voting Timeline */}
          {currentResults.hourlyData.length > 0 && (
            <Card className="card-shadow mt-8">
              <CardHeader>
                <CardTitle>Voting Timeline</CardTitle>
                <CardDescription>Cumulative votes throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentResults.hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [value.toLocaleString(), "Total Votes"]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="votes" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Detailed Results Table */}
          <Card className="card-shadow mt-8">
            <CardHeader>
              <CardTitle>Detailed Results</CardTitle>
              <CardDescription>Complete breakdown by candidate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Rank</th>
                      <th className="text-left p-4">Candidate</th>
                      <th className="text-left p-4">Party</th>
                      <th className="text-right p-4">Votes</th>
                      <th className="text-right p-4">Percentage</th>
                      <th className="text-center p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentResults.candidates
                      .sort((a, b) => b.votes - a.votes)
                      .map((candidate, index) => (
                        <tr key={candidate.name} className="border-b hover:bg-muted/30 smooth-transition">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold">#{index + 1}</span>
                              {index === 0 && <Award className="w-4 h-4 text-warning" />}
                            </div>
                          </td>
                          <td className="p-4 font-medium">{candidate.name}</td>
                          <td className="p-4">{candidate.party}</td>
                          <td className="p-4 text-right font-mono">{candidate.votes.toLocaleString()}</td>
                          <td className="p-4 text-right">
                            <span className="font-bold">{candidate.percentage.toFixed(1)}%</span>
                          </td>
                          <td className="p-4 text-center">
                            {index === 0 ? (
                              <Badge className="bg-warning text-warning-foreground">Leading</Badge>
                            ) : (
                              <Badge variant="secondary">Trailing</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Verification */}
          <Card className="card-shadow mt-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-primary mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-primary text-xl mb-2">Blockchain Verification</h3>
                  <p className="text-muted-foreground mb-4">
                    These results have been verified against the blockchain ledger. 
                    Every vote is cryptographically secured and publicly auditable.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-background rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Verification Status</p>
                      <p className="font-bold text-success">✓ 100% Verified</p>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Blockchain Blocks</p>
                      <p className="font-bold">2,847 blocks</p>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p className="font-bold">{currentResults.lastUpdated}</p>
                    </div>
                  </div>

                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View on Blockchain Explorer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;