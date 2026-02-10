"use client";

import { useState } from "react";
import { CatalogueSearch } from "@/components/catalogue/CatalogueSearch";
import {
  ProductCard,
  ProductListItem,
} from "@/components/catalogue/ProductItem";
import { EmptyState } from "@/components/catalogue/EmptyState";
import { CartFooter } from "@/components/catalogue/CartFooter";
import { CatalogueHeader } from "@/components/catalogue/CatalogueHeader";
import { CatalogueLoading } from "@/components/catalogue/CatalogueLoading";
import { useCatalogue } from "@/hooks/use-catalogue";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { CataloguePagination } from "@/components/catalogue/CataloguePagination";
import { CatalogueAccessModal } from "@/components/catalogue/CatalogueAccessModal";
import { useRouter } from "next/navigation";

export default function CatalogueViewPage() {
  const router = useRouter();
  const {
    catalogue,
    filteredProducts,
    categories,
    loading,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    page,
    setPage,
    meta,
    isPrivate,
    refetch,
  } = useCatalogue();

  const { cart, updateCart, getQuantity, clearCart } = useCart();
  const [view, setView] = useState<"grid" | "list">("list");

  if (loading) return <CatalogueLoading />;

  if (isPrivate && catalogue) {
    return (
      <div className="min-h-screen bg-white pb-32">
        <CatalogueHeader catalogue={catalogue} />
        <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">This catalogue is private</h2>
            <p className="text-muted-foreground">
              You need an access code to view the products.
            </p>
            <CatalogueAccessModal
              isOpen={true}
              catalogueId={catalogue.id}
              onSuccess={() => {
                refetch();
              }}
            />
          </div>
        </main>
      </div>
    );
  }

  const totalPages = meta?.totalPages || 1;

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      <div className="sticky top-0 z-50 bg-[#FDFDFD]/90 backdrop-blur-md">
        <CatalogueHeader catalogue={catalogue} />
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="bg-white p-6 rounded-none border border-muted/20 shadow-sm">
            <CatalogueSearch
              value={search}
              onChange={setSearch}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              view={view}
              onViewChange={setView}
            />
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <section className="space-y-6">
          <div className="flex items-center justify-end border-b border-muted/20 pb-4">
            <CataloguePagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>

          {filteredProducts.length > 0 ? (
            <div
              className={cn(
                "grid gap-6",
                view === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "grid-cols-1 gap-3",
              )}
            >
              {filteredProducts.map((product) =>
                view === "grid" ? (
                  <ProductCard
                    key={product.id}
                    product={product}
                    getQuantityForUnit={(unitId) =>
                      getQuantity(product.id, unitId)
                    }
                    onAdd={(unitId, unitName, unitPrice) =>
                      updateCart(product, 1, unitId, unitName, unitPrice)
                    }
                    onRemove={(unitId) => updateCart(product, -1, unitId)}
                  />
                ) : (
                  <ProductListItem
                    key={product.id}
                    product={product}
                    getQuantityForUnit={(unitId) =>
                      getQuantity(product.id, unitId)
                    }
                    onAdd={(unitId, unitName, unitPrice) =>
                      updateCart(product, 1, unitId, unitName, unitPrice)
                    }
                    onRemove={(unitId) => updateCart(product, -1, unitId)}
                  />
                ),
              )}
            </div>
          ) : (
            <EmptyState
              onReset={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
            />
          )}
        </section>
      </main>

      <CartFooter
        items={cart}
        onCheckout={() => {
          if (cart.length > 0) {
            router.push("/checkout");
          }
        }}
        onClear={clearCart}
      />
    </div>
  );
}
