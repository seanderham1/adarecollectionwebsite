import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useCookieConsent } from "@/contexts/cookie-consent-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

export function CookieConsentLayer() {
  const {
    hasAnswered,
    storedAnalytics,
    preferencesOpen,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    openPreferences,
    closePreferences,
  } = useCookieConsent();

  const [draftAnalytics, setDraftAnalytics] = useState(storedAnalytics);

  useEffect(() => {
    if (preferencesOpen) {
      setDraftAnalytics(storedAnalytics);
    }
  }, [preferencesOpen, storedAnalytics]);

  useEffect(() => {
    if (!hasAnswered) {
      const prev = document.body.style.paddingBottom;
      document.body.style.paddingBottom = "max(8.5rem, env(safe-area-inset-bottom, 0px))";
      return () => {
        document.body.style.paddingBottom = prev;
      };
    }
  }, [hasAnswered]);

  return (
    <>
      {!hasAnswered ? (
        <div
          className="fixed bottom-0 left-0 right-0 z-[100] border-t border-gray-200 bg-white px-4 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] md:px-8"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="min-w-0 flex-1 space-y-1">
              <p id="cookie-banner-title" className="font-serif text-base font-normal text-primary">
                Cookies on this site
              </p>
              <p id="cookie-banner-desc" className="text-xs leading-relaxed text-muted-foreground">
                We use essential cookies needed for the site to work. With your permission we also use
                analytics cookies (Google Analytics) to understand how the site is used.{" "}
                <Link
                  href="/privacy#cookies"
                  className="text-primary underline underline-offset-2"
                  onClick={() => closePreferences()}
                >
                  Learn more
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-none border-gray-700 text-xs uppercase tracking-wider"
                onClick={rejectNonEssential}
              >
                Reject optional
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-none border-gray-700 text-xs uppercase tracking-wider"
                onClick={openPreferences}
              >
                Manage preferences
              </Button>
              <Button
                type="button"
                size="sm"
                className="rounded-none border border-gray-700 bg-gray-700 text-xs font-medium uppercase tracking-wider text-white hover:bg-transparent hover:text-gray-700"
                onClick={acceptAll}
              >
                Accept all
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <Dialog
        open={preferencesOpen}
        onOpenChange={(open) => {
          if (!open) closePreferences();
        }}
      >
        <DialogContent className="max-w-md rounded-none border-gray-200 sm:rounded-none">
          <DialogHeader>
            <DialogTitle className="font-serif font-normal text-primary">Cookie preferences</DialogTitle>
            <DialogDescription className="text-left text-xs leading-relaxed">
              Essential cookies are always on because they are required for basic site operation.
              Optional analytics cookies help us improve the experience; they are only used if you
              allow them.{" "}
              <Link
                href="/privacy#cookies"
                className="text-primary underline underline-offset-2"
                onClick={() => closePreferences()}
              >
                Privacy Policy - cookies
              </Link>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-medium text-primary">Essential cookies</p>
                <p className="text-xs text-muted-foreground leading-snug">
                  Needed for security and core functionality (always active).
                </p>
              </div>
              <span className="shrink-0 text-xs font-medium text-muted-foreground">Always on</span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 space-y-1 pr-2">
                <label htmlFor="cookie-analytics-switch" className="text-sm font-medium text-primary">
                  Analytics cookies
                </label>
                <p id="cookie-analytics-hint" className="text-xs text-muted-foreground leading-snug">
                  Google Analytics: aggregated usage statistics to improve the site.
                </p>
              </div>
              <Switch
                id="cookie-analytics-switch"
                checked={draftAnalytics}
                onCheckedChange={setDraftAnalytics}
                aria-describedby="cookie-analytics-hint"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button type="button" variant="outline" size="sm" className="rounded-none" onClick={closePreferences}>
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              className="rounded-none border-gray-700 bg-gray-700 hover:bg-gray-600"
              onClick={() => savePreferences(draftAnalytics)}
            >
              Save preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
