import React, { useState } from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import * as actions from "../../../redux/creators";
import LinerLoader from "components/Loaders/LinerLoader";
import * as Yup from "yup";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  InputGroup,
} from "reactstrap";
import { MenuItem } from "@mui/material";
import DeleteButton from "Helpers/DeleteButton";
import CustomTextField from "components/MuiComponents/CustomTextField";

function EditCommodityDescription(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  const [modal, setModal] = useState(false);

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
    props.updateComDescriptionData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <div>
      <Button
        className="bg-gradient-yellow p-1"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-edit" aria-hidden="true"></i>
      </Button>
      <DeleteButton
        deleteFunction={() =>
          props.onDeleteComDescription(props.data?.id, data)
        }
      />
      <Modal className="modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit ComDescription
        </ModalHeader>
        {props.comDescription?.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              document_desc: props.data?.document_desc || "",
              hs_code: props.data?.hs_code || "",
              remark: props.data?.remark || "",
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
    </div>
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
)(EditCommodityDescription);
