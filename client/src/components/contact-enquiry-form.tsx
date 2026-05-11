import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
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
  "Due to the calibre and scarcity of these properties, all enquiries are reviewed on a selective basis. Suitable enquiries will be contacted to discuss options in more detail.",
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

const selectTriggerClass =
  "w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-sm font-normal data-[placeholder]:text-gray-400 data-[placeholder]:font-normal focus:border-gray-700 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0";

function formatBudgetThousands(k: number): string {
  if (k >= 1000) return "€1M+";
  return `€${k}k`;
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
    estimatedGuests: "",
    intendedUse: "",
    programmeStatus: "",
    previousMajorEvent: "" as "" | "yes" | "no",
    budgetEurosK: 525,
    additionalNotes: "",
  };
}

export type ContactEnquiryFormProps = {
  heading: "h1" | "h2";
  introTestId: string;
  submitButtonTestId: string;
  headingClassName?: string;
};

export function ContactEnquiryForm({
  heading,
  introTestId,
  submitButtonTestId,
  headingClassName = "font-serif text-4xl font-normal text-primary mb-4",
}: ContactEnquiryFormProps) {
  const [form, setForm] = useState(getInitialFormState);
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<Set<string>>(() => new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

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

    if (!form.estimatedGuests) {
      errors.estimatedGuests = "Please select an estimated guest range";
    }
    if (!form.intendedUse) {
      errors.intendedUse = "Please select intended use";
    }
    if (!form.programmeStatus) {
      errors.programmeStatus = "Please select how you would describe your requirement";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const toggleProperty = (id: string) => {
    setSelectedPropertyIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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

    const preferredPropertiesSummary = Array.from(selectedPropertyIds).map((id) => {
      const p = properties.find((x) => x.id === id);
      return p ? `${p.name} (${p.id})` : id;
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
      intendedUse: form.intendedUse,
      programmeStatus: form.programmeStatus,
      previousMajorEventAccommodation: form.previousMajorEvent || null,
      budgetEurosThousands: form.budgetEurosK,
      budgetLabel: formatBudgetThousands(form.budgetEurosK),
      preferredPropertyIds: Array.from(selectedPropertyIds),
      preferredPropertiesSummary,
      additionalNotes: form.additionalNotes.trim(),
      message: form.additionalNotes.trim(),
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
        setSelectedPropertyIds(new Set());
        setValidationErrors({});
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
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-left mb-12">
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
          className="text-sm text-secondary leading-relaxed mb-10 max-w-xl space-y-3"
          data-testid={introTestId}
        >
          {CONTACT_FORM_SUBTITLE_PARAGRAPHS.map((p) => (
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
                "w-full border-0 border-b rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
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
                "w-full border-0 border-b rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
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
                      "w-full border-0 border-b rounded-none bg-transparent px-0 py-4 text-xs sm:text-sm font-normal data-[placeholder]:text-gray-400 data-[placeholder]:font-normal focus:border-gray-700 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 [&>span]:line-clamp-1 [&>span]:text-left",
                      triggerErrorClass("phoneExtension") || "border-gray-200 focus:border-gray-700"
                    )}
                    data-testid="select-phone-extension"
                  >
                    <SelectValue placeholder="Code *" />
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
                    "w-full border-0 border-b rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
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
                className={cn(selectTriggerClass, triggerErrorClass("enquiryType"))}
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
                    "w-full border-0 border-b rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
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
                    "w-full border-0 border-b rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
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
            <Select
              value={form.estimatedGuests || undefined}
              onValueChange={(v) => setField("estimatedGuests", v)}
              disabled={isSubmitting}
            >
              <SelectTrigger
                className={cn(selectTriggerClass, triggerErrorClass("estimatedGuests"))}
                data-testid="select-guests"
              >
                <SelectValue placeholder="Estimated number of guests *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2-4">2–4</SelectItem>
                <SelectItem value="5-8">5–8</SelectItem>
                <SelectItem value="9-12">9–12</SelectItem>
                <SelectItem value="13-plus">13+</SelectItem>
              </SelectContent>
            </Select>
            {validationErrors.estimatedGuests && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.estimatedGuests}</p>
            )}
          </div>

          <div>
            <Select
              value={form.intendedUse || undefined}
              onValueChange={(v) => setField("intendedUse", v)}
              disabled={isSubmitting}
            >
              <SelectTrigger
                className={cn(selectTriggerClass, triggerErrorClass("intendedUse"))}
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

        {/* Programme status */}
        <div className="space-y-6">
          <h3 className="font-serif text-lg font-normal text-primary border-b border-gray-100 pb-2">
            Programme status
          </h3>

          <div>
            <Select
              value={form.programmeStatus || undefined}
              onValueChange={(v) => setField("programmeStatus", v)}
              disabled={isSubmitting}
            >
              <SelectTrigger
                className={cn(selectTriggerClass, triggerErrorClass("programmeStatus"))}
                data-testid="select-programme-status"
              >
                <SelectValue placeholder="How would you best describe your requirement? *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exploring">Exploring options</SelectItem>
                <SelectItem value="actively_planning_ryder_2027">
                  Actively planning for Ryder Cup 2027
                </SelectItem>
                <SelectItem value="ready_to_secure">Ready to secure accommodation</SelectItem>
              </SelectContent>
            </Select>
            {validationErrors.programmeStatus && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.programmeStatus}</p>
            )}
          </div>
        </div>

        {/* Previous events */}
        <div className="space-y-6">
          <h3 className="font-serif text-lg font-normal text-primary border-b border-gray-100 pb-2">
            Experience
          </h3>
          <p className="text-xs text-muted-foreground -mt-2">
            Have you previously organised accommodation for a major sporting or corporate event?
          </p>
          <Select
            value={form.previousMajorEvent === "" ? undefined : form.previousMajorEvent}
            onValueChange={(v) => setField("previousMajorEvent", v as "yes" | "no")}
            disabled={isSubmitting}
          >
            <SelectTrigger className={selectTriggerClass} data-testid="select-previous-event">
              <SelectValue placeholder="Optional — select if you would like to answer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
          {form.previousMajorEvent !== "" && (
            <button
              type="button"
              className="mt-2 text-xs text-muted-foreground underline underline-offset-2 hover:text-primary"
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
          <p className="text-xs text-muted-foreground -mt-2 max-w-xl">
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
            Your preferences
          </h3>

          <div>
            <p className="text-xs text-muted-foreground mb-2">
              Preferred property or properties (optional)
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  disabled={isSubmitting}
                  data-testid="button-preferred-properties"
                  className={cn(
                    "flex w-full items-center justify-between border-0 border-b border-gray-200 bg-transparent py-4 text-left text-sm outline-none focus:border-gray-700 disabled:opacity-50"
                  )}
                >
                  <span
                    className={
                      selectedPropertyIds.size === 0
                        ? "font-normal text-gray-400"
                        : "font-normal text-primary"
                    }
                  >
                    {selectedPropertyIds.size === 0
                      ? `Select one or more — ${properties.length} properties`
                      : `${selectedPropertyIds.size} propert${selectedPropertyIds.size === 1 ? "y" : "ies"} selected`}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[min(100vw-2rem,28rem)] max-h-72 overflow-y-auto p-2" align="start">
                <ul className="space-y-1">
                  {properties.map((property) => {
                    const thumb = property.thumbnail ?? property.images[0];
                    const checked = selectedPropertyIds.has(property.id);
                    return (
                      <li key={property.id}>
                        <label className="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 hover:bg-muted/60">
                          <Checkbox
                            checked={checked}
                            onCheckedChange={() => toggleProperty(property.id)}
                            disabled={isSubmitting}
                            id={`prop-${property.id}`}
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
                          <span className="text-sm leading-snug">{property.name}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Textarea
              id="contact-notes"
              value={form.additionalNotes}
              onChange={(e) => setField("additionalNotes", e.target.value)}
              placeholder="Additional notes"
              className="w-full min-h-[120px] border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:border-gray-700 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
              disabled={isSubmitting}
              data-testid="textarea-notes"
            />
          </div>
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
