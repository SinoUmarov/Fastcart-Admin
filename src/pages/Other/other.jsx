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
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Paper,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
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
    setEditNameCategory("");
    setIdxCat(null);
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ mb: 3, float: "right" }}
      >
        Add Category
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            Add Category
          </Typography>
          <form onSubmit={categoryAdd} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Button variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                hidden
                name="CategoryImage"
                onChange={(e) => setImage(e.target.files)}
              />
            </Button>
            <TextField
              label="Category Name"
              variant="outlined"
              fullWidth
              value={nameCategory}
              onChange={(e) => setNameCategory(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </form>
        </Box>
      </Modal>

      <Box sx={{ width: "100%", mt: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="Categories" {...a11yProps(0)} />
            <Tab label="Brands" {...a11yProps(1)} />
            <Tab label="Sub Category" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={3}>
            <Modal open={openEdit} onClose={handleCloseEdit}>
              <Box sx={style}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Edit Category
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Button variant="outlined" component="label">
                    Change Image
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setEditImage(e.target.files[0])}
                    />
                  </Button>
                  <TextField
                    label="Category Name"
                    variant="outlined"
                    value={editNameCategory}
                    onChange={(e) => setEditNameCategory(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    onClick={funEditCat}
                    sx={{ mt: 2 }}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Box>
            </Modal>

            {dataCategory?.map((e) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={e.id}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${API}/images/${e.categoryImage}`}
                    alt={e.categoryName}
                    sx={{ objectFit: "contain" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {e.categoryName}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setIdxCat(e.id);
                        setEditNameCategory(e.categoryName);
                        handleOpenEdit();
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => dispatch(deleteCategory(e.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Brands List
                </Typography>
                {dataBrand?.map((e) => (
                  <Box
                    key={e.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1,
                      borderBottom: "1px solid rgba(0,0,0,0.12)",
                    }}
                  >
                    <Typography>{e.brandName}</Typography>
                    <Box>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          handleOpenEditBrand();
                          setIdxCat(e.id);
                          setEditNameCategory(e.brandName);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => dispatch(deleteBrnad(e.id))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Add New Brand
                </Typography>
                <TextField
                  fullWidth
                  label="Brand Name"
                  variant="outlined"
                  value={nameBrand}
                  onChange={(e) => setNameBrand(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(addBrand(nameBrand));
                    setNameBrand("");
                  }}
                >
                  Create Brand
                </Button>
              </Paper>
            </Grid>

            <Modal open={openEditBrand} onClose={handleCloseEditBrand}>
              <Box sx={style}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Edit Brand
                </Typography>
                <TextField
                  fullWidth
                  label="Brand Name"
                  variant="outlined"
                  value={editNameCategory}
                  onChange={(e) => setEditNameCategory(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    const elem = {
                      id: idxCat,
                      name: editNameCategory,
                    };
                    dispatch(editBrand(elem));
                    setEditNameCategory("");
                    setIdxCat(null);
                    handleCloseEditBrand();
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Modal>
          </Grid>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Sub Categories
                </Typography>
                {dataSubCat?.map((e) => (
                  <Box
                    key={e.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1,
                      borderBottom: "1px solid rgba(0,0,0,0.12)",
                    }}
                  >
                    <Typography>{e.subCategoryName}</Typography>
                    <Box>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setIdxCat(e.id);
                          setEditNameCategory(e.subCategoryName);
                          setCatId(e.categoryId);
                          handleOpenEditSub();
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => dispatch(deleteSubCategory(e.id))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Add Sub Category
                </Typography>
                <TextField
                  fullWidth
                  label="Sub Category Name"
                  variant="outlined"
                  value={nameSub}
                  onChange={(e) => setNameSub(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={statusSub}
                    onChange={(e) => setStatusSub(e.target.value)}
                    label="Category"
                  >
                    {dataCategory?.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        {e.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(addSubCategory({ name: nameSub, id: statusSub }));
                    setNameSub("");
                  }}
                >
                  Create Sub Category
                </Button>
              </Paper>
            </Grid>

            <Modal open={openEditSub} onClose={handleCloseEditSub}>
              <Box sx={style}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Edit Sub Category
                </Typography>
                <TextField
                  fullWidth
                  label="Sub Category Name"
                  variant="outlined"
                  value={editNameCategory}
                  onChange={(e) => setEditNameCategory(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={catId}
                    onChange={(e) => setCatId(e.target.value)}
                    label="Category"
                  >
                    {dataCategory?.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        {e.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={() => {
                    const elem = {
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
                >
                  Save Changes
                </Button>
              </Box>
            </Modal>
          </Grid>
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default Other;