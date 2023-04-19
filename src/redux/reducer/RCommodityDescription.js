import * as actionType from "../types/ActionTypes";

const initialState = {
  comDescription: [],
  postComDescription: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const ComDescription = (state = initialState, action) => {
  switch (action.type) {
    case actionType.COM_DESCRIPTION_SET_DATA:
      return {
        ...state,
        comDescription: action.comDescription,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.COM_DESCRIPTION_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.COM_DESCRIPTION_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.COM_DESCRIPTION_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.COM_DESCRIPTION_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_COM_DESCRIPTION_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_COM_DESCRIPTION_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postComDescription: action.postComDescription,
      };
    case actionType.UPDATE_COM_DESCRIPTION_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_COM_DESCRIPTION_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_COM_DESCRIPTION_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
