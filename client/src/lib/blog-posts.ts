export type BlogPostSection = {
  heading?: string;
  paragraphs: string[];
  quote?: {
    text: string;
    attribution?: string;
  };
  imagePair?: {
    left: { src: string; alt: string };
    right: { src: string; alt: string };
  };
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
  /** Listing card thumbnail; set when the hero crop does not suit the card's box. Defaults to heroImage. */
  cardImage?: string;
  /** CSS object-position for the card thumbnail; portrait images need a focal point above centre. */
  cardImagePosition?: string;
  imageCredit?: BlogPostImageCredit;
  keywords: string;
  sections: BlogPostSection[];
  externalLinks?: BlogPostExternalLink[];
};

const blogPosts: BlogPost[] = [
  {
    slug: "jon-rahm-ireland-special-place-irish-open-2026",
    title:
      "Jon Rahm on Ireland: ‘Always Been a Very Special Place to Me in My Heart’",
    excerpt:
      "Back at the Amgen Irish Open in Doonbeg and chasing a third title on Irish soil, Jon Rahm spoke about his deep connection to Ireland — a reminder of how strongly the country’s golf stages still pull the game’s biggest names toward 2027.",
    publishedAt: "2026-09-23",
    category: "NEWS",
    readTimeMinutes: 4,
    heroImage: "/images/blog/jon-rahm-article.webp",
    imageCredit: {
      label: "Coverage: The Irish Times",
      url: "https://www.irishtimes.com/sport/golf/2026/09/08/jon-rahm-irelands-always-been-a-very-special-place-to-me-in-my-heart/",
    },
    keywords:
      "Jon Rahm Irish Open 2026, Jon Rahm Doonbeg, Amgen Irish Open, Rahm Ireland golf, Ryder Cup 2027 Adare Manor, DP World Tour Ireland, accommodation near Adare Manor",
    sections: [
      {
        paragraphs: [
          "Jon Rahm is back on the DP World Tour this week, and Ireland is once again the stage. Speaking ahead of the Amgen Irish Open at Trump International Golf Links in Doonbeg, the Spaniard made clear that this is more than another stop on a crowded calendar — it is a place that still sits close to the centre of how he talks about the game.",
          "As Philip Reid reported for The Irish Times, Rahm is chasing a third Irish Open title. Only he and Rory McIlroy among this week’s field already have more than one Irish Open win to their name, and Rahm’s pair came on classic links terrain: Portstewart in 2017 and Lahinch in 2019.",
        ],
      },
      {
        heading: "A return to familiar European Tour weeks",
        paragraphs: [
          "Rahm’s appearance in Clare marks a notable return to regular DP World Tour competition outside Majors and LIV events — his first such start since the Genesis Scottish Open in July. He also plans to play next week’s BMW PGA Championship at Wentworth, with any Spanish Open appearance later depending on the arrival of a new baby.",
          "Asked about the longer-term picture around LIV, he declined to be drawn. For now, the focus is narrower and more personal: winning again in Ireland, and enjoying the stretch of European golf that follows.",
        ],
      },
      {
        heading: "Why Ireland still matters to Rahm",
        paragraphs: [
          "The emotional pull is harder to miss than the schedule notes. Rahm’s first Irish Open win at Portstewart was also his breakthrough on the DP World Tour, arriving before his Major titles at the US Open in 2021 and the Masters in 2023. That history still shapes how he talks about coming here.",
          "“As a professional golfer, when you come [to Ireland] and you feel that appreciation, it’s really special. It’s unique,” he said. “I don’t know why, but Ireland’s always been a very special place to me in my heart. And as golf destinations go, if anybody ever asks me, I always say, ‘if you can go to Ireland for 10 days, you are not going to get better than that!’”",
          "Even a washed-out practice day at Doonbeg — abandoned after three holes for sudden downpours — did not dull the week. Instead, Rahm spent time with Tom McKibbin, Liam Nolan and Thomas Higgins, who is making his professional debut: another small snapshot of how Irish Open week tends to feel less transactional than many stops on tour.",
        ],
        quote: {
          text:
            "I don’t know why, but Ireland’s always been a very special place to me in my heart.",
          attribution: "Jon Rahm",
        },
      },
      {
        heading: "What it means looking ahead to Adare Manor",
        paragraphs: [
          "For anyone watching the countdown to Ryder Cup 2027 at Adare Manor, weeks like this matter. When players of Rahm’s calibre keep choosing Ireland, and keep talking about it this warmly, it reinforces what the Mid-West already knows: the country’s golf stages are not just venues on a rota. They are destinations people remember.",
          "Irish Open week on the Clare coast also sits in the same broader September story that is already building toward Limerick — familiarisation trips, Junior Ryder Cup plans at Ballyneety, and a centenary Ryder Cup that will put Adare Manor at the centre of the golf world.",
        ],
      },
      {
        heading: "Where we fit into the story",
        paragraphs: [
          "If Ireland is already on the minds of the game’s leading players, it should be on yours too if you are planning to be here for Ryder Cup week. The best private residences near Adare Manor will not stay open indefinitely as demand continues to tighten.",
          "The Adare Collection curates luxury homes across Adare and the wider Limerick region for guests who want space, privacy and a proper base for tournament week — whether you are following the Irish Open trail this season or locking in September 2027.",
          "Browse our properties or contact us to talk through availability while Ireland remains firmly in the spotlight.",
        ],
      },
    ],
    externalLinks: [
      {
        label: "The Irish Times: Jon Rahm on Ireland and the Irish Open",
        url: "https://www.irishtimes.com/sport/golf/2026/09/08/jon-rahm-irelands-always-been-a-very-special-place-to-me-in-my-heart/",
      },
      {
        label: "Europe’s familiarisation trip to Adare Manor — our coverage",
        url: "https://theadarecollection.com/blog/european-team-familiarisation-trip-adare-manor",
      },
      {
        label: "Ryder Cup 2027",
        url: "https://www.rydercup.com/",
      },
    ],
  },
  {
    slug: "ballyneety-junior-ryder-cup-2027-one-year-out",
    title:
      "One Year Out: Ballyneety Golf Club Prepares to Host the 2027 Junior Ryder Cup",
    excerpt:
      "With twelve months to go, Limerick’s Ballyneety Golf Club stands ready to welcome Europe and the United States for the Junior Ryder Cup — a proud curtain-raiser before the decisive singles and the Ryder Cup itself at Adare Manor.",
    publishedAt: "2026-09-16",
    category: "NEWS",
    readTimeMinutes: 4,
    heroImage: "/images/blog/ballyneety-golf-club.webp",
    keywords:
      "Ballyneety Junior Ryder Cup 2027, Junior Ryder Cup Limerick, Ballyneety Golf Club, Adare Manor Junior Ryder Cup singles, Ryder Cup 2027 Ireland, accommodation near Ballyneety, Casabel Ballyneety Golf Course",
    sections: [
      {
        paragraphs: [
          "In exactly one year, Ballyneety Golf Club will have the incredible honour of hosting the 2027 Junior Ryder Cup here in Limerick. Some of the most exciting young golfing talent from Europe and the United States will walk these fairways, representing the next generation of the game on one of junior golf’s biggest stages.",
          "For the club, its members and the wider community, it will be an incredibly proud moment. Today marks just twelve months to go. The countdown starts now.",
        ],
      },
      {
        heading: "How the Junior Ryder Cup week will unfold",
        paragraphs: [
          "Ryder Cup Europe confirmed that Ballyneety will stage the first two days of the contest: foursomes and fourballs contested by male and female juniors from Europe and the United States. The decisive singles then move to Adare Manor on the eve of the Ryder Cup itself — an extraordinary curtain-raiser that puts tomorrow’s stars on the same stage the world will watch the following day.",
          "It is a format that gives County Limerick two venues and one story: parkland excellence at Ballyneety, then the full theatre of Adare Manor before golf’s greatest team contest begins.",
        ],
      },
      {
        heading: "A champion parkland stage in Limerick",
        paragraphs: [
          "Co-designed by 2014 Ryder Cup Vice-Captain Des Smyth, Ballyneety sits on 183 acres of rolling Irish countryside. The parkland layout is widely regarded as one of the finest of its kind in Ireland, with sweeping views across County Limerick and a reputation that already includes being named Great Britain and Ireland’s Golf Course of the Year for 2025.",
          "Edward Kitson, Junior Ryder Cup Match Director, put it simply: Ballyneety will be a magnificent host, offering a champion-standard layout where the next generation of golfing superstars will relish the chance to compete — before those who reach the final day experience singles in front of Ryder Cup crowds on the Ryder Cup course.",
        ],
        quote: {
          text:
            "It is a true honour for Ballyneety Golf Club to host the 2027 Junior Ryder Cup. This tournament represents not only a celebration of skill and dedication to the game, but also an opportunity to showcase the spirit of our community and the beauty and quality of our Championship course.",
          attribution: "John Leamy, General Manager, Ballyneety Golf Club",
        },
      },
      {
        heading: "Where future stars are made",
        paragraphs: [
          "The Junior Ryder Cup has long been a proving ground. Rory McIlroy, Nicolai Højgaard and Nicolas Colsaerts all triumphed in the junior event before going on to win the Ryder Cup. On the women’s side, Suzanne Pettersen, Carlota Ciganda, Leona Maguire and Emily Kristine Pedersen competed as amateurs before lifting the Solheim Cup.",
          "In 2027, another generation of male and female junior amateurs will go head-to-head in the mixed event — and Limerick will be the place they do it.",
        ],
      },
      {
        heading: "What it means if you are planning Ryder Cup week",
        paragraphs: [
          "Junior Ryder Cup week is not a footnote to the main event. It is part of the same September story: emerging talent at Ballyneety, singles at Adare Manor, then the centenary Ryder Cup itself. For groups already locking in travel and hospitality, that means more days of golf, more reasons to be in the Mid-West early, and even tighter demand for the right place to stay.",
          "Our collection includes residences across Adare and the wider Limerick region — including Casabel, an executive home set on Ballyneety Golf Course itself, roughly twenty-five minutes from Adare Manor. Whether you want to be beside the Junior Ryder Cup fairways or close to the village for tournament week, we can help you find a private base that fits.",
          "Browse our properties or contact us to talk through availability while the countdown to September 2027 continues.",
        ],
      },
    ],
    externalLinks: [
      {
        label: "Ryder Cup Europe: Ballyneety to host 2027 Junior Ryder Cup",
        url: "https://www.rydercup.com/news-media/ballyneety-golf-club-to-host-2027-junior-ryder-cup",
      },
      {
        label: "Ballyneety Golf Club",
        url: "https://www.ballyneetygolfclub.com/",
      },
      {
        label: "Casabel — on Ballyneety Golf Course",
        url: "https://theadarecollection.com/property/casabel",
      },
    ],
  },
  {
    slug: "dylan-leon-executive-operations-client-coordinator",
    title:
      "The Adare Collection Welcomes Dylan Leon as Executive Operations and Client Coordinator",
    excerpt:
      "Dylan Leon joins The Adare Collection as Executive Operations and Client Coordinator, bringing more than a decade of luxury hospitality and private client experience from Adare Manor, The Dorchester Collection and his own concierge company, Maison Leon.",
    publishedAt: "2026-09-09",
    category: "NEWS",
    readTimeMinutes: 3,
    heroImage: "/images/blog/dylan-leon-hero.webp",
    cardImage: "/images/blog/dylan-leon-card.webp",
    cardImagePosition: "50% 0%",
    keywords:
      "Dylan Leon The Adare Collection, Executive Operations and Client Coordinator, Maison Leon concierge, Adare Manor guest experience, luxury hospitality Limerick, Ryder Cup 2027 accommodation, private client management Ireland",
    sections: [
      {
        paragraphs: [
          "We're delighted to welcome Dylan Leon to The Adare Collection as our new Executive Operations and Client Coordinator.",
          "Dylan brings over a decade of experience in luxury hospitality and private client management, most recently as Director of Guest Experience at Adare Manor, alongside his work as founder of his own private lifestyle management company, Maison Leon.",
        ],
      },
      {
        heading: "A career in five-star service",
        paragraphs: [
          "Dylan began his career at the Merrion Hotel in Dublin, before completing an international placement at The Dorchester Collection in London, and returned home to a position in the Michelin-starred Glovers Alley at The Fitzwilliam before moving to Limerick to begin his most recent hospitality career at Adare Manor.",
          "Across his career, Dylan has developed extensive experience across food and beverage, guest experience and luxury hospitality, progressing into senior client-facing roles and managing complex guest requirements, from last-minute logistics and VIP itineraries to highly personalised stays and experiences.",
        ],
      },
      {
        heading: "Founder of Maison Leon",
        paragraphs: [
          "Alongside his hotel career, Dylan also founded Maison Leon, a private lifestyle management and concierge company supporting individuals, families and businesses across Ireland and worldwide. Maison Leon supports clients with travel, private aviation, events, hospitality and the many details that come with managing a busy lifestyle. Discretion sits at the centre of the business, with every engagement handled personally and in confidence.",
          "It's this combination of luxury hospitality and private client experience, managing complex travel, events, logistics and the everyday details of clients' lives, that maps most directly onto what he'll be doing with us.",
        ],
      },
      {
        heading: "What this means for our clients",
        paragraphs: [
          "Guests staying with The Adare Collection expect more than a set of keys and a welcome pack. They want someone who can coordinate arrivals and logistics, act as a single point of contact throughout their stay, and ensure everything runs seamlessly from booking through to departure.",
          "That's exactly the kind of work Dylan has built his career around. He'll be leading on client operations for us, coordinating logistics ahead of each arrival and staying on hand as a single point of contact throughout the stay.",
        ],
        quote: {
          text:
            "I'm delighted to be joining The Adare Collection and to be involved in building on the experience we provide for our clients. Having spent much of my career working in luxury hospitality and private client environments, I'm looking forward to bringing that experience to the role and ensuring every detail is carefully considered, from the initial planning through to the client's departure.",
          attribution: "Dylan Leon, Executive Operations and Client Coordinator",
        },
      },
      {
        heading: "Get in touch",
        paragraphs: [
          "If you have a booking with us, including for Ryder Cup 2027, or would like to talk through options for an upcoming stay or event, Dylan will be one of the first people you hear from. Welcome to the team, Dylan.",
        ],
      },
    ],
  },
  {
    slug: "european-team-familiarisation-trip-adare-manor",
    title:
      "Europe's Ryder Cup Team Is Heading to Adare Manor: What Luke Donald's Familiarisation Trip Tells Us",
    excerpt:
      "Sixteen European players are set to visit Adare Manor in the build-up to the 2027 Ryder Cup, a year-ahead familiarisation trip that underlines how seriously Team Europe is preparing for Ireland's centenary edition.",
    publishedAt: "2026-09-02",
    category: "NEWS",
    readTimeMinutes: 5,
    heroImage: "/images/blog/europe-ryder-cup-team.webp",
    keywords:
      "Ryder Cup 2027 Adare Manor, Luke Donald familiarisation trip, European Ryder Cup team Adare Manor, Padraig Harrington vice captain, Amgen Irish Open 2026, accommodation near Adare Manor, Ryder Cup Ireland preparation",
    sections: [
      {
        paragraphs: [
          "With just over a year until the centenary Ryder Cup at Adare Manor, Luke Donald is taking preparation up a gear. According to reporting in the Limerick Leader, the European captain is set to host a familiarisation trip to Adare Manor for sixteen players, timed deliberately to fall almost exactly twelve months before tournament week.",
          "It is the kind of detail that might sound procedural from the outside, but tells you a great deal about how this Ryder Cup is being approached: not as a distant appointment on the calendar, but as a venue Europe intends to know intimately before a single pairing sheet is posted.",
        ],
      },
      {
        heading: "What is being planned and when",
        paragraphs: [
          "The gathering is understood to take place in the fortnight after the Amgen Irish Open at Trump International Golf Links in Doonbeg, roughly sixty miles from Adare Manor, before the group moves on to Wentworth for the BMW PGA Championship.",
          "Donald will be joined by his three vice-captains: Edoardo and Francesco Molinari, and Ireland's Pádraig Harrington. The final places in the sixteen-player group were still being finalised as the week of the Husqvarna British Masters at The Belfry got under way.",
          "Seven members of Europe's triumphant 2025 side at Bethpage Black are in the Irish Open field, including Rory McIlroy, Jon Rahm, Tyrrell Hatton, Bob MacIntyre, Shane Lowry, Sepp Straka and Rasmus Hojgaard. Nicolai Hojgaard, a winner in Rome in 2023, and Alex Fitzpatrick are also in the line-up, names that make the link between this week's golf on the west coast and next year's gathering in Limerick feel very real.",
        ],
      },
      {
        heading: "Why Adare Manor matters to Team Europe",
        paragraphs: [
          "The trip serves a straightforward but important purpose. It is understood that only about half of the sixteen players involved have played Adare Manor before, either privately or at the JP McManus Pro-Am, last held in 2022. For those who have not, this is a first proper look at the course that will define Ryder Cup week. For those who have, it is a chance to re-familiarise themselves with a layout that will feel very different under tournament conditions.",
          "Donald has form here. Ahead of both Rome in 2023 and New York in 2025, he brought his squad together at the host venue two or three weeks before the matches. Planning something similar twelve months out is consistent with a captain who is organised, meticulous and chasing history. A third consecutive European victory would be unprecedented on either side of the Atlantic.",
          "The timing also lands alongside another sobering reminder of demand: general admission for the 2027 Ryder Cup sold out more than twelve times over. Europe's players are getting their first serious look at Adare Manor at the same moment fans are realising just how finite access to this event was always going to be.",
        ],
      },
      {
        heading: "What it means for Limerick and for anyone planning to be here",
        paragraphs: [
          "For County Limerick, the familiarisation trip is another marker in a countdown that is now visibly accelerating. The Irish Open week on the Clare coast, a European squad visit to Adare, Harrington's vice-captaincy and the wider Golf Limerick push are all converging on the same story: this region is no longer waiting for the Ryder Cup to arrive. It is already living inside the buildup.",
          "That matters if you are planning to be here in September 2027. The players are not treating Adare Manor as a venue to be discovered late in the day, and the smartest spectators and hospitality groups are taking the same approach to where they stay. A familiarisation trip for Europe's team is a useful nudge for everyone else: the course will be studied, the logistics will be tight, and the best bases close to Adare will not stay available indefinitely.",
        ],
      },
      {
        heading: "Where we fit into the story",
        paragraphs: [
          "The Adare Collection curates private houses and estates across Adare and the wider Limerick region for exactly this kind of week: space, privacy and a proper home base when tournament week is about more than a single day at the course.",
          "Whether you are hosting clients, travelling with family or building a group around Irish Open week and the road toward September 2027, having the right residence locked in early makes the difference between reacting to the Ryder Cup buildup and actually enjoying it.",
          "Browse our current collection of properties near Adare Manor, or contact us directly. We are happy to help you plan a stay that keeps you close to the action as Europe's team, and the rest of the golf world, turns its attention to Limerick.",
        ],
      },
    ],
    externalLinks: [
      {
        label: "Limerick Leader: Familiarisation trip at Adare Manor in the works for European team",
        url: "https://www.limerickleader.ie/sport/ryder-cup/familiarisation-trip-at-adare-manor-in-the-works-for-european-team-8950692",
      },
      {
        label: "Ryder Cup 2027",
        url: "https://www.rydercup.com/",
      },
      {
        label: "Pádraig Harrington named Europe vice-captain: our coverage",
        url: "https://theadarecollection.com/blog/padraig-harrington-ryder-cup-2027-vice-captain",
      },
    ],
  },
  {
    slug: "golf-limerick-brochures-whats-coming",
    title:
      "Limerick Just Got Its Own Golf Story — Here's What the New Golf Limerick Brochures Tell Us About What's Coming",
    excerpt:
      "Limerick City and County Council has rolled out Golf Limerick — a legacy initiative with two new publications that show where the region is heading toward Ryder Cup 2027 and beyond.",
    publishedAt: "2026-08-27",
    category: "NEWS",
    readTimeMinutes: 5,
    heroImage: "/images/blog/golf-limerick-brochure.webp",
    keywords:
      "Golf Limerick, Golf Limerick brochure, Limerick golf courses, Ryder Cup 2027 Adare Manor, Limerick tourism, Ballyneety Junior Ryder Cup, accommodation near Adare Manor",
    sections: [
      {
        paragraphs: [
          "With just over a year to go until the world descends on Adare Manor, Limerick City and County Council has taken its next visible step in the countdown: the rollout of Golf Limerick, a legacy initiative designed to put the county's golfing credentials — and everything around them — firmly on the map. Two new publications have just landed as part of it, and between them they tell you almost everything you need to know about where this region is heading between now and September 2027, and long after the final putt drops.",
        ],
      },
      {
        heading: "Two Brochures, Two Very Different Jobs",
        paragraphs: [
          "The first is a warm, visitor-facing welcome piece — the kind of thing you'll start spotting in hotel lobbies, clubhouses and hospitality venues across the county over the coming weeks. It reads less like a tourism leaflet and more like an invitation: introducing Limerick's seven parkland courses, its food scene, its rivers, castles and greenways, and gently making the case that a golf trip here was never going to be just about the golf.",
          "The second is aimed squarely at media and international visitors hungry for context ahead of the tournament — a fact-dense booklet packed with the kind of stories that make a place feel textured rather than generic. It's the difference between knowing Limerick hosts a Ryder Cup and understanding why Limerick, of all places, was always going to be a compelling stage for one.",
        ],
      },
      {
        heading: "The Stories Worth Knowing Before You Arrive",
        paragraphs: [
          "A few things stood out to us flicking through the media booklet — the sort of detail that turns a spectator trip into something you actually remember:",
          "Limerick's golf pedigree runs deeper than one tournament. The county is home to seven 18-hole parkland courses, from the storied Adare Manor Golf Club — where Desmond Castle and a 15th-century Franciscan Abbey frame the fairways — to Ballyneety, which was named Great Britain and Ireland's Golf Course of the Year for 2025 and will host the Junior Ryder Cup in 2027, the first time that event has ever been played on Irish soil.",
          "This isn't Limerick's first time on the golfing map. Adare Manor previously hosted the Irish Open in 2007 and 2008, with the 2027 Ryder Cup marking exactly a century since the very first edition of the event, played in Massachusetts in 1927.",
          "There's a lot more to the county than the course. From the Viking founding of Limerick City in 922 AD, to the Ardagh Chalice (an 8th-century treasure unearthed by two men digging for potatoes not far from Adare), to Foynes — the small Limerick village where Irish Coffee was invented in 1943 — the booklet leans hard into the idea that Limerick's identity was always bigger than sport.",
          "Scale is very real. Adare, a village of around 1,300 residents, is expected to welcome upwards of 200,000 spectators across tournament week, with roughly 50,000 people passing through each day of competition. Numbers like that are exactly why early accommodation planning matters as much as it does.",
        ],
      },
      {
        heading: "Why This Matters Beyond September 2027",
        paragraphs: [
          "The most telling detail in all of this isn't in the brochures themselves — it's in what \"Golf Limerick\" is actually for. This is being positioned explicitly as a legacy initiative, not a one-off tournament leaflet. The intent is clear: use the global spotlight of the Ryder Cup to establish Limerick as a genuine, standalone golfing destination long after the crowds go home — one with seven courses to choose from, a Michelin-starred clubhouse in The Oak Room, and an entire county of castles, greenways and coastline built around it.",
          "For anyone thinking about tournament week purely as a three-day event, this is a useful reminder that the story here is longer than that. Golf societies, leisure golfers and returning visitors are clearly part of the plan Limerick is building for — and that means demand for the right accommodation in the region isn't going away once the trophy is presented in 2027. If anything, it's just getting started.",
        ],
      },
      {
        heading: "Where We Fit Into the Story",
        paragraphs: [
          "Print copies of the welcome brochure will be rolling out to hospitality businesses and golf courses across the county over the coming days, and digital versions are already available via Limerick City and County Council. Whether you're coming for tournament week itself or planning a golf trip to explore what Limerick has to offer beyond it, having the right base to come home to each evening makes all the difference.",
          "Browse our current collection of private houses and estates near Adare Manor, or get in touch with us directly — we're happy to help you plan a stay that does justice to everything this county is putting on show.",
        ],
      },
    ],
    externalLinks: [
      {
        label: "Golf Limerick Resources — Limerick.ie",
        url: "https://www.limerick.ie/discover/eat-see-do/sports-recreation/activities/golf/golf-limerick-resources",
      },
      {
        label: "Live 95: Golf Limerick launches tourism brochures",
        url: "https://www.live95fm.ie/news/live95-news/golf-limerick-launches-tourism-brochures-ahead-of-ryder-cup-2027/",
      },
    ],
  },
  {
    slug: "tickets-are-gone-heres-what-every-ryder-cup-2027-fan-should-be-doing-right-now",
    title:
      "Tickets Are Gone. Here's What Every Ryder Cup 2027 Fan Should Be Doing Right Now",
    excerpt:
      "The ballot has closed and general admission for the Ryder Cup 2027 at Adare Manor is officially sold out. Here's how to plan the next steps, whether you secured a ticket or not.",
    publishedAt: "2026-08-19",
    category: "TICKETS",
    readTimeMinutes: 7,
    heroImage: "/images/blog/golf-swing-whatnext.webp",
    keywords:
      "Ryder Cup 2027 tickets sold out, Adare Manor general admission, Ryder Cup ballot closed, what to do now, accommodation near Adare Manor, Limerick Ryder Cup 2027",
    sections: [
      {
        paragraphs: [
          "The ballot has closed, the emails have landed, and general admission for the 2027 Ryder Cup at Adare Manor is officially sold out. More than twelve times oversubscribed, with successful fans drawn from 80 countries around the world - this is the clearest signal yet that the 100th anniversary edition of golf's greatest team contest is going to be one for the history books.",
          "If you're one of the fortunate ones holding a ticket, congratulations - you're about to be part of something genuinely historic. And if you weren't successful in the ballot, the story isn't over either. Either way, the sell-out changes the conversation from \"will I get in?\" to \"what do I do now?\" Here's how we'd approach the months between now and September 2027.",
        ],
      },
      {
        heading: "1. Lock In Where You're Staying - Before Everyone Else Does",
        paragraphs: [
          "This is the single biggest thing that separates a smooth Ryder Cup week from a stressful one. Adare Manor and the surrounding villages will host an expected 250,000+ spectators across the week of 13-19 September 2027, with a daily capacity of 55,000 people passing through the gates. County Limerick simply doesn't have unlimited beds, and once word spreads that tickets are gone, accommodation searches tend to spike right alongside it.",
          "Hotels across Limerick, Shannon, Cork and Galway are already filling for tournament week, and short-term rental supply near the course is finite by nature - there are only so many private homes and estates within a comfortable drive of Adare Manor.",
          "This is exactly where we come in: The Adare Collection curates private houses and estates across County Limerick built for exactly this kind of week - the space, privacy and comfort a hotel room simply can't match when you're hosting family, clients, or a group of friends for a once-in-a-generation event.",
          "If a ticket is sitting in your inbox, your accommodation search should start now, not next spring.",
        ],
      },
      {
        heading: "2. Remember: A Sold-Out Ballot Isn't the Only Route In",
        paragraphs: [
          "General admission tickets being gone doesn't mean the door is closed. There are still routes to experience tournament week:",
          "Premium and hospitality experiences - a limited number of upgraded spectator packages typically remain available even after general admission closes, offering elevated access, lounges and hospitality.",
          "Community and practice-day access - organisers have flagged additional practice-day ticket initiatives for residents of the island of Ireland, with details expected later this year. Worth keeping an eye on if you missed the ballot.",
          "Travel-inclusive packages - bundled travel and hospitality packages are another way in for fans who didn't secure a ballot ticket, particularly for international visitors planning a trip around the tournament regardless.",
          "Even without a ticket, plenty of visitors come for the wider week - the atmosphere in Adare and Limerick City, the fan villages, the buzz around the region - and that's a trip worth planning properly too.",
        ],
      },
      {
        heading: "3. Plan Your Actual Logistics Now, While There's Still Room to Move",
        paragraphs: [
          "With a ticket secured (or a trip planned regardless), the next questions are practical:",
          "Flights - Shannon Airport will be the closest international gateway, with Cork, Dublin and Kerry all realistic alternatives depending on your route. Fares and availability only get tighter as the date approaches.",
          "Transport on the ground - expect park-and-ride, rail and shuttle details to be released closer to the event, but car hire and private transfers in the region should be arranged well ahead of time, especially for larger groups.",
          "Your base for the week - once you know how you're arriving, decide whether you want to be based in Adare village itself, out toward Limerick City, or further afield in Killarney or the Wild Atlantic Way with a scenic drive in each day. A private house gives you the flexibility to choose distance versus space on your own terms - something a single hotel room booking simply can't offer a group.",
        ],
      },
      {
        heading: "4. Expect the Buildup to Start in Earnest",
        paragraphs: [
          "With tickets sold, attention now shifts to the golf itself. Luke Donald returns as European Captain chasing an unprecedented third consecutive win, having led Team Europe to victory at Marco Simone in 2023 and Bethpage in 2025.",
          "Jim Furyk takes the reins for the United States, returning to the captaincy for the first time since leading the team in France in 2018.",
          "Expect qualification storylines, vice-captain announcements, and course-preparation updates to dominate golf headlines over the next year - all part of the build toward what organisers are billing as the biggest Ryder Cup in the event's 100-year history.",
        ],
      },
      {
        heading: "Where We Come In",
        paragraphs: [
          "Whatever stage of the journey you're at - ticket in hand and hunting for the right base, or still weighing up whether to make the trip regardless - accommodation is the one piece of the puzzle that rewards early planning more than any other. Properties near Adare Manor for tournament week are limited, in demand, and moving quickly.",
          "Browse our current collection of private houses and estates across County Limerick, or get in touch and we'll help you find the right base for your group, your budget, and your Ryder Cup week.",
        ],
      },
    ],
  },
  {
    slug: "ryder-cup-2027-general-admission-tickets-sold-out",
    title: "Ryder Cup 2027 General Admission Tickets Sell Out for Adare Manor",
    excerpt:
      "General admission tickets for the centenary Ryder Cup at Adare Manor have sold out after unprecedented global demand — with organisers saying they could have sold out more than twelve times over.",
    publishedAt: "2026-08-12",
    category: "TICKETS",
    readTimeMinutes: 4,
    heroImage: "/images/blog/golf-adaremanor.webp",
    imageCredit: {
      label: "Morgan Treacy/Inpho",
      url: "https://www.irishtimes.com/sport/golf/2026/07/31/we-could-have-sold-out-12-times-over-ryder-cup-tickets-sell-out-for-adare-manor/",
    },
    keywords:
      "Ryder Cup 2027 tickets sold out, Adare Manor general admission, Ryder Cup ballot results, SuperValu Community Day, Ryder Cup Ireland 2027 tickets, Adare Manor accommodation",
    sections: [
      {
        paragraphs: [
          "General admission tickets for the 2027 Ryder Cup at Adare Manor have sold out after what organisers describe as unprecedented global demand. Daily admission for competition days was priced at a record €499 for a European venue — almost twice the cost of Rome 2023 — and still the allocation was exhausted.",
          "Fans who were successful in the ballot were informed over recent days, joining those who secured tickets in the exclusive Island of Ireland priority window in May, which sold out in under an hour. Supporters from some 80 countries will be part of the centenary edition of the Ryder Cup, with competition days scheduled for mid-September 2027.",
        ],
      },
      {
        heading: "Demand 'nothing short of remarkable'",
        paragraphs: [
          "Richard Atkinson, the European Tour group's chief Ryder Cup officer, said the organisers could have sold out general admission tickets more than twelve times over — \"testament to the appeal of golf's greatest team contest, as well as the passion of fans who want to be part of it.\" He described the demand as \"nothing short of remarkable.\"",
          "Overall attendance across Ryder Cup week is expected to exceed 250,000, with a daily site capacity of around 55,000. It will be the first time the Ryder Cup has been hosted in Ireland since the 2006 edition at The K Club in County Kildare.",
        ],
      },
      {
        heading: "What is still available?",
        paragraphs: [
          "Although general admission for competition days has sold out, there are still routes into the week. Bespoke travel-inclusive packages and a limited number of premium experiences remain available through the official Ryder Cup website.",
          "For residents of the island of Ireland, thousands of tickets will be available for Tuesday's practice day as part of the SuperValu Community Day. Full details of that initiative, and how to apply, are due to be announced later this year.",
          "A limited number of tickets for Tuesday and Wednesday practice days were available from €89, with Thursday — featuring the opening ceremony — from €179. Practice-day tickets for fans under 16 were offered from €20 on Tuesday and Wednesday and €30 on Thursday.",
        ],
      },
      {
        heading: "Plan your stay near Adare Manor",
        paragraphs: [
          "With competition-day general admission gone and more than a quarter of a million visitors expected across the week, securing accommodation close to Adare Manor matters more than ever. Private residences give ticket holders, sponsors and corporate groups space, privacy and a quieter base than hotel inventory alone can offer.",
          "If you held ballot tickets or are exploring premium packages and practice-day options, browse our properties or contact us to discuss availability for September 2027.",
        ],
      },
    ],
    externalLinks: [
      {
        label: "Irish Times: Ryder Cup tickets sell out for Adare Manor",
        url: "https://www.irishtimes.com/sport/golf/2026/07/31/we-could-have-sold-out-12-times-over-ryder-cup-tickets-sell-out-for-adare-manor/",
      },
      {
        label: "Ryder Cup Ticket Information",
        url: "https://www.rydercup.com/attend/ticket-information",
      },
      {
        label: "Ryder Cup 2027 Ballot Results Guide",
        url: "https://theadarecollection.com/blog/ryder-cup-2027-ballot-results",
      },
    ],
  },
  {
    slug: "padraig-harrington-ryder-cup-2027-vice-captain",
    title: "Pádraig Harrington Named Europe Vice-Captain for Ryder Cup 2027 at Adare Manor",
    excerpt:
      "Three-time major winner Pádraig Harrington joins Luke Donald's backroom team for the 2027 Ryder Cup in Ireland, alongside Edoardo and Francesco Molinari.",
    publishedAt: "2026-07-29",
    category: "NEWS",
    readTimeMinutes: 4,
    heroImage: "/images/blog/golf-course.webp",
    keywords:
      "Pádraig Harrington Ryder Cup 2027, Harrington vice captain Adare Manor, Luke Donald Europe team, Ryder Cup Ireland 2027, Edoardo Francesco Molinari, European Ryder Cup vice captains",
    sections: [
      {
        paragraphs: [
          "Pádraig Harrington has been named a vice-captain of Europe's team for the 2027 Ryder Cup at Adare Manor in County Limerick. The three-time major champion joins brothers Edoardo and Francesco Molinari in Luke Donald's backroom team for the contest, which runs from 13–19 September 2027.",
          "For Ireland, the appointment carries particular weight. Harrington was part of the Europe side the last time the Ryder Cup was contested on home soil, at The K Club in 2006, and now returns to the European fold as Adare Manor prepares to host golf's greatest team event.",
        ],
      },
      {
        heading: "A career woven through the Ryder Cup",
        paragraphs: [
          "Harrington has represented Europe six times as a player, contributing to victories in 2002, 2004, 2006 and 2010. He has served as vice-captain on three previous occasions and captained Europe at the 2021 Ryder Cup — when Donald himself was among his vice-captains.",
          "\"It's something I didn't expect,\" Harrington said. \"I honestly didn't think I'd ever wear the European Ryder Cup logo again. So I'm very happy to be part of it. The Ryder Cup has been a special part of my life. Representing Europe has always been one of the highlights of my golfing career, and to be able to do it again in this situation, especially in Ireland, is special.\"",
          "He and Donald met at The Open to discuss the role. \"Luke and I arranged to meet up at The Open and chatted about it, and we felt we could strike up a good team again,\" Harrington said. \"Obviously, he was my vice captain in 2021, and we have worked together as vice captains in the past. And certainly, I feel I've something to give.\"",
        ],
      },
      {
        heading: "Donald on Harrington's Irish connection",
        paragraphs: [
          "Donald welcomed the Irishman's return to the European setup, highlighting both experience and local insight. \"He brings a wealth of experience, and I do love the fact that there's a connection,\" Donald said. \"He understands the Irish crowds and all that goes with having a Ryder Cup in Ireland. I think it's going to be very special for him.\"",
          "Team Europe will be seeking a third consecutive Ryder Cup title following wins in 2023 and 2025. Harrington's record since turning 50 in 2021 underlines his ongoing competitive edge: twelve PGA Tour Champions victories, including three US Senior Open titles (2022, 2025 and 2026) and the ISPS Handa Senior Open in 2025, taking his career tally to 44 wins worldwide.",
        ],
      },
      {
        heading: "What it means for Ryder Cup week in Limerick",
        paragraphs: [
          "As Adare Manor counts down to September 2027, Harrington's appointment adds another layer of Irish resonance to a week already freighted with home expectation. Crowds, hospitality and the atmosphere around the Adare will be unlike a typical away fixture — and Donald's choice of a vice-captain steeped in that setting speaks to how carefully Europe is preparing.",
          "For guests staying with The Adare Collection, tournament week will be defined by proximity and the chance to experience Ireland's Ryder Cup from a private residence. Our homes across Adare and the wider region are curated for sponsors, corporate groups and private parties who want a base close to the championship venue.",
          "Browse our properties or contact us to discuss availability as plans for September 2027 continue to take shape.",
        ],
      },
    ],
    externalLinks: [
      {
        label: "Ryder Cup 2027",
        url: "https://www.rydercup.com/",
      },
      {
        label: "Adare Manor",
        url: "https://www.adaremanor.com/",
      },
    ],
  },
  {
    slug: "ryder-cup-2027-ballot-results",
    title: "Ryder Cup 2027 Ballot Results: When You'll Hear and What Happens Next",
    excerpt:
      "Waiting on Ryder Cup ballot results for Adare Manor 2027? Here is what the confirmation email says about payment timing, how to check your application status, and what to do if you are successful.",
    publishedAt: "2026-07-22",
    category: "TICKETS",
    readTimeMinutes: 4,
    heroImage: "/images/blog/golf-crowd.webp",
    keywords:
      "ryder cup ballot results, ryder cup ballot 2027 results, ryder cup 2027 ballot results, ryder cup ballot, when is the ryder cup ballot drawn, ryder cup ticket ballot, Ryder Cup 2027 Adare Manor tickets",
    sections: [
      {
        paragraphs: [
          "If you entered the Ryder Cup ballot for Adare Manor in 2027, you are not alone in refreshing your inbox. Searches for Ryder Cup ballot results have surged as applicants wait to learn whether they secured Daily General Admission tickets — and when those results will land.",
          "There is no single public \"draw day\" advertised beyond July on the main ticket pages, which is why so many fans are asking the same question: when are the Ryder Cup 2027 ballot results announced? The clearest guidance sits in the confirmation email sent when you applied.",
        ],
      },
      {
        heading: "When are Ryder Cup ballot results announced?",
        paragraphs: [
          "According to the official ballot confirmation email, successful applicants can expect payment to be taken from Monday 20 July 2026. If you do not receive an email confirmation of your purchase by Friday 31 July 2026, your application was unsuccessful.",
          "In practical terms, Ryder Cup ballot results are being processed through the second half of July. Notifications are expected by the end of the month, with successful ticket holders charged automatically on the payment method registered to their ticketing account.",
          "If you are still waiting mid-to-late July, that does not necessarily mean you have been unsuccessful — the window for purchase confirmations runs through 31 July 2026.",
        ],
      },
      {
        heading: "How to check your Ryder Cup ballot application status",
        paragraphs: [
          "All applicants will be notified by email. You can also verify your application status by logging into your account on the official Ryder Cup Ticket Information page.",
          "Keep an eye on the email address linked to your ticketing account — including spam and promotions folders — especially between 20 and 31 July 2026. Successful applicants receive a purchase confirmation once payment has been taken; there is no separate checkout step.",
        ],
      },
      {
        heading: "What happens if you are successful",
        paragraphs: [
          "If any or all of the tickets in your application are allocated to you, payment is taken automatically from the card on your account. That is why it matters that your billing address matches your payment card details — the same check applied when you entered the ballot.",
          "Only tickets secured through official Ryder Cup channels will be accepted at Adare Manor. Once you have confirmation, you can turn your attention to travel, hospitality, and where you will stay for tournament week in September 2027.",
        ],
      },
      {
        heading: "What if you are unsuccessful?",
        paragraphs: [
          "If Friday 31 July 2026 passes without a purchase confirmation email, you should treat the application as unsuccessful for that ballot round. Official channels remain the only reliable source for any later ticket releases, hospitality options, or secondary processes the organisers may announce.",
          "For a refresher on how the ballot worked — account registration, ticket limits, and the Island of Ireland priority window — see our guide on how to apply for the 2027 Ryder Cup ballot.",
        ],
      },
      {
        heading: "Plan your Adare Manor stay while you wait",
        paragraphs: [
          "Whether you are watching for Ryder Cup ballot results this week or already holding tickets, accommodation near Adare Manor books early for Ryder Cup 2027. Private homes give groups space, parking, and a quieter base than hotel inventory alone can offer across tournament week.",
          "Browse our properties or contact us to discuss availability for successful ticket holders, corporate groups, and guests still finalising plans as ballot results land.",
        ],
      },
    ],
    externalLinks: [
      {
        label: "2027 Ryder Cup Ticket Information",
        url: "https://www.rydercup.com/attend/ticket-information",
      },
      {
        label: "How to Apply for the 2027 Ryder Cup Ballot",
        url: "https://theadarecollection.com/blog/how-to-apply-ryder-cup-2027-ballot",
      },
      {
        label: "Ryder Cup 2027 FAQs",
        url: "https://www.rydercup.com/2027-faqs",
      },
    ],
  },
  {
    slug: "stripe-ryder-cup-worldwide-partner",
    title: "Stripe Signs as Worldwide Partner for Ryder Cup 2027 at Adare Manor",
    excerpt:
      "The Irish-founded payments company becomes a top-tier worldwide partner and official payment solutions partner for the Ryder Cup, covering Adare Manor in 2027 and Hazeltine in 2029.",
    publishedAt: "2026-07-22",
    category: "NEWS",
    readTimeMinutes: 4,
    heroImage: "/images/blog/stripe-payment.webp",
    keywords:
      "Stripe Ryder Cup, Ryder Cup 2027 payments, Adare Manor Stripe partnership, Patrick John Collison Limerick, Ryder Cup Europe worldwide partner, cashless Ryder Cup Ireland",
    sections: [
      {
        paragraphs: [
          "Ryder Cup Europe and the PGA of America have announced that Stripe has signed a new agreement to become a worldwide partner and the official payment solutions partner to golf's greatest team contest. The partnership covers both the 2027 match at Adare Manor in County Limerick and the 2029 contest at Hazeltine National Golf Club in Minnesota.",
          "For Adare and the wider Mid-West, the announcement carries particular resonance. Stripe was founded by Limerick-educated brothers Patrick and John Collison and is dual-headquartered in San Francisco and Dublin. Their company now joins a landmark Irish sporting occasion as it prepares to welcome the world to Adare Manor in September 2027.",
        ],
      },
      {
        heading: "A seamless fan journey from ticket to tee",
        paragraphs: [
          "The agreement builds on Stripe's existing online payments relationship with the Ryder Cup, with the aim of giving fans a faster, more seamless way to pay — whether purchasing tickets from home or spending on site during tournament week.",
          "Online ticket sales and hospitality packages will sit within a single checkout experience. Stripe Link will offer a one-click option for returning fans, while local payment methods support the Ryder Cup's global audience. On the ground, Stripe Terminal is expected to power payments across food and beverage, merchandise and retail, with consistent financial reporting across the operation.",
        ],
      },
      {
        heading: "Scale built for a global sporting stage",
        paragraphs: [
          "Conor McNamara, chief revenue officer EMEA at Stripe, noted that an event of this scale — hundreds of thousands of fans moving through ticketing, hospitality and retail — is exactly the environment Stripe's infrastructure is designed for. The company will power the full fan journey, from buying tickets at home to spending at the golf course.",
          "Guy Kinnings, chief executive officer at the European Tour group, highlighted the operational reality behind the spectacle: ticketing, merchandise and catering at a modern Ryder Cup are significant undertakings, with over 70,000 square feet of merchandise space alone at the 2025 match in New York. Stripe's platforms will help deliver a cashless experience in Ireland with greater speed and convenience for fans worldwide.",
          "Terry Clark, chief executive officer at the PGA of America, welcomed Stripe as a worldwide partner and pointed to the same seamless payment experience for spectators at Hazeltine in 2029.",
        ],
      },
      {
        heading: "What it means for Ryder Cup week in Adare",
        paragraphs: [
          "As Adare Manor prepares to host the centenary Ryder Cup, partnerships of this kind underline how carefully the spectator experience is being designed — from transport and hospitality to the practical details of how guests pay for tickets, food and merchandise.",
          "For guests staying with The Adare Collection, the week will be defined by privacy, proximity and ease. Our executive and deluxe residences across Adare and the wider region are curated for sponsors, corporate groups and private parties who want a polished base close to the championship venue, with the quiet confidence of a professionally managed stay.",
          "Browse our properties or contact us to discuss availability while plans for September 2027 continue to take shape.",
        ],
      },
    ],
    externalLinks: [
      {
        label: "Limerick Leader: Stripe and Ryder Cup Europe",
        url: "https://www.limerickleader.ie/sport/ryder-cup/limerick-educated-brothers-sign-major-commercial-deal-with-ryder-cup-europe-8814894",
      },
      {
        label: "Ryder Cup 2027",
        url: "https://www.rydercup.com/",
      },
    ],
  },
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
          "Browse our properties or contact us to discuss availability and guest requirements while transport timetables for September 2027 are finalised.",
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
          "For the centenary Ryder Cup in September 2027, a dedicated heliport will operate at the golf course to handle high-volume air transfers during tournament week. Reports suggest capacity for several hundred helicopter movements per day, serving VIP attendees and those connecting from superyacht berths along the south-west coast.",
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
          "Whether you arrive by helicopter, train, or car, securing the right base for Ryder Cup week matters. Explore our collection of executive homes and demesne properties, or contact us to discuss group accommodation.",
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
          "Ballot results can take time, but accommodation near Adare Manor books early for Ryder Cup week. Browse our luxury rental properties or contact us to hold options while you await your ballot outcome.",
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
