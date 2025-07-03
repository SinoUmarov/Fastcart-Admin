import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSubCategory } from "../../features/sub category/subCategory";
import { getBrands } from "../../features/brands/brands";
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

    const formData = new FormData();
    formData.append("Size", size);
    formData.append("BrandId", brandId);
    formData.append("DiscountPrice", discPrice);
    formData.append("Price", price);
    formData.append("Quantity", quantity);
    formData.append("Code", code);
    formData.append("Weight", weight);
    formData.append("Images", image[0]);
    formData.append("SubCategoryId", subId);
    formData.append("HasDiscount", stock);
    formData.append("Description", disc);
    formData.append("ColorId", colorId);
    formData.append("ProductName", ProductName);

    try {
      setLoading(true);
      await dispatch(AddProducts(formData)).unwrap();
      toast.success("Product added successfully!", { autoClose: 2000 });
      clearForm();
      navigate("/dashboard/products");
    } catch (err) {
      console.error("AddProduct error:", err);
      toast.error("Failed to add product.", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getSubCategory());
    dispatch(getBrands());
    dispatch(getColor());
  }, [dispatch]);

  return (
    <div>
      <section className="flex items-center justify-between">
        <h2 className="md:text-3xl flex gap-4 items-center font-bold">
          <Link to={"/dashboard/products"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
          Products / Add new
        </h2>
        <Link to={"/dashboard/products"}>
          <button className="border-1 py-2 px-7 rounded-[5px] border-blue-600 text-blue-600 cursor-pointer">
            Cancel
          </button>
        </Link>
      </section>

      <section className="my-10 flex md:flex-row flex-col justify-between">
        {/* LEFT SIDE */}
        <aside className="md:w-[60%]">
          <h2 className="text-xl font-bold">Information</h2>
          <div className="flex md:gap-0 gap-3 my-3 justify-between">
            <input
              value={ProductName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-[70%] border-1 py-2 px-3 rounded-[5px] outline-0"
              type="text"
              placeholder="Product name"
            />
            <input
              className="border-1 py-2 px-3 rounded-[5px] outline-0 w-[25%]"
              type="number"
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <textarea
            value={disc}
            onChange={(e) => setDisc(e.target.value)}
            className="w-[100%] border-1 h-[200px] py-2 px-3 rounded-[5px] resize-none"
            placeholder="Description"
          ></textarea>

          <section className="my-5 flex justify-between items-center">
            <select
              value={subId}
              onChange={(e) => setSubId(e.target.value)}
              className="py-2 px-3 outline-0 rounded-[5px] w-[47%] border-1"
            >
              <option value="">Select Sub Category</option>
              {dataSub?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.subCategoryName}
                </option>
              ))}
            </select>
            <select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              className="py-2 px-3 outline-0 rounded-[5px] w-[47%] border-1"
            >
              <option value="">Select Brand</option>
              {dataBrand?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.brandName}
                </option>
              ))}
            </select>
          </section>

          <section>
            <h2 className="text-xl font-bold">Price</h2>
            <div className="flex justify-between items-center my-2">
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className="py-2 px-2 border-1 rounded-[5px] outline-0 w-[32%]"
                placeholder="Product price"
              />
              <input
                value={discPrice}
                onChange={(e) => setDiscPrice(e.target.value)}
                type="number"
                className="py-2 px-2 border-1 rounded-[5px] outline-0 w-[32%]"
                placeholder="Discount price"
              />
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                className="py-2 px-2 border-1 rounded-[5px] outline-0 w-[32%]"
                placeholder="Count"
              />
            </div>
            <div className="flex justify-between items-center my-4">
              <aside>
                <h2 className="text-xl font-bold">Different Options</h2>
                <p>This product has multiple options</p>
              </aside>
              <input
                checked={stock}
                onChange={() => setStock(!stock)}
                type="checkbox"
                className="size-5"
              />
            </div>
          </section>

          <section className="my-5">
            <h2 className="text-xl font-bold">Options</h2>
            <div className="flex gap-6 my-3">
              <fieldset className="border-1 p-3 rounded-[5px] w-[40%]">
                <legend className="px-2">Option 1</legend>
                <h2 className="text-xl">Size</h2>
              </fieldset>
              <fieldset className="border-1 p-3 rounded-[5px] w-[17%]">
                <legend className="px-2">Value</legend>
                <select
                  className="py-2 px-3 outline-0 rounded-[5px]"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="">Select size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </fieldset>
            </div>
            <div className="flex gap-6 my-3">
              <fieldset className="border-1 p-3 rounded-[5px] w-[40%]">
                <legend className="px-2">Option 2</legend>
                <h2 className="text-xl">Weight</h2>
              </fieldset>
              <fieldset className="border-1 p-3 rounded-[5px] w-[17%]">
                <legend className="px-2">Value</legend>
                <select
                  className="py-2 px-3 outline-0 rounded-[5px]"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                >
                  <option value="">Select weight</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </fieldset>
            </div>
          </section>
        </aside>

        {/* RIGHT SIDE */}
        <aside className="md:w-[33%]">
          <section className="border-1 p-3 rounded-[5px]">
            <h3 className="text-xl font-bold">Colour:</h3>
            <div className="flex gap-4 flex-wrap">
              {dataCol?.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setColorId(e.id)}
                  className={`cursor-pointer py-4 w-[70px] rounded-[200%] border-2 ${
                    colorId === e.id ? "border-black" : "border-transparent"
                  }`}
                  style={{ backgroundColor: e.colorName, color: "white" }}
                >
                  {e.colorName}
                </button>
              ))}
            </div>
          </section>

          <section className="my-5">
            <h3 className="text-xl font-bold">Image</h3>
            <div className="flex flex-col items-center border-dashed rounded-[5px] p-5 my-3 border-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                />
              </svg>

              <input
                type="file"
                className="w-[50%] text-gray-700"
                onChange={(e) => setImage(e.target.files)}
              />
              <h3 className="text-[19px] font-bold my-3">
                Click to upload or drag and drop
              </h3>
              <p>(SVG, JPG, PNG, or gif maximum 900x400)</p>
            </div>

            <button
              className="py-2 px-8 bg-blue-600 text-white rounded-[5px]"
              onClick={funAddProduct}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </section>
        </aside>
      </section>
    </div>
  );
};

export default AddProduct;
