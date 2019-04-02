const page = (
    state = {
      pageName: 'Home'
    }, action) => {
  switch (action.type) {
    case 'SET_PAGE_NAME':
      return {
        ...state,
        pageName: action.pageName
      };
    default:
      return state;
  }
};

export default page;
