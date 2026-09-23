import {
  getPropertyAvailabilityLabel,
  type Property,
} from "@/lib/properties";

export default function PropertyAvailabilityBadge({
  property,
}: {
  property: Pick<Property, "availabilityStatus">;
}) {
  const status = getPropertyAvailabilityLabel(property);

  return (
    <div className="inline-flex items-center gap-1 text-xs text-muted uppercase tracking-wider font-medium leading-none">
      {status}
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 translate-y-[-0.5px] ${
          status === "RESERVED" ? "bg-yellow-400" : "bg-green-500"
        }`}
        aria-hidden="true"
      />
    </div>
  );
}
