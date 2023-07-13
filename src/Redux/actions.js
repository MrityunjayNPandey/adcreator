export const setProjectName = (name) => ({
  type: "SET_PROJECT_NAME",
  payload: name,
});

export const setDescription = (description) => ({
  type: "SET_DESCRIPTION",
  payload: description,
});

export const setSelectedCategory = (category) => ({
  type: "SET_SELECTED_CATEGORY",
  payload: category,
});

export const setPhotos = (photos) => ({
  type: "SET_PHOTOS",
  payload: photos,
});

export const setSelectedPhoto = (photo) => ({
  type: "SET_SELECTED_PHOTO",
  payload: photo,
});