"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import {
  cataloguesService,
  CatalogueProductItem,
} from "@/services/catalogues.service";
import { Product } from "@/services/products.service";

export function useCatalogue() {
  const { slug } = useParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);

  // 1. Fetch Catalogue Metadata by Slug
  const {
    data: catalogue,
    isLoading: isLoadingCatalogue,
    error: catalogueError,
    refetch: refetchCatalogue,
  } = useQuery({
    queryKey: ["catalogue-meta", slug],
    queryFn: () => cataloguesService.findBySlug(slug as string),
    enabled: !!slug,
  });

  const authenticatedBusinessId = useMemo(() => {
    if (typeof window === "undefined") return null;
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      const user = JSON.parse(storedUser);
      return user.businessId || user.organizationId;
    } catch {
      return null;
    }
  }, []);

  const isPrivate = useMemo(() => {
    if (!catalogue) return false;

    // The backend returns { private: true } when access should be restricted
    if (catalogue.private === true) return true;

    // If backend explicitly says it's locked
    if (catalogue.isLocked) return true;

    // Client-side fallback check
    if (
      catalogue.type &&
      catalogue.type !== "public" &&
      catalogue.businessId !== authenticatedBusinessId
    ) {
      return true;
    }

    return false;
  }, [catalogue, authenticatedBusinessId]);

  // 2. Fetch Catalogue Products by ID (Dependent Query)
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["catalogue-products", catalogue?.id, page, selectedCategory],
    queryFn: () =>
      cataloguesService.getProducts(catalogue!.id, {
        page,
        limit: 20,
      }),
    enabled: !!catalogue?.id && !catalogue.isLocked && !isPrivate,
  });

  const products = useMemo(() => {
    if (!productsData?.items || !catalogue) return [] as Product[];
    return productsData.items.map((p: CatalogueProductItem) => ({
      ...p.product,
      catalogueProductId: p.catalogueProduct.id,
      catalogueId: catalogue.id,
      price: p.catalogueProduct?.basePrice || p.product?.price || "0",
      compareAtPrice: p.catalogueProduct?.compareAtPrice,
    }));
  }, [productsData, catalogue]);

  const categories = useMemo(() => {
    // Note: In a real app with server-side pagination,
    // categories should probably be fetched separately
    // or returned with the catalogue metadata.
    // For now, we'll keep the existing logic.
    const cats = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(cats) as string[];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setPage(1);
  };

  const refetch = useCallback(() => {
    refetchCatalogue();
    refetchProducts();
  }, [refetchCatalogue, refetchProducts]);

  const loading = isLoadingCatalogue || isLoadingProducts;

  return useMemo(
    () => ({
      catalogue,
      products,
      filteredProducts,
      categories,
      loading,
      meta: productsData?.meta || null,
      search,
      setSearch: handleSearchChange,
      selectedCategory,
      setSelectedCategory: handleCategoryChange,
      page,
      setPage,
      isPrivate,
      catalogueError,
      productsError,
      refetch,
    }),
    [
      catalogue,
      products,
      filteredProducts,
      categories,
      loading,
      productsData?.meta,
      search,
      selectedCategory,
      page,
      isPrivate,
      catalogueError,
      productsError,
      refetch,
    ],
  );
}
