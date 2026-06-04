/**
 * Legal & compliance pages. Drafts in the Edingrad voice — bracketed
 * [placeholders] mark company specifics that legal/compliance must confirm
 * before go-live. Bodies are GitHub-flavoured Markdown, rendered by MarkdownBody.
 */
export const LEGAL_SLUGS = ['privacy', 'terms', 'cookies', 'kyc-aml'] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export interface LegalDoc {
  title: string;
  overline: string;
  lead: string;
  updated: string;
  body: string;
}

const UPDATED = 'Last updated 4 June 2026';

export const legalDocs: Record<LegalSlug, LegalDoc> = {
  privacy: {
    title: 'Privacy Policy',
    overline: 'Legal',
    lead: 'How Edingrad collects, uses and protects personal data, and the rights you hold over it.',
    updated: UPDATED,
    body: `This policy explains how **Edingrad Real Estate L.L.C** ("Edingrad", "we") handles personal data, in line with the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021).

## Who we are
Edingrad Real Estate L.L.C is the data controller for the personal data described here. We are licensed in Dubai, United Arab Emirates [trade licence no. to confirm], with a registered office at [registered address to confirm]. For any privacy matter, contact [privacy@edingrad.com].

## What we collect
- **Identity and contact details** you give us: name, email, phone.
- **Enquiry details**: the audience you select, your message, the property or service you ask about.
- **Property information** you share when you ask us to advise on, list or value a property.
- **Compliance records** where a transaction proceeds: identity documents and source-of-funds information required by law (see our KYC/AML Policy).
- **Technical and usage data**: limited information from cookies needed to run the site (see our Cookie Policy).

## Why we use it, and our lawful basis
- To **respond to your enquiry** and provide the service you request (performance of a contract, or steps taken at your request).
- To **meet legal obligations**, including anti-money-laundering and record-keeping duties (legal obligation).
- To **operate and secure the website** and improve our service (legitimate interests, balanced against your rights).
- To **send you information you have asked for**, where you have consented. You can withdraw consent at any time.

## Who we share it with
We do not sell personal data. We share it only with:
- **Service providers** who process data on our behalf under contract: website hosting, database and authentication, and email delivery.
- **Licensed partners** where a service requires them, for example a VARA-licensed partner for any virtual-asset transaction.
- **Authorities and regulators** where we are required to disclose by law.

## International transfers
Some providers process data outside the UAE. Where they do, we take steps to ensure an adequate level of protection consistent with UAE law.

## How long we keep it
We keep personal data only as long as needed for the purpose collected, and for any period required by law (for example, AML records are retained for the statutory minimum [period to confirm]).

## Your rights
Subject to applicable law, you may ask to access, correct, delete or restrict your data, object to certain uses, or withdraw consent. To exercise a right, contact [privacy@edingrad.com]. You may also raise a concern with the UAE Data Office.

## Security
We apply technical and organisational measures appropriate to the risk. No system is perfectly secure, and we cannot guarantee absolute security.

## Cookies
The website uses a small number of cookies. See our **Cookie Policy** for detail.

## Children
The website is not directed to anyone under 18, and we do not knowingly collect their data.

## Changes
We may update this policy. The effective date above reflects the current version.

## Contact
[privacy@edingrad.com] · Edingrad Real Estate L.L.C, [registered address to confirm], Dubai, UAE.`,
  },
  terms: {
    title: 'Terms of Use',
    overline: 'Legal',
    lead: 'The terms on which you may use the Edingrad website and the information it provides.',
    updated: UPDATED,
    body: `These terms govern your use of the Edingrad website (the "site"), operated by **Edingrad Real Estate L.L.C**. By using the site, you accept these terms.

## About us
Edingrad is a real-estate advisory firm licensed in Dubai, UAE [trade licence and RERA/ORN details to confirm]. Real-estate activity in Dubai is regulated by the Dubai Land Department and RERA.

## Information only, not advice
The site is for general information. Nothing on it is investment, legal, tax or financial advice, or an offer or recommendation to buy, sell or lease any property or asset. Tools such as the mortgage and currency calculators are **illustrations only** and are not quotes. Always confirm figures with the relevant bank, conveyancer or licensed partner before acting.

## Property listings
Listings are provided for information and may change or be withdrawn without notice. While we take care, we do not warrant that every detail (price, area, availability, permit) is accurate or current. Some content originates from third parties.

## Using the site
You may use the site for lawful, personal purposes. You agree not to misuse it, attempt to gain unauthorised access, scrape or copy content at scale, introduce malicious code, or use it in any way that breaches applicable law.

## Enquiries
When you submit an enquiry, you confirm the information you provide is accurate and that you may share it. How we handle it is set out in our Privacy Policy.

## Intellectual property
The site, its content, brand, design and typefaces are owned by Edingrad or its licensors and are protected by law. You may not reproduce or reuse them without permission.

## Third-party links
The site may link to third-party sites. We are not responsible for their content or practices.

## Disclaimers
The site is provided "as is" and "as available", without warranties of any kind to the extent permitted by law.

## Limitation of liability
To the fullest extent permitted by law, Edingrad is not liable for any indirect or consequential loss, or for any loss arising from reliance on information on the site. Nothing limits liability that cannot be limited by law.

## Governing law
These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai. The courts of Dubai have jurisdiction, subject to any mandatory regulatory forum.

## Changes
We may update these terms. Continued use of the site means you accept the current version.

## Contact
[legal@edingrad.com] · Edingrad Real Estate L.L.C, Dubai, UAE.`,
  },
  cookies: {
    title: 'Cookie Policy',
    overline: 'Legal',
    lead: 'What cookies the Edingrad website uses, why, and how you can control them.',
    updated: UPDATED,
    body: `This policy explains how the Edingrad website uses cookies and similar technologies. Read it alongside our Privacy Policy.

## What cookies are
Cookies are small text files a website stores on your device. They let the site work, remember your preferences and, where applicable, understand how the site is used.

## How we use them
We keep cookies to a minimum and use them mainly to run the site:

| Category | Purpose | Examples |
| --- | --- | --- |
| Strictly necessary | Sign-in, session and security for the workspace; keeping the site working | Authentication/session cookies |
| Preference | Remembering your light/dark theme | Theme preference |
| Analytics (if enabled) | Understanding site usage in aggregate to improve it | [to confirm before launch] |

Strictly necessary cookies do not require consent. Where we use any non-essential cookie, we will ask for your consent first.

## Third-party cookies
Some cookies are set by providers that help us run the site, such as our hosting and authentication providers. They process this data on our behalf under contract.

## Managing cookies
You can control or delete cookies through your browser settings. Blocking strictly necessary cookies may stop parts of the site (such as signing in) from working.

## Changes
We may update this policy as the site evolves. The effective date above reflects the current version.

## Contact
[privacy@edingrad.com].`,
  },
  'kyc-aml': {
    title: 'KYC/AML Policy',
    overline: 'Compliance',
    lead: 'How Edingrad meets its Know-Your-Customer and Anti-Money-Laundering obligations, and what that means for you.',
    updated: UPDATED,
    body: `Edingrad is committed to preventing money laundering and the financing of terrorism. This summary explains our approach under the UAE AML/CFT framework (Federal Decree-Law No. 20 of 2018 and its implementing regulations). It is a policy overview, not the full internal programme.

## Scope
As a real-estate firm, Edingrad is a Designated Non-Financial Business or Profession (DNFBP) and applies customer due diligence to relevant transactions. Any **virtual-asset (crypto) enquiry** made through the site is routed to a **VARA-licensed partner**, who performs the regulated KYC/AML checks and executes any transaction. **Edingrad does not execute virtual-asset transactions.**

## Customer due diligence (CDD)
Before a relevant transaction proceeds, we (or the licensed partner) verify:
- **Identity** — government-issued identification for individuals; constitutional and ownership documents for entities.
- **Beneficial ownership** — the natural persons who ultimately own or control a counterparty.
- **Source of funds and wealth** — evidence appropriate to the transaction.

## Enhanced due diligence (EDD)
Where risk is higher — for example politically exposed persons, complex structures, or high-value transactions — we apply enhanced checks and senior sign-off before proceeding.

## Sanctions screening
We screen counterparties against applicable UAE and international sanctions lists. We will not proceed where a counterparty is sanctioned or where screening cannot be resolved.

## Virtual assets
For any crypto-related enquiry, eligibility, KYC/AML and execution are handled by a VARA-licensed partner, subject to their checks and to UAE law. Indicative figures shown on the site are not an offer.

## Reporting and record-keeping
We keep CDD records for the period required by law and report suspicious activity to the UAE Financial Intelligence Unit (FIU) as required. We may not be able to tell you when a report has been made.

## Declining or pausing
We may decline, pause or unwind any enquiry or transaction where we cannot complete required checks, where information is incomplete, or where we have concerns. We do not facilitate transactions we cannot evidence.

## Data
Compliance information is handled in line with our Privacy Policy and retained as the law requires.

## Contact
Compliance enquiries: [compliance@edingrad.com] · Money Laundering Reporting Officer: [name/role to confirm].`,
  },
};
