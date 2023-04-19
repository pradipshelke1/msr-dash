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
import ActionBrandmaster from "./ActionBrandmaster";
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
const BrandMaster = (props) => {
  const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "details", headerName: "Details", flex: 1 },
    { field: "aggrement", headerName: "Aggrement", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <ActionBrandmaster data={params.row} index={params.row.id} />;
      },
    },
  ];
  const rows = [
    {id: 1 , name: 'Pradip' ,details: 'It is a React Project',aggrement: '2 years' ,location: 'Pune' }
  ];
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in promoters:", values);

    let user = {
      name: values.name,
      details: values.details,
      aggrement: values.aggrement,
      location: values.location,
    };

    console.log("promoters:", user);
    //props.onPostSupplierData(data2, user, toggle, setSubmitting);
    setSubmitting(true);
    return;
  };
  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-yellow p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">Brand Master Details</strong>
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
            Add Brand Master
          </ModalHeader>

          {props.suppiler?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                name: "",
                details: "",
                aggrement: "",
                location: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                //name: Yup.string().required("required"),
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
                            id="details"
                            label="Details"
                            name="details"
                            value={formProps.values.details}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.details &&
                              Boolean(formProps.errors.details)
                            }
                            helperText={
                              formProps.touched.details &&
                              formProps.errors.details
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
                            id="aggrement"
                            label="Aggrement"
                            name="aggrement"
                            value={formProps.values.aggrement}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.aggrement &&
                              Boolean(formProps.errors.aggrement)
                            }
                            helperText={
                              formProps.touched.aggrement && formProps.errors.aggrement
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
                            id="location"
                            label="Location"
                            name="location"
                            value={formProps.values.location}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.location &&
                              Boolean(formProps.errors.location)
                            }
                            helperText={
                              formProps.touched.location && formProps.errors.location
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

export default BrandMaster;

