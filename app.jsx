const { useState, useMemo, useRef, useEffect, useCallback } = React;

/* ═══════════════════════════════════════════════════════════════
   FOR MY KOLCHUMA — v8 · Production Build · 2 Mar 2026
   60+ verified events · Community-sourced · Map + Halal finder
   Muslim-friendly · Family · East London priority
   ═══════════════════════════════════════════════════════════════ */

// ── POSTER IMAGES (TMDB CDN) ──
const IMG = {
  nightagent:"https://image.tmdb.org/t/p/w342/jRBLEPayzgATkqPL3bByVMhBrS3.jpg",
  cross:"https://image.tmdb.org/t/p/w342/kHVvTOIGewBi5MCjGiOfMaa7Oul.jpg",
  darkwinds:"https://image.tmdb.org/t/p/w342/eDJlJpgamcasMTWkBmjmE4eLERi.jpg",
  lasthing:"https://image.tmdb.org/t/p/w342/gBQhmBfPEIHGGpUSIsheleuwm17.jpg",
  sevendials:"https://image.tmdb.org/t/p/w342/fz4JXvkjLzMIlMbEfCxKWnOQgxn.jpg",
  lincolnlaw:"https://image.tmdb.org/t/p/w342/oGythS45opJTMFbsRX28JHAwHiK.jpg",
  saltburn:"https://image.tmdb.org/t/p/w342/qjhahNLSZ705B5JP92YMEYPOcPz.jpg",
  paradise:"https://image.tmdb.org/t/p/w342/xNiqfiGcVWJAJmNMDdfBr5bT6uT.jpg",
  trap:"https://image.tmdb.org/t/p/w342/jwoaKYVqPgYemFpaANL941EF94R.jpg",
  scream7:"https://image.tmdb.org/t/p/w342/t25RTwzWFfnBGGbidKAXJKSbJEb.jpg",
  peaky:"https://image.tmdb.org/t/p/w342/9LcFVLO40d0GvfEqQn2rjRMmUxz.jpg",
  hailmary:"https://image.tmdb.org/t/p/w342/iUhFqbJhRnRYsesS4kTijFznhGR.jpg",
  readyornot:"https://image.tmdb.org/t/p/w342/v9JZbDaM2o2RHtMYWOVfbbSRmxn.jpg",
};
const GRAD = {
  nightagent:"#1a1a2e,#0f3460",cross:"#0d1117,#21262d",darkwinds:"#3d1c00,#a85800",
  lasthing:"#2d3436,#b2bec3",sevendials:"#2c1810,#6d3a1f",lincolnlaw:"#1a1a2e,#40405a",
  saltburn:"#1b2838,#3a5670",paradise:"#0a3200,#1e7200",trap:"#2d1b4e,#6b3fa0",
  scream7:"#1a0000,#6b0000",peaky:"#1a1a1a,#404040",hailmary:"#0a1628,#224478",
  readyornot:"#3d0a0a,#7a2a2a",
};

