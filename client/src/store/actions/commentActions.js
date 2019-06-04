export const createComment = comment => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    //console.log(getState().firebase);
    const uid = getState().firebase.auth.uid;
    const photoUrl = getState().firebase.auth.providerData[0].photoURL;
    const facebookId = getState().firebase.auth.providerData[0].uid;

    firestore.collection("comments").add({
      ...comment,
      authorUsername:
        profile.username == null
          ? getState().firebase.auth.displayName
          : profile.username,
      authorId: uid == null ? getState().firebase.auth.uid : uid,
      facebookId: photoUrl == null ? null : facebookId,
      createdAt: new Date()
    });
    dispatch({
      type: "CREATE_COMMENT",
      comment
    });
  };
};
