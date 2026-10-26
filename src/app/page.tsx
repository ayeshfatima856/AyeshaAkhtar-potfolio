"use client";

import { RouterProvider, useRoute } from "@/lib/router";
import { PublicApp } from "@/components/cv/pages";
import AdminApp from "@/components/admin/admin-app";

/*
 * Route map (hash router):
 *   /            → home
 *   /websites    → website portfolio + full industry showcase
 *   /graphics    → creative design gallery
 *   /marketing   → brands managed + campaign results
 *   /contact     → contact form only
 *   /admin/...   → protected admin panel (real auth + CRUD)
 * Unknown public hashes fall back to home so old links never dead-end.
 */

function App() {
  const route = useRoute();
  const isAdmin = route.startsWith("/admin");
  return isAdmin ? <AdminApp /> : <PublicApp />;
}

export default function Page() {
  return (
    <RouterProvider>
      <App />
    </RouterProvider>
  );
}
