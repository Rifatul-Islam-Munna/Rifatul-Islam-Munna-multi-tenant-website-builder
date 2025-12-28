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

export default function ProductDetailsPage({
  product,
}: ProductDetailsPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Review form state
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
    console.log("Wishlist toggled:", !isWishlisted);
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
    // TODO: Send review to your API
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
    <div className="container mx-auto px-4 py-4 sm:py-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        {/* Left Side - Images */}
        <div className="space-y-3">
          {/* Main Image */}
          <div className="relative aspect-square w-full bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              fill
              className="object-contain p-4"
              priority
            />
            {product.oldPrice && (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                -{discountPercentage}%
              </div>
            )}
            <button
              onClick={handleShare}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>
          </div>

          {/* Thumbnail Images - 120x120 */}
          <div className="flex gap-2 sm:gap-3">
            {product.images.slice(0, 3).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-lg overflow-hidden border-2 transition-all hover:scale-105 flex-shrink-0 ${
                  selectedImage === index
                    ? "border-blue-500 ring-2 ring-blue-200 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.title} - ${index + 1}`}
                  fill
                  className="object-contain p-2"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="space-y-4 sm:space-y-6">
          {/* Product Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>
            {product.sku && (
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                SKU: {product.sku}
              </p>
            )}
          </div>

          {/* Rating & Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-200">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < Math.round(averageRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 fill-current"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm sm:text-base text-gray-700 font-semibold">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-xs sm:text-sm text-gray-500">
                ({product.reviews.length}{" "}
                {product.reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span className="text-3xl sm:text-4xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <>
                <span className="text-xl sm:text-2xl text-gray-500 line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
                <span className="px-2 sm:px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs sm:text-sm font-bold">
                  Save ${(product.oldPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Variant (Optional) - Shows "Variant" label */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-sm font-semibold text-gray-900">
                Variant
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants[0].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedVariant(option)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm border rounded-md transition-all font-medium ${
                      selectedVariant === option
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <label className="text-sm font-semibold text-gray-900">
              Quantity
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-semibold text-gray-900 min-w-[50px] text-center text-sm sm:text-base">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                disabled={quantity >= (product.stock || 99)}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {product.stock && (
              <span className="text-xs sm:text-sm text-gray-600">
                {product.stock} in stock
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-blue-600 text-blue-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold hover:bg-blue-50 transition-all text-sm sm:text-base"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Add to Cart</span>
              <span className="xs:hidden">Add</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold hover:bg-blue-700 transition-all text-sm sm:text-base"
            >
              Buy Now
            </button>
            <button
              onClick={handleWishlist}
              className={`border-2 p-2.5 sm:p-3 rounded-lg transition-all ${
                isWishlisted
                  ? "border-red-500 bg-red-50 text-red-500"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
              aria-label="Add to wishlist"
            >
              <Heart
                className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
              />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-xs sm:text-sm">
                  Free Shipping
                </p>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="bg-green-100 p-2 rounded-lg">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-xs sm:text-sm">
                  Secure Payment
                </p>
                <p className="text-xs text-gray-500">100% secure transaction</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="bg-purple-100 p-2 rounded-lg">
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-xs sm:text-sm">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - Description & Reviews */}
      <div className="mt-8 sm:mt-12 lg:mt-16">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 sm:gap-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-3 sm:pb-4 px-2 font-bold transition-colors relative text-sm sm:text-base ${
                activeTab === "description"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Description
              {activeTab === "description" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-blue-600 rounded-t"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 sm:pb-4 px-2 font-bold transition-colors relative text-sm sm:text-base ${
                activeTab === "reviews"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Reviews{" "}
              {product.reviews?.length ? `(${product.reviews.length})` : ""}
              {activeTab === "reviews" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-blue-600 rounded-t"></div>
              )}
            </button>
          </div>
        </div>

        <div className="py-6 sm:py-8">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <div className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-white p-4 sm:p-6 lg:p-8 rounded-lg border border-gray-200">
                {product.description}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Review Summary */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                        {averageRating.toFixed(1)}
                      </p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${
                              i < Math.round(averageRating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300 fill-current"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {product.reviews.length}{" "}
                        {product.reviews.length === 1 ? "review" : "reviews"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Write Review Button/Form */}
              {!showReviewForm ? (
                <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    Write a Review
                  </button>
                </div>
              ) : (
                <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Write Your Review
                  </h3>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewForm.name}
                        onChange={(e) =>
                          setReviewForm({ ...reviewForm, name: e.target.value })
                        }
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Rating
                      </label>
                      <div className="flex gap-1 sm:gap-2">
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
                              className={`w-6 h-6 sm:w-8 sm:h-8 ${
                                star <= reviewForm.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Your Review
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
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                        placeholder="Share your experience..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
                      >
                        Submit Review
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Existing Reviews */}
              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {product.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-3 gap-2">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                            {review.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm sm:text-base text-gray-900">
                              {review.userName}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {review.createdAt}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300 fill-current"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 sm:p-12 rounded-lg border border-gray-200 text-center">
                  <p className="text-gray-500 text-base sm:text-lg">
                    No reviews yet. Be the first to review!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
