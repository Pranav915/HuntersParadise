import alertActions from "app/actions/alertActions";

const initState = {
  showAlertMessage: false,
  alertMessageContent: null,
  notificationContent: null,
};

const alertReducer = (state = initState, action) => {
  switch (action.type) {
    case alertActions.OPEN_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: true,
        alertMessageContent: action.content,
      };
    case alertActions.CLOSE_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: false,
        alertMessageContent: null,
      };

    case alertActions.OPEN_NOTIFICATION:
      return {
        ...state,
        notificationContent: action.content,
      };

    default:
      return state;
  }
};

export default alertReducer;
