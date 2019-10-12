export const stateModalAddCartridges = (event, context, status) => {
  if (event.currentTarget === event.target) {
    context.setState({
      statusModalAddCartridges: status,
    });
  }
};