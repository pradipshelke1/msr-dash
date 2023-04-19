import * as actionType from "../types/ActionTypes";

const initialState = {
  longTermPayment: [],
  postLongTermPayment: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const LongTermPayment = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LONG_TERM_PAYMENT_SET_DATA:
      return {
        ...state,
        longTermPayment: action.longTermPayment,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.LONG_TERM_PAYMENT_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.LONG_TERM_PAYMENT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.LONG_TERM_PAYMENT_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.LONG_TERM_PAYMENT_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_LONG_TERM_PAYMENT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_LONG_TERM_PAYMENT_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postLongTermPayment: action.postLongTermPayment,
      };
    case actionType.UPDATE_LONG_TERM_PAYMENT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_LONG_TERM_PAYMENT_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_LONG_TERM_PAYMENT_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
