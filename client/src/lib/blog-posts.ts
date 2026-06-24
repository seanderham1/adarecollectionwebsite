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
