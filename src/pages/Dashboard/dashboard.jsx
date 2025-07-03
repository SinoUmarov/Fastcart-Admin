import ReactApexChart from 'react-apexcharts'
import muibox from './img/div.MuiBox-root.png'
import cost from './img/iconly-glass-discount.svg.png'
import profit from './img/div.MuiBox-root (1).png'
import Product from '../../components/topProduct/product'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProduct } from '../../features/product/product'

const API = import.meta.env.VITE_API_URL

const options = {
	chart: { type: 'line' },
	tooltip: { theme: 'dark' },
	xaxis: {
		categories: [
			'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
		],
	},
}

const series = [
	{ name: 'Orders', data: [10, 4, 16, 21, 15, 31, 20, 8, 5, 30, 10, 12] },
]

const Dashboard = () => {
	const data = useSelector(state => state.product.data)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getProduct())
	}, [dispatch])

	console.log(data)

	return (
		<div className='p-5 space-y-8'>
			{/* Верхняя часть: Ключевые показатели и график */}
			<div className='flex flex-col md:flex-row justify-between gap-5'>
				<section className='md:w-[60%] space-y-5'>
					<div className='flex justify-between gap-4'>
						<div className='flex-1 h-[100px] rounded-md bg-[#FEF3F2] p-5 flex items-center gap-4 text-black shadow'>
							<img src={muibox} alt='Sales Icon' className='w-14 h-14' />
							<div>
								<p className='text-sm'>Sales</p>
								<h2 className='text-3xl font-bold'>$152k</h2>
							</div>
						</div>
						<div className='flex-1 h-[100px] rounded-md bg-[#FFFAEB] p-5 flex items-center gap-4 text-black shadow'>
							<img src={cost} alt='Cost Icon' className='w-14 h-14' />
							<div>
								<p className='text-sm'>Cost</p>
								<h2 className='text-3xl font-bold'>$99.7k</h2>
							</div>
						</div>
						<div className='flex-1 h-[100px] rounded-md bg-[#F0FDF9] p-5 flex items-center gap-4 text-black shadow'>
							<img src={profit} alt='Profit Icon' className='w-14 h-14' />
							<div>
								<p className='text-sm'>Profit</p>
								<h2 className='text-3xl font-bold'>$32.1k</h2>
							</div>
						</div>
					</div>

					<div className='rounded-md border border-gray-200 p-5 shadow'>
						<h2 className='text-2xl font-bold mb-3'>Sales Revenue</h2>
						<ReactApexChart
							options={options}
							series={series}
							type='line'
							height={350}
						/>
					</div>
				</section>

				{/* Правая панель — Топ продаваемые товары */}
				<section className='md:w-[35%] border border-gray-200 rounded-md p-5 shadow flex flex-col'>
					<div className='flex justify-between items-center mb-5'>
						<h2 className='font-bold text-lg'>Top selling products</h2>
						<button className='text-blue-600 hover:underline text-sm'>
							See All
						</button>
					</div>
					<div className='flex flex-col gap-4 overflow-y-auto max-h-[420px]'>
						{data?.products?.length > 0 ? (
							data.products.map(e => (
								<div
									key={e.id}
									className='flex items-center gap-4 bg-white dark:bg-gray-900 p-3 rounded shadow-sm hover:shadow-md transition'
								>
									<img
										src={`${API}/images/${e.image}`}
										alt={e.productName}
										className='w-16 h-16 object-cover rounded'
									/>
									<div className='flex flex-col flex-1'>
										<h3 className='font-semibold text-gray-900 dark:text-white'>
											{e.productName}
										</h3>
										<p className='text-sm text-gray-500'>{e.categoryName}</p>
										<p className='text-sm text-green-600'>
											In Stock: {e.quantity}
										</p>
									</div>
									<div className='font-bold text-black dark:text-white'>
										${e.price}
									</div>
								</div>
							))
						) : (
							<p className='text-gray-500'>No products available</p>
						)}
					</div>
				</section>
			</div>

			{/* Нижняя часть: Recent Transactions и Top Products by Units Sold */}
			<section className='flex flex-col md:flex-row justify-between gap-5'>
				{/* Recent Transactions */}
				<div className='md:w-[50%] p-5 border border-gray-200 rounded-md shadow overflow-auto max-h-[400px]'>
					<h3 className='text-xl font-bold mb-4'>Recent Transactions</h3>
					<table className='w-full table-auto text-left'>
						<thead className='border-b border-gray-300'>
							<tr>
								<th className='py-2'>Product</th>
								<th className='py-2'>Category</th>
								<th className='py-2'>Stock</th>
								<th className='py-2'>Price</th>
							</tr>
						</thead>
						<tbody>
							{data?.products?.length > 0 ? (
								data.products.map(e => (
									<tr
										key={e.id}
										className='bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition'
									>
										<td className='flex items-center gap-3 py-2'>
											<img
												src={`${API}/images/${e.image}`}
												alt={e.productName}
												className='w-12 h-12 object-cover rounded'
											/>
											<span className='font-semibold text-gray-900 dark:text-white'>
												{e.productName}
											</span>
										</td>
										<td className='py-2 text-gray-500'>{e.categoryName}</td>
										<td className='py-2 text-green-600'>In Stock: {e.quantity}</td>
										<td className='py-2 font-bold text-black dark:text-white'>
											${e.price}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="4" className='text-center py-4 text-gray-500'>
										No products available
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Top Products by Units Sold */}
				<div className='md:w-[45%] p-5 border border-gray-200 rounded-md shadow overflow-auto max-h-[400px]'>
					<h3 className='text-xl font-bold mb-4'>Top Products by Units Sold</h3>
					<table className='w-full table-auto text-left'>
						<thead className='border-b border-gray-300'>
							<tr>
								<th className='py-2'>Name</th>
								<th className='py-2'>Price</th>
                </tr>
						</thead>
						<tbody>
							{data?.products?.length > 0 ? (
								data.products.map(e => (
									<Product
										key={e.id}
										names={e.productName}
										price={`$${e.price}`}
								
									/>
								))
							) : (
								<tr>
									<td colSpan="3" className='text-center py-4 text-gray-500'>
										No products available
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	)
}

export default Dashboard
