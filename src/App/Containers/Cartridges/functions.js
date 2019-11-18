export const stateModalAddCartridges = (event, context, status=true) => {
  if (event.currentTarget === event.target) {
    context.setState({
      statusModalAddCartridges: status,
    });
  }
};

export const stateModalWorkers = (event, context, status=true) => {
  if (event.currentTarget === event.target) {
    context.setState({
      statusModalWorkers: status,
    });
  }
};

export const stateModalStatuses = (event, context, status=true) => {
  if (event.currentTarget === event.target) {
    context.setState({
      statusModalStatuses: status,
    });
  }
};