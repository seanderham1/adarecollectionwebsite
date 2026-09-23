/**
 * Validates VacationRental / LodgingBusiness JSON-LD for every property listing.
 * Run: npx tsx scripts/validate-property-structured-data.ts
 */
import { validateAllPropertyListings } from "../client/src/lib/property-structured-data";

const results = validateAllPropertyListings();
const failed = results.filter((r) => !r.ok);

console.log("Property structured data validation\n");
console.log(
  "id".padEnd(20),
  "gallery".padStart(7),
  "schema".padStart(7),
  "type".padEnd(16),
  "status",
);
console.log("-".repeat(60));

for (const r of results) {
  console.log(
    r.id.padEnd(20),
    String(r.galleryImages).padStart(7),
    String(r.schemaImageCount).padStart(7),
    r.schemaType.padEnd(16),
    r.ok ? "OK" : `FAIL: ${r.issues.join("; ")}`,
  );
}

console.log("-".repeat(60));
console.log(
  `Total: ${results.length} | VacationRental: ${results.filter((r) => r.schemaType === "VacationRental").length} | LodgingBusiness: ${results.filter((r) => r.schemaType === "LodgingBusiness").length} | Failed: ${failed.length}`,
);

if (failed.length > 0) {
  process.exit(1);
}
