import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
  InputGroup,
  CardFooter,
  ModalFooter,
} from "reactstrap";
import { Field, FieldArray, Form, Formik } from "formik";
import FormControlLabel from "@mui/material/FormControlLabel";
import LinerLoader from "components/Loaders/LinerLoader";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import "../../css/main.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import ActionOrders from "./ActionOrders";
import Checkbox from "@mui/material/Checkbox";
import DeleteButton from "Helpers/DeleteButton";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const OrderDetails = (props) => {
  const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "order_date", headerName: "Order Date", flex: 1 },
    { field: "promoter_name", headerName: "Promoter Name", flex: 1 },
    { field: "geo_location", headerName: "Geo Location", flex: 1 },
    { field: "society_name", headerName: "Society", flex: 1 },
    { field: "customer_contact", headerName: "Customer Contact", flex: 1 },
    { field: "customer_name", headerName: "Customer Name", flex: 1 },
    { field: "customer_email", headerName: "Customer Email", flex: 1 },
    { field: "order_amount", headerName: "Order Amount", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <ActionOrders data={params.row} index={params.row.id} />;
      },
    },
  ];
  const rows = [
    {
      id: 1,
      order_date: "2022-04-17",
      promoter_name: "Heena",
      geo_location: "Seawoods",
      society_name: "Ghalot majesty",
      customer_contact: "Pune",
      customer_name: "9004753231",
      customer_email: "heena@gmail.com",
      order_amount: "105",
    },
  ];
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in promoters:", values);

    let user = {
      order_date: values.order_date,
      promoter_name: values.promoter_name,
      geo_location: values.geo_location,
      society_name: values.society_name,
      customer_contact: values.customer_contact,
      customer_name: values.customer_name,
      customer_email: values.customer_email,
      order_amount: values.order_amount,
    };

    console.log("orders:", user);
    //props.onPostSupplierData(data2, user, toggle, setSubmitting);
    setSubmitting(true);
    return;
  };
  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-yellow p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">Orders Details</strong>
          <div>
            {/* {createStatus && ( */}
            <Button
              className="btn-success p-2"
              onClick={() => {
                toggle();
              }}
            >
              <i className="fa fa-plus text-white mr-2" />
              Add New
            </Button>
            {/* )} */}
          </div>
        </div>
        <Modal
          className="modal-xl"
          backdrop="static"
          isOpen={modal}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle} className="d-flex align-items-center">
            Add New Order
          </ModalHeader>

          {props.suppiler?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                order_date: "",
                promoter_name: "",
                geo_location: "",
                society_name: "",
                customer_contact: "",
                customer_name: "",
                customer_email: "",
                order_amount: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                // name: Yup.string().required("required"),
                // designation: Yup.string().required("required"),
                // email: Yup.string().required("required"),
              })}
            >
              {(formProps) => {
                return (
                  <Form>
                    {console.log(`formProps.values`, formProps.values)}
                    <Row className="form-group pt-4">
                      <Col md={3}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="order_date"
                            label="Order Date"
                            name="order_date"
                            value={formProps.values.order_date}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.order_date &&
                              Boolean(formProps.errors.order_date)
                            }
                            helperText={
                              formProps.touched.order_date && formProps.errors.order_date
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={3}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="promoter_name"
                            label="Promoter Name"
                            name="promoter_name"
                            value={formProps.values.promoter_name}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.promoter_name &&
                              Boolean(formProps.errors.promoter_name)
                            }
                            helperText={
                              formProps.touched.promoter_name &&
                              formProps.errors.promoter_name
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={3}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="geo_location"
                            label="Geo Location"
                            name="geo_location"
                            value={formProps.values.geo_location}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.geo_location &&
                              Boolean(formProps.errors.geo_location)
                            }
                            helperText={
                              formProps.touched.geo_location && formProps.errors.geo_location
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={3}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="society_name"
                            label="Society Name"
                            name="society_name"
                            value={formProps.values.society_name}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.society_name &&
                              Boolean(formProps.errors.society_name)
                            }
                            helperText={
                              formProps.touched.society_name && formProps.errors.society_name
                            }
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="form-group pt-4">
                      <Col md={3}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="customer_contact"
                            label="Customer Contact"
                            name="customer_contact"
                            value={formProps.values.customer_contact}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.customer_contact &&
                              Boolean(formProps.errors.customer_contact)
                            }
                            helperText={
                              formProps.touched.customer_contact &&
                              formProps.errors.customer_contact
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={3}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="customer_name"
                            label="Customer Name"
                            name="customer_name"
                            value={formProps.values.customer_name}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.customer_name &&
                              Boolean(formProps.errors.customer_name)
                            }
                            helperText={
                              formProps.touched.customer_name &&
                              formProps.errors.customer_name
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={3}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="customer_email"
                            label="Customer Email"
                            name="customer_email"
                            value={formProps.values.customer_email}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.customer_email &&
                              Boolean(formProps.errors.customer_email)
                            }
                            helperText={
                              formProps.touched.customer_email &&
                              formProps.errors.customer_email
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={3}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="order_amount"
                            label="Order Amount"
                            name="order_amount"
                            value={formProps.values.order_amount}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.order_amount &&
                              Boolean(formProps.errors.order_amount)
                            }
                            helperText={
                              formProps.touched.order_amount &&
                              formProps.errors.order_amount
                            }
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row style={{ justifyContent: "center" }}>
                      <Col md={4}>
                        <Button type="reset" color="danger" block>
                          <b>Reset</b>
                        </Button>
                      </Col>
                      <Col md={4}>
                        <Button
                          type="submit"
                          disabled={formProps.isSubmitting}
                          color="primary"
                          block
                        >
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                );
              }}
            </Formik>
          </ModalBody>
          <ModalFooter>
            {props.suppiler?.isPostLoading && <LinerLoader />}
          </ModalFooter>
        </Modal>
      </CardHeader>
      <CardBody style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // {...data}
          loading={props.suppiler?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          disableSelectionOnClick
          // isRowSelectable={(params) => params.row.size < 50}

          // autoPageSize
          autoHeight
        />
      </CardBody>
    </Card>
  );
};

export default OrderDetails;
