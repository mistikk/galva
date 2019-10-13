const initialState = {
  companyId: {},
  error: null,
};

export default (state = initialState, {type, data, error}) => {
  switch (type) {
    case 'update_user':
      return {
        companyId: data,
        error: null,
      };
    default:
      return state;
  }
};
