"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Share2,
  Truck,
  ShieldCheck,
  RefreshCw,
  Star,
} from "lucide-react";

interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: string[];
  variants?: ProductVariant[];
  reviews?: Review[];
  stock?: number;
  sku?: string;
}

interface ProductDetailsPageProps {
  product: Product;
}

export default function ProductDetailsPage2({
  product,
}: ProductDetailsPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase" && quantity < (product.stock || 99)) {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", {
      productId: product.id,
      variant: selectedVariant,
      quantity,
    });
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    console.log("Buy now:", {
      productId: product.id,
      variant: selectedVariant,
      quantity,
    });
    alert("Redirecting to checkout...");
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out ${product.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", reviewForm);
    alert("Review submitted successfully!");
    setReviewForm({ name: "", rating: 5, comment: "" });
    setShowReviewForm(false);
  };

  const averageRating = product.reviews?.length
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length
    : 0;

  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="bg-background min-h-screen">
      {/* Container */}
      <div className=" container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Top Section - Product Gallery + Info Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left Column - Image Gallery (Thumbnails on Left, Main Image on Right) */}
          <div className="lg:col-span-7">
            <div className="flex gap-4">
              {/* Vertical Thumbnails */}
              <div className="flex flex-col gap-3 w-20 sm:w-24">
                {product.images.slice(0, 3).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-muted rounded-sm overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 relative aspect-[4/5] bg-muted rounded-sm overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
                {product.oldPrice && (
                  <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1.5 text-xs font-semibold">
                    -{discountPercentage}%
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-card border border-border p-6 sm:p-8 h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {product.sku && (
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                      {product.sku}
                    </p>
                  )}
                  <h1 className="text-2xl sm:text-3xl font-bold text-card-foreground leading-tight">
                    {product.title}
                  </h1>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={handleShare}
                    className="p-2 border border-border hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleWishlist}
                    className={`p-2 border rounded-sm transition-colors ${
                      isWishlisted
                        ? "bg-destructive text-destructive-foreground border-destructive"
                        : "border-border hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Rating */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="flex items-center gap-2 mb-6 pb-6 border-b border-border">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(averageRating)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {averageRating.toFixed(1)} ({product.reviews.length})
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-card-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.stock && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {product.stock} in stock
                  </p>
                )}
              </div>

              {/* Variant */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">
                    Variant
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants[0].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedVariant(option)}
                        className={`px-4 py-2 text-sm border transition-colors ${
                          selectedVariant === option
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-border">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    disabled={quantity <= 1}
                    className="px-4 py-2 hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-2 border-x border-border font-medium min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    disabled={quantity >= (product.stock || 99)}
                    className="px-4 py-2 hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-primary text-primary-foreground py-3 font-semibold hover:bg-primary/90 transition-colors"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-secondary text-secondary-foreground py-3 font-semibold hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>

              {/* Features */}
              <div className="border-t border-border pt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Free Delivery</p>
                    <p className="text-xs text-muted-foreground">
                      Orders over $50
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Secure Payment</p>
                    <p className="text-xs text-muted-foreground">
                      100% protected
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">
                      30-day policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Tabs Full Width */}
        <div className="bg-card border border-border">
          {/* Tab Navigation */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("description")}
              className={`flex-1 px-6 py-4 font-semibold text-sm transition-colors ${
                activeTab === "description"
                  ? "bg-accent text-accent-foreground border-b-2 border-primary"
                  : "hover:bg-accent/50"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex-1 px-6 py-4 font-semibold text-sm transition-colors ${
                activeTab === "reviews"
                  ? "bg-accent text-accent-foreground border-b-2 border-primary"
                  : "hover:bg-accent/50"
              }`}
            >
              Reviews ({product.reviews?.length || 0})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === "description" && (
              <div className="max-w-4xl">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-4xl space-y-6">
                {/* Review Summary */}
                {product.reviews && product.reviews.length > 0 && (
                  <div className="flex items-center gap-8 pb-6 border-b border-border">
                    <div>
                      <div className="text-5xl font-bold mb-2">
                        {averageRating.toFixed(1)}
                      </div>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(averageRating)
                                ? "fill-primary text-primary"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {product.reviews.length} reviews
                      </p>
                    </div>
                  </div>
                )}

                {/* Write Review */}
                {!showReviewForm ? (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="px-6 py-2 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Write a Review
                  </button>
                ) : (
                  <div className="border border-border p-6 bg-accent/30">
                    <h3 className="text-lg font-bold mb-4">
                      Write Your Review
                    </h3>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewForm.name}
                          onChange={(e) =>
                            setReviewForm({
                              ...reviewForm,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Rating
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() =>
                                setReviewForm({ ...reviewForm, rating: star })
                              }
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= reviewForm.rating
                                    ? "fill-primary text-primary"
                                    : "fill-muted text-muted"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Review
                        </label>
                        <textarea
                          required
                          value={reviewForm.comment}
                          onChange={(e) =>
                            setReviewForm({
                              ...reviewForm,
                              comment: e.target.value,
                            })
                          }
                          rows={4}
                          className="w-full px-3 py-2 border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                          placeholder="Share your thoughts..."
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="px-6 py-2 bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Reviews List */}
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-border pb-6 last:border-0"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                              {review.userName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold">{review.userName}</p>
                              <p className="text-xs text-muted-foreground">
                                {review.createdAt}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < review.rating
                                    ? "fill-primary text-primary"
                                    : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-border">
                    <p className="text-muted-foreground">
                      No reviews yet. Be the first to review!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
