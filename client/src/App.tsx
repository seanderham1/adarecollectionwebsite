import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import PropertyDetail from "@/pages/property-detail";
import ExclusiveAccess from "@/pages/exclusive-access";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import PropertiesPage from "@/pages/properties";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/property/:id" component={PropertyDetail} />
      <Route path="/properties" component={PropertiesPage} />
      <Route path="/exclusive" component={ExclusiveAccess} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ScrollToTop />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
