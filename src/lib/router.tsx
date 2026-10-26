import {
  createContext, useContext, useEffect, useState, useCallback,
  type ReactNode, type AnchorHTMLAttributes,
} from "react";

/* ---------------- tiny hash router ---------------- */

const RouteCtx = createContext<string>("/");

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState("/");

  useEffect(() => {
    const read = () => {
      const h = window.location.hash.replace(/^#/, "");
      setRoute(h === "" ? "/" : h);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  // scroll to top on route change (unless it's an in-page anchor)
  useEffect(() => {
    if (!route.startsWith("/#")) window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [route]);

  return <RouteCtx.Provider value={route}>{children}</RouteCtx.Provider>;
}

export function useRoute() {
  return useContext(RouteCtx);
}

export function navigate(to: string) {
  window.location.hash = to;
  // in case only the hash *within* same page changed shape, force scroll top
  if (to.startsWith("/") && !to.includes("#")) {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const handle = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      // external links pass through
      if (/^https?:/.test(to)) return;
      e.preventDefault();
      navigate(to);
    },
    [to, onClick]
  );
  return (
    <a href={to.startsWith("/") ? `#${to}` : to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}

/* ---------------- route matching ---------------- */

export function matchRoute(route: string): { name: string; param?: string } {
  const path = route.split("?")[0].replace(/\/+$/, "") || "/";
  const seg = path.split("/").filter(Boolean);

  if (path === "/" || path === "") return { name: "home" };
  if (seg[0] === "about") return { name: "about" };
  if (seg[0] === "web-development") return { name: "web-development" };
  if (seg[0] === "digital-marketing") return { name: "digital-marketing" };
  if (seg[0] === "portfolio") return { name: "portfolio" };
  if (seg[0] === "project" && seg[1]) return { name: "project", param: seg[1] };
  if (seg[0] === "case-studies") return { name: "case-studies" };
  if (seg[0] === "services") return { name: "services" };
  if (seg[0] === "contact") return { name: "contact" };
  if (seg[0] === "blog" && seg[1]) return { name: "blog-post", param: seg[1] };
  if (seg[0] === "blog") return { name: "blog" };
  if (seg[0] === "admin" && seg[1] === "login") return { name: "admin-login" };
  if (seg[0] === "admin") return { name: "admin", param: seg[1] ?? "overview" };

  return { name: "404" };
}
