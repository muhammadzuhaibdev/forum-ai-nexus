import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostCard from "@/components/PostCard";
import { Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Feed = () => {
  // Mock data for posts
  const posts = [
    {
      id: "1",
      title: "How to implement RAG with LangChain for better AI responses?",
      content: "I'm working on a chatbot that needs to reference external documents. I've heard about RAG (Retrieval-Augmented Generation) but I'm not sure how to implement it effectively with LangChain. Any best practices or examples would be helpful...",
      author: {
        name: "Sarah Chen",
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
      id: "2",
      title: "Discussion: The Future of AI in Software Development",
      content: "With tools like GitHub Copilot and ChatGPT becoming more prevalent, how do you think AI will shape the future of software development? Will it replace developers or augment their capabilities?",
      author: {
        name: "Mike Rodriguez",
        avatar: "/api/placeholder/40/40",
        reputation: 1523
      },
      votes: 47,
      commentCount: 15,
      tags: [
        { name: "AI", type: "ai" as const },
        { name: "Discussion", type: "discussion" as const },
        { name: "Future", type: "discussion" as const }
      ],
      timeAgo: "4 hours ago"
    },
    {
      id: "3",
      title: "Tutorial: Building a Custom GPT with OpenAI's API",
      content: "In this comprehensive guide, I'll walk you through creating a custom GPT model using OpenAI's API. We'll cover everything from setting up your environment to fine-tuning the model for specific use cases...",
      author: {
        name: "Alex Thompson",
        avatar: "/api/placeholder/40/40",
        reputation: 4156
      },
      votes: 89,
      commentCount: 23,
      tags: [
        { name: "Tutorial", type: "tutorial" as const },
        { name: "OpenAI", type: "ai" as const },
        { name: "API", type: "tutorial" as const }
      ],
      timeAgo: "1 day ago"
    },
    {
      id: "4",
      title: "Help: Vector database recommendations for semantic search?",
      content: "I'm building an application that needs semantic search capabilities. I've been looking at Pinecone, Weaviate, and Qdrant. What are your experiences with these vector databases?",
      author: {
        name: "Emma Wilson",
        avatar: "/api/placeholder/40/40",
        reputation: 892
      },
      votes: 12,
      commentCount: 6,
      tags: [
        { name: "Question", type: "question" as const },
        { name: "Vector DB", type: "ai" as const },
        { name: "Search", type: "discussion" as const }
      ],
      timeAgo: "3 days ago"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Feed</h1>
          <p className="text-muted-foreground">Discover the latest discussions and insights from the AI community</p>
        </div>
        
        <Button asChild className="shrink-0">
          <Link to="/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts, topics, or tags..."
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Latest</Button>
          <Button variant="outline" size="sm">Top</Button>
          <Button variant="outline" size="sm">Trending</Button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>

      {/* Floating Create Button (Mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <Button asChild size="lg" className="rounded-full h-14 w-14 shadow-lg">
          <Link to="/create">
            <Plus className="h-6 w-6" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Feed;