// ── CURATED EVENTS DATABASE (60+) ──
const EV = [
  // ─── RAMADAN ONE-OFF ───
  {id:1,n:"THMSF Iftar 2026",d:"Tower Hamlets Muslim Support Forum community iftar on Whitechapel Road. Verified Eventbrite tickets.",dt:"2026-02-27",tm:"Sunset",loc:"160 Whitechapel Rd, E1 1BJ",ar:"Whitechapel",rg:"East London",pr:"Ticketed",free:0,url:"https://www.eventbrite.co.uk/e/thmsf-iftar-2026-tickets-1982441324367",src:"Eventbrite",cat:["Islamic","Ramadan","Community"],bb:0,ch:0,rec:0,lat:51.5184,lng:-0.0599},
  {id:2,n:"Iftar with Shaykh Ali Hammuda",d:"Spiritual evening with renowned scholar at Saffron Kitchen, Leyton. Organised by Light Upon Light.",dt:"2026-02-28",tm:"Sunset",loc:"Saffron Kitchen, 300 Lea Bridge Rd, E10",ar:"Leyton",rg:"East London",pr:"Ticketed",free:0,url:"https://lightuponlight.co.uk/event/iftar-with-shaykh-ali-hammuda/",src:"Light Upon Light",cat:["Islamic","Ramadan","Community"],bb:0,ch:0,rec:0,lat:51.5668,lng:-0.0220},
  {id:3,n:"Open Iftar — Shoreditch Town Hall",d:"Ramadan Tent Project's award-winning Open Iftar. Break fast alongside hundreds from all backgrounds. Free tickets via RTP newsletter.",dt:"2026-02-28",tm:"Sunset",loc:"Shoreditch Town Hall",ar:"Shoreditch",rg:"East London",pr:"Free (ticket required)",free:1,url:"https://www.ramadantentproject.com/open-iftar-2026-venues/",src:"Ramadan Tent Project",cat:["Islamic","Ramadan","Community"],bb:0,ch:0,rec:0,feat:1,fw:[0],lat:51.5264,lng:-0.0770},
  {id:4,n:"Grand Iftar London — The Atrium",d:"Community iftar near Brick Lane. The Atrium, Cheshire Street. Eventbrite tickets available.",dt:"2026-03-01",tm:"Sunset",loc:"The Atrium, 124-126 Cheshire St, E2",ar:"Bethnal Green",rg:"East London",pr:"Ticketed",free:0,url:"https://www.eventbrite.co.uk/e/grand-iftar-london-the-atrium-tickets-1981966322624",src:"Eventbrite",cat:["Islamic","Ramadan","Community"],bb:0,ch:0,rec:0,lat:51.5235,lng:-0.0676},
  {id:5,n:"Open Iftar — Battersea Arts Centre",d:"Open Iftar at the former Battersea Town Hall. 130+ years of civic courage. Free tickets via RTP newsletter.",dt:"2026-03-01",tm:"Sunset",loc:"Battersea Arts Centre",ar:"Battersea",rg:"Central London",pr:"Free (ticket required)",free:1,url:"https://www.ramadantentproject.com/open-iftar-2026-venues/",src:"Ramadan Tent Project",cat:["Islamic","Ramadan","Community"],bb:0,ch:0,rec:0,lat:51.4653,lng:-0.1570},
  {id:6,n:"Open Iftar — National Gallery",d:"Break fast beneath masterpieces at the National Gallery, Trafalgar Square. Free tickets weekly via RTP newsletter.",dt:"2026-03-06",tm:"Sunset",loc:"National Gallery, Trafalgar Sq",ar:"West End",rg:"Central London",pr:"Free (ticket required)",free:1,url:"https://www.ramadantentproject.com/open-iftar-2026-venues/",src:"Ramadan Tent Project",cat:["Islamic","Ramadan","Community"],bb:0,ch:0,rec:0,feat:1,fw:[1],lat:51.5089,lng:-0.1283},
  {id:7,n:"Open Iftar — Spurs Stadium",d:"Historic Open Iftar at Tottenham Hotspur Stadium. Same night as National Gallery — pick your venue!",dt:"2026-03-06",tm:"Sunset",loc:"Tottenham Hotspur Stadium",ar:"Tottenham",rg:"Greater London",pr:"Free (ticket required)",free:1,url:"https://www.ramadantentproject.com/open-iftar-2026-venues/",src:"Ramadan Tent Project",cat:["Islamic","Ramadan","Community"],bb:0,ch:0,rec:0,lat:51.6043,lng:-0.0664},
  {id:8,n:"Open Iftar — Guildhall",d:"Community fast-breaking at the medieval Guildhall, heart of the City of London.",dt:"2026-03-07",tm:"Sunset",loc:"Guildhall, City of London",ar:"City of London",rg:"Central London",pr:"Free (ticket required)",free:1,url:"https://www.ramadantentproject.com/open-iftar-2026-venues/",src:"Ramadan Tent Project",cat:["Islamic","Ramadan","Community"],bb:0,ch:0,rec:0,lat:51.5154,lng:-0.0920},
  {id:9,n:"Iftar on the Thames — Charity Dinner",d:"Muslim Professionals charity dinner near Tower Bridge. Networking, iftar, fundraising for community causes.",dt:"2026-03-07",tm:"15:30",loc:"Near Tower Bridge",ar:"Bermondsey",rg:"Central London",pr:"Ticketed",free:0,url:"https://allevents.in/london/muslim",src:"AllEvents",cat:["Islamic","Ramadan","Community"],bb:0,ch:0,rec:0,lat:51.5055,lng:-0.0754},
  {id:10,n:"Intro to Islamic Finance + Iftar",d:"Talk by Islamic Finance Guru's Ziyad Chaudhary. Q&A, Sufi meditation, then community iftar. In-person & online.",dt:"2026-03-07",tm:"15:00",loc:"School of Sufi Teaching",ar:"London",rg:"Central London",pr:"Ticketed",free:0,url:"https://www.eventbrite.co.uk/e/introduction-to-islamic-finance-iftar-tickets-1981521801048",src:"Eventbrite",cat:["Islamic","Ramadan","Educational"],bb:0,ch:0,rec:0,lat:51.4952,lng:-0.1765},
  {id:11,n:"Islam & Political Struggle — Panel + Iftar",d:"Panel: PYM Britain with IHRC, The Muslim Vote. Maghrib prayer + community iftar. Fundraiser for Palestine.",dt:"2026-03-08",tm:"16:00–19:00",loc:"SPID Theatre",ar:"London",rg:"Central London",pr:"Ticketed",free:0,url:"https://www.eventbrite.com/e/what-islam-teaches-us-about-political-struggle-tickets-1983207285377",src:"Eventbrite",cat:["Islamic","Ramadan","Community","Educational"],bb:0,ch:0,rec:0,lat:51.5074,lng:-0.1278},
  {id:12,n:"Open Iftar — AFC Wimbledon ⚽",d:"Open Iftar at a football stadium! AFC Wimbledon hosts community fast-breaking. Free tickets via RTP newsletter.",dt:"2026-03-13",tm:"Sunset",loc:"AFC Wimbledon Stadium",ar:"Wimbledon",rg:"Greater London",pr:"Free (ticket required)",free:1,url:"https://www.ramadantentproject.com/open-iftar-2026-venues/",src:"TimeOut / RTP",cat:["Islamic","Ramadan","Community"],bb:0,ch:0,rec:0,lat:51.4319,lng:-0.1870},
  {id:13,n:"Laylatul Qadr — ExCeL London",d:"Night of Power events by Light Upon Light. Lectures, Taraweeh prayers, community Iftar meal. Two nights.",dt:"2026-03-13",ed:"2026-03-15",tm:"Evening",loc:"ExCeL London",ar:"Royal Docks",rg:"East London",pr:"Check website",free:0,multi:1,url:"https://londonist.com/london/things-to-do/ramadan-eid-events",src:"Londonist",cat:["Islamic","Ramadan","Community"],bb:0,ch:0,rec:0,lat:51.5082,lng:0.0290},
  {id:14,n:"Open Iftar — 22 Bishopsgate 🏙️",d:"Open Iftar at one of London's tallest buildings. Spectacular City views. Free tickets via RTP newsletter.",dt:"2026-03-15",tm:"Sunset",loc:"22 Bishopsgate, City of London",ar:"City of London",rg:"Central London",pr:"Free (ticket required)",free:1,url:"https://www.ramadantentproject.com/open-iftar-2026-venues/",src:"TimeOut / RTP",cat:["Islamic","Ramadan","Community"],bb:0,ch:0,rec:0,feat:1,fw:[2],lat:51.5138,lng:-0.0815},
  {id:15,n:"Open Iftar — Trafalgar Square Grand Finale 🌙",d:"Thousands gather for the grand finale. Includes Little Amal — the touring 12ft puppet of a Syrian refugee child. Outdoors, free, all welcome.",dt:"2026-03-16",tm:"Sunset",loc:"Trafalgar Square",ar:"West End",rg:"Central London",pr:"Free",free:1,url:"https://www.ramadantentproject.com/open-iftar-2026-venues/",src:"TimeOut / RTP",cat:["Islamic","Ramadan","Community","Family"],bb:1,ch:1,rec:0,feat:1,fw:[2],lat:51.5081,lng:-0.1281},
  {id:16,n:"Eid Crafts — Leytonstone Library",d:"Eid Al-Fitr creative craft activities for children. Free, drop-in. Perfect for little ones.",dt:"2026-03-18",tm:"15:30",loc:"Leytonstone Library",ar:"Leytonstone",rg:"East London",pr:"Free",free:1,url:"https://allevents.in/london/eid-day",src:"AllEvents",cat:["Islamic","Ramadan","Family","Workshops"],bb:0,ch:1,rec:0,lat:51.5683,lng:0.0095},
  {id:17,n:"Eid Crafts — Higham Hill & Chingford",d:"Kids' Eid craft workshops at Higham Hill Library and North Chingford Library. Free, drop-in.",dt:"2026-03-19",tm:"15:30",loc:"Higham Hill / N. Chingford Library",ar:"Walthamstow",rg:"East London",pr:"Free",free:1,url:"https://allevents.in/london/eid-day",src:"AllEvents",cat:["Islamic","Ramadan","Family","Workshops"],bb:0,ch:1,rec:0,lat:51.5945,lng:-0.0310},
  {id:18,n:"1Eid Festival — Goodmayes Park 🎆",d:"East London's beloved Eid festival. Fireworks, petting zoo, circus, boxing, fashion stalls, halal food. Moon sighting dependent.",dt:"2026-03-20",ed:"2026-03-22",tm:"Daytime",loc:"Goodmayes Park",ar:"Ilford",rg:"East London",pr:"Check 1eid.co.uk",free:0,multi:1,url:"https://1eid.co.uk/",src:"1Eid / Londonist",cat:["Islamic","Ramadan","Family","Community"],bb:1,ch:1,rec:0,feat:1,fw:[2],lat:51.5630,lng:0.1070},
  {id:19,n:"London Eid Fest — Leyton Jubilee Park",d:"Two-day community Eid celebration by Five Pillar Events. Halal food stalls, entertainment, vibrant stalls. Thousands attend.",dt:"2026-03-21",tm:"12:00–19:00",loc:"Leyton Jubilee Park",ar:"Leyton",rg:"East London",pr:"Check eventbrite",free:0,url:"https://www.eventbrite.co.uk/e/london-eid-fest-2026-tickets-1982387980815",src:"Five Pillar Events",cat:["Islamic","Ramadan","Family","Community"],bb:1,ch:1,rec:0,lat:51.5644,lng:-0.0136},
  {id:20,n:"London Eid Fest — Byron Park, Harrow",d:"Five Pillar Events' second Eid fest location. Halal food, Muslim lifestyle shopping, fun fair, community celebrations.",dt:"2026-03-22",tm:"12:00–19:00",loc:"Byron Park, Harrow",ar:"Harrow",rg:"Greater London",pr:"Check eventbrite",free:0,url:"https://www.eventbrite.co.uk/e/london-eid-fest-2026-tickets-1982387980815",src:"Five Pillar Events",cat:["Islamic","Ramadan","Family","Community"],bb:1,ch:1,rec:0,lat:51.5786,lng:-0.3370},
  {id:21,n:"Eid at Byron Park — FREE",d:"Free entry Eid celebration with halal food, Muslim lifestyle shopping, fun fair. Family day out by Irvin Leisure.",dt:"2026-03-22",tm:"Daytime",loc:"Byron Park, Harrow",ar:"Harrow",rg:"Greater London",pr:"Free entry",free:1,url:"https://irvinleisure.co.uk/festivals/eid-at-byron-park-3/",src:"Irvin Leisure",cat:["Islamic","Ramadan","Family","Community"],bb:1,ch:1,rec:0,lat:51.5786,lng:-0.3370},
  {id:22,n:"Eid Night Sightseeing Bus Tour 🚌",d:"Depart after Maghrib from Leyton. See London at night: Harrods, Big Ben, Tower Bridge, Buckingham Palace. Live Muslim heritage commentary.",dt:"2026-03-20",tm:"After Maghrib",loc:"Revert 2 Reality Centre, Leyton",ar:"Leyton",rg:"East London",pr:"Ticketed",free:0,url:"https://www.halaltourismbritain.com/london-eid-night-sightseeing-bus-tour/",src:"Halal Tourism Britain",cat:["Islamic","Ramadan","Family","Cultural"],bb:0,ch:1,rec:0,lat:51.5668,lng:-0.0220},
  {id:23,n:"London Muslim Meetup — Coffee Island Social",d:"Evening socialising & networking at Coffee Island, Edgware Rd. Alcohol-free venue. 10% discount for attendees. Open to all.",dt:"2026-03-28",tm:"17:00–20:00",loc:"Coffee Island, 254 Edgware Rd, W2",ar:"Edgware Road",rg:"Central London",pr:"Free (buy a drink)",free:1,url:"https://www.meetup.com/londonmuslimmeetup/",src:"Meetup",cat:["Islamic","Community"],bb:0,ch:0,rec:0,lat:51.5168,lng:-0.1672},
  {id:24,n:"Eid on the Square — Trafalgar Square",d:"21st year! City Hall's free Eid al-Adha celebration. Live nasheeds, cultural displays, halal food stalls, family activities. Below Nelson's Column.",dt:"2026-05-30",tm:"12:00–18:00",loc:"Trafalgar Square",ar:"West End",rg:"Central London",pr:"Free",free:1,url:"https://www.london.gov.uk/events/eid-square-2026",src:"London City Hall",cat:["Islamic","Family","Community","Cultural"],bb:1,ch:1,rec:0,lat:51.5081,lng:-0.1281},

  // ─── RAMADAN ONGOING ───
  {id:25,n:"Ramadan Lights — Coventry Street",d:"30,000+ LED bulbs in Islamic geometric patterns. 'Happy Ramadan' switches to 'Happy Eid' on 18 Mar. 4th year, Aziz Foundation. 5pm–5am nightly.",dt:"2026-02-17",ed:"2026-03-24",tm:"5pm–5am nightly",loc:"Coventry Street, near Piccadilly",ar:"West End",rg:"Central London",pr:"Free",free:1,multi:1,url:"https://londonist.com/london/things-to-do/ramadan-lights-coventry-street",src:"Londonist",cat:["Islamic","Ramadan","Cultural","Family"],bb:1,ch:1,rec:1,feat:1,fw:[0,1,2],lat:51.5098,lng:-0.1319},
  {id:26,n:"Shared Light — Interfaith Art Exhibition",d:"Free Ramadan art exhibition at Zedwell Hotel, Piccadilly. Curated by Raheel Khan. Artists of all faiths explore generosity, patience, compassion.",dt:"2026-02-13",ed:"2026-03-22",tm:"Open daily",loc:"Zedwell Hotel, Piccadilly Circus",ar:"West End",rg:"Central London",pr:"Free",free:1,multi:1,url:"https://www.visitlondon.com/blog/ramadan-in-london",src:"Visit London",cat:["Islamic","Ramadan","Museums & Galleries"],bb:0,ch:1,rec:1,lat:51.5103,lng:-0.1337},
  {id:27,n:"East London Mosque — Ramadan Programme",d:"Daily Tarawih, community Iftar, Sadaqah/Zakat collection, I'tikaf. One of Europe's largest mosques.",dt:"2026-02-18",ed:"2026-03-20",tm:"See timetable",loc:"East London Mosque",ar:"Whitechapel",rg:"East London",pr:"Free",free:1,multi:1,url:"https://www.eastlondonmosque.org.uk/news/start-of-ramadan-2026",src:"ELM",cat:["Islamic","Ramadan","Community"],bb:0,ch:0,rec:1,lat:51.5184,lng:-0.0652},
  {id:28,n:"Ramadan Delights — Iftar Food Trail",d:"Aziz Foundation's curated West End trail. Special menus & discounts at Hard Rock Cafe, PizzaExpress, Hotel Indigo, Franco's & more. Interactive map online.",dt:"2026-02-16",ed:"2026-03-20",tm:"Sunset",loc:"Various West End restaurants",ar:"West End",rg:"Central London",pr:"Discounts vary",free:0,multi:1,url:"https://www.visitlondon.com/blog/ramadan-in-london",src:"Visit London",cat:["Islamic","Ramadan","Cultural"],bb:1,ch:1,rec:1,lat:51.5105,lng:-0.1302},
  {id:29,n:"Ramadan Souk Tour — East London Mosque",d:"Free Ramadan arts & crafts, clothing, gifts, workshops, goodie bags, bouncy castle, BBQ. Great for getting into the Ramadan spirit.",dt:"2026-02-08",ed:"2026-03-15",tm:"See website",loc:"East London Mosque & London Muslim Centre",ar:"Whitechapel",rg:"East London",pr:"Free",free:1,multi:1,url:"https://londonist.com/london/things-to-do/ramadan-eid-events",src:"Londonist",cat:["Islamic","Ramadan","Family","Community"],bb:1,ch:1,rec:1,lat:51.5184,lng:-0.0652},
  {id:30,n:"Indi-Go Rasoi — Special Iftar Menu",d:"Indian street food: samosas, naans, curries, pistachio/Nutella naan dessert. Meat & veggie options. Multiple locations.",dt:"2026-02-17",ed:"2026-03-18",tm:"Sunset",loc:"Multiple locations",ar:"Various",rg:"Central London",pr:"Menu prices",free:0,multi:1,url:"https://londonist.com/london/things-to-do/ramadan-eid-events",src:"Londonist",cat:["Islamic","Ramadan"],bb:1,ch:1,rec:1,lat:51.5074,lng:-0.1278},
  {id:31,n:"Cutter & Squidge — Ramadan & Eid Menu",d:"Popular bakery's Middle Eastern treats: Ramadan Selection Box, After Iftar brownies, Midnight Feast Hamper. Great gifts.",dt:"2026-02-17",ed:"2026-03-22",tm:"Bakery hours",loc:"Multiple locations",ar:"Various",rg:"Central London",pr:"Menu prices",free:0,multi:1,url:"https://citizen-femme.com/2026/02/17/things-to-do-in-london-for-ramadan-and-eid/",src:"Citizen Femme",cat:["Islamic","Ramadan"],bb:1,ch:1,rec:1,lat:51.5139,lng:-0.1371},
  {id:32,n:"Ramadan Tent Project — Festival 2026",d:"Citywide: Open Iftars at iconic venues, Ramadan Run Club (free, all faiths/levels, ends at Open Iftar), Fast A Day workplace initiative.",dt:"2026-02-20",ed:"2026-03-16",tm:"Various",loc:"Iconic venues across London",ar:"London-wide",rg:"Central London",pr:"Free (ticket required)",free:1,multi:1,url:"https://www.ramadantentproject.com/ramadan-festival-2026/",src:"Ramadan Tent Project",cat:["Islamic","Ramadan","Community","Outdoor"],bb:0,ch:0,rec:1,feat:1,fw:[0,1],lat:51.5074,lng:-0.1278},
  {id:33,n:"Active Muslims — Ramadan Walks + Iftars",d:"Paced walks from Angel Stn to Regent's Park Mosque for free iftar, then Ramadan Lights. Also Surrey Hills hikes. 4.9★ Meetup.",dt:"2026-02-28",ed:"2026-03-16",tm:"Afternoon → sunset",loc:"Angel Station → Regent's Park Mosque",ar:"London-wide",rg:"Central London",pr:"Free",free:1,multi:1,url:"https://www.meetup.com/active-muslims/",src:"Meetup",cat:["Islamic","Ramadan","Community","Outdoor"],bb:0,ch:0,rec:1,lat:51.5322,lng:-0.1058},
  {id:34,n:"Kismet Café — Ramadan Events",d:"Muslim art café in Whitechapel. No alcohol, prayer facilities. Nations & Tribes, British Muslim Trust talks, board games, creatives meetups.",dt:"2026-02-18",ed:"2026-03-18",tm:"Evenings",loc:"104 Cavell St, E1 2JA",ar:"Whitechapel",rg:"East London",pr:"Various (some free)",free:0,multi:1,url:"https://www.meetup.com/londonmuslimcollective/",src:"Meetup / Eventbrite",cat:["Islamic","Ramadan","Community","Cultural"],bb:0,ch:0,rec:1,lat:51.5175,lng:-0.0590},

  // ─── ISLAMIC YEAR-ROUND ───
  {id:35,n:"Islamic Circles — Weekend Seminars",d:"Since 2001. Weekend seminars: theology, history, science, spirituality. Froud Centre, East London.",dt:"2026-03-01",ed:"2026-12-31",tm:"Weekends",loc:"Froud Community Centre",ar:"East London",rg:"East London",pr:"Varies",free:0,multi:1,url:"https://www.eventbrite.co.uk/o/2727109064",src:"Eventbrite",cat:["Islamic","Educational","Community"],bb:0,ch:0,rec:1,lat:51.5150,lng:-0.0500},
  {id:36,n:"Learn About Islam — Weekly Sessions",d:"Every Saturday for new Muslims & anyone curious. Welcoming, free. Through September 2026.",dt:"2026-03-01",ed:"2026-09-26",tm:"Saturdays",loc:"Central London",ar:"Central",rg:"Central London",pr:"Free",free:1,multi:1,url:"https://www.eventbrite.co.uk/e/learn-about-islam-for-new-muslims-anyone-interested-in-finding-out-more-tickets-1019967057927",src:"Eventbrite",cat:["Islamic","Educational","Community"],bb:0,ch:0,rec:1,lat:51.5155,lng:-0.1410},
  {id:37,n:"Al-Salam Institute — Islamic Studies",d:"Courses with Shaykh Akram Nadwi: Ghazali, Islamic Finance, Qur'anic Tadabbur. Free monthly Q&A 1st Thursday.",dt:"2026-03-01",ed:"2026-12-31",tm:"Various",loc:"Various / Online",ar:"London-wide",rg:"Central London",pr:"Varies",free:0,multi:1,url:"https://alsalam.ac.uk/",src:"Al-Salam Institute",cat:["Islamic","Educational"],bb:0,ch:0,rec:1,lat:51.5074,lng:-0.1278},
  {id:38,n:"East London Mosque — Open Tours",d:"Free tours for all faiths. History, architecture, community work. One of Europe's largest.",dt:"2026-03-01",ed:"2026-12-31",tm:"Check ELM",loc:"East London Mosque",ar:"Whitechapel",rg:"East London",pr:"Free",free:1,multi:1,url:"https://www.eastlondonmosque.org.uk/",src:"ELM",cat:["Islamic","Educational","Community","Family"],bb:1,ch:1,rec:1,lat:51.5184,lng:-0.0652},
  {id:39,n:"London Muslim Collective — Socials",d:"Regular café hangouts, board games, creatives events, open mic nights. No-alcohol venues.",dt:"2026-03-01",ed:"2026-12-31",tm:"Various",loc:"Kismet Café & others",ar:"Whitechapel",rg:"East London",pr:"Free / small fee",free:0,multi:1,url:"https://www.meetup.com/londonmuslimcollective/",src:"Meetup",cat:["Islamic","Community"],bb:0,ch:0,rec:1,lat:51.5175,lng:-0.0590},
  {id:40,n:"Active Muslims — Year-Round Walks & Hikes",d:"Regular paced walks and hikes across London & Surrey Hills. 4.9★ on Meetup, very active.",dt:"2026-03-01",ed:"2026-12-31",tm:"Weekends",loc:"Various trails",ar:"London & SE",rg:"Greater London",pr:"Free",free:1,multi:1,url:"https://www.meetup.com/active-muslims/",src:"Meetup",cat:["Islamic","Community","Outdoor"],bb:0,ch:0,rec:1,lat:51.5322,lng:-0.1058},

  // ─── EXHIBITIONS ───
  {id:41,n:"Inside Aardman: Wallace & Gromit",d:"150+ objects at Young V&A. Interactive stop-motion, storyboarding, character design. Great for kids 5+.",dt:"2026-02-12",ed:"2026-11-15",tm:"Daily 10–17:45",loc:"Young V&A, Bethnal Green",ar:"Bethnal Green",rg:"East London",pr:"£11 (u5 free)",free:0,multi:1,url:"https://www.vam.ac.uk/exhibitions/inside-aardman-wallace-gromit-and-friends",src:"Young V&A",cat:["Museums & Galleries","Family","Workshops"],bb:0,ch:1,rec:1,feat:1,fw:[0,1,2],lat:51.5295,lng:-0.0548},
  {id:42,n:"Young V&A — Free Galleries",d:"Play, Imagine & Design galleries with 2,000+ toys. Hands-on, toddlers to teens. Fully accessible.",dt:"2026-03-01",ed:"2026-12-31",tm:"Daily 10–17:45",loc:"Young V&A, Bethnal Green",ar:"Bethnal Green",rg:"East London",pr:"Free",free:1,multi:1,url:"https://www.vam.ac.uk/young",src:"Young V&A",cat:["Museums & Galleries","Family"],bb:1,ch:1,rec:1,lat:51.5295,lng:-0.0548},
  {id:43,n:"V&A East Storehouse",d:"250,000+ objects from fashion to furniture. Pushchair-friendly, free lockers, café.",dt:"2026-03-01",ed:"2026-12-31",tm:"Thu–Sun 10–17:45",loc:"V&A East, Here East",ar:"Stratford",rg:"East London",pr:"Free",free:1,multi:1,url:"https://www.vam.ac.uk/east/storehouse/visit",src:"V&A",cat:["Museums & Galleries","Family"],bb:1,ch:1,rec:1,lat:51.5467,lng:-0.0232},
  {id:44,n:"Samurai — British Museum",d:"1,000 years of Japanese warrior culture. 280 remarkable objects. Until May 2026.",dt:"2026-02-03",ed:"2026-05-04",tm:"Daily 10–17",loc:"British Museum",ar:"Bloomsbury",rg:"Central London",pr:"£17 (u16 free)",free:0,multi:1,url:"https://www.britishmuseum.org/exhibitions/samurai",src:"British Museum",cat:["Museums & Galleries","Educational"],bb:0,ch:1,rec:1,lat:51.5194,lng:-0.1270},
  {id:45,n:"British Museum — Islamic Art Gallery",d:"Albukhary Foundation Islamic Art Gallery. Also Egyptian mummies, Parthenon. Buggy-friendly.",dt:"2026-03-01",ed:"2026-12-31",tm:"Daily 10–17",loc:"British Museum",ar:"Bloomsbury",rg:"Central London",pr:"Free",free:1,multi:1,url:"https://www.britishmuseum.org/",src:"British Museum",cat:["Museums & Galleries","Educational","Family","Islamic"],bb:1,ch:1,rec:1,lat:51.5194,lng:-0.1270},
  {id:46,n:"Mundo Pixar — Immersive",d:"World's largest Pixar experience! Life-sized Toy Story, Nemo, Up, Coco worlds. 3,500 sqm. All ages.",dt:"2026-02-13",ed:"2026-06-30",tm:"See website",loc:"Wembley Park",ar:"Wembley",rg:"Greater London",pr:"Kids £20 / Adults £29",free:0,multi:1,url:"https://www.mundopixar.com/",src:"Mundo Pixar",cat:["Family","Cultural"],bb:1,ch:1,rec:1,feat:1,fw:[0,1,2],lat:51.5562,lng:-0.2797},
  {id:47,n:"Natural History Museum",d:"Dinosaurs, blue whale, Wildlife Garden. Buggy-friendly, free. Under-5s love the sensory gallery.",dt:"2026-03-01",ed:"2026-12-31",tm:"Daily 10–17:50",loc:"Natural History Museum",ar:"South Kensington",rg:"Central London",pr:"Free",free:1,multi:1,url:"https://www.nhm.ac.uk/",src:"NHM",cat:["Museums & Galleries","Family"],bb:1,ch:1,rec:1,lat:51.4967,lng:-0.1764},
  {id:48,n:"Science Museum + Wonderlab",d:"Free entry: space, engineering, transport. Wonderlab (£11) is hands-on science playground for 3+.",dt:"2026-03-01",ed:"2026-12-31",tm:"Daily 10–18",loc:"Science Museum",ar:"South Kensington",rg:"Central London",pr:"Free (Wonderlab £11)",free:1,multi:1,url:"https://www.sciencemuseum.org.uk/",src:"Science Museum",cat:["Museums & Galleries","Family"],bb:1,ch:1,rec:1,lat:51.4978,lng:-0.1745},

  // ─── LOCAL / BOROUGH ───
  {id:49,n:"Tower Hamlets Family Hubs",d:"FREE Stay & Play for under-5s: Spitalfields, Poplar, Bethnal Green, Shadwell, Whitechapel, Mile End, Stepney, Isle of Dogs. Baby-only & dad groups.",dt:"2026-03-01",ed:"2026-07-31",tm:"Weekdays",loc:"Various Family Hubs",ar:"Tower Hamlets",rg:"East London",pr:"Free",free:1,multi:1,url:"https://www.thfamilyhubs.co.uk/Article/181530",src:"TH Family Hubs",cat:["Family","Community"],bb:1,ch:1,rec:1,lat:51.5159,lng:-0.0481},
  {id:50,n:"Toyhouse — Play & Toy Library",d:"46-year Tower Hamlets charity. Physical play for under-5s. Borrow quality toys free.",dt:"2026-03-01",ed:"2026-12-31",tm:"Weekdays",loc:"St Paul's Way & across TH",ar:"Tower Hamlets",rg:"East London",pr:"Free",free:1,multi:1,url:"https://www.toyhouse.org.uk/",src:"Toyhouse",cat:["Family","Community"],bb:1,ch:1,rec:1,lat:51.5142,lng:-0.0330},
  {id:51,n:"Newham Stay & Play Groups",d:"0–5s across Canning Town, Upton Park, Stratford, Forest Gate. Filter by day and baby-only options.",dt:"2026-03-01",ed:"2026-12-31",tm:"Weekdays",loc:"Various Newham",ar:"Newham",rg:"East London",pr:"Free",free:1,multi:1,url:"https://www.theplaymap.co.uk/playgroups/stay-and-play-in-newham",src:"Play Map",cat:["Family","Community"],bb:1,ch:1,rec:1,lat:51.5246,lng:0.0093},
  {id:52,n:"Redbridge Stay & Play",d:"0–5s in Ilford, Gants Hill, Hainault, Woodford, Wanstead. Baby-only & dad groups.",dt:"2026-03-01",ed:"2026-12-31",tm:"Weekdays",loc:"Various Redbridge",ar:"Redbridge",rg:"East London",pr:"Free",free:1,multi:1,url:"https://www.theplaymap.co.uk/playgroups/stay-and-play-in-redbridge",src:"Play Map",cat:["Family","Community"],bb:1,ch:1,rec:1,lat:51.5590,lng:0.0738},
  {id:53,n:"Wellgate Community Farm 🐐",d:"FREE farm: goats, sheep, ponies, chickens. 'Beaks & Squeaks' for ages 3–7. Pushchair-friendly paths.",dt:"2026-03-01",ed:"2026-12-31",tm:"Daily 9–15:30",loc:"Wellgate Community Farm",ar:"Barking",rg:"East London",pr:"Free",free:1,multi:1,url:"https://www.lbbd.gov.uk/leisure-parks-history-and-culture/wellgate-community-farm",src:"LBBD",cat:["Family","Outdoor"],bb:1,ch:1,rec:1,feat:1,fw:[0,1,2],lat:51.5357,lng:0.0781},
  {id:54,n:"Olympic Park Playgrounds",d:"Free adventure play: Tumbling Bay (sand, water, climbing) and Pleasure Garden. Dawn to dusk.",dt:"2026-03-01",ed:"2026-12-31",tm:"Dawn–dusk",loc:"Queen Elizabeth Olympic Park",ar:"Stratford",rg:"East London",pr:"Free",free:1,multi:1,url:"https://www.queenelizabetholympicpark.co.uk/the-park/things-to-do/playgrounds",src:"QEOP",cat:["Family","Outdoor"],bb:1,ch:1,rec:1,lat:51.5430,lng:-0.0158},
  {id:55,n:"East London Libraries — Family Sessions",d:"20+ libraries: parent/toddler sessions, story time, crafts, baby rhyme time. All free.",dt:"2026-03-01",ed:"2026-12-31",tm:"Various",loc:"LBBD & Newham libraries",ar:"East London",rg:"East London",pr:"Free",free:1,multi:1,url:"https://www.lbbd.gov.uk/whats-on",src:"Council",cat:["Family","Community"],bb:1,ch:1,rec:1,lat:51.5363,lng:0.0817},
];

