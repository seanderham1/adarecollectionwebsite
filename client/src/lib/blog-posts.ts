export type BlogPostSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPostExternalLink = {
  label: string;
  url: string;
};

export type BlogPostImageCredit = {
  label: string;
  url: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  readTimeMinutes: number;
  heroImage: string;
  imageCredit?: BlogPostImageCredit;
  keywords: string;
  sections: BlogPostSection[];
  externalLinks?: BlogPostExternalLink[];
};

const blogPosts: BlogPost[] = [
  {
    slug: "adare-village-railway-station-returns-ryder-cup",
    title: "Adare Welcomes Back the Railway for Ryder Cup 2027",
    excerpt:
      "After more than six decades without a local passenger stop, Adare is preparing a temporary train station beside the revived Limerick to Foynes line to welcome Ryder Cup spectators to the village and Adare Manor.",
    publishedAt: "2026-07-08",
    category: "TRANSPORT",
    readTimeMinutes: 7,
    heroImage: "/images/blog/train-station-image.webp",
    keywords:
      "Adare railway station, Ryder Cup 2027 train, Adare village transport, Limerick Foynes rail line, temporary Adare station, Irish Rail Ryder Cup shuttle, Adare Manor spectators",
    sections: [
      {
        paragraphs: [
          "In the picturesque village of Adare, County Limerick, anticipation is building as Adare Manor prepares to host the Ryder Cup in September 2027. For local residents and visitors alike, one of the most symbolic projects underway is not on the golf course but beside the railway: a temporary passenger station being built to bring spectators to the tournament by train for the first time in generations.",
        ],
      },
      {
        heading: "A station that closed in 1963",
        paragraphs: [
          "Adare's original railway station dates to the mid nineteenth century, when the line through the village formed part of the wider rail network serving County Limerick. Passenger services ended on 4 February 1963, one of many station closures across Ireland as car ownership grew and branch lines lost viability.",
          "For more than sixty years, Adare has had no local stop for passengers. Villagers and guests travelling by rail have relied on Limerick Colbert, Limerick Junction, or road access instead. That long absence makes the return of passenger rail, even on a temporary basis for tournament week, a notable moment in the village's modern history.",
        ],
      },
      {
        heading: "Why a temporary station is being built",
        paragraphs: [
          "The Ryder Cup is expected to draw tens of thousands of spectators to Adare Manor across tournament week. Moving large numbers of people by road alone would place heavy pressure on local routes, even with the Adare bypass and park and ride plans in place.",
          "Iarnród Éireann has begun construction on a temporary station at Adare consisting of a platform and external concourse. Works are expected to take around six months and are being delivered by Cara Plant Hire Limited, with funding from the Department of Transport through the National Transport Authority (NTA).",
          "The project sits alongside the reinstatement of the 42km Limerick to Foynes freight line, a major infrastructure programme scheduled for completion in October 2026. Track laying on that corridor was completed in 2025, with signalling, telecommunications, level crossing upgrades, and refurbishment at Foynes station continuing through 2026. Once commissioned, the line will connect to the existing network at Limerick, opening the corridor needed for Ryder Cup shuttle services.",
        ],
      },
      {
        heading: "How spectators will reach Adare by train",
        paragraphs: [
          "Ryder Cup special rail services are expected to operate outside normal timetable hours, using the existing fleet on a shuttle between Limerick Junction and the temporary Adare station on the reinstated Foynes line.",
          "Limerick Junction will be the main interchange. Direct trains from Dublin Heuston and Cork Kent connect there, allowing spectators from major cities to change onto the Adare shuttle for the final leg. Official Ryder Cup transport guidance estimates the shuttle journey from Limerick Junction to Adare Manor at around 45 minutes, with a short walk from the temporary station to the tournament gates.",
          "There will not be a direct train service from Limerick Colbert to Adare. The current railway layout links the Foynes line to the Limerick to Limerick Junction route rather than from Colbert station. Visitors based in Limerick city or arriving from Galway via Colbert are expected to use dedicated shuttle buses from Colbert to the venue, a journey of roughly 35 to 40 minutes according to official estimates.",
        ],
      },
      {
        heading: "A full circle moment for the village",
        paragraphs: [
          "For Adare, the temporary station is more than platforms and track. It represents the village reconnecting with a part of its transport heritage at a moment when the world's attention turns to the Manor and the Maigue valley.",
          "Construction crews are progressing the physical works while local businesses, accommodation providers, and community groups prepare for an influx of international guests. The aim is practical: move spectators efficiently and reduce road congestion. The effect is also cultural, as a settlement that lost its passenger railway in 1963 prepares to greet arriving trains again, if only for Ryder week.",
          "When the first shuttle services pull in beside the village, they will carry not only ticket holders bound for the Ryder Cup, but a sense of occasion that many in Adare have waited decades to see return.",
        ],
      },
      {
        heading: "Planning your Ryder Cup stay in Adare",
        paragraphs: [
          "If you are travelling to the tournament by train, bus, or car, choosing accommodation in or near Adare village can simplify your daily journey to the venue. Our portfolio of private luxury residences ranges from homes within walking distance of Adare Manor to executive properties a short drive away, suited to groups who want space, privacy, and local access throughout Ryder Cup week.",
          "Browse our properties, explore Ryder Cup packages, or contact us to discuss availability and guest requirements while transport timetables for September 2027 are finalised.",
        ],
      },
    ],
    externalLinks: [
      {
        label: "Iarnród Éireann: Temporary Adare station works",
        url: "https://www.irishrail.ie/en-ie/news/works-on-temporary-adare-station-for-ryder-cup-begins",
      },
      {
        label: "Ryder Cup 2027 Transport",
        url: "https://www.rydercup.com/attend/transport",
      },
      {
        label: "Adare Village: Ryder Cup rail plans",
        url: "https://www.adarevillage.com/2026/03/07/major-ryder-cup-rail-surprise-revealed-for-limerick-passengers/",
      },
    ],
  },
  {
    slug: "adare-ryder-cup-railway-line",
    title: "New Railway Line for Ryder Cup 2027 Spectators",
    excerpt:
      "Construction has started on a temporary train station at Adare to support thousands of Ryder Cup spectators, alongside the reinstatement of the Limerick to Foynes rail line due for completion in October 2026.",
    publishedAt: "2026-06-10",
    category: "TRANSPORT",
    readTimeMinutes: 5,
    heroImage: "/images/blog/train-image.webp",
    imageCredit: {
      label: "Unsplash",
      url: "https://unsplash.com/photos/a-green-train-traveling-past-a-train-station-Da470r6sM2Y",
    },
    keywords:
      "Ryder Cup 2027 transport, Adare train station, Limerick Junction shuttle, Limerick Foynes rail line, Iarnród Éireann Ryder Cup, spectator travel Adare Manor",
    sections: [
      {
        paragraphs: [
          "Iarnród Éireann has confirmed that construction has started on a temporary station at Adare, set to support thousands of spectators travelling to and from the Ryder Cup at Adare Manor in September 2027. The project is being progressed alongside the reinstatement of the Limerick to Foynes Freight Line, which is expected to be complete in October 2026.",
        ],
      },
      {
        heading: "Temporary Adare station",
        paragraphs: [
          "The temporary station consists of a platform and external concourse. Construction is expected to take approximately six months and is being delivered by Cara Plant Hire Limited, with funding from the Department of Transport through the National Transport Authority (NTA).",
          "Iarnród Éireann is working closely with the NTA to support the overall public transport plan for the Ryder Cup. The station will enable spectators arriving by rail to reach the tournament venue once services begin operating for the event.",
        ],
      },
      {
        heading: "Ryder Cup rail services",
        paragraphs: [
          "It is likely that Ryder Cup special rail services will operate outside of regular timetable hours and will utilise the existing train fleet, running a shuttle service between Limerick Junction and Adare on the reinstated Foynes rail line.",
          "Interchanges: Limerick Junction is the central hub. Direct trains from major cities like Dublin and Cork will connect passengers to the local shuttle for the final leg to the tournament.",
          "The shuttle will meet trains from Dublin and Cork at Limerick Junction, where passengers can interchange, supporting thousands of spectators in getting to and from the venue.",
        ],
      },
      {
        heading: "Travel times at a glance",
        paragraphs: [
          "From Dublin Heuston to Limerick Junction takes approximately 1 hour 30 minutes by direct train. From Cork Kent to Limerick Junction is around 55 minutes. The dedicated shuttle from Limerick Junction to Adare Manor takes approximately 45 minutes, with the temporary station a short distance to the Ryder Cup gates.",
          "For visitors travelling from Galway, the recommended route is via Limerick Colbert Station, with dedicated shuttle buses completing the journey to Adare Manor in roughly 35–40 minutes.",
        ],
      },
      {
        heading: "Planning your journey",
        paragraphs: [
          "Park and ride facilities will also operate across Limerick for those driving to the region, with shuttle buses connecting to the venue. For the most direct rail access, the Limerick Junction to Adare shuttle is the standout option for spectators arriving from Dublin, Cork, and other major Irish cities.",
        ],
      },
      {
        heading: "Need help with your Ryder Cup stay?",
        paragraphs: [
          "If you are planning to attend, we can help with accommodation options in the Limerick area, general travel routes from the UK to Ireland for the event, and guidance on making the most of your tournament week. Browse our luxury properties or get in touch to discuss your requirements.",
        ],
      },
    ],
    externalLinks: [
      {
        label: "Ryder Cup Transport & Parking",
        url: "https://www.rydercup.com/attend/transport",
      },
      {
        label: "Irish Rail",
        url: "https://www.irishrail.ie",
      },
    ],
  },
  {
    slug: "helicopter-landing-ryder-cup-2027",
    title: "Where Could I Land My Helicopter for the Ryder Cup 2027?",
    excerpt:
      "A guide to helicopter access for Ryder Cup 2027 at Adare Manor, from prior permission requirements and on-site heliport logistics to how most spectators will reach the venue.",
    publishedAt: "2026-06-05",
    category: "TRAVEL",
    readTimeMinutes: 6,
    heroImage: "/images/blog/helicopter-image.webp",
    imageCredit: {
      label: "Unsplash",
      url: "https://unsplash.com/photos/a-helicopter-flying-over-a-lush-green-field-SEnHrRXUozw",
    },
    keywords:
      "Ryder Cup 2027 helicopter, Adare Manor heliport, helicopter landing Adare, PPR Adare Manor, Shannon Airport helicopter",
    sections: [
      {
        paragraphs: [
          "For a select number of visitors, arriving by helicopter is one of the most direct ways to reach Adare Manor during Ryder Cup 2027. The venue sits in a noise-sensitive part of County Limerick, so landing is tightly managed, but a dedicated on-site heliport is planned for tournament week alongside the manor's existing private landing area.",
        ],
      },
      {
        heading: "Adare Manor private landing area",
        paragraphs: [
          "Adare Manor welcomes helicopters to its private landing area, located approximately 7.5 nautical miles from Shannon International Airport inside the Shannon CTA. Because the estate is in a noise-sensitive area, prior permission (PPR) is required before any landing.",
        ],
      },
      {
        heading: "Ryder Cup 2027 heliport logistics",
        paragraphs: [
          "For the centenary Ryder Cup in September 2027, a dedicated heliport will operate at the golf course to handle high-volume air transfers during tournament week. Reports suggest capacity for several hundred helicopter movements per day, serving corporate hospitality guests, VIP attendees, and those connecting from superyacht berths along the south-west coast.",
          "Shannon Airport remains the nearest major international airport for fixed-wing arrivals, with helicopter transfers offering a scenic and time-efficient onward connection to Adare Manor.",
        ],
      },
      {
        heading: "How most spectators will travel",
        paragraphs: [
          "Helicopter access is reserved for a small fraction of visitors. The vast majority of Ryder Cup spectators will use the dedicated rail shuttle from Limerick Junction, park-and-ride services across Limerick, or shuttle buses from Limerick Colbert for Galway arrivals.",
          "If you are planning a group stay rather than a same-day transfer, our luxury rental homes across Adare and the wider Limerick area offer private parking, multiple bedrooms, and proximity suited to golf travel, without the complexity of coordinating air movements.",
        ],
      },
      {
        heading: "Planning accommodation near Adare Manor?",
        paragraphs: [
          "Whether you arrive by helicopter, train, or car, securing the right base for Ryder Cup week matters. Explore our collection of executive homes and demesne properties, or contact us to discuss corporate hospitality and group accommodation.",
        ],
      },
    ],
    externalLinks: [
      {
        label: "Adare Manor - Helicopter Landing Permission",
        url: "https://www.adaremanor.com/location/helicopter-landing-permission/",
      },
      {
        label: "Ryder Cup Transport",
        url: "https://www.rydercup.com/attend/transport",
      },
    ],
  },
  {
    slug: "how-to-apply-ryder-cup-2027-ballot",
    title: "How to Apply for the 2027 Ryder Cup Ballot",
    excerpt:
      "Step-by-step guide to registering for a Ryder Cup ticketing account and applying in the 2027 ballot: key dates, ticket limits, and what happens if you are successful.",
    publishedAt: "2026-06-01",
    category: "TICKETS",
    readTimeMinutes: 4,
    heroImage: "/images/blog/golf-image.webp",
    imageCredit: {
      label: "Unsplash",
      url: "https://unsplash.com/photos/photo-of-man-swinging-golf-driver-SsIIw_MET0E",
    },
    keywords:
      "Ryder Cup 2027 ballot, Ryder Cup tickets, how to apply Ryder Cup, Adare Manor tickets, Ryder Cup 2027 ticket registration",
    sections: [
      {
        paragraphs: [
          "Daily General Admission tickets for the 2027 Ryder Cup at Adare Manor are allocated through an official ballot. Here is how the process works, the key dates to know, and what to prepare before applications open.",
        ],
      },
      {
        heading: "Step 1: Register a ticketing account",
        paragraphs: [
          "Before you can enter the ballot, you must create a registered ticketing account on the official Ryder Cup website. Registering an account alone does not enter you into the ballot; you still need to submit a separate ballot application when the window opens.",
          "Your account billing details must match your payment card address. This is checked during the application process and again if you are successful.",
        ],
      },
      {
        heading: "Step 2: Apply during the ballot window",
        paragraphs: [
          "The global Ryder Cup ballot opens on Wednesday 3 June 2026 at 14:00 BST and closes on Monday 29 June 2026 at 23:59 BST.",
          "During the ballot, fans can apply for up to four Daily General Admission tickets per day. Only one transaction can be completed per ticketing account. You may apply for multiple days, but each day requires a separate application within the ballot period.",
        ],
      },
      {
        heading: "Island of Ireland priority window",
        paragraphs: [
          "Residents of the island of Ireland had access to an exclusive priority ticket window opening Friday 24 April 2026, ahead of the global ballot. Irish residents with a registered account were eligible for this early access, including tickets for Tuesday's practice day as part of the SuperValu Community Day initiative.",
        ],
      },
      {
        heading: "If you are successful",
        paragraphs: [
          "Successful ballot applicants are automatically charged for the full cost of the tickets allocated to them. There is no separate checkout step; ensure your payment card details are current and your billing address matches your account before applying.",
          "Only tickets secured through official Ryder Cup channels will be accepted at the venue. Accommodation details are provided as part of the ticket application process on the official site.",
        ],
      },
      {
        heading: "Plan your stay while you wait",
        paragraphs: [
          "Ballot results can take time, but accommodation near Adare Manor books early for Ryder Cup week. Browse our luxury rental properties, explore Ryder Cup packages, or contact us to hold options while you await your ballot outcome.",
        ],
      },
    ],
    externalLinks: [
      {
        label: "2027 Ryder Cup Ticket Information",
        url: "https://www.rydercup.com/attend/ticket-information",
      },
      {
        label: "Ryder Cup 2027 FAQs",
        url: "https://www.rydercup.com/2027-faqs",
      },
    ],
  },
];

export function getBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).toUpperCase();
}
