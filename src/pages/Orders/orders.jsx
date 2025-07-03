import Order from "../../components/orderProduct/order";

const Orders = () => {
  return (
    <div className="relative px-5 py-7 space-y-6 max-w-[1400px] mx-auto">
      {/* Add Order Button */}
      <div className="flex justify-end mb-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow-md transition duration-200">
          + Add Order
        </button>
      </div>

      {/* Search & Filter */}
      <section className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-[250px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>

          {/* Filter Select */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Filter</label>
            <select className="border border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="PriceHigh">Price: High to Low</option>
              <option value="PriceLow">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Icons */}
        <div className="flex gap-4 mt-2 md:mt-0">
          {/* Edit */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
              />
            </svg>
          </button>

          {/* Delete */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166M19.478 5.79 18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79M7.25 5.25v-.916c0-1.18.91-2.164 2.09-2.201a51.964 51.964 0 0 1 3.32 0c1.18.037 2.09 1.022 2.09 2.201v.916"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Order Table or List */}
      <section>
        <Order />
      </section>
    </div>
  );
};

export default Orders;
