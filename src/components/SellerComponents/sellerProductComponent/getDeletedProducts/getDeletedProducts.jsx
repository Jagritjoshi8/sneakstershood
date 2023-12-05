import * as React from "react";
import "./getDeletedPrducts.styles.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDeletedSellerProducts,
  getSellerProducts,
  hardDeleteProduct,
  restoreDeletedProducts,
  softDeleteProduct,
} from "../../../../features/productSlice";
import { useNavigate } from "react-router";

const GetDeletedProductsContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authseller = useSelector((state) => state.authseller);
  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getDeletedSellerProducts(authseller._id));
  }, [products.items]);
  const { deletedSellerProducts } = products;
  const handleHardDelete = (productid) => {
    dispatch(hardDeleteProduct(productid));
  };
  const handleRestoreProduct = (productid) => {
    dispatch(restoreDeletedProducts(productid));
  };
  const rows =
    deletedSellerProducts &&
    deletedSellerProducts.map((product) => {
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
    { field: "id", headerName: <h4>ID</h4>, width: 390 },
    {
      field: "pImg",
      headerName: <h4>Sneaker Image</h4>,
      width: 210,
      height: 190,
      renderCell: (params) => {
        return (
          <div className="tbsneakerimg">
            <img src={params.row.pImg} height="75px" />{" "}
          </div>
        );
      },
    },
    { field: "pName", headerName: <h4>Sneaker Name</h4>, width: 250 },
    { field: "pOgPrice", headerName: <h4>Original Price</h4>, width: 190 },
    {
      field: "pDisPrice",
      headerName: <h4>Disc. Price</h4>,
      width: 160,
    },
    {
      field: "inStock",
      headerName: <h4>In Stock</h4>,
      width: 120,
    },
    {
      field: "actions",
      headerName: <h4>Actions</h4>,
      sortable: false,
      width: 270,
      renderCell: (params) => {
        return (
          <div className="action-btn-container">
            <div
              className="ebtn"
              onClick={() => handleRestoreProduct(params.row.id)}
            >
              Restore
            </div>
            <div
              className="dbtn"
              onClick={() => handleHardDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div
      style={{ height: 600, width: "100%" }}
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ fontSize: 25 }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default GetDeletedProductsContainer;
