import React from "react";
import "./getSellerOrder.styles.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getSellerOrder, updateOrder } from "../../../../features/orderSlice";
import ViewSellerModal from "../viewSellerOrder/viewSellerOrder";

const GetSellerOrderContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authseller = useSelector((state) => state.authseller);
  const order = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getSellerOrder(authseller._id));
  }, [order.updateStatus]);
  const { sellerOrderDetails } = order;

  const handleUpdateOrder = (orderid, data) => {
    dispatch(
      updateOrder({ orderId: orderid, updatedData: { orderStatus: data } })
    );
  };

  let rows = [];
  if (sellerOrderDetails.sellerOrder?.length > 0) {
    rows =
      sellerOrderDetails.sellerOrder.length > 0 &&
      sellerOrderDetails.sellerOrder
        .slice()
        .reverse()
        .map((order) => {
          return {
            id: order._id,
            bName: order.coustomerDetails.name,
            bEmail: order.coustomerDetails.email,
            amount: order.sellerPriceSum,
            oStatus: order.orderStatus,
            dDate: order.deliveryDate,
          };
        });
  }

  const columns = [
    { field: "id", headerName: <h4>ID</h4>, width: 360 },
    { field: "bName", headerName: <h4>Buyer Name</h4>, width: 180 },
    { field: "bEmail", headerName: <h4>Buyer Email</h4>, width: 290 },
    { field: "amount", headerName: <h4>Amount</h4>, width: 120 },
    {
      field: "oStatus",
      headerName: <h4>Status</h4>,
      width: 160,
      renderCell: (params) => {
        return (
          <div className="order-status-values">
            {params.row.oStatus === "Pending" ? (
              <div className="pending">Pending</div>
            ) : params.row.oStatus === "Dispatched" ? (
              <div className="dispatched">Dispatched</div>
            ) : (
              <div className="delivered">Delivered</div>
            )}
          </div>
        );
      },
    },
    {
      field: "dDate",
      headerName: <h4>Delivery Dt.</h4>,
      width: 150,
    },
    {
      field: "actions",
      headerName: (
        <div className="order-action-header">
          <h4>Actions</h4>
        </div>
      ),
      sortable: false,
      width: 320,
      renderCell: (params) => {
        return (
          <div className="order-action-btn-container">
            <button
              className="dbtn"
              onClick={() => handleUpdateOrder(params.row.id, "Dispatched")}
              disabled={
                params.row.oStatus === "Dispatched" ||
                params.row.oStatus === "Delivered"
              }
              style={{
                cursor:
                  params.row.oStatus === "Dispatched" ||
                  params.row.oStatus === "Delivered"
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Dispatched
            </button>
            <button
              className="ebtn"
              onClick={() => handleUpdateOrder(params.row.id, "Delivered")}
              disabled={params.row.oStatus === "Delivered"}
              style={{
                cursor:
                  params.row.oStatus === "Delivered"
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Delivered
            </button>
            {/* <div className="vbtn" onClick={() => navigate(`/pdfrough`)}>
              pdf
            </div> */}
            <ViewSellerModal orderId={params.row.id} />
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ height: 700, width: "100%" }} className="getsellerproducts">
      {!sellerOrderDetails ? (
        <div>no orders</div>
      ) : (
        <div data-aos="fade-up" data-aos-duration="2000">
          {" "}
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{ fontSize: 25 }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 13 },
              },
            }}
            pageSizeOptions={[10, 13]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      )}
    </div>
  );
};

export default GetSellerOrderContainer;
