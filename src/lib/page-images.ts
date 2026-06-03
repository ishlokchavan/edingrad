/**
 * Hero image per page/section, keyed by route slug / section key. Served from
 * the image CDN (migrate to Supabase Storage for full ownership later).
 */
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7/';
const img = (file: string) => `${CDN}${file}_min.webp`;

export const heroImage: Record<string, string | undefined> = {
  // hubs
  'who-we-help': img('hf_20260603_174440_2479e384-0baa-4027-a713-e5f07e119d60'),
  'what-we-do': img('hf_20260603_174449_3d6a4fa0-5566-4317-a1f6-2ef3ecbe0ce4'),
  'who-we-are': img('hf_20260603_174508_610418cc-54b7-4b26-be66-e9b06a014469'),
  // who we help
  developers: img('hf_20260603_174441_5d5e8a72-b42b-43ad-b621-5542b3af5b26'),
  'asset-management': img('hf_20260603_174443_6b15fd80-3ff1-4073-a412-5c73a49a5ffc'),
  'private-wealth': img('hf_20260603_174444_d28e095e-3a37-49f0-abbd-cd28063429b3'),
  // what we do (residential + off-plan reuse the seeded community/render shots)
  residential: img('hf_20260603_172909_08f378ea-aecc-4492-b0ff-745636800294'),
  commercial: img('hf_20260603_174452_14b341b9-cdfd-424c-84ca-408cc6f80d71'),
  'off-plan': img('hf_20260603_172848_502b168a-bcf1-4ffd-85bd-7979d228af07'),
  'property-management': img('hf_20260603_174453_3155e14c-c5e9-45c5-83cb-83127521742f'),
  'currency-services': img('hf_20260603_174455_667df45b-f1b4-47c7-8533-bff286f5ab14'),
  'sell-instantly': img('hf_20260603_174456_4b11ee13-3beb-4893-957b-7aa760107bc4'),
  mortgage: img('hf_20260603_174458_6a61b29a-d14a-45e2-9b57-56c786c766b8'),
  'crypto-exchange': img('hf_20260603_174506_ed1bc2f5-0f83-4720-9846-1d8e08c2233b'),
  // who we are
  about: img('hf_20260603_172915_61bb2713-b343-4bfc-982d-62780c21d531'),
  press: img('hf_20260603_174515_ba893426-8c86-4bec-9de3-2f0886b80b99'),
  insights: img('hf_20260603_174516_fb4aa940-53db-4087-a441-b490d5c292ab'),
  resources: img('hf_20260603_174517_393376ae-24aa-4657-ae0d-beec5ec40169'),
  careers: img('hf_20260603_174518_0e3f6651-2be3-4b11-a58e-9aa16702d84f'),
  agents: img('hf_20260603_174519_322b1406-eca6-4ce2-9dd4-19359fc534d0'),
  // sections
  properties: img('hf_20260603_174514_602b894b-0537-4b1f-a715-9b62e119c469'),
  'get-in-touch': img('hf_20260603_174512_4b08ebcd-eec5-485c-a370-5cc439d31be4'),
};
