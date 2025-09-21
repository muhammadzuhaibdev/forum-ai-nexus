import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award, Star, TrendingUp } from "lucide-react";

const Leaderboard = () => {
  const leaders = [
    {
      rank: 1,
      name: "Alex Thompson",
      avatar: "/api/placeholder/50/50",
      reputation: 4156,
      posts: 23,
      helpfulAnswers: 89,
      badges: ["AI Expert", "Top Contributor", "Helpful"],
      trend: "+156 this week"
    },
    {
      rank: 2,
      name: "Sarah Chen",
      avatar: "/api/placeholder/50/50",
      reputation: 3892,
      posts: 31,
      helpfulAnswers: 67,
      badges: ["LangChain Pro", "Tutorial Master"],
      trend: "+89 this week"
    },
    {
      rank: 3,
      name: "Mike Rodriguez",
      avatar: "/api/placeholder/50/50",
      reputation: 3247,
      posts: 18,
      helpfulAnswers: 78,
      badges: ["Discussion Leader", "Community Helper"],
      trend: "+124 this week"
    },
    {
      rank: 4,
      name: "Emma Wilson",
      avatar: "/api/placeholder/50/50",
      reputation: 2891,
      posts: 15,
      helpfulAnswers: 45,
      badges: ["Rising Star", "Vector DB Specialist"],
      trend: "+67 this week"
    },
    {
      rank: 5,
      name: "David Kim",
      avatar: "/api/placeholder/50/50",
      reputation: 2634,
      posts: 27,
      helpfulAnswers: 52,
      badges: ["API Master", "Problem Solver"],
      trend: "+43 this week"
    },
    {
      rank: 6,
      name: "Lisa Zhang",
      avatar: "/api/placeholder/50/50",
      reputation: 2456,
      posts: 19,
      helpfulAnswers: 38,
      badges: ["Code Reviewer", "Mentor"],
      trend: "+78 this week"
    },
    {
      rank: 7,
      name: "James Brown",
      avatar: "/api/placeholder/50/50",
      reputation: 2123,
      posts: 12,
      helpfulAnswers: 34,
      badges: ["newcomer", "Quick Learner"],
      trend: "+91 this week"
    },
    {
      rank: 8,
      name: "Maria Garcia",
      avatar: "/api/placeholder/50/50",
      reputation: 1987,
      posts: 14,
      helpfulAnswers: 29,
      badges: ["Data Scientist", "AI Researcher"],
      trend: "+56 this week"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getReputationColor = (reputation: number) => {
    if (reputation >= 4000) return "text-reputation-high";
    if (reputation >= 2500) return "text-reputation-medium";
    return "text-reputation-low";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center justify-center">
          <Trophy className="h-8 w-8 mr-3 text-accent" />
          Community Leaderboard
        </h1>
        <p className="text-muted-foreground">
          Celebrating our top contributors and their achievements
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {leaders.slice(0, 3).map((leader, index) => (
          <Card key={leader.rank} className={`relative ${index === 0 ? 'md:order-2 border-accent/30 bg-accent/5' : index === 1 ? 'md:order-1' : 'md:order-3'}`}>
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">
                {getRankIcon(leader.rank)}
              </div>
              <Avatar className="h-16 w-16 mx-auto mb-3">
                <AvatarImage src={leader.avatar} />
                <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">{leader.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <div className={`text-2xl font-bold ${getReputationColor(leader.reputation)}`}>
                {leader.reputation.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">reputation points</p>
              
              <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                <div>{leader.posts} posts</div>
                <div>{leader.helpfulAnswers} helpful</div>
              </div>

              <div className="flex items-center justify-center text-xs text-secondary">
                <TrendingUp className="h-3 w-3 mr-1" />
                {leader.trend}
              </div>

              <div className="flex flex-wrap gap-1 justify-center">
                {leader.badges.slice(0, 2).map((badge, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {leaders.map((leader, index) => (
              <div
                key={leader.rank}
                className={`flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors ${
                  index < 3 ? 'bg-accent/5' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 flex justify-center">
                    {getRankIcon(leader.rank)}
                  </div>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={leader.avatar} />
                    <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="font-medium">{leader.name}</div>
                    <div className="flex flex-wrap gap-1">
                      {leader.badges.map((badge, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className={`text-lg font-bold ${getReputationColor(leader.reputation)}`}>
                    {leader.reputation.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {leader.posts} posts • {leader.helpfulAnswers} helpful
                  </div>
                  <div className="flex items-center text-xs text-secondary">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {leader.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">247</div>
            <p className="text-sm text-muted-foreground">Active Contributors</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-secondary">1,842</div>
            <p className="text-sm text-muted-foreground">Questions Answered</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-accent">89%</div>
            <p className="text-sm text-muted-foreground">Helpful Response Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;