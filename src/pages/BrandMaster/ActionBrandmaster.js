/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { connect } from "react-redux";
import LinerLoader from "components/Loaders/LinerLoader";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import * as Yup from "yup";

//import * as actions from "../../redux/creators";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  InputGroup,
  CardFooter,
  Card,
  CardBody,
  Label,
  ModalFooter,
} from "reactstrap";
import { MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import DeleteButton from "Helpers/DeleteButton";

function ActionBrandmaster(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  async function deleteSupplier(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //props.onDeleteSupplier(id, data);
      }
    });
  }

  const viewStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[1]?.view == 1
      ? true
      : false;

  const deleteStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[1]?.delete == 1
      ? true
      : false;

  const updateStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[1]?.update == 1
      ? true
      : false;
  const createStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[1]?.create == 1
      ? true
      : false;

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in action suppiler:", values);
    setSubmitting(true);

    let user = {
      name: values.name,
      details: values.details,
      aggrement: values.aggrement,
      location: values.location,
    };

    console.log("Data x:", data);
    console.log("Data of action supplier:", user);
    //props.updateSupplierData(data, user, toggle, setSubmitting);
    return;
  };

  // console.log("deleteStatus", deleteStatus);
  // console.log("updateStatus", updateStatus);

  return (
    <div>
      <div>
        {/* {updateStatus && ( */}
        <Button
          className="bg-gradient-yellow p-1"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-edit" aria-hidden="true"></i>
        </Button>
        {/* )} */}

        {/* {deleteStatus && ( */}
        <Button
          className="bg-gradient-danger text-white ml-3 p-1"
          onClick={(id) => {
            deleteSupplier(data.id);
          }}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </Button>
        {/* )} */}
      </div>

      <Modal className="modal-xl" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit Brand Master
        </ModalHeader>
        {props.suppiler?.isUpdateLoading && <LinerLoader />}
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
                            formProps.touched.aggrement &&
                            formProps.errors.aggrement
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
                            formProps.touched.location &&
                            formProps.errors.location
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
          {props.suppiler?.isUpdateLoading && <LinerLoader />}
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default ActionBrandmaster;
