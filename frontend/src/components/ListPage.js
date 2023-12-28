import "./ListPage.css";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === "") {
            reject(new Error("Error while saving user: name can't be empty."));
          } else {
            resolve({ ...user, name: user.name?.toUpperCase() });
          }
        }, 200);
      }),
    []
  );
};
function ListPage() {
  const [data, setData] = useState([]);
  const [snackbar, setSnackbar] = React.useState(null);
  const mutateRow = useFakeMutation();

  const handleCloseSnackbar = () => setSnackbar(null);
  const processRowUpdate = React.useCallback(
    async (newRow) => {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      console.log(response);
      setSnackbar({ children: "User successfully saved", severity: "success" });
      return response;
    },
    [mutateRow]
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/all_product/");
      console.log("Full Response:", response);
      const jsonData = await response.json();
      console.log("Parsed JSON:", jsonData);
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  function createData(
    id,
    title,
    description,
    price,
    summary,
    featured,
    released_date
  ) {
    return { id, title, description, price, summary, featured, released_date };
  }

  const rows = [];

  data?.forEach((item) => {
    rows.push(
      createData(
        item.id,
        item.title,
        item.description,
        item.price,
        item.summary,
        item.featured,
        item.released_date
      )
    );
  });
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      editable: true,
    },
    {
      field: "released_date",
      headerName: "Released date",
      width: 110,
      editable: false,
    },
    {
      field: "featured",
      headerName: "Featured",
      type: "boolean",
      width: 110,
      editable: true,
    },
    {
      field: "summary",
      headerName: "Summary",
      description: "",
      sortable: false,
      width: 360,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  return (
    <Router>
      <div className="ListPage">
        <Button variant="contained" color="primary">
          Click me
        </Button>
        <h2>List Page</h2>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            onCellEditStop={(params, event) => {
              if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                event.defaultMuiPrevented = true;
                console.log("cell edit stop");
              }
            }}
            // When row update
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
          />
          {!!snackbar && (
            <Snackbar
              open
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              onClose={handleCloseSnackbar}
              autoHideDuration={6000}
            >
              <Alert {...snackbar} onClose={handleCloseSnackbar} />
            </Snackbar>
          )}
        </Box>
      </div>
    </Router>
  );
}

export default ListPage;
