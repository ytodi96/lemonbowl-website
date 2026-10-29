# Build log

One entry per meaningful decision, newest first.

---

## 2026-10-30: Mark the demo as a prototype and hide it from search

**Context:** The live demo looks exactly like a real ordering site, with "Order Now" buttons and the business's branding, while the business actually takes orders on a separate Shopify store.

**Options considered:**
1. Leave the demo as it is: a cleaner first impression, but customers could land on a site where nothing can be ordered, and it could compete with the real store in search.
2. Add a banner on every page plus a `noindex` tag: a little less polished, but nobody can mistake it for the real store.

**Decision:** Option 2. Every page says "Redesign prototype… cart and forms are disabled" and links to the real store.

**Why:** A portfolio demo should never cost the business a customer.

**Revisit if:** The redesign replaces the Shopify store on the business domain.

---

## 2026-10-29: Anonymise customer reviews, even on a demo

**Context:** The reviews page credited some reviews to real customers by name.

**Options considered:**
1. Keep the names: more authentic, but these customers never agreed to appear in a public portfolio.
2. Credit the occasion and area instead (e.g. "Host, Vasant Vihar"): keeps the substance, removes the personal data.

**Decision:** Option 2. The removed names went onto the private do-not-publish list, so the leak guard blocks them if they ever come back.

**Why:** Privacy first: real customer data stays private.

**Revisit if:** Customers give written permission to be named.

---

## 2026-10-29: Host the public demo as a static snapshot on GitHub Pages

**Context:** Recruiters need a link they can click. The source is a TanStack Start app whose photos are stored in Lovable's asset service.

**Options considered:**
1. Build the source and host it on Vercel, Netlify or Cloudflare Pages: fully interactive, but the photos break outside Lovable, and fixing that means rewriting image handling first.
2. Publish the Lovable app: interactive with photos, but there was no published Lovable URL.
3. Serve `static-site/` on GitHub Pages: no build and no new account, and every page and photo works; the cart, filters and forms are inactive.

**Decision:** Option 3, deployed by a GitHub Actions workflow whenever `static-site/` changes.

**Why:** It gets a working link live today at no cost, without changing the product code.

**Revisit if:** The site gets a published Lovable URL, or the images move into the repo so the full app can be hosted anywhere.

---

## Template

```
## YYYY-MM-DD: Decision title

**Context:** What problem or question came up.

**Options considered:**
1. Option A: pros / cons
2. Option B: pros / cons

**Decision:** What I chose.

**Why:** The reasoning, and any evidence (an eval result, a user test, a cost estimate).

**Revisit if:** What would make me change this.
```
