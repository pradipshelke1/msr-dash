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

function ActionOrders(props) {
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
      order_date: values.order_date,
      promoter_name: values.promoter_name,
      geo_location: values.geo_location,
      society_name: values.society_name,
      customer_contact: values.customer_contact,
      customer_name: values.customer_name,
      customer_email: values.customer_email,
      order_amount: values.order_amount,
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
          Edit Order
        </ModalHeader>
        {props.suppiler?.isUpdateLoading && <LinerLoader />}
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
          {props.suppiler?.isUpdateLoading && <LinerLoader />}
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default ActionOrders;
