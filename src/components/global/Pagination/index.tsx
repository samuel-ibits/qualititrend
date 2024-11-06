import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

type Props = {
	paginationData: {
		page: number;
		limit: number;
		total: number;
	};
};

const Pagination = ({ paginationData }: Props) => {
	const { page, total, limit } = paginationData;

	const router = useRouter();

	const { page: _page } = router.query;

	const totalPages = Math.ceil(total / limit);

	const hasNextPage = (): boolean => {
		const count = totalPages;
		return +page < count ? true : false;
	};

	const hasPrevPage = (): boolean => {
		return page.toString() !== "1";
	};

	const pages = (): string[] => {
		const count = totalPages;
		const p: string[] = [];
		for (let i = 0; i < count; i++) {
			p.push(String(i + 1));
		}
		return p;
	};

	const closePages = (): string[] => {
		if (pages().length >= 7) {
			const p: string[] = [];
			for (let i = 0; i < 3; i++) {
				if (+page + i <= pages().length && !p.includes(String(page + i)))
					p.push(String(page + i));
			}
			for (let i = 0; i < 3; i++) {
				if (+page - i >= 1 && !p.includes(String(+page - i)))
					p.push(String(+page - i));
			}

			let set = new Set<string>(p);

			set.add("1");
			set.add(totalPages.toString());

			let calPages = [...set].sort((a, b) => +a - +b);

			if (!calPages.includes("2")) {
				calPages.splice(1, 0, "...");
			}

			if (!calPages.includes((totalPages - 1).toString())) {
				calPages.splice(calPages.length - 1, 0, "...");
			}

			return calPages;
		}
		return pages();
	};

	const pagPages = pages().length < 7 ? pages() : closePages();

	if (pages().length < 2) {
		return <></>;
	}

	// console.log(closePages());

	return (
		<section className='flex justify-center md:justify-end'>
			<div className='flex items-center'>
				<button
					disabled={!hasPrevPage()}
					onClick={() => {
						router.push({
							pathname: router.pathname,
							query: {
								...router.query,
								page: +router.query.page! - 1,
							},
						});
					}}
					className={cn("mr-3 text-primary text-sm font-medium", {
						"cursor-not-allowed opacity-30": !hasPrevPage(),
					})}>
					Previous
				</button>
				{pagPages.map((page, i) => {
					return (
						<button
							onClick={() => {
								if (page !== "...")
									router.push({
										pathname: router.pathname,
										query: {
											...router.query,
											page: page,
										},
									});
							}}
							disabled={(_page === undefined && page === "1") || _page === page}
							key={page + i}
							className={cn("px-2 py-1 rounded-md text-sm text-tc-main", {
								"bg-primary text-white cursor-not-allowed":
									(_page === undefined && page === "1") || _page === page,
								"text-tc-main": _page !== undefined && _page !== page,
							})}>
							{page}
						</button>
					);
				})}
				<button
					disabled={!hasNextPage()}
					onClick={() => {
						router.push({
							pathname: router.pathname,
							query: {
								...router.query,
								page: +router.query.page! + 1 || 2,
							},
						});
					}}
					className={cn("ml-3 text-primary text-sm font-medium", {
						"cursor-not-allowed opacity-30": !hasNextPage(),
					})}>
					Next
				</button>
			</div>
		</section>
	);
};

export default Pagination;
