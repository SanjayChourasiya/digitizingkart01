  import { useParams } from "react-router-dom";
  import { useState, useEffect } from "react";

  function ProductPage() {
    const { productName } = useParams();
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(0);
    const [coupon, setCoupon] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState(null);
    const [couponMessage, setCouponMessage] = useState("");

    useEffect(() => {
      import("../page/data/product").then((mod) => {
        const decodedName = decodeURIComponent(productName).toLowerCase();
        const products = mod.products;
        setAllProducts(products);
        const found = products.find((p) => p.name.toLowerCase() === decodedName);
        setProduct(found);
      });
    }, [productName]);

    if (!product) return <div className="text-center py-20">Loading...</div>;

    const relatedProducts = allProducts.filter(
      (p) => p.category === product.category && p.name !== product.name
    );

    const handleApplyCoupon = () => {
      const validCoupons = {
        "SAVE10": 10,
        "WELCOME15": 15,
        "ALL": 100,
      };

      const basePrice = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;

      const discountPercent = validCoupons[coupon.toUpperCase()];

      if (discountPercent) {
        const couponDiscount = (basePrice * discountPercent) / 100;
        const finalPrice = basePrice - couponDiscount;
        setDiscountedPrice(finalPrice);
        setCouponMessage(`🎉 Coupon Applied! Extra ${discountPercent}% off`);
      } else {
        setDiscountedPrice(null);
        setCouponMessage("❌ Invalid coupon code.");
      }
    };

    return (
      <div className="max-w-7xl mx-auto px-4 pt-8 ">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-1 hidden md:flex flex-col gap-3">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                onClick={() => {
                  setCurrentImage(idx);
                  setSelectedColor(idx);
                }}
                className={`w-full aspect-square object-cover rounded-md cursor-pointer border ${
                  currentImage === idx
                    ? "border-indigo-500 ring-2 ring-indigo-300"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>

          <div className="md:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-md aspect-[3/4] h-[560px] pb-2 bg-white p-2 rounded-2xl shadow-xl border border-gray-200">
              <img
                src={product.images?.[currentImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>

          <div className="md:col-span-6">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.name}</h1>

            <div className="flex items-center text-sm text-gray-600 mb-3">
              <span className="mr-2">({product.reviews?.length || 128} ratings)</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < product.rating ? "text-yellow-400" : "text-gray-300"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-4">
              <p className="text-xl font-semibold text-gray-800 mb-1">Price:</p>
              <div className="flex items-center gap-2">
                {product.discount ? (
                  <>
                    <span className="text-2xl text-red-600 font-bold">
                      ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      ({product.discount}% OFF)
                    </span>
                  </>
                ) : (
                  <span className="text-2xl text-red-600 font-bold">
                    ₹{product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {discountedPrice && (
                <p className="text-green-700 text-lg mt-2 font-semibold">
                  Final Price after Coupon: ₹{discountedPrice.toFixed(2)}
                </p>
              )}
            </div>

            {/* Coupon Input */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="border px-4 py-2 rounded mr-2 focus:ring focus:ring-indigo-300"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Apply Coupon
              </button>
              {couponMessage && (
                <p className="mt-2 text-sm text-indigo-700">{couponMessage}</p>
              )}
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Select Size:</p>
              <div className="flex gap-2 flex-wrap">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded hover:bg-gray-100 transition ${
                      selectedSize === size
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Select Color:</p>
              <div className="flex gap-2">
                {product.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Color ${idx}`}
                    className={`w-12 h-12 object-cover border rounded-md cursor-pointer ${
                      selectedColor === idx
                        ? "border-indigo-500 ring-2 ring-indigo-300"
                        : "border-gray-200"
                    }`}
                    onClick={() => {
                      setCurrentImage(idx);
                      setSelectedColor(idx);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Features */}
            <ul className="text-gray-700 list-disc pl-5 space-y-1 mb-6">
              <li>Soft Fabric, V-Neck, Cap Sleeve</li>
              <li>Embroidered, Ruffle Hem, Peplum Style</li>
              <li>Perfect for Work, Date, Vacation, Holiday</li>
              <li>Model: 175cm / 5'9", Bust: 33", Waist: 24", Hip: 37" – Wearing: S</li>
            </ul>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <button className=" p-2 px-6 bg-indigo-600 rounded text-white hover:bg-indigo-700 transition duration-300 text-xl">
      Buy Now
    </button>

              {/* <button
                onClick={() => alert("Added to Wishlist!")}
                className="flex-1 border border-pink-500 text-pink-600 px-6 py-3 rounded-md hover:bg-pink-50 transition duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                  2 6.42 3.42 5 5.5 5c1.74 0 3.41 
                  1.01 4.13 2.44h1.74C13.09 6.01 
                  14.76 5 16.5 5 18.58 5 20 
                  6.42 20 8.5c0 3.78-3.4 6.86-8.55 
                  11.54L12 21.35z" />
                </svg>
                Wishlist
              </button> */}

              {/* <button
                onClick={() => alert("Added to Bag!")}
                className="flex-1 border border-green-600 text-green-700 px-6 py-3 rounded-md hover:bg-green-50 transition duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 
                    7h13L17 13M7 13L5.4 5M17 13l1.5 
                    7M9 21a1 1 0 100-2 1 1 0 000 
                    2zm6 0a1 1 0 100-2 1 1 0 000 2z"
                  />
                </svg>
                Add to Bag
              </button> */}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Related Products</h2>
          {relatedProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200 shadow-md p-4 hover:shadow-lg transition relative"
                >
                  {item.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      {item.discount}% OFF
                    </span>
                  )}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full object-contain mb-4 rounded"
                  />
                  <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                  <div className="flex items-center mt-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={i < item.rating ? "text-yellow-400" : "text-gray-300"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-lg font-bold mb-3 text-red-600">
                    ₹{item.discount
                      ? (item.price * (1 - item.discount / 100)).toFixed(2)
                      : item.price.toFixed(2)}
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-indigo-600 text-white text-sm py-2 rounded hover:bg-indigo-700 transition">
                      View details
                    </button>
                    <button className="flex-1 bg-gray-200 text-sm py-2 rounded hover:bg-gray-300">
                      Get Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No related products found.</p>
          )}
        </section>
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border p-4 rounded-md shadow-sm">
              <p className="font-bold">Sarah Johnson</p>
              <p className="text-sm text-gray-500">April 15, 2025</p>
              <div className="text-yellow-400">★★★★★</div>
              <p className="text-gray-700 mt-2">
                Amazing blouse! Fits perfectly and is super comfortable.
              </p>
            </div>
            <div className="border p-4 rounded-md shadow-sm">
              <p className="font-bold">Mike Peters</p>
              <p className="text-sm text-gray-500">April 10, 2025</p>
              <div className="text-yellow-400">★★★★☆</div>
              <p className="text-gray-700 mt-2">
                Looks great and the embroidery is neat. Slightly loose fit.
              </p>
            </div>
          </div>
        </section>

        {/* Embroidery Section */}
        <section className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-10 mb-20 mt-20 shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Custom Embroidery Available</h2>
            <p className="text-gray-700 text-lg mb-6">
              Want your name, logo, or special message embroidered on this product? We offer premium customization tailored to your needs.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 text-left text-gray-700 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-indigo-600 text-xl">🎨</span>
                <div>
                  <p className="font-semibold">Personalized Designs</p>
                  <p className="text-sm">Choose fonts, colors & placements.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-indigo-600 text-xl">🧵</span>
                <div>
                  <p className="font-semibold">Premium Thread Work</p>
                  <p className="text-sm">High-quality embroidery that lasts.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-indigo-600 text-xl">🚀</span>
                <div>
                  <p className="font-semibold">Fast Processing</p>
                  <p className="text-sm">Get your customized product quickly.</p>
                </div>
              </div>
            </div>

            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium px-8 py-3 rounded-full transition duration-300 shadow-md"
              onClick={() => window.location.href = "/contact"}
            >
              Enquire Now
            </button>
          </div>
        </section>
      </div>
    );
  }

  export default ProductPage;
