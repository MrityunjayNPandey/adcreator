const initialState = {
  projectName: "",
  description: "",
  selectedCategory: "random", // Set the default value to "curated"
  photos: [],
  selectedPhoto: null,
  uploadedPhoto: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROJECT_NAME":
      return {
        ...state,
        projectName: action.payload,
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "SET_SELECTED_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case "SET_PHOTOS":
      return {
        ...state,
        photos: action.payload,
      };
    case "SET_SELECTED_PHOTO":
      return {
        ...state,
        selectedPhoto: action.payload,
      };
    case "SET_FINAL_PHOTO":
      return {
        ...state,
        finalPhoto: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
