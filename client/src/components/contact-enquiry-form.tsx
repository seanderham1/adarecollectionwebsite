import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useCookieConsent } from "@/contexts/cookie-consent-context";
import { properties } from "@/lib/properties";
import { cn } from "@/lib/utils";

/** Production uses Hosting rewrite `/api/contact` → `api` Cloud Function so the live backend stays in sync with deploys. */
const CONTACT_API_URL_DEV =
  "https://us-central1-theadarecollection-site.cloudfunctions.net/api/api/contact";

function getContactApiUrl(): string {
  if (!import.meta.env.PROD) return CONTACT_API_URL_DEV;
  const base =
    typeof window !== "undefined" && window.location?.origin?.length > 0
      ? window.location.origin
      : "";
  return `${base}/api/contact`;
}

export const CONTACT_FORM_SUBTITLE_PARAGRAPHS = [
  "The Adare Collection offers a limited portfolio of private luxury residences in and around Adare Manor for Ryder Cup 2027.",
  "Stays are arranged for a fixed rental period of up to eight nights. There is no minimum stay; shorter visits within that cap are welcome. Your quoted price and payment schedule apply to the period we confirm with you at booking, not to stays beyond eight nights.",
  "Due to the calibre and limited availability of these properties, enquiries are reviewed carefully. We will contact interested parties to discuss suitable options in further detail.",
  "Please provide the details below so we can assist with your enquiry.",
];

type EnquiryType = "" | "private_individual" | "corporate" | "agency";

/** Same dialling options as the legacy contact form (country / region). */
const PHONE_DIAL_OPTIONS: { value: string; label: string }[] = [
  { value: "+1", label: "United States / Canada (+1)" },
  { value: "+44", label: "United Kingdom (+44)" },
  { value: "+49", label: "Germany (+49)" },
  { value: "+33", label: "France (+33)" },
  { value: "+39", label: "Italy (+39)" },
  { value: "+34", label: "Spain (+34)" },
  { value: "+31", label: "Netherlands (+31)" },
  { value: "+32", label: "Belgium (+32)" },
  { value: "+41", label: "Switzerland (+41)" },
  { value: "+43", label: "Austria (+43)" },
  { value: "+353", label: "Ireland (+353)" },
  { value: "+61", label: "Australia (+61)" },
  { value: "+64", label: "New Zealand (+64)" },
  { value: "+86", label: "China (+86)" },
  { value: "+81", label: "Japan (+81)" },
  { value: "+82", label: "South Korea (+82)" },
  { value: "+91", label: "India (+91)" },
  { value: "+92", label: "Pakistan (+92)" },
  { value: "+880", label: "Bangladesh (+880)" },
  { value: "+62", label: "Indonesia (+62)" },
  { value: "+63", label: "Philippines (+63)" },
  { value: "+65", label: "Singapore (+65)" },
  { value: "+60", label: "Malaysia (+60)" },
  { value: "+66", label: "Thailand (+66)" },
  { value: "+84", label: "Vietnam (+84)" },
  { value: "+55", label: "Brazil (+55)" },
  { value: "+52", label: "Mexico (+52)" },
  { value: "+54", label: "Argentina (+54)" },
  { value: "+27", label: "South Africa (+27)" },
  { value: "+234", label: "Nigeria (+234)" },
  { value: "none", label: "Other" },
];

/** Matches Full name field: text-base + font-medium when filled; normal placeholder. */
const contactFieldTypography =
  "text-base font-medium md:text-base placeholder:text-gray-400 placeholder:font-normal";

const contactInputClass = cn(
  "w-full border-0 border-b rounded-none bg-transparent px-0 py-4",
  contactFieldTypography,
  "focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
);

const contactSelectTriggerClass = cn(
  "w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4",
  contactFieldTypography,
  "data-[placeholder]:text-gray-400 data-[placeholder]:font-normal focus:border-gray-700 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 [&>span]:line-clamp-1 [&>span]:text-left"
);

const contactPickerButtonClass = cn(
  "flex w-full items-center justify-between border-0 border-b border-gray-200 bg-transparent py-4 text-left outline-none focus:border-gray-700 disabled:opacity-50",
  contactFieldTypography
);

/** Section helper / sub-questions (e.g. under Experience, Budget); matches intro copy. */
const contactSectionHelperClass = "text-sm text-secondary leading-relaxed";

function formatBudgetThousands(k: number): string {
  if (k >= 1000) return "€1M+";
  return `€${k}k`;
}

