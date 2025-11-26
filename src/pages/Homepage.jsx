import React, { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import { getRandomProducts } from "../lib/api";

const Homepage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);

  const fetchPage = useCallback(
    async (pageToFetch, initial = false) => {
      try {
        if (initial) setLoading(true);
        else setLoadingMore(true);

        const { products: newProducts, meta } = await getRandomProducts(
          pageToFetch,
          limit
        );

        setProducts((prev) =>
          pageToFetch === 1 ? newProducts : [...prev, ...newProducts]
        );

        if (typeof meta.nextPage !== "undefined") {
          setHasMore(Boolean(meta.nextPage));
        } else {
          setHasMore(newProducts.length === limit);
        }
      } catch (err) {
        setError(err?.message || "Failed to load products");
      } finally {
        if (initial) setLoading(false);
        else setLoadingMore(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    fetchPage(1, true);
    setPage(1);
  }, []);

  useEffect(() => {
    if (page === 1) return;
    fetchPage(page, false);
  }, [page, fetchPage]);

  return (
    <div>
      <div className="flex flex-row p-3 font-bold justify-between items-center">
        <div className="flex-1 px-4 ">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products"
            className="w-full input rounded-2xl border border-r-2 border-b-2"
            aria-label="Search products"
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-2">
          <select
            name="category"
            id="category"
            className="select rounded-2xl border border-r-2 border-b-2 ml-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {Array.from(
              new Set(products.map((p) => p?.category).filter(Boolean))
            )
              .sort()
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>

          <select
            name="sort"
            id="sort"
            className="select rounded-2xl border border-r-2 border-b-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            aria-label="Sort by"
          >
            <option value="default">Sort</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="p-4">
        {loading && <div>Loading products...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {(() => {
                const filtered = products.filter((p) => {
                  const matchesSearch = p?.title
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                  const matchesCategory =
                    selectedCategory === "all" ||
                    p?.category === selectedCategory;
                  return matchesSearch && matchesCategory;
                });

                const sorted = filtered.slice();
                if (sortOrder === "price-asc") {
                  sorted.sort(
                    (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0)
                  );
                } else if (sortOrder === "price-desc") {
                  sorted.sort(
                    (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0)
                  );
                }

                return sorted.map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    price={p.price}
                    category={p.category}
                    thumbnail={p.thumbnail}
                    images={p.images}
                  />
                ));
              })()}
            </div>

            <div
              ref={(node) => {
                if (loadingMore || loading) return;
                if (observer.current) observer.current.disconnect();
                observer.current = new IntersectionObserver((entries) => {
                  if (entries[0].isIntersecting && hasMore) {
                    setPage((p) => p + 1);
                  }
                });
                if (node) observer.current.observe(node);
              }}
            />

            {loadingMore && <div className="p-4">Loading more...</div>}
            {!hasMore && (
              <div className="p-4 text-center text-gray-500">
                No more products
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;
