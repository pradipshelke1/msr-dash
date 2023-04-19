import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";
import { purchaseOrderGetData, purchaseSalesIndentGetData } from ".";

export const comDescriptionSetData = (comDescription) => {
  return {
    type: actionType.COM_DESCRIPTION_SET_DATA,
    comDescription: comDescription,
  };
};

export const comDescriptionFailData = (error) => {
  return {
    type: actionType.COM_DESCRIPTION_FAIL_DATA,
    error: error,
  };
};

export const comDescriptionLoading = () => {
  return {
    type: actionType.COM_DESCRIPTION_LOADING,
  };
};

export const comDescriptionGetData = (data) => {
  return (dispatch) => {
    dispatch(comDescriptionLoading());
    axios
      .get(baseUrl + "commodity-desc", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(comDescriptionSetData(res.data));
      })

      .catch((error) => dispatch(comDescriptionFailData(error)));
  };
};

export const deleteComDescriptionFail = (error) => {
  return {
    type: actionType.DELETE_COM_DESCRIPTION_FAIL,
    error: error,
  };
};

export const deleteComDescription = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `commodity-desc/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(comDescriptionGetData(data));
            }
          );
        })

        .catch((error) => dispatch(deleteComDescriptionFail()));
    }
  };
};

export const postComDescriptionDataStart = () => {
  return {
    type: actionType.POST_COM_DESCRIPTION_DATA_START,
  };
};

export const postComDescriptionDataFail = (error) => {
  return {
    type: actionType.POST_COM_DESCRIPTION_DATA_FAIL,
    error: error,
  };
};

export const postComDescriptionDataSuccess = (success) => {
  return {
    type: actionType.POST_COM_DESCRIPTION_DATA_SUCCESS,
    success: success,
  };
};

export const comDescriptionPostLoading = () => {
  return {
    type: actionType.COM_DESCRIPTION_POST_LOADING,
  };
};

export const postComDescriptionData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postComDescriptionDataStart());
    dispatch(comDescriptionPostLoading());
    axios
      .post(baseUrl + "commodity-desc", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postComDescriptionDataSuccess(res.data));
        dispatch(comDescriptionGetData(data));
        dispatch(purchaseOrderGetData(data));
        dispatch(purchaseSalesIndentGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created ComDescription",
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
        dispatch(postComDescriptionDataFail(error));
      });
  };
};

export const updateComDescriptionDataStart = () => {
  return {
    type: actionType.UPDATE_COM_DESCRIPTION_DATA_START,
  };
};

export const comDescriptionUpdateLoading = () => {
  return {
    type: actionType.COM_DESCRIPTION_UPDATE_LOADING,
  };
};

export const updateComDescriptionDataFail = (error) => {
  return {
    type: actionType.UPDATE_COM_DESCRIPTION_DATA_FAIL,
    error: error,
  };
};

export const updateComDescriptionDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_COM_DESCRIPTION_DATA_SUCCESS,
    success: success,
  };
};

export const updateComDescriptionData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateComDescriptionDataStart());
    dispatch(comDescriptionUpdateLoading());

    axios
      .put(baseUrl + `commodity-desc/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateComDescriptionDataSuccess(res.data));
        dispatch(comDescriptionGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated ComDescription",
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
        dispatch(updateComDescriptionDataFail(error));
      });
  };
};
