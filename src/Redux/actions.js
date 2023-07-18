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

export const setFinalPhoto = (photo) => ({
  type: "SET_FINAL_PHOTO",
  payload: photo,
});