const GUESTS_MIN = 1;
const GUESTS_MAX = 16;

function formatGuests(n: number): string {
  if (n >= GUESTS_MAX) return `${GUESTS_MAX}+`;
  return String(n);
}

/** Primary property first; remaining IDs follow catalogue order. */
function orderPreferredIds(ids: Set<string>, primaryId?: string): string[] {
  const list = Array.from(ids);
  const indexOrder = new Map(properties.map((p, i) => [p.id, i]));
  const sortByPortfolio = (a: string, b: string) =>
    (indexOrder.get(a) ?? 0) - (indexOrder.get(b) ?? 0);

  if (!primaryId) {
    return [...list].sort(sortByPortfolio);
  }
  const rest = list.filter((id) => id !== primaryId).sort(sortByPortfolio);
  return [primaryId, ...rest];
}

function getInitialFormState() {
  return {
    fullName: "",
    email: "",
    phoneExtension: "",
    phone: "",
    enquiryType: "" as EnquiryType,
    organisationName: "",
    rolePosition: "",
    estimatedGuests: 8,
    intendedUse: "",
    previousMajorEvent: "" as "" | "yes" | "no",
    budgetEurosK: 525,
    additionalNotes: "",
    privacyConsent: false,
  };
}

export type ContactEnquiryFormProps = {
  heading: "h1" | "h2";
  introTestId: string;
  submitButtonTestId: string;
  headingClassName?: string;
  /** When set (e.g. property detail modal), this property is fixed on the enquiry; guests may add others. */
  primaryPropertyId?: string;
  /** Called after a successful submit (e.g. close parent modal). */
  onSubmitted?: () => void;
  containerClassName?: string;
};

