import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics, GoogleSearchConsole } from "@/components/google-analytics";
import { CookieConsentLayer } from "@/components/cookie-consent-layer";
import { CookieConsentProvider } from "@/contexts/cookie-consent-context";
import { ComingSoon } from "@/components/coming-soon";
import Home from "@/pages/home";
import About from "@/pages/about";
import PropertyDetail from "@/pages/property-detail";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import PropertiesPage from "@/pages/properties";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsConditions from "@/pages/terms-conditions";
import FAQ from "@/pages/faq";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/property/:id" component={PropertyDetail} />
      <Route path="/properties" component={PropertiesPage} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsConditions} />
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
      <CookieConsentProvider>
        <TooltipProvider>
          <GoogleAnalytics />
          <GoogleSearchConsole />
          <CookieConsentLayer />
          <Toaster />
          <ScrollToTop />
          <ComingSoon>
            <Router />
          </ComingSoon>
        </TooltipProvider>
      </CookieConsentProvider>
    </QueryClientProvider>
  );
}

export default App;
