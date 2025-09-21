import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ChevronUp, ChevronDown, MessageSquare, Clock } from "lucide-react";

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    reputation: number;
  };
  votes: number;
  commentCount: number;
  tags: Array<{
    name: string;
    type: "ai" | "discussion" | "question" | "tutorial";
  }>;
  timeAgo: string;
}

const PostCard = ({ id, title, content, author, votes, commentCount, tags, timeAgo }: PostCardProps) => {
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
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={author.avatar} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{author.name}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{author.reputation} reputation</span>
                <span>•</span>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {timeAgo}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronUp className="h-4 w-4 text-vote-neutral hover:text-vote-up" />
            </Button>
            <span className="text-sm font-medium min-w-[2rem] text-center">
              {votes}
            </span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronDown className="h-4 w-4 text-vote-neutral hover:text-vote-down" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Link to={`/post/${id}`} className="block group">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {content}
          </p>
        </Link>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} className={`text-xs ${getTagColor(tag.type)}`}>
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <MessageSquare className="h-4 w-4 mr-2" />
          {commentCount} comments
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;