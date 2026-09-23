import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { formatPropertyBedroomsShort, getPropertyCollectionBadge, getListedProperties, sortPropertiesByCollectionTier } from "@/lib/properties";
import PropertyAvailabilityBadge from "@/components/property-availability-badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "wouter";
import { getStaticRouteSEOByPath, toUseSEOArgs } from "@/lib/prerender-route-meta";
import { useSEO } from "@/hooks/use-seo";
import { useMemo, useState } from "react";
import { deriveFilterBounds, getDistanceToGolfCourseMiles, getPropertyMaxGuests, getPropertyTier, type PropertyTier } from "@/lib/property-filtering";
import { Menu } from "lucide-react";

// Coming Soon Card Component
function ComingSoonCard() {
  return (
    <div className="property-card bg-neutral-100 overflow-hidden border-0 shadow-none" data-testid="coming-soon-card">
      <div className="relative aspect-[16/9]">
        <img 
          src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&h=800"
          alt="Coming Soon Property"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-lg font-medium uppercase tracking-wider">COMING SOON</div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-muted uppercase tracking-wider font-medium">
            &nbsp;
          </div>
          <div className="text-xs text-muted uppercase tracking-wider font-medium">
            &nbsp;
          </div>
        </div>
        
        <h3 className="font-serif text-xl font-normal mb-2 text-primary">
          Additional Properties Coming Soon
        </h3>
        
        <p className="text-secondary text-sm leading-relaxed mb-6">
          Additional properties will be added to our collection soon. Stay tuned for more exceptional accommodations for Ryder Cup 2027.
        </p>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  // All properties are now in the main properties array (excluding temporarily hidden ones)
  const all = sortPropertiesByCollectionTier(getListedProperties());
  const bounds = useMemo(() => deriveFilterBounds(all), [all]);
  const DEFAULT_MAX_DISTANCE_MI = 50;
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [maxDistanceMiles, setMaxDistanceMiles] = useState(DEFAULT_MAX_DISTANCE_MI);
  const [minGuests, setMinGuests] = useState(1);
  const [minBedrooms, setMinBedrooms] = useState(1);
  const [selectedTiers, setSelectedTiers] = useState<Record<PropertyTier, boolean>>({
    EXECUTIVE: true,
    DELUXE: true,
    PREMIUM: true,
  });

  const activeTierCount = Object.values(selectedTiers).filter(Boolean).length;
  const allTiersSelected = activeTierCount === 3;
  const hasFiltersApplied =
    maxDistanceMiles < DEFAULT_MAX_DISTANCE_MI ||
    minGuests > 1 ||
    minBedrooms > 1 ||
    !allTiersSelected;

  const filteredProperties = useMemo(() => {
    return all.filter((property) => {
      const tier = getPropertyTier(property);
      if (!selectedTiers[tier]) return false;
      if (getDistanceToGolfCourseMiles(property) > maxDistanceMiles) return false;
      if (getPropertyMaxGuests(property) < minGuests) return false;
      if (property.bedrooms < minBedrooms) return false;
      return true;
    });
  }, [all, maxDistanceMiles, minGuests, minBedrooms, selectedTiers]);

  const resetFilters = () => {
    setMaxDistanceMiles(DEFAULT_MAX_DISTANCE_MI);
    setMinGuests(1);
    setMinBedrooms(1);
    setSelectedTiers({
      EXECUTIVE: true,
      DELUXE: true,
      PREMIUM: true,
    });
  };

  useSEO(toUseSEOArgs(getStaticRouteSEOByPath("/properties")!));

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />

      <main className="pt-24 pb-16 px-6 bg-neutral-100">
        {/* Header Section - Full Width */}
        <section className="bg-white py-12 mb-12 -mx-6 px-6 -mt-24 pt-24 border-b border-gray-200">
          <div className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-4">
              Properties near Adare Manor
            </h1>
            <p className="text-base text-secondary leading-relaxed max-w-3xl mx-auto">
              Private houses and estates for rent near Adare Manor: from golf village and demesne settings through
              to upscale executive retreats minutes from the championship course. Ideal for sponsors, corporate
              groups, and guests who want a whole-home private rental during tournament week.
            </p>
            <p className="text-base text-secondary leading-relaxed max-w-3xl mx-auto mt-4">
              <Link href="/services" className="underline underline-offset-4 hover:text-gray-900">
                Estate services
              </Link>
              {" · "}
              <Link href="/contact" className="underline underline-offset-4 hover:text-gray-900">
                Contact us
              </Link>
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-12 px-2 text-secondary text-sm leading-relaxed space-y-4 text-center">
          <h2 className="font-serif text-xl text-primary text-center">Planning your stay near Adare Manor</h2>
          <p>
            Our rental homes include multiple bedrooms, fully equipped kitchens, private parking, guest wifi, and
            amenities suited to golf travel and hosted events. Proximity to the course varies by property, from
            walking distance on the demesne to executive homes near Galway and Limerick with chauffeur access to
            the tournament venue.
          </p>
          <p>
            Booking is personal: we confirm availability, guest limits, house rules, and payment terms before you
            reserve.
          </p>
        </section>

        <div className="max-w-[2000px] mx-auto mb-8 flex flex-wrap items-center gap-3">
          <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-none text-xs uppercase tracking-wider flex items-center gap-2">
                <Menu className="h-4 w-4" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-none">
              <DialogHeader>
                <DialogTitle>Filters</DialogTitle>
                <DialogDescription>
                  Refine by distance to the golf course, minimum guests, bedrooms, and collection tier.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs uppercase tracking-wider text-primary">Distance to Golf Course</Label>
                    <span className="text-xs text-secondary">{maxDistanceMiles} mi max</span>
                  </div>
                  <Slider
                    value={[maxDistanceMiles]}
                    onValueChange={(value) => setMaxDistanceMiles(value[0] ?? DEFAULT_MAX_DISTANCE_MI)}
                    min={1}
                    max={DEFAULT_MAX_DISTANCE_MI}
                    step={1}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs uppercase tracking-wider text-primary">Minimum Guests</Label>
                    <span className="text-xs text-secondary">{minGuests}+</span>
                  </div>
                  <Slider
                    value={[minGuests]}
                    onValueChange={(value) => setMinGuests(value[0] ?? 1)}
                    min={1}
                    max={bounds.maxGuests}
                    step={1}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs uppercase tracking-wider text-primary">Minimum Bedrooms</Label>
                    <span className="text-xs text-secondary">{minBedrooms}+</span>
                  </div>
                  <Slider
                    value={[minBedrooms]}
                    onValueChange={(value) => setMinBedrooms(value[0] ?? 1)}
                    min={1}
                    max={bounds.maxBedrooms}
                    step={1}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-xs uppercase tracking-wider text-primary">Collection Tier</Label>
                  <div className="space-y-2">
                    {(["EXECUTIVE", "DELUXE", "PREMIUM"] as const).map((tier) => (
                      <label key={tier} className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                        <Checkbox
                          checked={selectedTiers[tier]}
                          onCheckedChange={(checked) =>
                            setSelectedTiers((prev) => ({ ...prev, [tier]: checked === true }))
                          }
                        />
                        <span className="text-secondary">{tier}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    resetFilters();
                    setFiltersOpen(false);
                  }}
                  className="w-full rounded-none text-xs uppercase tracking-wider"
                >
                  Clear filters
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {hasFiltersApplied ? (
            <>
              {maxDistanceMiles < DEFAULT_MAX_DISTANCE_MI ? (
                <div className="text-xs uppercase tracking-wider text-secondary border border-gray-200 px-3 py-2 bg-white">
                  Up to {maxDistanceMiles} mi
                </div>
              ) : null}
              {minGuests > 1 ? (
                <div className="text-xs uppercase tracking-wider text-secondary border border-gray-200 px-3 py-2 bg-white">
                  {minGuests}+ guests
                </div>
              ) : null}
              {minBedrooms > 1 ? (
                <div className="text-xs uppercase tracking-wider text-secondary border border-gray-200 px-3 py-2 bg-white">
                  {minBedrooms}+ bedrooms
                </div>
              ) : null}
              {!allTiersSelected ? (
                <div className="text-xs uppercase tracking-wider text-secondary border border-gray-200 px-3 py-2 bg-white">
                  {activeTierCount} tier{activeTierCount === 1 ? "" : "s"} selected
                </div>
              ) : null}
            </>
          ) : null}

          <div className="ml-auto text-xs uppercase tracking-wider text-primary">
            {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"}
          </div>
        </div>

        {/* Property Grid Section */}
        <div className="max-w-[2000px] mx-auto grid md:grid-cols-3 gap-6">
          {filteredProperties.map((p) => (
            <Link key={p.id} href={`/property/${p.id}`}>
              <div className="property-card bg-neutral-100 overflow-hidden border-0 shadow-none cursor-pointer group">
                <div className="relative aspect-[16/9]">
                  <img
                    src={p.thumbnail || p.images[0]}
                    alt={`${p.name} - Ryder Cup 2027 accommodation at Adare Manor`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 right-0 z-20 cursor-pointer">
                    <div className="bg-white bg-opacity-50 backdrop-blur-sm px-4 py-2">
                      <div className="text-xs font-medium text-gray-900 uppercase tracking-wider font-sans">
                        {getPropertyCollectionBadge(p.id)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-muted uppercase tracking-wider font-medium">
                      {formatPropertyBedroomsShort(p)} BEDROOMS
                    </div>
                    <PropertyAvailabilityBadge property={p} />
                  </div>
                  <h3 className="font-serif text-xl font-normal mb-2 text-primary">{p.name}</h3>
                  <p className="text-secondary text-sm leading-relaxed mb-6">{p.description}</p>
                  <div className="space-y-3">
                    <Button
                      className="border border-gray-700 bg-transparent text-gray-700 px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-gray-700 hover:!text-white transition-all duration-200 w-full"
                    >
                      DISCOVER MORE
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {filteredProperties.length > 0 ? (
            <ComingSoonCard />
          ) : (
            <div className="md:col-span-3 border border-gray-200 bg-white p-10 text-center">
              <h3 className="font-serif text-2xl text-primary mb-2">No matching properties</h3>
              <p className="text-secondary text-sm mb-6">
                Try widening the distance or lowering guest and bedroom requirements.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={resetFilters}
                className="rounded-none text-xs uppercase tracking-wider"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>

        <nav
          aria-label="All property listings"
          className="max-w-[2000px] mx-auto mt-12 pt-10 border-t border-gray-200"
        >
          <h2 className="font-serif text-lg font-normal text-primary mb-4 text-center">
            Browse every property
          </h2>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm list-none px-2">
            {filteredProperties.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/property/${p.id}`}
                  className="text-secondary hover:text-gray-900 underline-offset-4 hover:underline"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <Footer />
    </div>
  );
}


