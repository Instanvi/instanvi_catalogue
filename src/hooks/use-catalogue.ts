"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
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
    enabled: !!catalogue?.id && !catalogue.isLocked,
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

  const isPrivate = !!catalogue?.isLocked;
  const loading = isLoadingCatalogue || isLoadingProducts;

  return {
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
    refetch: () => {
      refetchCatalogue();
      refetchProducts();
    },
  };
}
