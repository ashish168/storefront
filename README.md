# Kelvin Supply — storefront demo

A trade storefront for architectural lighting: catalogue with specification
filtering, product detail, cart, trade sign-in, checkout and order history.

**Live: https://kelvin-supply.netlify.app**

Fictional supplier. No orders are processed, no payment is taken, and every
product, price and specification is invented.

![Catalogue](docs/catalogue.png)

## Why lighting, and not a generic shop

The subject does real work here. Lighting products carry attributes that make
filtering meaningful — colour temperature, beam angle, colour rendering, ingress
protection — so search and filter are load-bearing features rather than a toy
over three t-shirt sizes.

It also produced the one idea the design is built on: **colour temperature is
rendered as colour.** Every product shows the light it actually emits, so two
items differing only in colour temperature look obviously different, which they
would not in a photograph.

## The drawings

Each product is a sectional drawing generated from its own data — the beam is
drawn at the product's real angle and filled at its real colour temperature.
Exterior fittings stand on a ground line and throw light downward; ceiling
fittings hang from a ceiling line. A stock photograph would show none of that,
and a gradient placeholder would show less.

## Running it

```bash
npm install
npm run dev
```

Sign-in accepts any email address and any password of four characters or more.
Cart, session and orders persist in `localStorage`, wrapped so that blocked
storage degrades to forgetting rather than crashing.

## Stack

React 19 · TypeScript · Vite · Tailwind · React Router

No backend. Catalogue data is a typed module; everything else is derived.

## Notes

Built as a portfolio demonstration by [Ashish Aggarwal](https://ashishaggarwal168.com).
