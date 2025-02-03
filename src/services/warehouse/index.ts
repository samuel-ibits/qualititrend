import { FetchProjectsRequest } from "@/types/services/projects";
import {
  CreateItemRequest,
  CreateItemResponse,
  FetchProductsResponse,
  FetchWarehouseProductRequest,
  FetchWarehouseProductResponse,
} from "@/types/services/warehouse";
import {
  CreateExpenseRequest,
  CreateExpenseRequestResponse,
  FetchExpenseRequestDetailResponse,
  FetchExpenseRequestResponse,
} from "@/types/services/warehouse/expense-requests";
import { FetchInventoriesResponse } from "@/types/services/warehouse/inventories";
import {
  CreateMaterialTransferResponse,
  FetchMaterialTransferDetailsResponse,
  FetchMaterialTransfersResponse,
} from "@/types/services/warehouse/material-transfers";
import {
  CreatePurchaseOrderRequest,
  FetchPurchaseOrderResponse,
  FetchWarehousePurchaseOrder,
} from "@/types/services/warehouse/purchase-orders";
import { FetchSuppliersResponse } from "@/types/services/warehouse/suppliers";
import {
  CreateSupplyRequest,
  CreateSupplyRequestResponse,
  FetchSupplyRequestDetailResponse,
  FetchSupplyRequestResponse,
} from "@/types/services/warehouse/supply-requests";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const getRequest = <T>(url: string, params?: T) => {
  const paramsReducer = (acc: any, [key, value]: any) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  };
  const cleanedParams = Object.entries(params || {}).reduce(paramsReducer, {});

  const queryString = (_params: any) => {
    return Object.keys(_params)
      .map((key) => key + "=" + _params[key])
      .join("&");
  };

  return {
    url: !params ? url : url + `?${queryString({ ...cleanedParams })}`,
    method: "GET",
  };
};

const postRequest = (url: string, details?: unknown) => ({
  url,
  method: "POST",
  body: details,
});

const patchRequest = (url: string, details?: unknown) => ({
  url,
  method: "PATCH",
  body: details,
});

