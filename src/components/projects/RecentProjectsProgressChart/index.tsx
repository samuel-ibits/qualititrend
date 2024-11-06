"use client";

import * as echarts from "echarts/core";
import {
	TitleComponent,
	TitleComponentOption,
	PolarComponent,
	PolarComponentOption,
	TooltipComponent,
	TooltipComponentOption,
} from "echarts/components";
import { BarChart, BarSeriesOption } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";
import { useEffect, useState } from "react";
import { polarBar } from "@/data/chart";
import useBreakpoint from "@/hooks/useBreakpoints";

type EChartsOption = echarts.ComposeOption<
	| TitleComponentOption
	| PolarComponentOption
	| TooltipComponentOption
	| BarSeriesOption
>;

const RecentProjectsProgressChart = () => {
	const colors = [
		"#008000",
		"#17A2B8",
		"#FFE2D2",
		"#FF0000",
		"#D35B17",
		"#FF6900",
		"#FFD700",
		"#FF00FF",
		"#800080",
		"#0000FF",
		"#00FF00",
	];

	const breakpoint = useBreakpoint();

	const [option] = useState<EChartsOption>({
		polar: {
			radius: [
				breakpoint === "sm" ? 30 : 55,
				breakpoint === "sm" ? "100%" : "85%",
			],
		},
		colorBy: "data",
		color: colors,
		angleAxis: {
			max: 100,
			startAngle: -90,
			splitLine: {
				show: false,
			},
			axisLine: {
				show: false,
			},
			axisLabel: {
				show: false,
			},
			axisTick: {
				show: false,
			},
		},
		radiusAxis: {
			type: "category",
			axisLine: {
				show: false,
			},
			axisLabel: {
				show: true,
				fontSize: 10,
				formatter: (value) => {
					return value + "%";
				},
			},
			axisTick: {
				show: false,
			},
			data: polarBar.map((item) => item.value),
		},
		tooltip: {
			formatter: "{b}: {c}%",
		},
		series: {
			type: "bar",
			data: polarBar,
			coordinateSystem: "polar",
			label: {
				show: false,
			},
		},
	});

	useEffect(() => {
		echarts.use([
			TitleComponent,
			PolarComponent,
			TooltipComponent,
			BarChart,
			SVGRenderer,
		]);

		var chartDom = document.getElementById("main")!;
		var myChart = echarts.init(chartDom, null, {
			renderer: "svg",
		});

		option && myChart.setOption(option);

		return () => {
			myChart.dispose();
		};
	}, []);

	return (
		<div className='bg-white drop-shadow-md rounded-lg h-[320px] lg:h-[412px] px-5 py-4'>
			<h2 className='lg:text-xl font-bold'>Recent Projects Progress</h2>

			<div className='h-[250px] lg:h-[330px] mt-2 lg:mt-5 grid grid-cols-2 justify-between space-x-4'>
				<div className='h-full w-[170px] lg:w-[330px] relative'>
					<div id='main' className='h-full w-[170px] lg:w-[330px]'></div>
					<div className='text-center text-black-500 text-[10px] lg:text-sm absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
						<div className='font-semibold'>{polarBar.length}</div>
						<div>
							Total <br className='lg:hidden' /> Projects
						</div>
					</div>
				</div>
				<div className='flex items-center justify-end lg:items-end lg:pr-4'>
					<div className='grid grid-cols-2 gap-3'>
						{polarBar.map((item, index) => (
							<div key={index} className='flex items-center space-x-2'>
								<div
									className='size-3 rounded-[2px]'
									style={{ background: colors[index] }}></div>
								<div className='max-lg:text-[10px] text-[#2B2B29]'>
									{item.name}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecentProjectsProgressChart;
