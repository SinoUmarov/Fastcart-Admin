import { useSelector } from 'react-redux'
import image from './img/div.MuiBox-root (2).png';
 


const BestSell = () => {
  const data = useSelector((state) => state.product.data);
  console.log(data);

  if (!Array.isArray(data)) {
    // Можно вернуть заглушку или null
    return <p>No products available</p>;
  }

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <img src={image} alt="" />
          <aside className="w-[100%]">
            <div className="flex justify-between">
              <h2 className="font-bold">{item.ProductName}</h2>
              <p className="text-green-600">{item.sales}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-[#6C737F]">{item.category}</h2>
              <p className="text-[#6C737F]">in sales</p>
            </div>
          </aside>
        </div>
      ))}
    </div>
  );
};


export default BestSell;
