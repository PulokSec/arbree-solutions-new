/**
 * TEMPORARY asset sources pulled straight from the Figma MCP export.
 *
 * These `figma.com/api/mcp/asset/...` URLs are short-lived (~7 days) per
 * Figma's dev-mode API. Before shipping, export these nodes from Figma
 * (or re-run the design-to-code asset pull) and replace each entry with a
 * file under `/public/images/...`, then update the import sites.
 *
 * Grouped by the section that consumes them so it's obvious what still
 * needs to be rehosted.
 */

export const navAssets = {
  logo: "/images/brand/arbree-logo.svg",
};

export const heroAssets = {
  arrowSmallRight: "https://www.figma.com/api/mcp/asset/cdef22f9-697e-4b4d-8dee-cfc80abe2a41.svg",
  teamOutlined: "https://www.figma.com/api/mcp/asset/038c43e3-be3f-4df9-bb33-cf7a1ea9099d.svg",
  arrowUp: "https://www.figma.com/api/mcp/asset/454aa403-acf4-40be-ac0a-a23326229b60.svg",
  teamOutlined2: "https://www.figma.com/api/mcp/asset/b287f917-db6a-44af-9d0e-f21d632dca6a.svg",
  arrowUp2: "https://www.figma.com/api/mcp/asset/20fe40f3-80bc-4fa5-9669-f3feaebe6a10.svg",
  codeWindow: "https://www.figma.com/api/mcp/asset/40e70071-6cb3-488e-8715-9d64a9a32395.svg",
  divider: "https://www.figma.com/api/mcp/asset/5ac68cd1-576e-4ab7-a412-c3d8dc88d301.svg",
};

export const clientLogoAssets = {
  spotifyG12: "https://www.figma.com/api/mcp/asset/10f7e539-41d2-4f20-a97c-70fc07a4d12b.svg",
  google: "https://www.figma.com/api/mcp/asset/3198f6cc-b610-45d8-ade9-e5c7a35e5980.svg",
  pinterestPath: "https://www.figma.com/api/mcp/asset/b7c548e3-9c98-4215-9ce7-70ab5a84a315.svg",
  pinterestG22: "https://www.figma.com/api/mcp/asset/f99d7f6d-199b-49be-9232-4caabf8d13d1.svg",
  pinterestG23: "https://www.figma.com/api/mcp/asset/fb15b0d4-7f54-4fef-bbea-4a9b07ac1c89.svg",
  pinterestG26: "https://www.figma.com/api/mcp/asset/2fe06049-ea8a-4193-b705-1772c989d41c.svg",
  pinterestG30: "https://www.figma.com/api/mcp/asset/6102c2c4-0148-4f2a-9710-06179354888b.svg",
  pinterestG34: "https://www.figma.com/api/mcp/asset/b3140235-8544-44ee-9b9e-a3d29877a4df.svg",
  pinterestG38: "https://www.figma.com/api/mcp/asset/929d3a86-13e7-4042-baf2-1e2e38318444.svg",
  pinterestG42: "https://www.figma.com/api/mcp/asset/dec1a79f-0989-4012-8621-58100cd0972f.svg",
  pinterestG46: "https://www.figma.com/api/mcp/asset/3f77f8f9-24d9-4189-bcda-359ff200672a.svg",
  pinterestG50: "https://www.figma.com/api/mcp/asset/2c6b792c-e9fe-4f93-a70a-8901d23831cf.svg",
  pinterestG54: "https://www.figma.com/api/mcp/asset/828e987a-8b05-43fe-9048-0e32a2562408.svg",
  pinterestG58: "https://www.figma.com/api/mcp/asset/d2797a52-37fc-40f0-a53e-ad7636a75520.svg",
  pinterestG62: "https://www.figma.com/api/mcp/asset/1cd91f7f-a778-442f-98ad-c378eeafdd58.svg",
  stripeGroup: "https://www.figma.com/api/mcp/asset/e3b72ada-c5f0-40f0-ab3d-6669e3b539e7.svg",
  redditGroup1: "https://www.figma.com/api/mcp/asset/efb3fbd6-9589-4a45-bc91-543d7b12ab8a.svg",
  redditGroup2: "https://www.figma.com/api/mcp/asset/2ebb087d-f385-484b-9371-7ac0cb18252f.svg",
  google2: "https://www.figma.com/api/mcp/asset/8014cfee-03eb-4cd9-ae5a-391fc4c24a9d.svg",
};
