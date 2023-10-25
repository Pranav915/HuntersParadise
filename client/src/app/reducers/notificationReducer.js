import notificationActions from "app/actions/notificationActions";

const initState = {
  showNotification: false,
  notificationType: null,
  notificationContent: null,
};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case notificationActions.OPEN_NOTIFICATION:
      return {
        ...state,
        showNotification: true,
        notificationType: action.notificationType,
        notificationContent: action.content,
      };
    case notificationActions.CLOSE_NOTIFICATION:
      return {
        ...state,
        showNotification: false,
        notificationType: null,
        notificationContent: null,
      };

    default:
      return state;
  }
};

export default notificationReducer;
