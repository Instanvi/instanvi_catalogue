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
import { RequestAccessModal } from "@/components/catalogue/RequestAccessModal";
import { VerifyAccessModal } from "@/components/catalogue/VerifyAccessModal";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/axios";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

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
    catalogueError,
    productsError,
  } = useCatalogue();

  const { cart, updateCart, getQuantity, clearCart } = useCart();
  const [view, setView] = useState<"grid" | "list">("list");
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasGrantedAccess, setHasGrantedAccess] = useState(false);

  const handleAccessSuccess = useCallback(() => {
    setHasGrantedAccess(true);
    refetch();
  }, [refetch]);

  const handleRequestSuccess = () => {
    setIsVerifying(true);
  };

  if (loading && !catalogue) return <CatalogueLoading />;

  const error = catalogueError || productsError;
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <AlertCircle className="h-16 w-16 text-destructive" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Access Denied</h2>
            <p className="text-muted-foreground">{getErrorMessage(error)}</p>
          </div>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="w-full"
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  const totalPages = meta?.totalPages || 1;

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      <RequestAccessModal
        isOpen={isPrivate && !isVerifying && !hasGrantedAccess}
        catalogueId={catalogue?.id || ""}
        onSuccess={handleRequestSuccess}
      />
      <VerifyAccessModal
        isOpen={isPrivate && isVerifying && !hasGrantedAccess}
        catalogueId={catalogue?.id || ""}
        onSuccess={handleAccessSuccess}
        onBack={() => setIsVerifying(false)}
      />
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
