const notificationActions = {
  SHOW_NOTIFICATION: "ALERT.SHOW_NOTIFICATION",
  CLOSE_NOTIFICATION: "ALERT.CLOSE_NOTIFICATION",
};

export const getNotificationActions = (dispatch) => {
  return {
    showNotification: (notificationType, content) =>
      dispatch(showNotification(notificationType, content)),
    closeNotification: () => dispatch(closeNotification()),
  };
};

export const showNotification = (notificationType, content) => {
  console.log("content", content);
  return {
    type: notificationActions.SHOW_NOTIFICATION,
    notificationType,
    content,
  };
};

export const closeNotification = () => {
  return {
    type: notificationActions.CLOSE_NOTIFICATION,
  };
};

export default notificationActions;
