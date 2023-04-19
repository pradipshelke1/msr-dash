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
import EventActions from "./EventActions";
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
const Events = (props) => {
  const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "promoter_name", headerName: "Promoter Name", flex: 1 },
    { field: "brand_name", headerName: "Brand Name", flex: 1 },
    { field: "remarks", headerName: "Remarks", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
    { field: "image", headerName: "image", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <EventActions data={params.row} index={params.row.id} />;
      },
    },
  ];
  const rows = [
    {
      id: 1,
      name: "Pradip",
      date: "23/05/2022",
      promoter_name: "Akash",
      brand_name: "Dell",
      Remarks: "Done",
      status: "Active",
      time: "3.00 PM",
      image: "event.jpg",
    },
  ];
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in event:", values);

    let user = {
      name: values.name,
      date: values.date,
      promoter_name: values.promoter_name,
      brand_name: values.brand_name,
      remarks: values.remarks,
      status: values.status,
      time: values.time,
      image: values.image,
    };

    console.log("event:", user);
    //props.onPostSupplierData(data2, user, toggle, setSubmitting);
    setSubmitting(true);
    return;
  };
  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-yellow p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">Events Details</strong>
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
            Add New Event
          </ModalHeader>

          {props.suppiler?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                name: "",
                date: "",
                promoter_name: "",
                brand_name: "",
                remarks: "",
                status: "",
                time: "",
                image: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                // name: Yup.string().required("required"),
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
                            id="name"
                            label="Name"
                            name="name"
                            value={formProps.values.name}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.name &&
                              Boolean(formProps.errors.name)
                            }
                            helperText={
                              formProps.touched.name && formProps.errors.name
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
                            id="date"
                            label="Date *"
                            name="date"
                            value={formProps.values.date}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.date &&
                              Boolean(formProps.errors.date)
                            }
                            helperText={
                              formProps.touched.date && formProps.errors.date
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
                            label="Promoter Name *"
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
                            id="brand_name"
                            label="Brand Name"
                            name="email"
                            value={formProps.values.brand_name}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.brand_name &&
                              Boolean(formProps.errors.brand_name)
                            }
                            helperText={
                              formProps.touched.brand_name &&
                              formProps.errors.brand_name
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
                            id="remarks"
                            label="Remarks"
                            name="remarks"
                            value={formProps.values.remarks}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.remarks &&
                              Boolean(formProps.errors.remarks)
                            }
                            helperText={
                              formProps.touched.remarks &&
                              formProps.errors.remarks
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
                            id="status"
                            label="Status"
                            name="status"
                            value={formProps.values.status}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.status &&
                              Boolean(formProps.errors.status)
                            }
                            helperText={
                              formProps.touched.status &&
                              formProps.errors.status
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
                            id="time"
                            label="Time"
                            name="time"
                            value={formProps.values.time}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.time &&
                              Boolean(formProps.errors.time)
                            }
                            helperText={
                              formProps.touched.time && formProps.errors.time
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
                            id="image"
                            label="Image"
                            name="image"
                            value={formProps.values.image}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.image &&
                              Boolean(formProps.errors.image)
                            }
                            helperText={
                              formProps.touched.image && formProps.errors.image
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

export default Events;
