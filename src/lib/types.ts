export type ProjectMetric = { label: string; value: number; suffix: string };
export type ProjectResult = { label: string; value: string; hint?: string };

export type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  track: string;
  kind: string; // "website" | "social" | "campaign"
  tagline: string;
  description: string;
  overview?: string | null;
  tools: string;
  results?: string | null;
  metrics?: string | null;
  challenge?: string | null;
  solution?: string | null;
  role: string;
  objectives?: string | null;
  creativeDirection?: string | null;
  image: string;
  gallery?: string | null;
  liveUrl?: string | null;
  socialUrl?: string | null;
  showcase?: boolean;
  industry?: string | null;
  featured: boolean;
  published: boolean;
  demo: boolean;
  sort: number;
};

export type Brand = {
  id: string;
  name: string;
  industry: string;
  logoUrl?: string | null;
  description: string;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  websiteUrl?: string | null;
  images: string; // JSON url[]
  layout: string; // "banner" | "profile" | "collage" | "mockup"
  accent: string;
  isOwnBrand: boolean;
  featured: boolean;
  showInSocial: boolean;
  showInWebsites: boolean;
  role: string;
  sort: number;
  published: boolean;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string | null;
  isSample: boolean;
  projectId?: string | null;
  brandId?: string | null;
  sort: number;
  published: boolean;
};

export type ProfileService = { title: string; blurb: string };

export type Profile = {
  id: string;
  name: string;
  title: string;
  tagline: string;
  heroHeadline: string;
  heroSub: string;
  bio: string;
  approach: string;
  philosophy: string;
  photoUrl?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  location?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  behance?: string | null;
  services: string; // JSON ProfileService[]
  updatedAt: string;
};

export const GALLERY_CATEGORIES = [
  "All Projects",
  "Social Media Posts",
  "Advertising Creatives",
  "Branding",
  "Product Designs",
  "Restaurant & Food",
  "Real Estate",
  "Fashion",
  "Website Design",
  "Other Creative Work",
] as const;

export function parseBrandImages(raw?: string | null): string[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function parseProfileServices(raw?: string | null): ProfileService[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export type Category = {
  id: string;
  name: string;
  slug: string;
  kind: string;
  color: string;
  sort: number;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover?: string | null;
  tags: string;
  readTime: number;
  published: boolean;
  createdAt: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company?: string | null;
  quote: string;
  rating: number;
  initials?: string | null;
  isDemo: boolean;
  published: boolean;
};

export type ServicePackage = {
  id: string;
  name: string;
  tier: string;
  kind: string;
  price: string;
  period?: string | null;
  tagline?: string | null;
  features: string;
  highlighted: boolean;
  active: boolean;
  sort: number;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};

/* ---------- safe JSON parsing of stringified fields ---------- */

export function parseResults(raw?: string | null): ProjectResult[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function parseMetrics(raw?: string | null): ProjectMetric[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function parseFeatures(raw: string): string[] {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function parseSocials(raw?: string | null): Record<string, string> {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/* ---------- fetch helpers ---------- */

export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function apiSend<T>(
  url: string,
  method: "POST" | "PUT" | "DELETE",
  body?: unknown
): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || `Request failed: ${res.status}`);
  return data as T;
}
