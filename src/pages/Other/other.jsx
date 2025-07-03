import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  editCategory,
  getCategory,
} from "../../features/category/catergory";
import { API } from "../../features/product/product";
import {
  addBrand,
  deleteBrnad,
  editBrand,
  getBrands,
} from "../../features/brands/brands";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { addCategory } from "../../features/category/catergory";
import {
  addSubCategory,
  deleteSubCategory,
  editSubCategory,
  getSubCategory,
} from "../../features/sub category/subCategory";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Other = () => {
  const [image, setImage] = useState(null);
  const [nameCategory, setNameCategory] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editNameCategory, setEditNameCategory] = useState("");
  const [idxCat, setIdxCat] = useState(null);
  const [catId, setCatId] = useState(null);
  const [nameSub, setNameSub] = useState("");
  let [statusSub, setStatusSub] = useState("");
  const dataCategory = useSelector((state) => state.category.data);
  const dataBrand = useSelector((state) => state.brand.data);
  const dataSubCat = useSelector((state) => state.subCategory.data);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [nameBrand, setNameBrand] = useState("");
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getBrands());
    dispatch(getSubCategory());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const categoryAdd = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("CategoryImage", image[0]);
    formData.append("CategoryName", nameCategory);
    dispatch(addCategory(formData));
    setNameCategory("");
    handleClose();
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [openEditBrand, setOpenEditBrand] = useState(false);
  const handleOpenEditBrand = () => setOpenEditBrand(true);
  const handleCloseEditBrand = () => setOpenEditBrand(false);
  const [openEditSub, setOpenEditSub] = useState(false);
  const handleOpenEditSub = () => setOpenEditSub(true);
  const handleCloseEditSub = () => setOpenEditSub(false);

  function funEditCat() {
    const formData = new FormData();
    formData.append("Id", idxCat);
    formData.append("CategoryImage", editImage);
    formData.append("CategoryName", editNameCategory);
    dispatch(editCategory(formData));
    handleCloseEdit();
    editNameCategory("");
    setIdxCat(null);
  }

  return (
    <div className="relative">
      <button
        className="absolute right-0 top-[-50px] py-2 bg-blue-600 px-5 rounded-[5px]"
        onClick={() => handleOpen()}
      >
        + Add category
      </button>{" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form
              onSubmit={categoryAdd}
              className="flex flex-col items-start gap-4"
            >
              <input
                type="file"
                name="CategoryImage"
                onChange={(e) => setImage(e.target.files)}
              />
              <input
                type="text"
                name="CategoryName"
                className="border-1 outline-0 py-1 px-2"
                placeholder="Add Category Name"
                value={nameCategory}
                onChange={(e) => setNameCategory(e.target.value)}
              />
              <button
                type="submit"
                className="py-2 px-7 bg-blue-600 rounded-[5px]"
              >
                Save
              </button>
            </form>
          </Typography>
        </Box>
      </Modal>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Categories" {...a11yProps(0)} />
            <Tab label="Brands" {...a11yProps(1)} />
            <Tab label="Sub Category" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="flex gap-5 flex-wrap w-[100%]">
            <Modal
              open={openEdit}
              onClose={handleCloseEdit}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Category
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <label htmlFor="">Edit Image</label>
                  <input
                    type="file"
                    className="border-1 py-1 px-2 rounded-[5px] mb-3"
                    onChange={(e) => setEditImage(e.target.files[0])}
                  />
                  <input
                    type="text"
                    placeholder="Edit Name Category"
                    className="border-1 py-1 px-3 rounded-[5px]"
                    value={editNameCategory}
                    onChange={(e) => setEditNameCategory(e.target.value)}
                  />
                  <br />
                  <button
                    className="py-2 px-8 rounded-[5px] my-5 bg-blue-600"
                    onClick={funEditCat}
                  >
                    Edit
                  </button>
                </Typography>
              </Box>
            </Modal>
            {dataCategory?.map((e) => {
              return (
                <div
                  key={e.id}
                  className="border-1 rounded-[10px] flex flex-col items-center gap-5 md:w-[20%] w-[100%] relative h-[200px]"
                > 
                  <img
                    className="w-[100%] rounded-[20px] h-[100%]"
                    src={`${API}/images/${e.categoryImage}`}
                    alt=""
                  />
                  <div className="absolute flex gap-2 bg-gray-400 bottom-5 py-1 px-2 rounded-[5px] ">
                    <h3 className="text-white">{e.categoryName}</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-blue-800 cursor-pointer"
                      onClick={() => {
                        setIdxCat(e.id);
                        handleOpenEdit();
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-red-600 cursor-pointer"
                      onClick={() => dispatch(deleteCategory(e.id))}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <section className="flex justify-between items-start md:flex-row flex-col-reverse md:gap-0 gap-5">
            <div className="md:w-[40%] w-[100%]">
              <div className="border-b-1 flex justify-between my-2 py-2">
                <h2 className="font-bold">Brands</h2>
                <h2>Action</h2>
              </div>
              {dataBrand?.map((e) => {
                return (
                  <div key={e.id} className="flex justify-between my-4 text-xl">
                    <h3>{e.brandName}</h3>
                    <div className="flex items-center gap-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-blue-600 cursor-pointer"
                        onClick={() => {
                          handleOpenEditBrand();
                          setIdxCat(e.id);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-red-600 cursor-pointer"
                        onClick={() => dispatch(deleteBrnad(e.id))}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="md:w-[40%] w-[100%] border-1 rounded-[5px] p-5 flex flex-col items-start">
              <h2 className="text-xl font-bold">Add new brand</h2>
              <input
                value={nameBrand}
                onChange={(e) => setNameBrand(e.target.value)}
                className="p-2 border-1 my-2 w-[100%]"
                type="text"
                placeholder="Add Brand"
              />
              <button
                className="bg-blue-600 py-2 px-8 rounded-[5px] my-3"
                onClick={() => {
                  dispatch(addBrand(nameBrand));
                  setNameBrand("");
                }}
              >
                Create
              </button>
            </div>
            <Modal
              open={openEditBrand}
              onClose={handleCloseEditBrand}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Brand
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <input
                    type="text"
                    placeholder="Edit Name Category"
                    className="border-1 py-1 px-3 rounded-[5px]"
                    value={editNameCategory}
                    onChange={(e) => setEditNameCategory(e.target.value)}
                  />
                  <br />
                  <button
                    className="py-2 px-8 rounded-[5px] my-5 bg-blue-600"
                    onClick={() => {
                      let elem = {
                        id: idxCat,
                        name: editNameCategory,
                      };
                      dispatch(editBrand(elem));
                      setEditNameCategory("");
                      setIdxCat(null);
                      handleCloseEditBrand();
                    }}
                  >
                    Edit
                  </button>
                </Typography>
              </Box>
            </Modal>
          </section>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <section className="flex justify-between items-start md:flex-row flex-col-reverse md:gap-0 gap-5">
            <div className="md:w-[40%] w-[100%]">
              <div className="border-b-1 flex justify-between my-2 py-2">
                <h2 className="font-bold">Sub Category</h2>
                <h2>Action</h2>
              </div>
              <Modal
                open={openEditSub}
                onClose={handleCloseEditSub}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Edit Sub Category
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <input
                      type="text"
                      placeholder="Edit Name Category"
                      className="border-1 py-1 px-3 rounded-[5px]"
                      value={editNameCategory}
                      onChange={(e) => setEditNameCategory(e.target.value)}
                    />
                    <select
                      value={catId}
                      onChange={(e) => setCatId(e.target.value)}
                      className="py-2 my-3 border-1 rounded-[5px] px-5"
                    >
                      {dataCategory?.map((e) => {
                        return (
                          <option
                            className="text-black"
                            key={e.id}
                            value={e.id}
                          >
                            {e.categoryName}
                          </option>
                        );
                      })}
                    </select>
                    <br />
                    <button
                      onClick={() => {
                        let elem = {
                          id: idxCat,
                          name: editNameCategory,
                          CatId: catId,
                        };
                        dispatch(editSubCategory(elem));
                        handleCloseEditSub();
                        setCatId(null);
                        setEditNameCategory("");
                        setIdxCat(null);
                      }}
                      className="py-2 px-8 rounded-[5px] my-5 bg-blue-600"
                    >
                      Edit
                    </button>
                  </Typography>
                </Box>
              </Modal>
              {dataSubCat?.map((e) => {
                return (
                  <div key={e.id} className="flex justify-between my-3">
                    <h2>{e.subCategoryName}</h2>
                    <div className="flex items-center gap-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-blue-600 cursor-pointer"
                        onClick={() => {
                          setIdxCat(e.id);
                          handleOpenEditSub();
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-red-600 cursor-pointer"
                        onClick={() => dispatch(deleteSubCategory(e.id))}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="md:w-[40%] w-[100%] border-1 rounded-[5px] p-5 flex flex-col items-start">
              <h2 className="text-xl font-bold">Add Sub Categoty</h2>
              <input
                value={nameSub}
                onChange={(e) => setNameSub(e.target.value)}
                className="p-2 border-1 my-2 w-[100%]"
                type="text"
                placeholder="Add Brand"
              />
              <select
                value={statusSub}
                onChange={(e) => setStatusSub(e.target.value)}
                className="py-2 px-3 outline-0 rounded-[5px] border-1"
              >
                {dataCategory?.map((e) => {
                  return (
                    <option className="text-black" key={e.id} value={`${e.id}`}>
                      {e.categoryName}
                    </option>
                  );
                })}
              </select>
              <button
                className="bg-blue-600 py-2 px-8 rounded-[5px] my-3"
                onClick={() => {
                  dispatch(addSubCategory({ name: nameSub, id: statusSub }));
                  setNameSub('')
                }}
              >
                Create
              </button>
            </div>
          </section>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default Other;
