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
import UserActions from "./UserActions";
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
const UserMaster = (props) => {
  const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "mobile_number", headerName: "Mobile Number", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <UserActions data={params.row} index={params.row.id} />;
      },
    },
  ];
  const rows = [
    {id: 1 , name: 'Pradip' ,email: 'pradip@gmail.com',mobile_number: 987654321 ,role: 'Admin' }
  ];
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in promoters:", values);

    let user = {
      name: values.name,
      email: values.email,
      mobile_number: values.mobile_number,
      role: values.role,
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
          <strong className="pl-2">Users Details</strong>
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
            Add New User
          </ModalHeader>

          {props.suppiler?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                name: "",
                email: "",
                mobile_number: "",
                role: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("required"),
                email: Yup.string().required("required"),
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
                            id="email"
                            label="Email"
                            name="email"
                            value={formProps.values.email}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.email &&
                              Boolean(formProps.errors.email)
                            }
                            helperText={
                              formProps.touched.email &&
                              formProps.errors.email
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
                            id="mobile_number"
                            label="Mobile Number *"
                            name="phone"
                            value={formProps.values.mobile_number}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.mobile_number &&
                              Boolean(formProps.errors.mobile_number)
                            }
                            helperText={
                              formProps.touched.phone && formProps.errors.phone
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
                            id="role"
                            label="Role"
                            name="role"
                            value={formProps.values.role}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.role &&
                              Boolean(formProps.errors.role)
                            }
                            helperText={
                              formProps.touched.email && formProps.errors.email
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

export default UserMaster;

