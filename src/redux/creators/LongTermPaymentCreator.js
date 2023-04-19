import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";
import { purchaseOrderGetData, purchaseSalesIndentGetData } from ".";
import { longTermGetData } from "./LongTermCreator";

export const longTermPaymentSetData = (longTermPayment) => {
  return {
    type: actionType.LONG_TERM_PAYMENT_SET_DATA,
    longTermPayment: longTermPayment,
  };
};

export const longTermPaymentFailData = (error) => {
  return {
    type: actionType.LONG_TERM_PAYMENT_FAIL_DATA,
    error: error,
  };
};

export const longTermPaymentLoading = () => {
  return {
    type: actionType.LONG_TERM_PAYMENT_LOADING,
  };
};

export const longTermPaymentGetData = (data) => {
  return (dispatch) => {
    dispatch(longTermPaymentLoading());
    axios
      .get(baseUrl + "long-term-payment", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(longTermPaymentSetData(res.data));
      })

      .catch((error) => dispatch(longTermPaymentFailData(error)));
  };
};

export const deleteLongTermPaymentFail = (error) => {
  return {
    type: actionType.DELETE_LONG_TERM_PAYMENT_FAIL,
    error: error,
  };
};

export const deleteLongTermPayment = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `long-term-payment/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(longTermPaymentGetData(data));
              dispatch(longTermGetData(data));
            }
          );
        })

        .catch((error) => dispatch(deleteLongTermPaymentFail()));
    }
  };
};

export const postLongTermPaymentDataStart = () => {
  return {
    type: actionType.POST_LONG_TERM_PAYMENT_DATA_START,
  };
};

export const postLongTermPaymentDataFail = (error) => {
  return {
    type: actionType.POST_LONG_TERM_PAYMENT_DATA_FAIL,
    error: error,
  };
};

export const postLongTermPaymentDataSuccess = (success) => {
  return {
    type: actionType.POST_LONG_TERM_PAYMENT_DATA_SUCCESS,
    success: success,
  };
};

export const longTermPaymentPostLoading = () => {
  return {
    type: actionType.LONG_TERM_PAYMENT_POST_LOADING,
  };
};

export const postLongTermPaymentData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postLongTermPaymentDataStart());
    dispatch(longTermPaymentPostLoading());
    axios
      .post(baseUrl + "long-term-payment", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postLongTermPaymentDataSuccess(res.data));
        dispatch(longTermPaymentGetData(data));
        dispatch(longTermGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created LongTermPayment",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          if (toggle) {
            toggle();
          }
          if (setSubmitting) {
            setSubmitting(false);
          }
        });
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        dispatch(postLongTermPaymentDataFail(error));
      });
  };
};

export const updateLongTermPaymentDataStart = () => {
  return {
    type: actionType.UPDATE_LONG_TERM_PAYMENT_DATA_START,
  };
};

export const longTermPaymentUpdateLoading = () => {
  return {
    type: actionType.LONG_TERM_PAYMENT_UPDATE_LOADING,
  };
};

export const updateLongTermPaymentDataFail = (error) => {
  return {
    type: actionType.UPDATE_LONG_TERM_PAYMENT_DATA_FAIL,
    error: error,
  };
};

export const updateLongTermPaymentDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_LONG_TERM_PAYMENT_DATA_SUCCESS,
    success: success,
  };
};

export const updateLongTermPaymentData = (
  data,
  user,
  toggle,
  setSubmitting
) => {
  return (dispatch) => {
    dispatch(updateLongTermPaymentDataStart());
    dispatch(longTermPaymentUpdateLoading());

    axios
      .put(baseUrl + `long-term-payment/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateLongTermPaymentDataSuccess(res.data));
        dispatch(longTermPaymentGetData(data));
        dispatch(longTermGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated LongTermPayment",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          if (toggle) {
            toggle();
          }
          if (setSubmitting) {
            setSubmitting(false);
          }
        });
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        dispatch(updateLongTermPaymentDataFail(error));
      });
  };
};
