"use client";
import { Fragment } from "react";
import EmptyState from "../EmptyState";
import { cn } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";
import Pagination from "../Pagination";
import Icons from "@/components/icons";
import { FaEdit } from "react-icons/fa";

type TableProps<T> = {
  data: T[];
  rowComponent: (row: T, index: number, length: number) => JSX.Element;
  title?: string;
  isLoading?: boolean;
  isFetching?: boolean;
  children?: React.ReactNode;
  tableHeadData?: {
    title: string;
    key: string;
  }[];
  height?: string;
  loaderLength?: number;
  emptyStateMessage?: string;
  tableHeaderLeftComponent?: () => JSX.Element;
  tableMobileFooter?: () => JSX.Element;
  footerComponent?: () => JSX.Element;
  className?: string;
  hasPagination?: boolean;
  useShadow?: boolean;
  paginationData?: {
    page: number;
    limit: number;
    total: number;
  };
};

const Table = <T,>({
  data = [],
  title,
  isLoading = false,
  isFetching = false,
  tableHeadData = [],
  rowComponent,
  height,
  loaderLength = 5,
  emptyStateMessage = "All your data will show here",
  tableHeaderLeftComponent,
  tableMobileFooter,
  footerComponent,
  className,
  hasPagination = false,
  paginationData,
  useShadow = false,
}: TableProps<T>) => {
  return (
    <>
      <div className="bg-[#FFF0E5] max-lg:mb-4 p-2.5 lg:py-4 lg:px-5 lg:text-xl font-semibold flex justify-between items-center">
          <h3>{title} </h3>
          <button className="flex items-center space-x-2 text-orange-500 hover:text-white py-2 px-4 rounded-lg hover:bg-orange-600"
        onClick={(e) => {
          // e.stopPropagation(); 
          // openAddUnitTypeModal();
        }}>
          <FaEdit className="w-4 h-4" />
            <span className="font-small lg:text-sm">Update</span>
          </button>
        </div>
    
      {!useShadow && (
        
        <div
          className={cn(
            "h-fit flex flex-col xl:flex-row xl:items-center justify-between",
            { "mb-4": title },
          )}
        >
               
          {/* <h3 className="text-base lg:text-xl font-bold">}</h3> */}
          <div className="hidden xl:block">
            {tableHeaderLeftComponent && tableHeaderLeftComponent()}
          </div>
        </div>
      )}
      <section
        className={cn(
          "h-full bg-white",
          {
            "drop-shadow-md p-2 xl:py-4 xl:px-4 rounded-lg": useShadow,
            "border border-[#5A5A5A99] rounded-t": !useShadow,
          },
          className,
        )}
      >
        {useShadow && (
          <div
            className={cn(
              "h-fit flex flex-col xl:flex-row xl:items-center justify-between",
            )}
          >
            <h3 className="text-base lg:text-xl font-bold px-3">{title}</h3>
            <div className="hidden xl:block">
              {tableHeaderLeftComponent && tableHeaderLeftComponent()}
            </div>
          </div>
        )}

        {isLoading ? (
          <div className={cn("mt-4", height)}>
            {new Array(loaderLength).fill(0).map((i, index) => {
              return (
                <div
                  key={i + index}
                  className="py-[18px] border-t-[0.5px] border-tc-01"
                >
                  <Skeleton className="h-[72px] xl:h-5" baseColor="#E5E3FE" />
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {data?.length > 0 ? (
              <>
                <div className={cn({ "mt-1": useShadow })}>
                  <div className="overflow-x-auto">
                    <div
                      className={cn("inline-block min-w-full", {
                        "py-2": useShadow,
                      })}
                    >
                     <div
  className={cn(
    "scrollbar scrollbar-w-1 scrollbar-thumb-primary scrollbar-track-pc-02 scrollbar-track-rounded-md scrollbar-thumb-rounded-md overflow-y-auto xl:overflow-visible relative",
    height
  )}
>

                        <table className="min-w-full text-left text-sm font-light">
                          <thead className="capitalize sticky top-0">
                            <tr>
                              {tableHeadData.map((heading) => {
                                return (
                                  <th
                                    className="py-4 first-of-type:rounded-tl last-of-type:rounded-tr font-semibold px-5 bg-[#FF69001A] whitespace-nowrap"
                                    key={heading.key}
                                  >
                                    {heading.title}
                                  </th>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody className="font-normal">
                            {data?.map((row, index) => {
                              return (
                                <Fragment key={index} >
                                  {rowComponent(row, index, data.length)}
                                </Fragment>
                              );
                            })}
                          </tbody>
                        </table>
                        {isFetching && (
                          <div>
                            {new Array(3).fill(0).map((i, index) => {
                              return (
                                <div
                                  key={i + index}
                                  className="py-[18px] border-t-[0.5px] border-tc-01"
                                >
                                  <Skeleton
                                    className="h-[72px] xl:h-5"
                                    baseColor="#E5E3FE"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={cn("flex items-center mt-7", height)}>
                <EmptyState
                  // icon={<Icons.NoTransactionIcon />}
                  description={emptyStateMessage}
                />
              </div>
            )}
          </>
        )}

        {tableMobileFooter && !isLoading && (
          <div className="xl:hidden">{tableMobileFooter()}</div>
        )}

        {hasPagination && (
          <div className="mt-10">
            <Pagination paginationData={paginationData!} />
          </div>
        )}

        {footerComponent && !isLoading && footerComponent()}
      </section>
    </>
  );
};

export default Table;