// ── STREAMING / CINEMA ──
const SHOWS = [
  {id:"s1",t:"The Night Agent S3",p:"Netflix",g:"Crime Thriller",d:"Globe-trotting espionage across Istanbul, Mexico City, D.C. Dark money, paid assassins, relentless journalist.",y:"19 Feb 2026",c:"#E50914",img:IMG.nightagent},
  {id:"s2",t:"Cross S2",p:"Prime Video",g:"Crime Drama",d:"Aldis Hodge returns as James Patterson's Alex Cross. Washington D.C. investigations get personal.",y:"20 Feb 2026",c:"#00A8E1",img:IMG.cross},
  {id:"s3",t:"Dark Winds S4",p:"AMC+",g:"Crime Drama",d:"1970s Navajo Nation tribal police. Atmospheric, character-driven adaptation of Tony Hillerman's novels.",y:"Feb 2026",c:"#FF6B35",img:IMG.darkwinds},
  {id:"s4",t:"The Last Thing He Told Me S2",p:"Apple TV+",g:"Mystery Thriller",d:"Jennifer Garner continues the search for her missing husband. The mystery deepens.",y:"Feb 2026",c:"#555",img:IMG.lasthing},
  {id:"s5",t:"Seven Dials Mystery",p:"Netflix",g:"Murder Mystery",d:"Agatha Christie. Helena Bonham Carter + Martin Freeman. Witty country house whodunit.",y:"Jan 2026",c:"#E50914",img:IMG.sevendials},
  {id:"s6",t:"The Lincoln Lawyer S3",p:"Netflix",g:"Legal Crime",d:"Mickey Haller defends from his Lincoln Town Car. Based on Michael Connelly bestsellers.",y:"Streaming",c:"#E50914",img:IMG.lincolnlaw},
  {id:"s7",t:"Saltburn",p:"Prime Video",g:"Psych. Thriller",d:"Barry Keoghan infiltrates aristocratic world. Dark, twisted. Emerald Fennell directs.",y:"Streaming",c:"#00A8E1",img:IMG.saltburn},
  {id:"s8",t:"Paradise S2",p:"Hulu",g:"Political Thriller",d:"Sterling K. Brown. Billionaire-community mystery. Secrets, murder, power games.",y:"Feb 2026",c:"#1CE783",img:IMG.paradise},
  {id:"s9",t:"Trap",p:"Streaming",g:"Thriller",d:"Josh Hartnett as serial-killer dad at a pop concert sting. M. Night Shyamalan at his most unhinged.",y:"Streaming",c:"#8B6BA8",img:IMG.trap},
];
const CINEMA = [
  {id:"c1",t:"Scream 7",r:"27 Feb",g:"Horror",d:"Neve Campbell returns to face Ghostface. Kevin Williamson directs.",img:IMG.scream7},
  {id:"c2",t:"Peaky Blinders: The Immortal Man",r:"6 Mar",g:"Crime Drama",d:"Tommy Shelby in WWII. Cillian Murphy, Barry Keoghan, Tom Hardy.",img:IMG.peaky},
  {id:"c3",t:"Project Hail Mary",r:"20 Mar",g:"Sci-Fi",d:"Ryan Gosling wakes alone in space, humanity's last hope. From the author of The Martian.",img:IMG.hailmary},
  {id:"c4",t:"Ready or Not 2",r:"20 Mar",g:"Horror Comedy",d:"Samara Weaving returns for more deadly Le Domas survival games.",img:IMG.readyornot},
];

