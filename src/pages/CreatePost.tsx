import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<Array<{name: string, type: string}>>([]);

  const suggestedTags = [
    { name: "AI", type: "ai" },
    { name: "Machine Learning", type: "ai" },
    { name: "LangChain", type: "tutorial" },
    { name: "OpenAI", type: "ai" },
    { name: "Question", type: "question" },
    { name: "Discussion", type: "discussion" },
    { name: "Tutorial", type: "tutorial" },
    { name: "Vector Database", type: "ai" },
    { name: "RAG", type: "ai" },
    { name: "Python", type: "tutorial" }
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

  const addTag = (tag: {name: string, type: string}) => {
    if (!tags.find(t => t.name === tag.name)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag.name !== tagToRemove));
  };

  const addCustomTag = () => {
    if (tagInput.trim() && !tags.find(t => t.name === tagInput.trim())) {
      setTags([...tags, { name: tagInput.trim(), type: "discussion" }]);
      setTagInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the post to your backend
    console.log({ title, content, tags });
    navigate("/"); // Redirect to feed after submission
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create New Post</h1>
        <p className="text-muted-foreground">Share your knowledge, ask questions, or start a discussion</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <Card>
          <CardHeader>
            <CardTitle>Post Title</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="What's your question or topic?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
              required
            />
            <p className="text-sm text-muted-foreground mt-2">
              Be specific and clear. A good title helps others understand your post quickly.
            </p>
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Content</CardTitle>
            <Button type="button" variant="outline" size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Draft with AI
            </Button>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Provide details, context, and any relevant code or examples..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] text-base"
              required
            />
            <p className="text-sm text-muted-foreground mt-2">
              Include relevant details, code snippets, error messages, or examples to help others assist you.
            </p>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Selected Tags */}
            {tags.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Tags:</Label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag.name}
                      className={`${getTagColor(tag.type)} cursor-pointer hover:opacity-80`}
                      onClick={() => removeTag(tag.name)}
                    >
                      {tag.name}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Add Custom Tag */}
            <div className="space-y-2">
              <Label>Add Custom Tag:</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter a tag name..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomTag();
                    }
                  }}
                />
                <Button type="button" onClick={addCustomTag} variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Suggested Tags */}
            <div className="space-y-2">
              <Label>Suggested Tags:</Label>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <Badge
                    key={tag.name}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => addTag(tag)}
                  >
                    {tag.name}
                    <Plus className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Tags help categorize your post and make it easier for others to find. Select up to 5 relevant tags.
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          
          <div className="flex gap-2">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">
              Publish Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;