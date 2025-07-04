import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSubCategory } from "../../features/sub category/subCategory";
import { getBrands } from "../../features/brands/brands";
import { v4 as uuidv4 } from 'uuid';
import {
  AddProducts,
  getColor,
  getProduct,
} from "../../features/product/product";
import { toast } from "react-toastify";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataSub = useSelector((state) => state.subCategory.data);
  const dataCol = useSelector((state) => state.product.dataCol);
  const dataBrand = useSelector((state) => state.brand.data);

  const [brandId, setBrandId] = useState("");
  const [colorId, setColorId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discPrice, setDiscPrice] = useState("");
  const [subId, setSubId] = useState("");
  const [code, setCode] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [ProductName, setProductName] = useState("");
  const [disc, setDisc] = useState("");
  const [weight, setWeight] = useState("");
  const [stock, setStock] = useState(false);
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setSize("");
    setBrandId("");
    setDiscPrice("");
    setPrice("");
    setQuantity("");
    setCode("");
    setWeight("");
    setImage(null);
    setImagePreview(null);
    setSubId("");
    setStock(false);
    setDisc("");
    setColorId("");
    setProductName("");
  };

  const funAddProduct = async () => {
    if (
      !ProductName ||
      !code ||
      !price ||
      !quantity ||
      !discPrice ||
      !subId ||
      !brandId ||
      !colorId ||
      !size ||
      !weight ||
      !image
    ) {
      toast.error("Please fill in all required fields.", { autoClose: 2000 });
      return;
    }

    const formdata = new FormData();
    formdata.append("Size", size);
    formdata.append("BrandId", brandId);
    formdata.append("DiscountPrice", discPrice);
    formdata.append("Price", price);
    formdata.append("Quantity", quantity);
    formdata.append("Code", uuidv4());
    formdata.append("Weight", weight);
    formdata.append("Images", image);
    formdata.append("SubCategoryId", subId);
    formdata.append("HasDiscount", stock);
    formdata.append("Description", disc);
    formdata.append("ColorId", colorId);
    formdata.append("ProductName", ProductName);

    try {
      setLoading(true);
      await dispatch(AddProducts(formdata)).unwrap();
      toast.success("Product added successfully!", { autoClose: 2000 });
      clearForm();
      navigate("/dashboard/products");
    } catch (error) {
      console.error("AddProduct error:", error);
      toast.error("Failed to add product.", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getSubCategory());
    dispatch(getBrands());
    dispatch(getColor());
  }, [dispatch]);

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex gap-3 items-center">
          <Link to="/dashboard/products">
            <span className="text-blue-600 hover:underline">Products</span>
          </Link>
          <span>/ Add New</span>
        </h2>
        <Link to="/dashboard/products">
          <button className="border px-5 py-2 rounded text-blue-600 border-blue-600 hover:bg-blue-50 cursor-pointer">
            Cancel
          </button>
        </Link>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT SIDE */}
        <div className="md:w-[60%] space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">Basic Info</h3>
            <div className="flex gap-4 mb-3">
              <input
                value={ProductName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="Product Name"
              />
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="number"
                className="w-[30%] border px-3 py-2 rounded"
                placeholder="Code"
              />
            </div>
            <textarea
              value={disc}
              onChange={(e) => setDisc(e.target.value)}
              className="w-full border px-3 py-2 rounded h-32 resize-none"
              placeholder="Product Description"
            />
          </section>

          <section>
            <div className="flex gap-4">
              <select
                value={subId}
                onChange={(e) => setSubId(e.target.value)}
                className="w-1/2 border px-3 py-2 rounded"
              >
                <option value="">Select Subcategory</option>
                {dataSub?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.subCategoryName}
                  </option>
                ))}
              </select>

              <select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="w-1/2 border px-3 py-2 rounded"
              >
                <option value="">Select Brand</option>
                {dataBrand?.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.brandName}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Price & Stock</h3>
            <div className="flex gap-4">
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className="w-1/3 border px-3 py-2 rounded"
                placeholder="Price"
              />
              <input
                value={discPrice}
                onChange={(e) => setDiscPrice(e.target.value)}
                type="number"
                className="w-1/3 border px-3 py-2 rounded"
                placeholder="Discount Price"
              />
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                className="w-1/3 border px-3 py-2 rounded"
                placeholder="Quantity"
              />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                checked={stock}
                onChange={() => setStock(!stock)}
              />
              <label>This product has a discount</label>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Options</h3>
            <div className="flex gap-4">
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-1/2 border px-3 py-2 rounded"
              >
                <option value="">Select Size</option>
                {["S", "M", "L", "XL", "XXL"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-1/2 border px-3 py-2 rounded"
              >
                <option value="">Select Weight</option>
                {[10, 20, 30, 40, 50].map((w) => (
                  <option key={w} value={w}>
                    {w}g
                  </option>
                ))}
              </select>
            </div>
          </section>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-[40%] space-y-6">
          <section className="border rounded p-4">
            <h3 className="text-lg font-semibold mb-2">Color</h3>
            <div className="flex flex-wrap gap-3">
              {dataCol?.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColorId(c.id)}
                  className={`w-10 h-10 rounded-full border-2  cursor-pointer ${
                    colorId === c.id ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: c.colorName }}
                  title={c.colorName}
                />
              ))}
            </div>
          </section>

          <section className="border rounded p-4">
            <h3 className="text-lg font-semibold mb-2">Image Upload</h3>
            <div className="border-dashed border rounded flex flex-col items-center justify-center p-6 text-center">
              <input
                type="file"
                accept="image/*"
                className="mb-3 cursor-pointer"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-[250px] rounded shadow"
                />
              )}
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: JPG, PNG, GIF (max 900x400)
              </p>
            </div>
          </section>

          <button
            onClick={funAddProduct}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition cursor-pointer"
          >
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
  