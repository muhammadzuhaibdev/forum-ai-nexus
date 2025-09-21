import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Link2, MessageSquare, FileText, Award, TrendingUp } from "lucide-react";
import PostCard from "@/components/PostCard";

const UserProfile = () => {
  const user = {
    name: "John Doe",
    avatar: "/api/placeholder/120/120",
    bio: "Full-stack developer passionate about AI and machine learning. Love helping others solve complex problems and sharing knowledge with the community.",
    reputation: 2847,
    location: "San Francisco, CA",
    website: "johndoe.dev",
    joinDate: "March 2023",
    stats: {
      posts: 23,
      comments: 156,
      helpfulAnswers: 89,
      questionsAsked: 12
    },
    badges: [
      { name: "AI Expert", color: "bg-tag-ai text-white" },
      { name: "Top Contributor", color: "bg-accent text-white" },
      { name: "Helpful", color: "bg-secondary text-white" },
      { name: "Community Helper", color: "bg-tag-tutorial text-white" }
    ],
    recentActivity: [
      {
        type: "post",
        title: "How to implement RAG with LangChain for better AI responses?",
        date: "2 hours ago",
        votes: 23,
        comments: 8
      },
      {
        type: "comment",
        title: "Answered: Best practices for vector embeddings",
        date: "1 day ago",
        votes: 15,
        comments: 0
      },
      {
        type: "post",
        title: "Tutorial: Building a semantic search engine",
        date: "3 days ago",
        votes: 45,
        comments: 12
      }
    ]
  };

  const userPosts = [
    {
      id: "1",
      title: "How to implement RAG with LangChain for better AI responses?",
      content: "I'm working on a chatbot that needs to reference external documents. I've heard about RAG (Retrieval-Augmented Generation) but I'm not sure how to implement it effectively with LangChain...",
      author: {
        name: "John Doe",
        avatar: "/api/placeholder/40/40",
        reputation: 2847
      },
      votes: 23,
      commentCount: 8,
      tags: [
        { name: "AI", type: "ai" as const },
        { name: "LangChain", type: "tutorial" as const },
        { name: "Question", type: "question" as const }
      ],
      timeAgo: "2 hours ago"
    },
    {
      id: "3",
      title: "Tutorial: Building a semantic search engine with embeddings",
      content: "In this comprehensive guide, I'll walk you through building a semantic search engine using modern embedding techniques. We'll cover vector databases, similarity search, and performance optimization...",
      author: {
        name: "John Doe",
        avatar: "/api/placeholder/40/40",
        reputation: 2847
      },
      votes: 45,
      commentCount: 12,
      tags: [
        { name: "Tutorial", type: "tutorial" as const },
        { name: "Search", type: "ai" as const },
        { name: "Embeddings", type: "ai" as const }
      ],
      timeAgo: "3 days ago"
    }
  ];

  const getReputationColor = (reputation: number) => {
    if (reputation >= 4000) return "text-reputation-high";
    if (reputation >= 2500) return "text-reputation-medium";
    return "text-reputation-low";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.bio}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {user.location}
                </div>
                <div className="flex items-center">
                  <Link2 className="h-4 w-4 mr-1" />
                  <a href={`https://${user.website}`} className="text-primary hover:underline">
                    {user.website}
                  </a>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {user.joinDate}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {user.badges.map((badge, index) => (
                  <Badge key={index} className={badge.color}>
                    <Award className="h-3 w-3 mr-1" />
                    {badge.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className={`text-3xl font-bold ${getReputationColor(user.reputation)}`}>
                {user.reputation.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Reputation</p>
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Trends
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">{user.stats.posts}</div>
            <p className="text-sm text-muted-foreground">Posts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-secondary">{user.stats.helpfulAnswers}</div>
            <p className="text-sm text-muted-foreground">Helpful Answers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-accent">{user.stats.comments}</div>
            <p className="text-sm text-muted-foreground">Comments</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-muted-foreground">{user.stats.questionsAsked}</div>
            <p className="text-sm text-muted-foreground">Questions Asked</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Tabs */}
      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Comments
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <div className="space-y-6">
            {userPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Comments will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-4 border-b last:border-b-0">
                    <div className="flex-shrink-0 mt-1">
                      {activity.type === "post" ? (
                        <FileText className="h-4 w-4 text-primary" />
                      ) : (
                        <MessageSquare className="h-4 w-4 text-secondary" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{activity.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{activity.date}</span>
                        <span>{activity.votes} votes</span>
                        {activity.comments > 0 && <span>{activity.comments} comments</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;