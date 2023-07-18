export const setProjectName = (name) => ({
  type: "SET_PROJECT_NAME",
  payload: name,
});

export const setPhotos = (photos) => ({
  type: "SET_PHOTOS",
  payload: photos,
});

export const setSelectedPhoto = (photo) => ({
  type: "SET_SELECTED_PHOTO",
  payload: photo,
});

export const setFinalPhoto = (photo) => ({
  type: "SET_FINAL_PHOTO",
  payload: photo,
});