export const warehouse = createApi({
  reducerPath: "warehouse",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();

      const token = session?.user.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Warehouse products",
    "warehouse product details",
    "warehouse purchase orders",
    "warehouse purchase order details",
    "suppliers",
    "inventories",
    "material transfers",
    "material transfer detail",
    "expense requests",
    "expense request details",
    "supply requests",
    "supply request details",
  ],
  endpoints: (builder) => ({
    CreateWarehouseItem: builder.mutation<
      CreateItemResponse,
      CreateItemRequest
    >({
      query: (credentials) =>
        postRequest("/create-warehouse-item", credentials),
      invalidatesTags: ["Warehouse products"],
    }),
    fetchProducts: builder.query<FetchProductsResponse, FetchProjectsRequest>({
      query: (credentials) => getRequest("/get-warehouse-items", { credentials, type: credentials.type || "material" }),
      providesTags: ["Warehouse products"],
    }),
    fetchItemTypes: builder.query<FetchProductsResponse, FetchProjectsRequest>({
      query: (credentials) => getRequest("/fetch-item-types", credentials),
      providesTags: ["Warehouse products"],
    }),
    /* fetchProjectsStats: builder.query<FetchProjectsStatsResponse, FetchProjectsRequest>({ */
    /*     query: (credentials) => getRequest("/get-projects-stats", credentials), */
    /*     providesTags: ["Projects"], */
    /* }), */
    fetchProjectDetail: builder.query<
      FetchWarehouseProductResponse,
      FetchWarehouseProductRequest
    >({
      query: (credentials) =>
        getRequest(`/get-warehouse-item-detail/${credentials.id}`),
      providesTags: ["Warehouse products", "warehouse product details"],
    }),

    // Purchase Orders
    fetchPurchaseOrders: builder.query<FetchPurchaseOrderResponse, void>({
      query: (credentials) => getRequest(`/purchase-orders`),
      providesTags: ["warehouse purchase orders"],
    }),
    fetchPurchaseOrderDetails: builder.query<
      FetchWarehousePurchaseOrder,
      FetchWarehouseProductRequest
    >({
      query: (credentials) => getRequest(`/purchase-order/${credentials.id}`),
      providesTags: ["warehouse purchase order details"],
    }),
    createPurchaseOrder: builder.mutation<
      FetchPurchaseOrderResponse,
      CreatePurchaseOrderRequest
    >({
      query: (credentials) => postRequest("create-purchase-order", credentials),
      invalidatesTags: ["warehouse purchase orders"],
    }),

    // Suppliers
    fetchSuppliers: builder.query<FetchSuppliersResponse, void>({
      query: (credentials) => getRequest(`/suppliers`),
      providesTags: ["suppliers"],
    }),

    // Inventories
    fetchInventories: builder.query<FetchInventoriesResponse, void>({
      query: (credentials) => getRequest(`/inventories`),
      providesTags: ["inventories"],
    }),

    // material-transfer
    fetchMaterialTransfers: builder.query<FetchMaterialTransfersResponse, void>(
      {
        query: (credentials) => getRequest("/material-transfer-requests"),
        providesTags: ["material transfers"],
      },
    ),
    fetchMaterialTransferDetails: builder.query<
      FetchMaterialTransferDetailsResponse,
      FetchWarehouseProductRequest
    >({
      query: (credentials) =>
        getRequest(`/material-transfer/${credentials.id}`),
      providesTags: ["material transfer detail"],
    }),
    createMaterialTransfer: builder.mutation<
      CreateMaterialTransferResponse,
      CreatePurchaseOrderRequest
    >({
      query: (credentials) =>
        postRequest("/create-material-transfer", credentials),
      invalidatesTags: ["material transfers", "material transfer detail"],
    }),

    // expense-requests
    fetchExpenseRequests: builder.query<FetchExpenseRequestResponse, void>({
      query: (credentials) => getRequest("/expense-requests"),
      providesTags: ["expense requests"],
    }),
    fetchExpenseRequestDetails: builder.query<
      FetchExpenseRequestDetailResponse,
      FetchWarehouseProductRequest
    >({
      query: (credentials) => getRequest(`/expense-request/${credentials.id}`),
      providesTags: ["expense request details"],
    }),
    createExpenseRequest: builder.mutation<
      CreateExpenseRequestResponse,
      CreateExpenseRequest
    >({
      query: (credentials) =>
        postRequest("/create-expense-request", credentials),
      invalidatesTags: ["expense requests", "expense request details"],
    }),

    // supply-request
    fetchSupplyRequests: builder.query<FetchSupplyRequestResponse, void>({
      query: (credentials) => getRequest("/supply-requests"),
      providesTags: ["supply requests"],
    }),
    fetchSupplyRequestDetails: builder.query<
      FetchSupplyRequestDetailResponse,
      FetchWarehouseProductRequest
    >({
      query: (credentials) => getRequest(`/supply-request/${credentials.id}`),
      providesTags: ["supply request details"],
    }),
    createSupplyRequest: builder.mutation<
      CreateSupplyRequestResponse,
      CreateSupplyRequest
    >({
      query: (credentials) =>
        postRequest("/create-supply-request", credentials),
      invalidatesTags: ["supply requests", "supply request details"],
    }),
  }),
});

export const {
  useCreateWarehouseItemMutation,
  useFetchProductsQuery,
  useFetchItemTypesQuery,
  useFetchProjectDetailQuery,

  //purchase order
  useFetchPurchaseOrdersQuery,
  useFetchPurchaseOrderDetailsQuery,
  useCreatePurchaseOrderMutation,

  //suppliers
  useFetchSuppliersQuery,

  //inventories
  useFetchInventoriesQuery,

  // material transfer
  useFetchMaterialTransfersQuery,
  useFetchMaterialTransferDetailsQuery,
  useCreateMaterialTransferMutation,

  //expense-request
  useCreateExpenseRequestMutation,
  useFetchExpenseRequestsQuery,
  useFetchExpenseRequestDetailsQuery,

  // supply-request
  useCreateSupplyRequestMutation,
  useFetchSupplyRequestsQuery,
  useFetchSupplyRequestDetailsQuery,
} = warehouse; // useFetchProjectsQuery, useFetchProjectsStatsQuery, useFetchProjectDetailQuery
