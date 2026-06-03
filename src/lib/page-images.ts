/**
 * Photography per page/section, keyed by route slug / section key. All shots are
 * Dubai (Marina, Downtown, DIFC, Business Bay, Palm Jumeirah). Served from the
 * image CDN — migrate to Supabase Storage for full ownership later.
 */
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7/';
const img = (file: string) => `${CDN}${file}_min.webp`;

export const heroImage: Record<string, string | undefined> = {
  // home + hubs
  home: img('hf_20260603_180328_d16d57ba-3f4d-4359-86f9-5625035e7b8a'), // Dubai Marina, golden hour
  'who-we-help': img('hf_20260603_180312_c6a2f484-dc9f-4b51-bbd3-acba55a18064'), // DIFC
  'what-we-do': img('hf_20260603_180318_ab17a33e-a52e-4322-a760-761a396a12b7'), // Downtown / Burj Khalifa
  'who-we-are': img('hf_20260603_180320_a70b1793-1562-4713-8d57-03bfa9ed6ae6'), // Dubai skyline, twilight
  // who we help
  developers: img('hf_20260603_180341_3fac3811-3ffc-4b75-8675-3504dc32ed1d'), // towers under construction
  'asset-management': img('hf_20260603_180344_dec3559f-1bf0-41ce-b018-612fdfa09366'), // office, portfolio review
  'private-wealth': img('hf_20260603_180346_2ee04d91-43cd-4a9a-a913-1a95df13d761'), // penthouse, Burj view
  // what we do
  residential: img('hf_20260603_180354_93ac9871-615e-4a3f-9c87-f61c06ae037f'), // bright apartment, Marina view
  commercial: img('hf_20260603_180356_c3a7da49-34f9-434c-9ff7-aa2e241cacdb'), // Business Bay towers
  'off-plan': img('hf_20260603_180358_ef76fc67-a6e1-4c03-a81b-a6008c8ea71f'), // scale model, sales gallery
  'property-management': img('hf_20260603_180400_9a092c96-927e-4482-bc11-fe0113a6eb9d'), // keys handover
  mortgage: img('hf_20260603_180402_f63c8ec1-70f5-4589-b658-f281889202d4'), // advisor with couple
  'currency-services': img('hf_20260603_180404_4e02cedf-26a0-4176-9705-41d316dee286'), // dirham / FX
  'crypto-exchange': img('hf_20260603_180406_837ce5c7-a30e-420e-a556-5298a90768a8'), // tablet, crypto charts
  'sell-instantly': img('hf_20260603_180407_f0ad6f1e-d9c2-491a-b626-492a6bd88cfb'), // handshake, sold
  // who we are
  about: img('hf_20260603_180424_fe6488b8-ad2e-433d-ad8c-aba4bea21398'), // team collaborating
  press: img('hf_20260603_180434_b83223a9-0605-4612-a146-7d3abc9a1ffc'), // pressroom
  insights: img('hf_20260603_180433_2c954873-453e-4c17-83bd-0ef9afe24c5f'), // research desk
  resources: img('hf_20260603_180436_ff5a55a8-290d-4369-bd8c-d216c08180c9'), // printed guides
  agents: img('hf_20260603_180431_51efb69f-a119-4953-bace-57aac93020d3'), // advisor portrait
  careers: img('hf_20260603_180437_b43c0942-bd37-479d-be5a-f0411e8521e7'), // team, culture
  // sections
  properties: img('hf_20260603_180330_6d1e4e96-e7d1-4f5c-8803-247e210124c2'), // Palm Jumeirah, aerial
  'get-in-touch': img('hf_20260603_180428_6eaa1c14-a489-4dbe-8775-142bddbd2355'), // office reception
};

/** Secondary images for in-page feature rows and full-bleed bands. */
export const sectionImage: Record<string, string> = {
  team: img('hf_20260603_180424_fe6488b8-ad2e-433d-ad8c-aba4bea21398'), // team collaborating
  facade: img('hf_20260603_180426_6b2305e7-f521-4720-a608-8dde1fcb0b25'), // glass facade, golden light
  reception: img('hf_20260603_180428_6eaa1c14-a489-4dbe-8775-142bddbd2355'), // office reception
};
