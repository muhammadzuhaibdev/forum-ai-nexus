import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Trophy, User, Home, PlusCircle, LogOut } from "lucide-react";

const Layout = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="rounded-lg bg-primary p-2">
                <MessageSquare className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">AI Forum</span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              <Button
                variant={isActive("/") ? "secondary" : "ghost"}
                asChild
                className="font-medium"
              >
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Feed
                </Link>
              </Button>
              
              <Button
                variant={isActive("/leaderboard") ? "secondary" : "ghost"}
                asChild
                className="font-medium"
              >
                <Link to="/leaderboard">
                  <Trophy className="h-4 w-4 mr-2" />
                  Leaderboard
                </Link>
              </Button>

              <Button
                variant={isActive("/create") ? "secondary" : "ghost"}
                asChild
                className="font-medium"
              >
                <Link to="/create">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create
                </Link>
              </Button>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              <Button
                variant={isActive("/profile") ? "secondary" : "ghost"}
                asChild
                size="sm"
              >
                <Link to="/profile" className="flex items-center space-x-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/api/placeholder/32/32" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">John Doe</span>
                </Link>
              </Button>

              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;