export function ContactEnquiryForm({
  heading,
  introTestId,
  submitButtonTestId,
  headingClassName = "font-serif text-4xl font-normal text-primary mb-4",
  primaryPropertyId,
  onSubmitted,
  containerClassName,
}: ContactEnquiryFormProps) {
  const [form, setForm] = useState(getInitialFormState);
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<Set<string>>(() => {
    const s = new Set<string>();
    if (primaryPropertyId) s.add(primaryPropertyId);
    return s;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { openPreferences } = useCookieConsent();

  const primaryProperty = useMemo(
    () => (primaryPropertyId ? properties.find((p) => p.id === primaryPropertyId) : undefined),
    [primaryPropertyId]
  );

  const introParagraphs = useMemo(() => {
    if (primaryPropertyId && primaryProperty) {
      return [
        `You're requesting availability for ${primaryProperty.name}, shown below. You can optionally include other properties from our portfolio in the same enquiry.`,
        CONTACT_FORM_SUBTITLE_PARAGRAPHS[2],
        "Please complete your details below.",
      ];
    }
    return CONTACT_FORM_SUBTITLE_PARAGRAPHS;
  }, [primaryPropertyId, primaryProperty]);

  useEffect(() => {
    if (!primaryPropertyId) return;
    setSelectedPropertyIds((prev) => {
      const next = new Set(prev);
      next.add(primaryPropertyId);
      return next;
    });
  }, [primaryPropertyId]);

  const additionalSelectedCount = primaryPropertyId
    ? Array.from(selectedPropertyIds).filter((id) => id !== primaryPropertyId).length
    : selectedPropertyIds.size;

  const needsOrgFields =
    form.enquiryType === "corporate" || form.enquiryType === "agency";

  const clearFieldError = (key: string) => {
    setValidationErrors((prev) => (prev[key] ? { ...prev, [key]: "" } : prev));
  };

  const setField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    clearFieldError(key as string);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!form.fullName.trim()) errors.fullName = "Full name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!form.phoneExtension) {
      errors.phoneExtension = "Please select an international dialling code";
    }
    if (!form.phone.trim()) errors.phone = "Phone number is required";

    if (!form.enquiryType) {
      errors.enquiryType = "Please tell us how you are enquiring";
    }
    if (needsOrgFields) {
      if (!form.organisationName.trim()) {
        errors.organisationName = "Organisation / company name is required";
      }
      if (!form.rolePosition.trim()) {
        errors.rolePosition = "Role / position is required";
      }
    }

    if (!form.intendedUse) {
      errors.intendedUse = "Please select intended use";
    }
    if (!form.privacyConsent) {
      errors.privacyConsent =
        "Please confirm you consent to us processing your information for this enquiry, as described in our Privacy Policy.";
    }

    if (!primaryPropertyId && selectedPropertyIds.size === 0) {
      errors.preferredProperties = "Please select at least one property";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const toggleProperty = (id: string) => {
    if (primaryPropertyId && id === primaryPropertyId) return;
    setSelectedPropertyIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      if (primaryPropertyId) next.add(primaryPropertyId);
      return next;
    });
    clearFieldError("preferredProperties");
  };

  const additionalPropertiesList = primaryPropertyId
    ? properties.filter((p) => p.id !== primaryPropertyId)
    : properties;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Please complete required fields",
        description: "Check the highlighted items and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const orderedIds = orderPreferredIds(selectedPropertyIds, primaryPropertyId);
    const preferredPropertiesSummary = orderedIds.map((pid) => {
      const p = properties.find((x) => x.id === pid);
      return p ? `${p.name} (${p.id})` : pid;
    });

    const payload = {
      name: form.fullName.trim(),
      email: form.email.trim(),
      extension: form.phoneExtension,
      phoneExtension: form.phoneExtension,
      phone: form.phone.trim(),
      enquiryType: form.enquiryType,
      organisationName: needsOrgFields ? form.organisationName.trim() : "",
      rolePosition: needsOrgFields ? form.rolePosition.trim() : "",
      estimatedGuests: form.estimatedGuests,
      estimatedGuestsLabel: formatGuests(form.estimatedGuests),
      intendedUse: form.intendedUse,
      previousMajorEventAccommodation: form.previousMajorEvent || null,
      budgetEurosThousands: form.budgetEurosK,
      budgetLabel: formatBudgetThousands(form.budgetEurosK),
      preferredPropertyIds: orderedIds,
      preferredPropertiesSummary,
      additionalNotes: form.additionalNotes.trim(),
      message: form.additionalNotes.trim(),
      privacyConsentAccepted: true,
    };

    try {
      const response = await fetch(getContactApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Inquiry sent",
          description: result.message,
        });
        setForm(getInitialFormState());
        setSelectedPropertyIds(primaryPropertyId ? new Set([primaryPropertyId]) : new Set());
        setValidationErrors({});
        onSubmitted?.();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send inquiry. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerErrorClass = (key: string) =>
    validationErrors[key] ? "border-red-500 focus:border-red-500" : "";

  return (
    <div className={cn("w-full max-w-2xl mx-auto", containerClassName)}>
      <div className={cn("text-left mb-12", primaryPropertyId && "mb-8")}>
        {heading === "h1" ? (
          <h1 className={headingClassName} data-testid="contact-title">
            Contact request
          </h1>
        ) : (
          <h2 className={headingClassName} data-testid="contact-title">
            Contact request
          </h2>
        )}
        <div
          className={cn(contactSectionHelperClass, "mb-10 max-w-xl space-y-3")}
          data-testid={introTestId}
        >
          {introParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10" data-testid="contact-form">
        {/* About you */}
        <div className="space-y-6">
          <h3 className="font-serif text-lg font-normal text-primary border-b border-gray-100 pb-2">
            About you
          </h3>

          <div>
            <Input
              type="text"
              id="contact-full-name"
              value={form.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              placeholder="Full name *"
              className={cn(
                contactInputClass,
                triggerErrorClass("fullName") || "border-gray-200 focus:border-gray-700"
              )}
              disabled={isSubmitting}
              data-testid="input-name"
              autoComplete="name"
            />
            {validationErrors.fullName && (
              <p className="text-red-500 text-sm mt-1" data-testid="name-error">
                {validationErrors.fullName}
              </p>
            )}
          </div>

          <div>
            <Input
              type="email"
              id="contact-email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="Email address *"
              className={cn(
                contactInputClass,
                triggerErrorClass("email") || "border-gray-200 focus:border-gray-700"
              )}
              disabled={isSubmitting}
              data-testid="input-email"
              autoComplete="email"
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1" data-testid="email-error">
                {validationErrors.email}
              </p>
            )}
          </div>

          <div>
            <div className="flex gap-4 items-end">
              <div className="w-36 sm:w-44 shrink-0">
                <Select
                  value={form.phoneExtension || undefined}
                  onValueChange={(v) => setField("phoneExtension", v)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    className={cn(
                      contactSelectTriggerClass,
                      triggerErrorClass("phoneExtension") || "border-gray-200 focus:border-gray-700"
                    )}
                    data-testid="select-phone-extension"
                  >
                    <SelectValue placeholder="Country Code *" />
                  </SelectTrigger>
                  <SelectContent>
                    {PHONE_DIAL_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-0">
                <Input
                  type="tel"
                  id="contact-phone"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="Phone number *"
                  className={cn(
                    contactInputClass,
                    triggerErrorClass("phone") || "border-gray-200 focus:border-gray-700"
                  )}
                  disabled={isSubmitting}
                  data-testid="input-phone"
                  autoComplete="tel-national"
                />
              </div>
            </div>
            {(validationErrors.phoneExtension || validationErrors.phone) && (
              <p className="text-red-500 text-sm mt-1" data-testid="phone-error">
                {validationErrors.phoneExtension || validationErrors.phone}
              </p>
            )}
          </div>

          <div>
            <Select
              value={form.enquiryType || undefined}
              onValueChange={(v) => setField("enquiryType", v as EnquiryType)}
              disabled={isSubmitting}
            >
              <SelectTrigger
                className={cn(contactSelectTriggerClass, triggerErrorClass("enquiryType"))}
                data-testid="select-enquiry-type"
              >
                <SelectValue placeholder="How are you enquiring? *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private_individual">Private individual</SelectItem>
                <SelectItem value="corporate">Corporate / company</SelectItem>
                <SelectItem value="agency">Agency / representative</SelectItem>
              </SelectContent>
            </Select>
            {validationErrors.enquiryType && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.enquiryType}</p>
            )}
          </div>

          {needsOrgFields && (
            <>
              <div>
                <Input
                  type="text"
                  id="contact-organisation"
                  value={form.organisationName}
                  onChange={(e) => setField("organisationName", e.target.value)}
                  placeholder="Organisation / company name *"
                  className={cn(
                    contactInputClass,
                    triggerErrorClass("organisationName") || "border-gray-200 focus:border-gray-700"
                  )}
                  disabled={isSubmitting}
                  data-testid="input-organisation"
                />
                {validationErrors.organisationName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.organisationName}</p>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  id="contact-role"
                  value={form.rolePosition}
                  onChange={(e) => setField("rolePosition", e.target.value)}
                  placeholder="Role / position *"
                  className={cn(
                    contactInputClass,
                    triggerErrorClass("rolePosition") || "border-gray-200 focus:border-gray-700"
                  )}
                  disabled={isSubmitting}
                  data-testid="input-role"
                />
                {validationErrors.rolePosition && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.rolePosition}</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Your requirements */}
        <div className="space-y-6">
          <h3 className="font-serif text-lg font-normal text-primary border-b border-gray-100 pb-2">
            Your requirements
          </h3>

          <div>
            <p className={cn(contactSectionHelperClass, "mb-1")}>
              Estimated number of guests *
            </p>
            <div className="pt-2 space-y-3">
              <div className="flex justify-between text-sm font-medium text-primary">
                <span>{GUESTS_MIN}</span>
                <span data-testid="guests-display" className="tabular-nums">
                  {formatGuests(form.estimatedGuests)} guests
                </span>
                <span>{GUESTS_MAX}+</span>
              </div>
              <Slider
                value={[form.estimatedGuests]}
                onValueChange={(v) => {
                  const next = Math.min(
                    GUESTS_MAX,
                    Math.max(GUESTS_MIN, v[0] ?? form.estimatedGuests)
                  );
                  setForm((prev) => ({ ...prev, estimatedGuests: next }));
                }}
                min={GUESTS_MIN}
                max={GUESTS_MAX}
                step={1}
                disabled={isSubmitting}
                className="w-full"
                data-testid="slider-guests"
              />
            </div>
          </div>

          <div>
            <Select
              value={form.intendedUse || undefined}
              onValueChange={(v) => setField("intendedUse", v)}
              disabled={isSubmitting}
            >
              <SelectTrigger
                className={cn(contactSelectTriggerClass, triggerErrorClass("intendedUse"))}
                data-testid="select-intended-use"
              >
                <SelectValue placeholder="Intended use of property *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accommodation_only">Accommodation only</SelectItem>
                <SelectItem value="accommodation_hosting">
                  Accommodation with executive hosting / hospitality
                </SelectItem>
              </SelectContent>
            </Select>
            {validationErrors.intendedUse && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.intendedUse}</p>
            )}
          </div>
        </div>

        {/* Previous events */}
        <div className="space-y-6">
          <h3 className="font-serif text-lg font-normal text-primary border-b border-gray-100 pb-2">
            Experience
          </h3>
          <p className={cn(contactSectionHelperClass, "-mt-2")}>
            Have you previously organised accommodation for a major sporting or corporate event?
          </p>
          <Select
            value={form.previousMajorEvent === "" ? undefined : form.previousMajorEvent}
            onValueChange={(v) => setField("previousMajorEvent", v as "yes" | "no")}
            disabled={isSubmitting}
          >
            <SelectTrigger className={contactSelectTriggerClass} data-testid="select-previous-event">
              <SelectValue placeholder="Optional - select if you would like to answer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
          {form.previousMajorEvent !== "" && (
            <button
              type="button"
              className={cn(
                contactSectionHelperClass,
                "mt-2 underline underline-offset-2 hover:text-primary"
              )}
              onClick={() => setField("previousMajorEvent", "")}
              disabled={isSubmitting}
            >
              Clear answer
            </button>
          )}
        </div>

        {/* Budget */}
        <div className="space-y-6">
          <h3 className="font-serif text-lg font-normal text-primary border-b border-gray-100 pb-2">
            Budget
          </h3>
          <p className={cn(contactSectionHelperClass, "-mt-2 max-w-xl")}>
            What is your approximate budget?
          </p>
          <div className="pt-2 space-y-3">
            <div className="flex justify-between text-sm font-medium text-primary">
              <span>€50k</span>
              <span data-testid="budget-display" className="tabular-nums">
                {formatBudgetThousands(form.budgetEurosK)}
              </span>
              <span>€1M+</span>
            </div>
            <Slider
              value={[form.budgetEurosK]}
              onValueChange={(v) => {
                const next = Math.min(1000, Math.max(50, v[0] ?? form.budgetEurosK));
                setForm((prev) => ({ ...prev, budgetEurosK: next }));
              }}
              min={50}
              max={1000}
              step={5}
              disabled={isSubmitting}
              className="w-full"
              data-testid="slider-budget"
            />
          </div>
        </div>

        {/* Properties + notes */}
        <div className="space-y-6">
          <h3 className="font-serif text-lg font-normal text-primary border-b border-gray-100 pb-2">
            {primaryPropertyId && primaryProperty ? "Properties" : "Your preferences"}
          </h3>

          {primaryPropertyId && primaryProperty ? (
            <>
              <div className="space-y-2">
                <p className={contactSectionHelperClass}>Property you&apos;re enquiring about</p>
                <div className="flex gap-3 border border-gray-200 bg-muted/20 p-3 rounded-none">
                  {primaryProperty.thumbnail || primaryProperty.images[0] ? (
                    <img
                      src={primaryProperty.thumbnail ?? primaryProperty.images[0]}
                      alt=""
                      className="h-14 w-[4.5rem] shrink-0 object-cover rounded-sm"
                      width={72}
                      height={56}
                      loading="lazy"
                    />
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-primary leading-snug">{primaryProperty.name}</p>
                    <p className={cn(contactSectionHelperClass, "mt-1 leading-snug line-clamp-2")}>
                      {primaryProperty.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className={cn(contactSectionHelperClass, "mb-2")}>
                  Additional properties (optional)
                </p>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      data-testid="button-additional-properties"
                      className={contactPickerButtonClass}
                    >
                      <span
                        className={
                          additionalSelectedCount === 0
                            ? "font-normal text-gray-400"
                            : "font-medium text-primary"
                        }
                      >
                        {additionalSelectedCount === 0
                          ? `Select additional homes - ${additionalPropertiesList.length} other properties`
                          : `${additionalSelectedCount} additional propert${additionalSelectedCount === 1 ? "y" : "ies"} selected`}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[min(100vw-2rem,28rem)] max-h-72 overflow-y-auto p-2"
                    align="start"
                  >
                    <ul className="space-y-1">
                      {additionalPropertiesList.map((prop) => {
                        const thumb = prop.thumbnail ?? prop.images[0];
                        const checked = selectedPropertyIds.has(prop.id);
                        return (
                          <li key={prop.id}>
                            <label className="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 hover:bg-muted/60">
                              <Checkbox
                                checked={checked}
                                onCheckedChange={() => toggleProperty(prop.id)}
                                disabled={isSubmitting}
                                id={`prop-add-${prop.id}`}
                              />
                              {thumb ? (
                                <img
                                  src={thumb}
                                  alt=""
                                  className="h-12 w-16 shrink-0 object-cover rounded-sm"
                                  width={64}
                                  height={48}
                                  loading="lazy"
                                />
                              ) : null}
                              <span className="text-sm leading-snug">{prop.name}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
            </>
          ) : (
            <div>
              <p className={cn(contactSectionHelperClass, "mb-2")}>
                Preferred property or properties *
              </p>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    data-testid="button-preferred-properties"
                    className={cn(
                      contactPickerButtonClass,
                      triggerErrorClass("preferredProperties") || "border-gray-200 focus:border-gray-700"
                    )}
                  >
                    <span
                      className={
                        selectedPropertyIds.size === 0
                          ? "font-normal text-gray-400"
                          : "font-medium text-primary"
                      }
                    >
                      {selectedPropertyIds.size === 0
                        ? `Select one or more - ${properties.length} properties`
                        : `${selectedPropertyIds.size} propert${selectedPropertyIds.size === 1 ? "y" : "ies"} selected`}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[min(100vw-2rem,28rem)] max-h-72 overflow-y-auto p-2"
                  align="start"
                >
                  <ul className="space-y-1">
                    {properties.map((prop) => {
                      const thumb = prop.thumbnail ?? prop.images[0];
                      const checked = selectedPropertyIds.has(prop.id);
                      return (
                        <li key={prop.id}>
                          <label className="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 hover:bg-muted/60">
                            <Checkbox
                              checked={checked}
                              onCheckedChange={() => toggleProperty(prop.id)}
                              disabled={isSubmitting}
                              id={`prop-${prop.id}`}
                            />
                            {thumb ? (
                              <img
                                src={thumb}
                                alt=""
                                className="h-12 w-16 shrink-0 object-cover rounded-sm"
                                width={64}
                                height={48}
                                loading="lazy"
                              />
                            ) : null}
                            <span className="text-sm leading-snug">{prop.name}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </PopoverContent>
              </Popover>
              {validationErrors.preferredProperties && (
                <p className="text-red-500 text-sm mt-1" data-testid="preferred-properties-error">
                  {validationErrors.preferredProperties}
                </p>
              )}
            </div>
          )}

          <div>
            <Textarea
              id="contact-notes"
              value={form.additionalNotes}
              onChange={(e) => setField("additionalNotes", e.target.value)}
              placeholder="Additional notes"
              className={cn(
                contactInputClass,
                "min-h-[120px] border-gray-200 focus:border-gray-700 resize-none"
              )}
              disabled={isSubmitting}
              data-testid="textarea-notes"
            />
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          <p className={contactSectionHelperClass}>
            We use what you submit here only to assess and respond to your enquiry about our properties,
            including any follow-up. How we process personal data is explained in our{" "}
            <Link href="/privacy" className="text-primary underline underline-offset-2 hover:no-underline">
              Privacy Policy
            </Link>
            . Optional cookies are described there too; you can update those choices anytime using{" "}
            <button
              type="button"
              onClick={openPreferences}
              className="inline p-0 text-sm font-normal text-primary underline underline-offset-2 hover:no-underline bg-transparent border-0 cursor-pointer align-baseline"
            >
              Cookie settings
            </button>
            .
          </p>
          <div className="flex gap-2 items-start">
            <Checkbox
              id="contact-privacy-consent"
              checked={form.privacyConsent}
              onCheckedChange={(v) => setField("privacyConsent", v === true)}
              disabled={isSubmitting}
              className="mt-0.5"
              data-testid="checkbox-privacy-consent"
            />
            <label
              htmlFor="contact-privacy-consent"
              className={cn(contactSectionHelperClass, "text-primary leading-snug cursor-pointer")}
            >
              I have read the{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 hover:no-underline"
                onClick={(e) => e.stopPropagation()}
              >
                Privacy Policy
              </Link>{" "}
              and consent to you processing my personal data for this enquiry.
              <span className="text-red-500">*</span>
            </label>
          </div>
          {validationErrors.privacyConsent && (
            <p className="text-red-500 text-sm">{validationErrors.privacyConsent}</p>
          )}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full border border-gray-700 bg-gray-700 text-white px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-transparent hover:!text-gray-700 transition-all duration-200"
            disabled={isSubmitting}
            data-testid={submitButtonTestId}
          >
            {isSubmitting ? "Sending..." : "Send request"}
          </Button>
        </div>
      </form>
    </div>
  );
}
