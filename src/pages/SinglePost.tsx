import { useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChevronUp, ChevronDown, MessageSquare, Sparkles, Clock, Reply } from "lucide-react";

const SinglePost = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");

  // Mock post data
  const post = {
    id: "1",
    title: "How to implement RAG with LangChain for better AI responses?",
    content: `I'm working on a chatbot that needs to reference external documents. I've heard about RAG (Retrieval-Augmented Generation) but I'm not sure how to implement it effectively with LangChain.

Here's what I'm trying to achieve:
1. Load and index multiple PDF documents
2. Create embeddings for efficient retrieval
3. Integrate with an LLM for response generation
4. Maintain conversation context

I've been looking at the LangChain documentation, but I'm getting overwhelmed by all the different components and patterns. Any best practices or examples would be really helpful!

My current tech stack includes:
- Python 3.9
- LangChain
- OpenAI API
- Vector database (considering Pinecone or Chroma)

Has anyone built something similar? What challenges did you face and how did you overcome them?`,
    author: {
      name: "Sarah Chen",
      avatar: "/api/placeholder/50/50",
      reputation: 2847
    },
    votes: 23,
    tags: [
      { name: "AI", type: "ai" as const },
      { name: "LangChain", type: "tutorial" as const },
      { name: "Question", type: "question" as const }
    ],
    timeAgo: "2 hours ago"
  };

  const comments = [
    {
      id: "c1",
      author: {
        name: "Alex Thompson",
        avatar: "/api/placeholder/40/40",
        reputation: 4156
      },
      content: "Great question! I've implemented RAG with LangChain recently. The key is to start simple. I'd recommend using Chroma as your vector store initially since it's easier to set up locally. Here's a basic pattern I use: 1) Load docs with PyPDFLoader, 2) Split with RecursiveCharacterTextSplitter, 3) Create embeddings with OpenAIEmbeddings, 4) Store in Chroma, 5) Use RetrievalQA chain.",
      votes: 15,
      timeAgo: "1 hour ago",
      replies: [
        {
          id: "r1",
          author: {
            name: "Sarah Chen",
            avatar: "/api/placeholder/40/40",
            reputation: 2847
          },
          content: "Thanks Alex! This is exactly what I was looking for. Do you have any recommendations for chunk size when splitting documents?",
          votes: 3,
          timeAgo: "45 minutes ago"
        }
      ]
    },
    {
      id: "c2",
      author: {
        name: "Mike Rodriguez",
        avatar: "/api/placeholder/40/40",
        reputation: 1523
      },
      content: "I second Alex's recommendation for Chroma. One thing to watch out for is the embedding model you choose - it significantly affects retrieval quality. I've had good results with text-embedding-ada-002 for general purpose use.",
      votes: 8,
      timeAgo: "30 minutes ago",
      replies: []
    }
  ];

  const getTagColor = (type: string) => {
    switch (type) {
      case "ai": return "bg-tag-ai text-white";
      case "discussion": return "bg-tag-discussion text-white";
      case "question": return "bg-tag-question text-white";
      case "tutorial": return "bg-tag-tutorial text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Post Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{post.author.reputation} reputation</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.timeAgo}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronUp className="h-4 w-4 text-vote-neutral hover:text-vote-up" />
              </Button>
              <span className="text-lg font-medium min-w-[2rem] text-center">
                {post.votes}
              </span>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronDown className="h-4 w-4 text-vote-neutral hover:text-vote-down" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          
          <div className="prose prose-sm max-w-none mb-4">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {post.content}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} className={`text-xs ${getTagColor(tag.type)}`}>
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Summary Section */}
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-accent" />
              AI Summary
            </h3>
            <Button variant="outline" size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Summarize Comments
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">
            Click "Summarize Comments" to get an AI-generated summary of the discussion below.
          </p>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            {comments.length} Comments
          </h2>
        </div>

        {/* Add Comment */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Share your thoughts and insights..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Assist
                </Button>
                <Button>Post Comment</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="flex flex-col items-center space-y-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ChevronUp className="h-3 w-3 text-vote-neutral hover:text-vote-up" />
                    </Button>
                    <span className="text-xs font-medium">{comment.votes}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ChevronDown className="h-3 w-3 text-vote-neutral hover:text-vote-down" />
                    </Button>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatar} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{comment.author.name}</span>
                      <span className="text-xs text-muted-foreground">{comment.author.reputation} reputation</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                    </div>

                    <p className="text-sm leading-relaxed">{comment.content}</p>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-xs h-7">
                        <Reply className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-6 border-l-2 border-muted pl-4 space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={reply.author.avatar} />
                                <AvatarFallback className="text-xs">{reply.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-xs">{reply.author.name}</span>
                              <span className="text-xs text-muted-foreground">{reply.timeAgo}</span>
                            </div>
                            <p className="text-sm">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;