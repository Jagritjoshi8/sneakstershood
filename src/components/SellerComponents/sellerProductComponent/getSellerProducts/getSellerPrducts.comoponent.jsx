import * as React from "react";
import "./getSellerProducts.styles.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSellerProducts } from "../../../../features/productSlice";

const GetSellerProductsContainer = () => {
  const dispatch = useDispatch();
  const authseller = useSelector((state) => state.authseller);
  useEffect(() => {
    dispatch(getSellerProducts(authseller._id));
  }, []);
  const { sellerProducts } = useSelector((state) => state.products);
  console.log("sp", sellerProducts);
  const rows =
    sellerProducts &&
    sellerProducts.map((product) => {
      let bkimg;
      if (product.img.includes("uploads")) {
        bkimg = `http://localhost:8000/${product.img}`;
      } else {
        bkimg = product.img;
      }
      return {
        id: product._id,
        pImg: bkimg,
        pName: product.name,
        pOgPrice: product.original_price,
        pDisPrice: product.discounted_price,
        inStock: product.is_stock,
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "pImg",
      headerName: "Product Image",
      width: 160,
      height: 190,
      renderCell: (params) => {
        return <img src={params.row.pImg} height="80px" />;
      },
    },
    { field: "pName", headerName: "Product Name", width: 160 },
    { field: "pOgPrice", headerName: "Original Price", width: 130 },
    {
      field: "pDisPrice",
      headerName: "Discounted price",
      width: 130,
    },
    {
      field: "inStock",
      headerName: "InStock",
      width: 90,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 270,
      renderCell: (param) => {
        return (
          <div className="action-btn-container">
            <div className="dbtn">Delete</div>
            <div className="ebtn">Edit</div>
            <div className="vbtn">View</div>
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default GetSellerProductsContainer;