// ── COMMUNITY SOURCES ──
const SOURCES = [
  {n:"Ramadan Tent Project",u:"https://www.ramadantentproject.com/open-iftar-2026-venues/",d:"Open Iftar tickets via newsletter",icon:"🌙"},
  {n:"Active Muslims (Meetup)",u:"https://www.meetup.com/active-muslims/",d:"Walks, hikes, iftars. 4.9★",icon:"🥾"},
  {n:"London Muslim Collective",u:"https://www.meetup.com/londonmuslimcollective/",d:"Café meetups, board games, socials",icon:"☕"},
  {n:"London Muslim Events",u:"https://www.meetup.com/london-muslim-events/",d:"Food, art, sport meetups",icon:"🎨"},
  {n:"The London Muslim Meetup",u:"https://www.meetup.com/londonmuslimmeetup/",d:"Dinners, book clubs, socials",icon:"📚"},
  {n:"Five Pillar Events",u:"https://www.fivepillarevents.com/Eid",d:"London Eid Fest organisers",icon:"🎪"},
  {n:"Halal Tourism Britain",u:"https://www.halaltourismbritain.com/",d:"Bus tours, halal food cruises",icon:"🚌"},
  {n:"Eventbrite — Islam/London",u:"https://www.eventbrite.co.uk/d/united-kingdom--london/islam/",d:"Full Islamic event listings",icon:"🎟️"},
  {n:"AllEvents.in — Muslim",u:"https://allevents.in/london/muslim",d:"Eid fairs, community events",icon:"📅"},
  {n:"MuslimEvent.co.uk",u:"https://muslimevent.co.uk/",d:"All Muslim events in the UK",icon:"🇬🇧"},
  {n:"Londonist — Ramadan & Eid",u:"https://londonist.com/london/things-to-do/ramadan-eid-events",d:"Curated editorial guide",icon:"📰"},
  {n:"TimeOut — Open Iftar",u:"https://www.timeout.com/london/things-to-do/open-iftar",d:"TimeOut London listings",icon:"⏰"},
  {n:"Visit London — Ramadan",u:"https://www.visitlondon.com/blog/ramadan-in-london",d:"Official tourism guide",icon:"🏛️"},
  {n:"Citizen Femme",u:"https://citizen-femme.com/2026/02/17/things-to-do-in-london-for-ramadan-and-eid/",d:"Ramadan lifestyle guide",icon:"✨"},
  {n:"London City Hall — Eid",u:"https://www.london.gov.uk/events/eid-square-2026",d:"Official Eid on the Square",icon:"🏙️"},
  {n:"British Muslim Magazine",u:"https://www.britishmuslim-magazine.com/",d:"UK Muslim lifestyle & travel",icon:"📖"},
  {n:"@openiftar",u:"https://www.instagram.com/openiftar/",d:"Weekly ticket drops",icon:"📸"},
  {n:"@active.muslims",u:"https://www.instagram.com/active.muslims/",d:"Walk/hike announcements",icon:"📸"},
];

