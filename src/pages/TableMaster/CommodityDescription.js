/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { useDemoData } from "@mui/x-data-grid-generator";
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
} from "reactstrap";
import { Form, Formik } from "formik";
import { connect } from "react-redux";

import LinerLoader from "components/Loaders/LinerLoader";
import * as actions from "../../redux/creators";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import EditCommodityDescription from "./EditTableMaster/EditCommodityDescription";
import CustomTextField from "components/MuiComponents/CustomTextField";

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

function CommodityDescription(props) {
  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "document_desc", headerName: "Document Description", flex: 1 },
    {
      field: "hs_code",
      headerName: "HS Code",
      flex: 1,
    },
    {
      field: "remark",
      headerName: "Remark",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <EditCommodityDescription data={params.row} index={params.row.id} />
        );
      },
    },
  ];

  const rows = props.comDescription?.isLoading
    ? []
    : props.comDescription.comDescription;

  let data = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onComDescriptionGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in ComDescription:", values);
    setSubmitting(true);

    let user = {
      document_desc: values.document_desc,
      hs_code: values.hs_code,
      remark: values.remark,
    };

    console.log("Data of ComDescription:", user);
    props.onPostComDescriptionData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-yellow p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">Commidity Description</strong>
          <div>
            <Button
              className="btn-success p-2"
              onClick={() => {
                toggle();
              }}
            >
              <i className="fa fa-plus text-white mr-2" />
              Add New
            </Button>
          </div>
        </div>
        <Modal className="modal-md" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} className="d-flex align-items-center">
            Add New Commidity Description{" "}
          </ModalHeader>

          {props.comDescription?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                document_desc: "",
                hs_code: "",
                remark: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                document_desc: Yup.string().required("required"),
                hs_code: Yup.string().required("required"),
              })}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col md={12}>
                      <InputGroup>
                        <CustomTextField
                          name="document_desc"
                          label="Document Description *"
                          formProps={formProps}
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={12}>
                      <InputGroup>
                        <CustomTextField
                          name="hs_code"
                          label="HS Code *"
                          formProps={formProps}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={12}>
                      <InputGroup>
                        <CustomTextField
                          name="remark"
                          label="Remark"
                          formProps={formProps}
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
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </CardHeader>
      <CardBody style={{ height: 520, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={props.comDescription?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          disableSelectionOnClick
          // isRowSelectable={(params) => params.row.size < 50}

          // autoPageSize
          // autoHeight
        />
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    comDescription: state.comDescription,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onComDescriptionGetData: (data) =>
      dispatch(actions.comDescriptionGetData(data)),
    onDeleteComDescription: (id, data) =>
      dispatch(actions.deleteComDescription(id, data)),
    onPostComDescriptionData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postComDescriptionData(data, user, toggle, setSubmitting)
      ),
    updateComDescriptionData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateComDescriptionData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommodityDescription);
