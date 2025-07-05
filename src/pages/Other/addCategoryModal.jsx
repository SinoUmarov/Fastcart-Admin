// import { useState } from "react";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";

// export default function AddCategoryModal({ open, onClose, onSave }) {
//   const [image, setImage] = useState(null);
//   const [name, setName] = useState("");

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (!image) return;

//     const fd = new FormData();
//     fd.append("CategoryImage", image);
//     fd.append("CategoryName", name);
//     onSave(fd);
//     setImage(null);
//     setName("");
//     onClose();
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box>
//         <h2>Add Category</h2>
//         <form onSubmit={handleSubmit}>
//           <input type="file" onChange={e => setImage(e.target.files?.[0])} required />
//           <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
//           <button type="submit">Save</button>
//         </form>
//       </Box>
//     </Modal>
//   );
// }
