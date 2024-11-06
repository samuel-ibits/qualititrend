import { bar } from "@/data/chart";
import { ResponsiveBar } from "@nivo/bar";

const IncomeAndExpensesChart = () => {
	return (
		<div className='bg-white drop-shadow-md rounded-lg h-[320px] lg:h-[412px] px-5 py-4'>
			<h2 className='lg:text-xl font-bold'>Income & Expenses</h2>

			<div className='h-[250px] lg:h-[330px] mt-2 lg:mt-5'>
				<ResponsiveBar
					data={bar}
					keys={["Expenses", "Income"]}
					indexBy='time'
					margin={{ top: 10, right: 10, bottom: 50, left: 40 }}
					padding={0.2}
					groupMode='grouped'
					valueScale={{ type: "linear" }}
					indexScale={{ type: "band", round: true }}
					colors={{ scheme: "nivo" }}
					fill={[
						{
							match: {
								id: "fries",
							},
							id: "dots",
						},
						{
							match: {
								id: "sandwich",
							},
							id: "lines",
						},
					]}
					borderColor={{
						from: "color",
						modifiers: [["darker", 1.3]],
					}}
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize: 0,
						tickPadding: 5,
						tickRotation: 0,
						legend: "",
						legendPosition: "middle",
						legendOffset: 32,
						truncateTickAt: 0,
					}}
					axisLeft={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: "",
						legendPosition: "middle",
						legendOffset: -40,
						truncateTickAt: 0,
					}}
					borderRadius={0}
					enableLabel={false}
					labelSkipWidth={12}
					labelSkipHeight={12}
					labelTextColor={{
						from: "color",
						modifiers: [["darker", 1.6]],
					}}
					legends={[
						{
							dataFrom: "keys",
							anchor: "bottom-right",
							direction: "row",
							justify: false,
							translateX: 40,
							translateY: 50,
							itemsSpacing: 23,
							itemWidth: 99,
							itemHeight: 19,
							itemDirection: "left-to-right",
							itemOpacity: 0.85,
							symbolSize: 19,
							effects: [
								{
									on: "hover",
									style: {
										itemOpacity: 1,
									},
								},
							],
						},
					]}
					role='application'
					ariaLabel='Income and expenses chart showing the income and expenses of a company in a day.'
					barAriaLabel={(e) =>
						e.id + ": " + e.formattedValue + " " + e.indexValue
					}
				/>
			</div>
		</div>
	);
};

export default IncomeAndExpensesChart;
