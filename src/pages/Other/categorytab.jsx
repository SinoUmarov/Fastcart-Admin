// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { deleteCategory, editCategory, addCategory } from "../../features/category/catergory";
// import AddCategoryModal from "../Other/AddCategoryModal";
// import EditCategoryModal from "../modals/EditCategoryModal";

// export default function CategoryTab() {
//   const data = useSelector(state => state.category.data);
//   const dispatch = useDispatch();

//   const [addOpen, setAddOpen] = useState(false);
//   const [editData, setEditData] = useState(null);

//   return (
//     <div>
//       <button onClick={() => setAddOpen(true)}>+ Add category</button>
//       <AddCategoryModal open={addOpen} onClose={() => setAddOpen(false)} onSave={(formData) => dispatch(addCategory(formData))}/>
//       {editData && <EditCategoryModal data={editData} onClose={() => setEditData(null)} onSave={(formData) => dispatch(editCategory(formData))}/>}

//       <div className="categories-grid">
//         {data.map(cat => (
//           <div key={cat.id} className="category-card">
//             <img src={`${API}/images/${cat.categoryImage}`} alt={cat.categoryName} />
//             <button onClick={() => setEditData(cat)}>Edit</button>
//             <button onClick={() => dispatch(deleteCategory(cat.id))}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
