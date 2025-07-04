import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSubCategory } from "../../features/sub category/subCategory";
import { getBrands } from "../../features/brands/brands";
import {
  addImages,
  API,
  deleteImage,
  editProduct,
  getColor,
  getProductById,
} from "../../features/product/product";
import { toast } from "react-toastify";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const dataSub = useSelector((state) => state.subCategory.data);
  const dataCol = useSelector((state) => state.product.dataCol);
  const dataBrand = useSelector((state) => state.brand.data);
  const dataid = useSelector((state) => state.product.dataId);

  const [product, setProduct] = useState(null);
  const [brandId, setBrandId] = useState("");
  const [colorId, setColorId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discPrice, setDiscPrice] = useState("");
  const [subId, setSubId] = useState("");
  const [code, setCode] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [disc, setDisc] = useState("");
  const [weight, setWeight] = useState("");
  const [stock, setStock] = useState(false);

  useEffect(() => {
    dispatch(getColor());
    dispatch(getSubCategory());
    dispatch(getBrands());
    dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (dataid) {
      setProduct(dataid);
      setProductName(dataid.productName || "");
      setDisc(dataid.description || "");
      setQuantity(dataid.quantity || "");
      setWeight(dataid.weight || "");
      setPrice(dataid.price || "");
      setDiscPrice(dataid.discountPrice || "");
      setStock(dataid.hasDiscount || false);
      setSubId(dataid.subCategoryId || "");
      setSize(dataid.size || "");
      setCode(dataid.code || "");

      const colorMatch = dataCol?.find((c) => c.colorName === dataid.color);
      const brandMatch = dataBrand?.find((b) => b.brandName === dataid.brand);

      if (colorMatch) setColorId(colorMatch.id);
      if (brandMatch) setBrandId(brandMatch.id);
    }
  }, [dataid, dataCol, dataBrand]);

  const AddImage = () => {
    const formData = new FormData();
    formData.append("ProductId", id);
    for (let i = 0; i < image?.length; i++) {
      formData.append("Files", image[i]);
    }
    dispatch(addImages(formData)).then(() => {
      dispatch(getProductById(id));
    });
  };

  const handleEdit = () => {
    const formData = {
      Size: size,
      BrandId: brandId,
      DiscountPrice: discPrice,
      Price: price,
      Quantity: quantity,
      Code: code,
      Weight: weight,
      SubCategoryId: subId,
      HasDiscount: stock,
      Description: disc,
      ColorId: colorId,
      ProductName: productName,
    };

    dispatch(editProduct(formData)).then(() => {
      toast.success("Edited successfully", { autoClose: 1000 });
      navigate("/dashboard/products");
    });
  };

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
          Products / Edit Product
        </h2>
        <Link to={"/dashboard/products"}>
          <button className="border-1 py-2 px-7 rounded-[5px] border-blue-600 text-blue-600 cursor-pointer">
            Cancel
          </button>
        </Link>
      </section>

      <section className="my-10 flex md:flex-row flex-col justify-between">
        <aside className="md:w-[60%]">
          <h2 className="text-xl font-bold">Information</h2>
          <div className="flex my-3 justify-between md:gap-0 gap-5">
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-[70%] border-1 py-2 px-3 rounded-[5px] outline-0"
              type="text"
              placeholder="Product name"
            />
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border-1 py-2 px-3 rounded-[5px] outline-0 w-[25%]"
              type="number"
              placeholder="Code"
            />
          </div>

          <textarea
            value={disc}
            onChange={(e) => setDisc(e.target.value)}
            className="w-full border-1 h-[200px] py-2 px-3 rounded-[5px] resize-none"
            placeholder="Description"
          />

          <section className="my-5 flex justify-between items-center">
            <select
              value={subId}
              onChange={(e) => setSubId(e.target.value)}
              className="py-2 px-3 outline-0 rounded-[5px] w-[47%] border-1"
            >
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
                onChange={() => setStock((prev) => !prev)}
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
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="py-2 px-3 outline-0 rounded-[5px]"
                >
                  {["S", "M", "L", "XL", "XXL"].map((sz) => (
                    <option key={sz} value={sz}>
                      {sz}
                    </option>
                  ))}
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
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="py-2 px-3 outline-0 rounded-[5px]"
                >
                  {[10, 20, 30, 40, 50].map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </fieldset>
            </div>
          </section>
        </aside>

        <aside className="md:w-[33%]">
          <section className="border-1 p-3 rounded-[5px]">
            <h3 className="text-xl font-bold">Colour:</h3>
            <div className="flex gap-4 flex-wrap">
              {dataCol?.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setColorId(e.id)}
                  className={`cursor-pointer py-4 w-[70px] rounded-[5px] border-2 ${
                    colorId === e.id ? "border-black" : "border-transparent"
                  }`}
                  style={{
                    backgroundColor: e.colorName,
                    color: "white",
                  }}
                >
                  {e.colorName}
                </button>
              ))}
            </div>
          </section>

          <section className="my-5">
            <h3 className="text-xl font-bold">Image</h3>
            <div className="flex flex-col items-center border-dashed rounded-[5px] p-5 my-3 border-1">
              <input
                type="file"
                multiple
                className="w-[50%] text-gray-700 cursor-pointer"
                onChange={(e) => setImage(e.target.files)}
              />
            </div>

            <div className="flex gap-5 flex-wrap">
              {product?.images?.map((e) => (
                <div key={e.id} className="relative w-[100px]">
                  <img src={`${API}/images/${e.images}`} alt="" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-7 absolute top-0 right-0 cursor-pointer"
                    onClick={() => {
                      dispatch(deleteImage(e.id)).then(() =>
                        dispatch(getProductById(id))
                      );
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              ))}
            </div>

            <hr className="my-5" />
            <button
              className="py-2 px-8 bg-blue-600 rounded-[5px] text-white"
              onClick={AddImage}
            >
              Add Images
            </button>

            <hr className="my-5" />
            <button
              className="py-2 px-8 bg-blue-600 rounded-[5px] text-white"
              onClick={handleEdit}
            >
              Edit
            </button>
          </section>
        </aside>
      </section>
    </div>
  );
};

export default EditProduct;