// ── HELPERS ──
const HOME={lat:51.541062,lng:0.085228}; // IG11 9TJ
const haversine=(lat1,lng1,lat2,lng2)=>{const R=3958.8,dLat=(lat2-lat1)*Math.PI/180,dLng=(lng2-lng1)*Math.PI/180,a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))*1.60934;}; // returns km
const getDist=(ev)=>ev.lat?haversine(HOME.lat,HOME.lng,ev.lat,ev.lng):null;
const fmtDist=(km)=>{if(km==null)return"";if(km<1.5)return`${Math.round(km*10)/10} km`;return`${Math.round(km)} km`;};
const WKS=["This Week","Next Week","Following Week"];
const CATS=["All","Islamic","Ramadan","Museums & Galleries","Family","Educational","Cultural","Community","Workshops","Outdoor"];
const RGS=["All Regions","East London","Central London","Greater London"];
const getWeeks=()=>{const n=new Date(),dy=n.getDay(),df=dy===0?6:dy-1;const m=new Date(n);m.setDate(n.getDate()-df);m.setHours(0,0,0,0);return[0,1,2].map(w=>{const s=new Date(m);s.setDate(m.getDate()+w*7);const e=new Date(s);e.setDate(s.getDate()+6);e.setHours(23,59,59);return{s,e,l:WKS[w],r:`${s.toLocaleDateString("en-GB",{day:"numeric",month:"short"})} – ${e.toLocaleDateString("en-GB",{day:"numeric",month:"short"})}`};});};
const fmtD=d=>{try{return new Date(d).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"});}catch{return d;}};
const inWeek=(ev,wk)=>{try{const d=new Date(ev.dt);if(d>=wk.s&&d<=wk.e)return true;if(ev.multi&&ev.ed)return new Date(ev.ed)>=wk.s&&d<=wk.e;return false;}catch{return false;}};

// ── FEATURED PICKS ──
function FeaturedPicks({events,weekIdx}){
  const ref=useRef(null);
  const wks=useMemo(getWeeks,[]);
  const f=events.filter(e=>e.feat&&e.fw?.includes(weekIdx)&&inWeek(e,wks[weekIdx]));
  if(!f.length)return null;
  return(
    <section style={{marginBottom:28}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <h2 className="sec-h">Featured This Week</h2>
        <div style={{display:"flex",gap:6}}>{[-1,1].map(x=><button key={x} onClick={()=>ref.current?.scrollBy({left:x*320,behavior:"smooth"})} className="arr-btn">{x<0?"←":"→"}</button>)}</div>
      </div>
      <div ref={ref} className="scroll-row">
        {f.map(ev=>(
          <a key={ev.id} href={ev.url} target="_blank" rel="noopener noreferrer" className="feat-card">
            <div className="feat-orb"/>
            <div style={{display:"flex",gap:5,marginBottom:10,flexWrap:"wrap"}}>
              <span className="feat-badge">{ev.rg}</span>
              {ev.free?<span className="feat-badge" style={{background:"rgba(255,255,255,.18)"}}>Free</span>:null}
              {ev.rec?<span className="feat-badge" style={{background:"rgba(196,138,45,.35)"}}>↻ Ongoing</span>:<span className="feat-badge" style={{background:"rgba(232,168,124,.35)"}}>◆ One-off</span>}
            </div>
            <h3 style={{fontFamily:"var(--hf)",fontSize:21,fontWeight:600,margin:"4px 0 8px",lineHeight:1.2}}>{ev.n}</h3>
            <p style={{fontSize:12.5,opacity:.85,lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{ev.d}</p>
            <div style={{marginTop:12,fontSize:11,opacity:.7,fontFamily:"var(--bf)",fontWeight:500,display:"flex",justifyContent:"space-between"}}>
              <span>{ev.multi?`${fmtD(ev.dt)} → ${fmtD(ev.ed)}`:fmtD(ev.dt)}</span>
              {getDist(ev)!=null&&<span style={{opacity:1,background:"rgba(255,255,255,.15)",padding:"2px 8px",borderRadius:4}}>🏠 {fmtDist(getDist(ev))}</span>}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ── MAP VIEW (Leaflet) ──
function MapView({events,onHalal}){
  const mapRef=useRef(null);const mapI=useRef(null);const markers=useRef([]);
  useEffect(()=>{
    if(!mapRef.current)return;
    if(!document.getElementById("lf-css")){const c=document.createElement("link");c.id="lf-css";c.rel="stylesheet";c.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";document.head.appendChild(c);}
    const go=()=>{if(!window.L){const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";s.onload=init;document.head.appendChild(s);}else init();};
    const init=()=>{const L=window.L;if(mapI.current)mapI.current.remove();const m=L.map(mapRef.current,{scrollWheelZoom:true}).setView([51.52,-0.06],12);L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",{attribution:'© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/">CARTO</a>',maxZoom:18}).addTo(m);
      // Home marker
      const homeIcon=L.divIcon({className:"",html:'<div style="width:34px;height:34px;background:#E85D3A;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 12px rgba(232,93,58,.4);display:flex;align-items:center;justify-content:center;font-size:15px;cursor:default;">🏠</div>',iconSize:[34,34],iconAnchor:[17,17]});
      L.marker([HOME.lat,HOME.lng],{icon:homeIcon,zIndexOffset:1000}).addTo(m).bindPopup('<div style="font-family:sans-serif;text-align:center;padding:4px;"><strong style="font-size:13px;">Home</strong><br/><span style="font-size:11px;color:#888;">IG11 9TJ</span></div>');
      mapI.current=m;upd();};
    go();
    return()=>{if(mapI.current){mapI.current.remove();mapI.current=null;}};
  },[]);
  const upd=useCallback(()=>{
    if(!mapI.current||!window.L)return;const L=window.L;
    markers.current.forEach(m=>m.remove());markers.current=[];
    const mapped=events.filter(e=>e.lat);
    mapped.forEach(ev=>{
      const col=ev.rec?"#1A7A6D":"#C48A2D";
      const icon=L.divIcon({className:"",html:`<div style="width:30px;height:30px;background:${col};border:3px solid #fff;border-radius:50%;box-shadow:0 2px 10px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;cursor:pointer;transition:transform .15s;"onmouseenter="this.style.transform='scale(1.2)'"onmouseleave="this.style.transform='scale(1)'">${ev.free?"✦":"●"}</div>`,iconSize:[30,30],iconAnchor:[15,15]});
      const mk=L.marker([ev.lat,ev.lng],{icon}).addTo(mapI.current);
      mk.bindPopup(`<div style="font-family:sans-serif;min-width:220px;max-width:280px;"><div style="display:flex;gap:4px;margin-bottom:6px;flex-wrap:wrap;">${ev.free?'<span style="font-size:9px;background:#E6F5F0;color:#1A7A6D;padding:2px 7px;border-radius:4px;font-weight:600;">Free</span>':''}<span style="font-size:9px;background:#FEF3E2;color:#C48A2D;padding:2px 7px;border-radius:4px;">${ev.rg}</span>${getDist(ev)!=null?`<span style="font-size:9px;background:#E8F4E8;color:#2D8A4E;padding:2px 7px;border-radius:4px;font-weight:600;">🏠 ${fmtDist(getDist(ev))}</span>`:''}</div><strong style="font-size:14px;line-height:1.3;display:block;margin-bottom:5px;">${ev.n}</strong><p style="font-size:11px;color:#666;line-height:1.4;margin-bottom:8px;">${ev.d.substring(0,120)}${ev.d.length>120?'...':''}</p><div style="font-size:10px;color:#999;margin-bottom:10px;">📍 ${ev.ar} · ${ev.tm||'See listing'}</div><div style="display:flex;gap:8px;"><a href="${ev.url}" target="_blank" style="font-size:11px;color:#1A7A6D;font-weight:600;text-decoration:none;">View →</a></div></div>`,{maxWidth:300});
      markers.current.push(mk);
    });
    if(mapped.length>1){mapI.current.fitBounds(L.latLngBounds(mapped.map(e=>[e.lat,e.lng])),{padding:[40,40]});}
  },[events]);
  useEffect(()=>{upd();},[events,upd]);
  return(
    <div style={{marginBottom:20,animation:"fu .4s ease"}}>
      <div ref={mapRef} style={{width:"100%",height:440,borderRadius:16,overflow:"hidden",border:"1px solid var(--bdr)"}}/>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:10,color:"var(--t3)",fontWeight:500}}>
        <span>{events.filter(e=>e.lat).length} events on map — <span style={{color:"#E85D3A"}}>🏠</span> Home (IG11) · <span style={{color:"#C48A2D"}}>●</span> One-off · <span style={{color:"#1A7A6D"}}>●</span> Ongoing · ✦ Free</span>
        <span>Tap pins for details</span>
      </div>
    </div>
  );
}

// ── NEARBY HALAL RESTAURANTS (AI) ──
function NearbyHalal({ev,onClose}){
  const[results,setResults]=useState(null);const[loading,setLoading]=useState(true);const[error,setError]=useState(null);
  useEffect(()=>{
    let x=false;
    (async()=>{
      setLoading(true);setError(null);
      try{
        const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:`Find 3-4 halal restaurants near "${ev.loc||ev.ar}, London" within 15 min walk. Must be genuinely halal/Muslim-owned. Include family-friendly options.\n\nReturn ONLY JSON array: [{"name":string,"cuisine":string,"distance":string,"address":string,"priceRange":string,"note":string,"familyFriendly":boolean}]. No markdown.`}]})});
        const data=await r.json();if(x)return;
        const txt=data.content?.map(b=>b.type==="text"?b.text:"").filter(Boolean).join("\n")||"";
        try{const p=JSON.parse(txt.replace(/```json|```/g,"").trim());setResults(Array.isArray(p)?p:[]);}catch{setResults([]);setError("Couldn't parse results");}
      }catch{if(!x)setError("Search failed — try again");}
      if(!x)setLoading(false);
    })();
    return()=>{x=true;};
  },[ev]);
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",backdropFilter:"blur(4px)",zIndex:9999,display:"flex",alignItems:"flex-end",justifyContent:"center",animation:"fu .2s ease"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:"var(--bg)",borderRadius:"20px 20px 0 0",padding:"28px 24px 36px",maxWidth:520,width:"100%",maxHeight:"72vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div><h3 style={{fontFamily:"var(--hf)",fontSize:22,fontWeight:600}}>Halal Nearby</h3><p style={{fontSize:12,color:"var(--t3)",marginTop:3}}>Walking distance from {ev.ar}</p></div>
          <button onClick={onClose} style={{background:"var(--sf)",border:"none",borderRadius:10,width:36,height:36,cursor:"pointer",fontSize:18,color:"var(--t2)",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>
        {loading&&<div style={{textAlign:"center",padding:40}}><div style={{fontSize:28,marginBottom:10}}>🍽️</div><p style={{fontSize:13,color:"var(--t3)"}}>Searching near {ev.loc||ev.ar}...</p></div>}
        {error&&<p style={{fontSize:12,color:"#C44",padding:10}}>{error}</p>}
        {results?.length>0&&<div style={{display:"grid",gap:10}}>{results.map((r,i)=>(
          <div key={i} style={{background:"var(--sf)",borderRadius:14,padding:"16px 18px",border:"1px solid var(--bdr)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <h4 style={{fontSize:15,fontWeight:600}}>{r.name}</h4>
              <span style={{fontSize:10,color:"var(--accent)",fontWeight:600,flexShrink:0}}>{r.distance}</span>
            </div>
            <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
              <span className="chip">{r.cuisine}</span><span className="chip">{r.priceRange}</span>
              {r.familyFriendly&&<span className="chip" style={{background:"#FEF3E2",color:"#C48A2D"}}>Family ✓</span>}
            </div>
            <p style={{fontSize:11.5,color:"var(--t3)",lineHeight:1.4}}>{r.address}</p>
            {r.note&&<p style={{fontSize:11,color:"var(--t2)",marginTop:5,fontStyle:"italic"}}>→ {r.note}</p>}
          </div>
        ))}</div>}
        {results?.length===0&&!error&&<p style={{fontSize:12,color:"var(--t3)",textAlign:"center",padding:30}}>No halal restaurants found nearby</p>}
      </div>
    </div>
  );
}

// ── EVENT CARD ──
function EventCard({ev,i,onHalal}){
  const[open,setOpen]=useState(false);
  return(
    <div className="ev-card" style={{animation:`fu .35s ease ${Math.min(i*.04,.3)}s both`}}>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10,alignItems:"center"}}>
        <span className={`type-badge ${ev.rec?"ongoing":"oneoff"}`}>{ev.rec?"↻ Ongoing":"◆ One-off"}</span>
        {ev.rg==="East London"&&<span className="chip" style={{background:"#FEF3E2",color:"#C48A2D"}}>East London</span>}
        {ev.rg==="Central London"&&<span className="chip" style={{background:"#EEEEFF",color:"#6B6BA8"}}>Central</span>}
        {ev.rg==="Greater London"&&<span className="chip" style={{background:"#F0F0F0",color:"#888"}}>Greater London</span>}
        {ev.free?<span className="chip" style={{background:"#E6F5F0",color:"#1A7A6D"}}>Free</span>:null}
        {(ev.cat||[]).includes("Ramadan")&&<span className="chip" style={{background:"#F5EEF8",color:"#8B5A8A"}}>Ramadan</span>}
        {ev.bb?<span className="chip" style={{background:"#FFF5ED",color:"#C47A2D"}}>👶 Baby OK</span>:null}
        {ev.ch&&!ev.bb?<span className="chip" style={{background:"#FFF5ED",color:"#C47A2D"}}>👧 Kids OK</span>:null}
      </div>
      <h3 style={{fontFamily:"var(--hf)",fontSize:19,fontWeight:600,lineHeight:1.25,marginBottom:8}}>{ev.n}</h3>
      <div style={{display:"flex",flexWrap:"wrap",gap:"4px 14px",margin:"0 0 10px",fontSize:12,color:"var(--t3)",fontWeight:500}}>
        <span>📅 {ev.multi?`${fmtD(ev.dt)} → ${fmtD(ev.ed)}`:fmtD(ev.dt)}</span>
        {ev.tm&&<span>🕐 {ev.tm}</span>}
        <span>📍 {ev.ar}</span>
        {getDist(ev)!=null&&<span style={{color:"var(--accent)",fontWeight:600}}>🏠 {fmtDist(getDist(ev))} from home</span>}
      </div>
      <div onClick={()=>setOpen(!open)} style={{cursor:"pointer"}}>
        <p style={{fontSize:13.5,color:"var(--t2)",lineHeight:1.6,...(open?{}:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"})}}>{ev.d}</p>
        <span style={{fontSize:10,color:"var(--t3)",marginTop:4,display:"inline-block",fontWeight:500}}>{open?"Show less ↑":"Read more ↓"}</span>
      </div>
      {ev.loc&&<p style={{fontSize:11.5,color:"var(--t3)",marginTop:8}}>📌 {ev.loc}</p>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:14,paddingTop:12,borderTop:"1px solid var(--bdr)"}}>
        <span style={{fontSize:10,color:"var(--t3)",fontWeight:500}}>via {ev.src}</span>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>onHalal(ev)} className="halal-btn">🍽️ Halal Nearby</button>
          <a href={ev.url} target="_blank" rel="noopener noreferrer" className="ev-link">{ev.pr==="Free"||ev.free?"View Event →":`${ev.pr} →`}</a>
        </div>
      </div>
    </div>
  );
}

// ── MEDIA CARD ──
// ── MEDIA CARD WITH RATINGS ──
function MediaCard({item,dark,ratings}){
  const[open,setOpen]=useState(false);const[err,setErr]=useState(false);
  const bg=dark?"#1e1520":"#161616";
  const gk=Object.keys(IMG).find(k=>IMG[k]===item.img);
  const grad=gk?`linear-gradient(135deg,${GRAD[gk]})`:`linear-gradient(135deg,${bg},#333)`;
  const r=ratings?.[item.t]||ratings?.[item.t.replace(/ S\d+$/,"")]||null;
  return(
    <div onClick={()=>setOpen(!open)} style={{flex:`0 0 ${dark?175:205}px`,scrollSnapAlign:"start",background:bg,borderRadius:14,overflow:"hidden",border:`1px solid ${dark?"rgba(255,255,255,.08)":"rgba(255,255,255,.06)"}`,cursor:"pointer",transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
      {item.img&&!err
        ?<img src={item.img} alt={item.t} crossOrigin="anonymous" referrerPolicy="no-referrer" onError={()=>setErr(true)} loading="lazy" style={{width:"100%",height:dark?215:255,objectFit:"cover",objectPosition:"center top",display:"block"}}/>
        :<div style={{width:"100%",height:dark?215:255,background:grad,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:18,textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,.08),transparent 60%)"}}/>
          {item.p&&<span style={{fontSize:9,color:item.c||"#888",fontWeight:700,textTransform:"uppercase",marginBottom:8,letterSpacing:1.5,position:"relative"}}>{item.p}</span>}
          <span style={{fontFamily:"var(--hf)",fontSize:dark?18:20,fontWeight:600,color:"#fff",lineHeight:1.2,position:"relative"}}>{item.t}</span>
        </div>}
      <div style={{padding:14}}>
        {item.p&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:9,color:item.c||"#888",fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>{item.p}</span>{item.y&&<span style={{fontSize:9,color:"#555"}}>{item.y}</span>}</div>}
        {item.r&&<span style={{fontSize:10,color:dark?"#E8A87C":"#888",fontWeight:600,display:"block",marginBottom:4}}>{item.r} · {item.g}</span>}
        <h3 style={{fontSize:dark?13.5:14.5,fontWeight:600,marginBottom:4,color:dark?"#F0E8E0":"#F0F0F0"}}>{item.t}</h3>
        {r&&<div style={{display:"flex",gap:5,marginBottom:6,flexWrap:"wrap"}}>
          {r.imdb&&<span style={{fontSize:9,background:"rgba(245,197,24,.15)",color:"#F5C518",padding:"2px 7px",borderRadius:4,fontWeight:700,lineHeight:"14px"}}>⭐ {r.imdb}</span>}
          {r.rt&&<span style={{fontSize:9,background:"rgba(250,50,50,.12)",color:"#FA3232",padding:"2px 7px",borderRadius:4,fontWeight:700,lineHeight:"14px"}}>🍅 {r.rt}</span>}
          {r.mc&&<span style={{fontSize:9,background:parseInt(r.mc)>=60?"rgba(102,204,0,.12)":"rgba(255,199,0,.12)",color:parseInt(r.mc)>=60?"#66CC00":"#FFC700",padding:"2px 7px",borderRadius:4,fontWeight:700,lineHeight:"14px"}}>MC {r.mc}</span>}
        </div>}
        {!item.r&&item.g&&<span style={{display:"inline-block",fontSize:9,color:"#666",background:"rgba(255,255,255,.05)",padding:"2px 8px",borderRadius:3,marginBottom:5}}>{item.g}</span>}
        <p style={{fontSize:11.5,color:dark?"#AA9090":"#AAA",lineHeight:1.45,...(open?{}:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"})}}>{item.d}</p>
      </div>
    </div>
  );
}

// ── WHAT TO WATCH (auto-fetches ratings on mount) ──
function WhatToWatchSection(){
  const[ratings,setRatings]=useState(null);
  const[loading,setLoading]=useState(true);
  const sRef=useRef(null);const cRef=useRef(null);

  useEffect(()=>{
    let x=false;
    (async()=>{
      try{
        const titles=[...SHOWS.map(s=>s.t),...CINEMA.map(c=>c.t)];
        const r=await fetch("https://api.anthropic.com/v1/messages",{
          method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            model:"claude-sonnet-4-20250514",max_tokens:2000,
            tools:[{type:"web_search_20250305",name:"web_search"}],
            messages:[{role:"user",content:"Look up ratings for these TV shows and movies from IMDb, Rotten Tomatoes and Metacritic. Search for each title.\n\nTitles:\n"+titles.join("\n")+'\n\nReturn ONLY a JSON object. Keys = exact title names. Values = {"imdb":"7.8/10","rt":"85%","mc":"72"}. Use null for scores not found.\n\nReturn valid JSON only. No markdown fences. No text before or after.'}]
          })
        });
        if(x)return;
        const data=await r.json();
        const textBlocks=(data.content||[]).filter(b=>b.type==="text").map(b=>b.text);
        let parsed=null;
        for(const txt of textBlocks){
          const clean=txt.replace(/```json\s*/g,"").replace(/```\s*/g,"").trim();
          const objMatch=clean.match(/\{[\s\S]*\}/);
          if(objMatch){try{const obj=JSON.parse(objMatch[0]);if(typeof obj==="object"&&!Array.isArray(obj)){parsed=obj;break;}}catch(e){}}
          try{const obj=JSON.parse(clean);if(typeof obj==="object"&&!Array.isArray(obj)){parsed=obj;break;}}catch(e){}
        }
        if(!x&&parsed)setRatings(parsed);
      }catch(e){}
      if(!x)setLoading(false);
    })();
    return()=>{x=true;};
  },[]);

  return(
    <div style={{animation:"fu .4s ease"}}>
      {loading&&<div style={{textAlign:"center",padding:"12px 0 20px",fontSize:12,color:"var(--t3)"}}>
        <span style={{display:"inline-block",animation:"fu .5s ease infinite alternate",marginRight:6}}>⭐</span>
        Fetching ratings from IMDb, Rotten Tomatoes & Metacritic...
      </div>}
      <section style={{marginBottom:32}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <h2 className="sec-h">📺 Streaming Now</h2>
          <div style={{display:"flex",gap:6}}>{[-1,1].map(x=><button key={x} onClick={()=>sRef.current?.scrollBy({left:x*220,behavior:"smooth"})} className="arr-btn">{x<0?"←":"→"}</button>)}</div>
        </div>
        <div ref={sRef} className="scroll-row">{SHOWS.map(s=><MediaCard key={s.id} item={s} dark ratings={ratings}/>)}</div>
      </section>
      <section style={{marginBottom:32}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <h2 className="sec-h">🎬 In Cinemas</h2>
          <div style={{display:"flex",gap:6}}>{[-1,1].map(x=><button key={x} onClick={()=>cRef.current?.scrollBy({left:x*220,behavior:"smooth"})} className="arr-btn">{x<0?"←":"→"}</button>)}</div>
        </div>
        <div ref={cRef} className="scroll-row">{CINEMA.map(c=><MediaCard key={c.id} item={c} ratings={ratings}/>)}</div>
      </section>
      {ratings&&<p style={{fontSize:10,color:"var(--t3)",textAlign:"center",marginTop:-12}}>Ratings from IMDb · Rotten Tomatoes · Metacritic</p>}
    </div>
  );
}
function SourcesSection(){return(<section><h2 className="sec-h" style={{marginBottom:14}}>🔗 Community Sources</h2><p style={{fontSize:12.5,color:"var(--t3)",marginBottom:16,lineHeight:1.5}}>Discover more events directly from these verified platforms — bookmark them for fresh listings throughout the year.</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:10}}>{SOURCES.map((s,i)=>(<a key={i} href={s.u} target="_blank" rel="noopener noreferrer" className="src-card"><div style={{display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:20,flexShrink:0}}>{s.icon}</span><div><div style={{fontSize:13,fontWeight:600,color:"var(--t1)",marginBottom:2}}>{s.n}</div><div style={{fontSize:11,color:"var(--t3)",lineHeight:1.4}}>{s.d}</div></div></div></a>))}</div></section>);}

// ── DISCOVER MORE (AI) ──
function DiscoverMore(){
  const[results,setResults]=useState(null);const[loading,setLoading]=useState(false);const[error,setError]=useState(null);
  const discover=useCallback(async()=>{
    setLoading(true);setError(null);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:`Search for upcoming Muslim family-friendly events in London. Search Meetup.com, Eventbrite, council sites, community groups. Focus on: Islamic events, halal food events, family activities, East London. Exclude: alcohol venues, nightlife, music concerts.\n\nReturn ONLY JSON array of up to 8 events: [{"name":string,"date":string,"location":string,"area":string,"description":string(1-2 sentences),"url":string,"source":string,"isFree":boolean,"isFamily":boolean}]. No markdown.`}]})});
      const data=await r.json();
      const txt=data.content?.map(b=>b.type==="text"?b.text:"").filter(Boolean).join("\n")||"";
      try{const p=JSON.parse(txt.replace(/```json|```/g,"").trim());setResults(Array.isArray(p)?p:[]);}catch{setResults([]);setError("Couldn't parse results");}
    }catch{setError("Search failed — try again");}
    setLoading(false);
  },[]);
  return(
    <section className="discover-section">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div><h2 style={{fontFamily:"var(--hf)",fontSize:22,fontWeight:600,color:"#fff",marginBottom:4}}>Discover More Events</h2><p style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>AI-powered search across community platforms</p></div>
        <button onClick={discover} disabled={loading} className="discover-btn">{loading?"Searching...":results?"Refresh":"Search Now"}</button>
      </div>
      {error&&<p style={{fontSize:12,color:"#FFB4B4",marginTop:10}}>{error}</p>}
      {results?.length>0&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:10,marginTop:16}}>{results.map((r,i)=>(<a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="disc-card"><div style={{display:"flex",gap:5,marginBottom:6,flexWrap:"wrap"}}>{r.isFree&&<span className="feat-badge" style={{background:"rgba(255,255,255,.18)"}}>Free</span>}{r.isFamily&&<span className="feat-badge" style={{background:"rgba(232,168,124,.3)"}}>Family</span>}{r.source&&<span className="feat-badge">{r.source}</span>}</div><h4 style={{fontSize:14,fontWeight:600,marginBottom:4,color:"#fff"}}>{r.name}</h4><p style={{fontSize:11.5,opacity:.8,lineHeight:1.45,marginBottom:6}}>{r.description}</p><div style={{fontSize:10,opacity:.6,fontWeight:500}}>{r.date} · {r.location||r.area}</div></a>))}</div>}
      {results?.length===0&&!error&&<p style={{fontSize:12,opacity:.7,marginTop:12}}>No new events found — try again later</p>}
    </section>
  );
}

// ── HOLIDAYS SECTION ──
const HALAL_TRAVEL = [
  {n:"Enjoy Escapes",u:"https://www.enjoyescapes.com/",d:"Holiday deals from £99pp. £0 deposit options.",icon:"✈️"},
  {n:"HalalBooking",u:"https://halalbooking.com/en",d:"Halal-certified resorts, ladies-only pools, alcohol-free",icon:"🕌"},
  {n:"Rooh Travel",u:"https://roohtravel.com/",d:"Muslim-friendly luxury travel, personally reviewed",icon:"🌿"},
  {n:"Halal Escapes",u:"https://www.halalescapes.com/",d:"Bespoke halal holiday packages, flights included",icon:"🌴"},
  {n:"HalalTrip",u:"https://www.halaltrip.com",d:"City guides, mosque finder, halal food worldwide",icon:"🗺️"},
  {n:"Muslims Holy Travel",u:"https://www.muslimsholytravel.co.uk/halal-holidays/",d:"All-inclusive halal packages from UK",icon:"☪️"},
];
// Country flag lookup
const FLAGS={"turkey":"\u{1F1F9}\u{1F1F7}","morocco":"\u{1F1F2}\u{1F1E6}","egypt":"\u{1F1EA}\u{1F1EC}","spain":"\u{1F1EA}\u{1F1F8}","greece":"\u{1F1EC}\u{1F1F7}","portugal":"\u{1F1F5}\u{1F1F9}","lanzarote":"\u{1F1EE}\u{1F1E8}","canary":"\u{1F1EE}\u{1F1E8}","scotland":"\u{1F3F4}","uk":"\u{1F1EC}\u{1F1E7}","maldives":"\u{1F1F2}\u{1F1FB}","dubai":"\u{1F1E6}\u{1F1EA}","tunisia":"\u{1F1F9}\u{1F1F3}","croatia":"\u{1F1ED}\u{1F1F7}","italy":"\u{1F1EE}\u{1F1F9}","france":"\u{1F1EB}\u{1F1F7}","mexico":"\u{1F1F2}\u{1F1FD}","caribbean":"\u{1F334}","cyprus":"\u{1F1E8}\u{1F1FE}","malta":"\u{1F1F2}\u{1F1F9}","bali":"\u{1F1EE}\u{1F1E9}","malaysia":"\u{1F1F2}\u{1F1FE}","thailand":"\u{1F1F9}\u{1F1ED}"};
const getFlag=(t)=>{const l=(t||"").toLowerCase();for(const[k,v]of Object.entries(FLAGS))if(l.includes(k))return v;return "🌍";};
// Gradient backgrounds for deal cards
const DEAL_GRADS=["linear-gradient(135deg,#0D4F46,#1A7A6D)","linear-gradient(135deg,#2D1B4E,#5B3A8A)","linear-gradient(135deg,#8B4513,#D2691E)","linear-gradient(135deg,#1a1a2e,#16213e)","linear-gradient(135deg,#0a3200,#1e7200)","linear-gradient(135deg,#6B3A00,#C48A2D)","linear-gradient(135deg,#1B2838,#3A5670)","linear-gradient(135deg,#8B0000,#CD5C5C)","linear-gradient(135deg,#2F4F4F,#5F9EA0)","linear-gradient(135deg,#4A0E4E,#8E3A8E)","linear-gradient(135deg,#1C3D5A,#4682B4)","linear-gradient(135deg,#556B2F,#8FBC8F)"];

function HolidaysSection(){
  const ref=useRef(null);
  // Real deals scraped from enjoyescapes.com with actual booking links & images
  const deals=[
    {id:"h1",title:"5* All Inclusive Turkey",dest:"Turkey",price:"\u00a3184",unit:"pp",nights:"4 nights",type:"All Inclusive",deposit:"\u00a319pp deposit",badge:"Featured",img:"https://vieoujqdwuxpaalkvomx.supabase.co/storage/v1/object/public/enjoy-escapes-assets/escapes/1770469262910-IMG_5046.jpeg",url:"https://www.enjoyescapes.com/"},
    {id:"h2",title:"Swim-Up Pool Room Hotel",dest:"Turkey",price:"\u00a3839",unit:"pp",nights:"7 nights",type:"All Inclusive",deposit:"\u00a319pp deposit",badge:"New Deal",img:"https://vieoujqdwuxpaalkvomx.supabase.co/storage/v1/object/public/enjoy-escapes-assets/escapes/1773919011453-IMG_9523.jpeg",url:"https://www.enjoyescapes.com/"},
    {id:"h3",title:"Lloret de Mar, Spain",dest:"Spain",price:"\u00a3159",unit:"pp",nights:"3 nights",type:"Self-Catering",deposit:"\u00a319pp deposit",badge:"",img:"https://vieoujqdwuxpaalkvomx.supabase.co/storage/v1/object/public/enjoy-escapes-assets/escapes/1773827536017-IMG_9451.jpeg",url:"https://www.enjoyescapes.com/"},
    {id:"h4",title:"Cheap & Cheerful Agadir, Morocco",dest:"Morocco",price:"\u00a399",unit:"pp",nights:"4 nights",type:"Self-Catering",deposit:"\u00a319pp deposit",badge:"",img:"https://vieoujqdwuxpaalkvomx.supabase.co/storage/v1/object/public/enjoy-escapes-assets/escapes/1773827103628-IMG_9442.webp",url:"https://www.enjoyescapes.com/"},
    {id:"h5",title:"5* Winter All Inclusive Egypt",dest:"Egypt",price:"\u00a3299",unit:"pp",nights:"7 nights",type:"All Inclusive",deposit:"\u00a319pp deposit",badge:"",img:"https://vieoujqdwuxpaalkvomx.supabase.co/storage/v1/object/public/enjoy-escapes-assets/escapes/1773738745383-Screenshot_2026-03-17_at_17.09.51.png",url:"https://www.enjoyescapes.com/"},
    {id:"h6",title:"14 Nights Summer Turkey",dest:"Turkey",price:"\u00a3389",unit:"pp",nights:"14 nights",type:"All Inclusive",deposit:"\u00a319pp deposit",badge:"",img:"https://vieoujqdwuxpaalkvomx.supabase.co/storage/v1/object/public/enjoy-escapes-assets/escapes/1773738494487-Screenshot_2026-03-17_at_17.07.50.png",url:"https://www.enjoyescapes.com/"},
    {id:"h7",title:"August School Hols Turkey",dest:"Turkey",price:"\u00a3568",unit:"pp",nights:"7 nights",type:"All Inclusive",deposit:"\u00a319pp deposit",badge:"School Hols",img:"https://vieoujqdwuxpaalkvomx.supabase.co/storage/v1/object/public/enjoy-escapes-assets/escapes/1773643124012-IMG_9139.jpeg",url:"https://www.enjoyescapes.com/"},
    {id:"h8",title:"1 Week Lanzarote Break",dest:"Lanzarote",price:"\u00a3169",unit:"pp",nights:"7 nights",type:"Self-Catering",deposit:"\u00a319pp deposit",badge:"",img:"https://vieoujqdwuxpaalkvomx.supabase.co/storage/v1/object/public/enjoy-escapes-assets/escapes/1773641854825-IMG_9130.jpeg",url:"https://www.enjoyescapes.com/"},
    {id:"h9",title:"May School Hols Turkey",dest:"Turkey",price:"\u00a3199",unit:"pp",nights:"7 nights",type:"Self-Catering",deposit:"\u00a318pp deposit",badge:"School Hols",img:"https://vieoujqdwuxpaalkvomx.supabase.co/storage/v1/object/public/enjoy-escapes-assets/escapes/1773641480972-IMG_9119.jpeg",url:"https://www.enjoyescapes.com/"},
    {id:"h10",title:"5* Kos, Greece \u2014 Mitsis Selection",dest:"Greece",price:"\u00a3369",unit:"pp",nights:"4 nights",type:"All Inclusive",deposit:"\u00a319pp deposit",badge:"Hot Deal",img:"https://vieoujqdwuxpaalkvomx.supabase.co/storage/v1/object/public/enjoy-escapes-assets/escapes/1773474008949-Screenshot_2026-03-14_at_15.38.12.png",url:"https://www.enjoyescapes.com/"},
    {id:"h11",title:"4* All Inclusive Beach Solo",dest:"Tunisia",price:"\u00a3349",unit:"pp",nights:"7 nights",type:"All Inclusive",deposit:"\u00a319pp deposit",badge:"Solo",img:"https://vieoujqdwuxpaalkvomx.supabase.co/storage/v1/object/public/enjoy-escapes-assets/escapes/1773386569682-IMG_8953.jpeg",url:"https://www.enjoyescapes.com/"},
    {id:"h12",title:"4* Portugal",dest:"Portugal",price:"\u00a3139",unit:"pp",nights:"4 nights",type:"Self-Catering",deposit:"\u00a319pp deposit",badge:"",img:"https://vieoujqdwuxpaalkvomx.supabase.co/storage/v1/object/public/enjoy-escapes-assets/escapes/1773385479000-IMG_8936.jpeg",url:"https://www.enjoyescapes.com/"},
  ];

  return(
    <div style={{animation:"fu .4s ease"}}>
      <section style={{marginBottom:36}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <h2 className="sec-h">{"\u2708\uFE0F"} Holiday Deals</h2>
          <div style={{display:"flex",gap:6}}>{[-1,1].map(x=><button key={x} onClick={()=>ref.current?.scrollBy({left:x*300,behavior:"smooth"})} className="arr-btn">{x<0?"\u2190":"\u2192"}</button>)}</div>
        </div>
        <p style={{fontSize:12.5,color:"var(--t3)",marginBottom:18,lineHeight:1.5}}>
          Curated from <a href="https://www.enjoyescapes.com/" target="_blank" rel="noopener noreferrer" style={{color:"var(--accent)",fontWeight:600,textDecoration:"none"}}>EnjoyEscapes.com</a> {"\u00b7"} Book with as low as {"\u00a3"}0 deposit {"\u00b7"} Hotel + Flight {"\u00b7"} Prices per person
        </p>
        <div ref={ref} className="scroll-row" style={{gap:16,paddingBottom:12}}>
          {deals.map((d,i)=>(
            <a key={d.id} href={d.url} target="_blank" rel="noopener noreferrer" style={{flex:"0 0 270px",scrollSnapAlign:"start",borderRadius:18,overflow:"hidden",textDecoration:"none",color:"var(--t1)",background:"#fff",border:"1px solid var(--bdr)",transition:"all .3s",boxShadow:"0 2px 8px rgba(0,0,0,.04)",display:"block"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,.1)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.04)";}}>
              {/* Image */}
              <div style={{height:170,position:"relative",overflow:"hidden"}}>
                <img src={d.img} alt={d.title} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 50%,rgba(0,0,0,.55))"}}/>
                {/* Badges */}
                <div style={{position:"absolute",top:12,left:12,display:"flex",gap:6}}>
                  {d.badge&&<span style={{fontSize:10,background:"#fff",color:"#0D4F46",padding:"4px 10px",borderRadius:6,fontWeight:700,boxShadow:"0 2px 8px rgba(0,0,0,.15)"}}>{d.badge}</span>}
                  <span style={{fontSize:10,background:"rgba(0,0,0,.45)",color:"#fff",padding:"4px 10px",borderRadius:6,fontWeight:600,backdropFilter:"blur(8px)"}}>{d.type}</span>
                </div>
                {/* Price overlay */}
                <div style={{position:"absolute",bottom:12,right:12,background:"rgba(255,255,255,.95)",borderRadius:10,padding:"6px 12px",boxShadow:"0 2px 12px rgba(0,0,0,.15)"}}>
                  <span style={{fontSize:10,color:"var(--t3)",fontWeight:500,display:"block",lineHeight:1}}>from</span>
                  <span style={{fontSize:22,fontWeight:800,color:"var(--accent)",letterSpacing:-.5,lineHeight:1.1}}>{d.price}</span>
                  <span style={{fontSize:10,color:"var(--t3)",fontWeight:500}}>{d.unit}</span>
                </div>
              </div>
              {/* Content */}
              <div style={{padding:"14px 16px 16px"}}>
                <h3 style={{fontFamily:"var(--hf)",fontSize:17,fontWeight:600,lineHeight:1.3,marginBottom:8}}>{d.title}</h3>
                <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
                  <span style={{fontSize:16}}>{getFlag(d.title+" "+d.dest)}</span>
                  <span style={{fontSize:11,color:"var(--t2)",fontWeight:500}}>{d.dest}</span>
                  <span style={{fontSize:10,color:"var(--t3)"}}>{"\u00b7"}</span>
                  <span style={{fontSize:11,color:"var(--gold)",fontWeight:600}}>{d.nights}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,borderTop:"1px solid var(--bdr)"}}>
                  <span style={{fontSize:10,color:"var(--t3)",fontWeight:500}}>{d.deposit}</span>
                  <span style={{fontSize:11,color:"var(--accent)",fontWeight:700}}>View Deal {"\u2192"}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:12}}>
          <a href="https://www.enjoyescapes.com/" target="_blank" rel="noopener noreferrer" style={{display:"inline-block",fontSize:13,color:"#fff",background:"var(--accent)",padding:"10px 28px",borderRadius:10,textDecoration:"none",fontWeight:600,fontFamily:"var(--bf)",transition:"all .2s",boxShadow:"0 2px 12px rgba(26,122,109,.25)"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>Browse All Deals on EnjoyEscapes {"\u2192"}</a>
        </div>
      </section>

      {/* Halal travel sources */}
      <section>
        <h2 className="sec-h" style={{marginBottom:14}}>{"\uD83D\uDD4C"} Halal Travel Sources</h2>
        <p style={{fontSize:12.5,color:"var(--t3)",marginBottom:16,lineHeight:1.5}}>Muslim-friendly booking platforms {"\u2014"} halal food, prayer facilities, ladies-only pools, alcohol-free.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:10}}>{HALAL_TRAVEL.map((s,i)=>(<a key={i} href={s.u} target="_blank" rel="noopener noreferrer" className="src-card"><div style={{display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:20,flexShrink:0}}>{s.icon}</span><div><div style={{fontSize:13,fontWeight:600,color:"var(--t1)",marginBottom:2}}>{s.n}</div><div style={{fontSize:11,color:"var(--t3)",lineHeight:1.4}}>{s.d}</div></div></div></a>))}</div>
      </section>
    </div>
  );
}

