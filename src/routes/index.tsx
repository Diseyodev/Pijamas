import { createFileRoute } from "@tanstack/react-router";
import Storefront from "@/components/storefront";

export const Route = createFileRoute("/")({
  component: Storefront,
});