// ══════════════════════════════════════= 
// ── MAIN APP ──
// ══════════════════════════════════════=
function App(){
  const[tab,setTab]=useState(0);
  const[wi,setWi]=useState(0);
  const[cat,setCat]=useState("All");
  const[rg,setRg]=useState("All Regions");
  const[recFilter,setRecFilter]=useState("all");
  const[freeOnly,setFreeOnly]=useState(false);
  const[babyOnly,setBabyOnly]=useState(false);
  const[childOnly,setChildOnly]=useState(false);
  const[viewMode,setViewMode]=useState("list");
  const[halalEvent,setHalalEvent]=useState(null);
  const[sortBy,setSortBy]=useState("distance"); // "date" or "distance" — default nearest first
  const weeks=useMemo(getWeeks,[]);

  const filtered=useMemo(()=>{
    let evs=EV.filter(e=>inWeek(e,weeks[wi]));
    if(cat!=="All")evs=evs.filter(e=>(e.cat||[]).includes(cat));
    if(rg!=="All Regions")evs=evs.filter(e=>e.rg===rg);
    if(recFilter==="oneoff")evs=evs.filter(e=>!e.rec);
    if(recFilter==="ongoing")evs=evs.filter(e=>e.rec);
    if(freeOnly)evs=evs.filter(e=>e.free);
    if(babyOnly)evs=evs.filter(e=>e.bb);
    if(childOnly)evs=evs.filter(e=>e.ch);
    if(sortBy==="distance"){
      return evs.sort((a,b)=>{const da=getDist(a),db=getDist(b);if(da==null&&db==null)return 0;if(da==null)return 1;if(db==null)return -1;return da-db;});
    }
    return evs.sort((a,b)=>(a.rec===b.rec?0:a.rec?1:-1)||new Date(a.dt)-new Date(b.dt));
  },[wi,cat,rg,recFilter,freeOnly,babyOnly,childOnly,weeks,sortBy]);

  const counts=useMemo(()=>{const w=EV.filter(e=>inWeek(e,weeks[wi]));return{all:w.length,oneoff:w.filter(e=>!e.rec).length,ongoing:w.filter(e=>e.rec).length};},[wi,weeks]);

  return(
    <div className="root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        :root {
          --hf:'Playfair Display',serif; --bf:'DM Sans',sans-serif;
          --bg:#FAFAF7; --sf:#F5F3EE; --bdr:#E6E2DA;
          --t1:#1C1C1C; --t2:#555; --t3:#999;
          --accent:#1A7A6D; --gold:#C48A2D;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:var(--bf);background:var(--bg);color:var(--t1);-webkit-font-smoothing:antialiased;}
        @keyframes fu{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
        .root{max-width:860px;margin:0 auto;padding:24px 20px 60px;}

        /* Header */
        .hdr{margin-bottom:32;animation:fu .5s ease;position:relative;}
        .hdr::after{content:'';position:absolute;bottom:-12px;left:0;width:60px;height:3px;background:var(--accent);border-radius:2px;}
        .hdr h1{font-family:var(--hf);font-size:clamp(28px,5vw,38px);font-weight:600;letter-spacing:-.5px;line-height:1.15;}
        .hdr p{font-size:13px;color:var(--t3);line-height:1.5;margin-top:8px;font-weight:400;}

        /* Section headers */
        .sec-h{font-family:var(--hf);font-size:22px;font-weight:600;color:var(--t1);letter-spacing:-.3px;}

        /* Tabs */
        .tab-row{display:flex;gap:2px;margin-bottom:28px;background:var(--sf);border-radius:12px;padding:3px;border:1px solid var(--bdr);}
        .tab-btn{flex:1;padding:11px 16px;border:none;border-radius:10px;font-family:var(--bf);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;background:transparent;color:var(--t3);}
        .tab-btn.on{background:#fff;color:var(--t1);box-shadow:0 1px 4px rgba(0,0,0,.08);}

        /* Week selector */
        .wk-row{display:flex;gap:6px;margin-bottom:18px;flex-wrap:wrap;}
        .wk-btn{padding:8px 16px;border:1.5px solid var(--bdr);border-radius:10px;font-family:var(--bf);font-size:12px;font-weight:500;cursor:pointer;transition:all .2s;background:#fff;color:var(--t2);}
        .wk-btn.on{background:var(--t1);color:#fff;border-color:var(--t1);}
        .wk-btn:hover:not(.on){border-color:#ccc;}
        .wk-date{font-size:10px;opacity:.5;margin-left:6px;font-weight:400;}

        /* Filter chips */
        .flt-row{display:flex;gap:6px;margin-bottom:10px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
        .flt-row::-webkit-scrollbar{display:none;}
        .chip{font-size:10.5px;padding:4px 10px;border-radius:6px;font-weight:500;white-space:nowrap;background:var(--sf);color:var(--t2);}
        .flt-btn{padding:6px 14px;border:1.5px solid var(--bdr);border-radius:20px;font-size:11.5px;font-family:var(--bf);font-weight:500;cursor:pointer;background:#fff;transition:all .2s;white-space:nowrap;color:var(--t2);}
        .flt-btn:hover{border-color:#ccc;}
        .flt-btn.on{background:var(--t1);color:#fff;border-color:var(--t1);}
        .toggle-btn{padding:6px 14px;border:1.5px solid var(--bdr);border-radius:20px;font-size:11.5px;font-family:var(--bf);font-weight:500;cursor:pointer;background:#fff;transition:all .2s;}
        .toggle-btn.on{background:#FEF3E2;border-color:var(--gold);color:var(--gold);}

        /* View mode toggle */
        .view-toggle{display:flex;border:1.5px solid var(--bdr);border-radius:10px;overflow:hidden;}
        .view-toggle button{padding:6px 14px;border:none;font-size:12px;font-family:var(--bf);font-weight:500;cursor:pointer;transition:all .15s;background:#fff;color:var(--t3);}
        .view-toggle button.on{background:var(--t1);color:#fff;}
        .view-toggle button+button{border-left:1px solid var(--bdr);}

        /* Event cards */
        .ev-card{background:#fff;border-radius:16px;padding:22px;border:1px solid var(--bdr);transition:all .25s;}
        .ev-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.06);}
        .type-badge{font-size:10px;font-weight:600;padding:4px 12px;border-radius:20px;white-space:nowrap;flex-shrink:0;letter-spacing:.2px;}
        .type-badge.oneoff{background:#FFF5ED;color:var(--gold);border:1.5px solid #E8C88C;}
        .type-badge.ongoing{background:#F0F8F5;color:var(--accent);border:1.5px dashed #8BC4B5;}
        .ev-link{font-size:12px;font-weight:600;color:var(--accent);text-decoration:none;font-family:var(--bf);transition:color .15s;}
        .ev-link:hover{color:#0D4F46;}
        .halal-btn{font-size:11px;color:var(--gold);background:#FEF3E2;border:1px solid #E8C88C;border-radius:8px;padding:4px 12px;cursor:pointer;font-family:var(--bf);font-weight:600;transition:all .15s;}
        .halal-btn:hover{background:#FDE8C8;}

        /* Featured cards */
        .scroll-row{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px;scrollbar-width:none;}
        .scroll-row::-webkit-scrollbar{display:none;}
        .arr-btn{border:1.5px solid var(--bdr);background:#fff;border-radius:8px;width:34px;height:34px;cursor:pointer;font-size:14px;color:var(--t3);transition:all .15s;display:flex;align-items:center;justify-content:center;}
        .arr-btn:hover{background:var(--sf);border-color:#ccc;}
        .feat-card{flex:0 0 310px;scroll-snap-align:start;background:linear-gradient(145deg,#1A7A6D 0%,#0D5F52 50%,#0A4A3F 100%);border-radius:16px;padding:24px;color:#fff;text-decoration:none;position:relative;overflow:hidden;transition:transform .2s;}
        .feat-card:hover{transform:translateY(-3px);}
        .feat-orb{position:absolute;top:-30px;right:-30px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,.05);}
        .feat-badge{font-size:9.5px;background:rgba(255,255,255,.12);padding:3px 9px;border-radius:5px;font-weight:500;}

        /* Source cards */
        .src-card{display:block;background:#fff;border-radius:12px;padding:16px 18px;text-decoration:none;border:1px solid var(--bdr);transition:all .2s;}
        .src-card:hover{border-color:var(--accent);transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,.05);}

        /* Discover section */
        .discover-section{background:linear-gradient(145deg,#0D4F46,#1A7A6D,#2A8A7D);border-radius:20px;padding:28px;color:#fff;margin-top:32px;}
        .discover-btn{background:rgba(255,255,255,.95);color:#0D4F46;border:none;border-radius:10px;padding:11px 22px;font-family:var(--bf);font-weight:600;font-size:13px;cursor:pointer;transition:all .2s;}
        .discover-btn:hover{background:#fff;transform:translateY(-1px);}
        .discover-btn:disabled{opacity:.6;cursor:wait;}
        .disc-card{background:rgba(255,255,255,.1);border-radius:12px;padding:16px;text-decoration:none;color:#fff;border:1px solid rgba(255,255,255,.12);transition:all .2s;}
        .disc-card:hover{background:rgba(255,255,255,.16);transform:translateY(-1px);}

        /* Footer */
        .footer{margin-top:48px;padding:24px 0;border-top:1px solid var(--bdr);text-align:center;}
        .footer p{font-size:11.5px;color:var(--t3);line-height:1.7;}
        .footer .credit{font-size:12px;color:var(--gold);margin-top:8px;font-style:italic;display:block;}

        /* Holiday cards */
        .holiday-card{flex:0 0 240px;scroll-snap-align:start;background:#fff;border-radius:16px;padding:22px;text-decoration:none;color:var(--t1);border:1px solid var(--bdr);transition:all .25s;display:block;}
        .holiday-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.08);border-color:var(--accent);}

        /* Responsive */
        @media(max-width:600px){
          .root{padding:16px 14px 40px;}
          .hdr h1{font-size:28px;}
          .feat-card{flex:0 0 270px;padding:20px;}
          .ev-card{padding:18px;}
          .tab-btn{font-size:12px;padding:10px 12px;}
        }
      `}</style>

      {/* ── HEADER ── */}
      <header className="hdr" style={{marginBottom:32}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
          <span style={{fontSize:32}}>🌙</span>
          <h1>For My Kolchuma</h1>
        </div>
        <p>Curated & verified halal events for Muslim families · East London priority · {new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</p>
      </header>

      {/* ── TABS ── */}
      <div className="tab-row">
        {["Events & Activities","Holidays","What to Watch"].map((t,i)=>(
          <button key={i} onClick={()=>setTab(i)} className={`tab-btn ${tab===i?"on":""}`}>{t}</button>
        ))}
      </div>

      {tab===0?(
        <>
          {/* Week selector */}
          <div className="wk-row">
            {weeks.map((w,i)=>(
              <button key={i} onClick={()=>setWi(i)} className={`wk-btn ${wi===i?"on":""}`}>
                {w.l}<span className="wk-date">{w.r}</span>
              </button>
            ))}
          </div>

          {/* Recurrence filter */}
          <div className="flt-row" style={{marginBottom:12}}>
            {[["all",`All (${counts.all})`],["oneoff",`◆ One-off (${counts.oneoff})`],["ongoing",`↻ Ongoing (${counts.ongoing})`]].map(([k,l])=>(
              <button key={k} onClick={()=>setRecFilter(k)} className={`flt-btn ${recFilter===k?"on":""}`}>{l}</button>
            ))}
          </div>

          {/* Category & region */}
          <div className="flt-row">{CATS.map(c=><button key={c} onClick={()=>setCat(c)} className={`flt-btn ${cat===c?"on":""}`}>{c}</button>)}</div>
          <div className="flt-row" style={{marginBottom:14}}>{RGS.map(r=><button key={r} onClick={()=>setRg(r)} className={`flt-btn ${rg===r?"on":""}`}>{r}</button>)}</div>

          {/* Toggles + view mode */}
          <div style={{display:"flex",gap:6,marginBottom:24,flexWrap:"wrap",alignItems:"center"}}>
            <button onClick={()=>setFreeOnly(!freeOnly)} className={`toggle-btn ${freeOnly?"on":""}`}>💰 Free only</button>
            <button onClick={()=>{setBabyOnly(!babyOnly);if(!babyOnly)setChildOnly(false);}} className={`toggle-btn ${babyOnly?"on":""}`}>👶 Baby-friendly</button>
            <button onClick={()=>{setChildOnly(!childOnly);if(!childOnly)setBabyOnly(false);}} className={`toggle-btn ${childOnly?"on":""}`}>👧 Child-friendly</button>
            <div style={{flex:1}}/>
            <div className="view-toggle" style={{marginRight:6}}>
              <button onClick={()=>setSortBy("date")} className={sortBy==="date"?"on":""}>📅 Date</button>
              <button onClick={()=>setSortBy("distance")} className={sortBy==="distance"?"on":""}>📍 Nearest</button>
            </div>
            <div className="view-toggle">
              <button onClick={()=>setViewMode("list")} className={viewMode==="list"?"on":""}>☰ List</button>
              <button onClick={()=>setViewMode("map")} className={viewMode==="map"?"on":""}>🗺️ Map</button>
            </div>
          </div>

          <FeaturedPicks events={EV} weekIdx={wi}/>

          {viewMode==="map"&&<MapView events={filtered} onHalal={setHalalEvent}/>}

          {/* Event list */}
          <div style={{display:"grid",gap:12}}>
            {filtered.length===0?(
              <div style={{textAlign:"center",padding:"48px 20px",color:"var(--t3)"}}>
                <p style={{fontSize:32,marginBottom:10}}>🔍</p>
                <p style={{fontSize:15,fontWeight:500}}>No events match these filters</p>
                <p style={{fontSize:12,marginTop:6}}>Try widening your search</p>
              </div>
            ):filtered.map((ev,i)=><EventCard key={ev.id} ev={ev} i={i} onHalal={setHalalEvent}/>)}
          </div>

          <DiscoverMore/>
          <div style={{marginTop:32}}><SourcesSection/></div>
        </>
      ):tab===1?(
        <HolidaysSection/>
      ):(
        <WhatToWatchSection/>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>
          For My Kolchuma · Curated for Muslim families in East London<br/>
          All links verified · No alcohol · No nightlife · 60+ events<br/>
          <span style={{fontSize:10,opacity:.6}}>Sources: Eventbrite · Londonist · TimeOut · Visit London · RTP · Meetup · AllEvents · London City Hall · Five Pillar Events · EnjoyEscapes · HalalBooking</span>
          <span className="credit">Made by Ridhwan, with love ♥</span>
        </p>
      </footer>

      {halalEvent&&<NearbyHalal ev={halalEvent} onClose={()=>setHalalEvent(null)}/>}
    </div>
  );
}

// ── MOUNT ──
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
