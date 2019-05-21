export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp) => {
      return firestore.collection('users').doc(resp.user.uid)
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCES'})
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err})
    })
  }
}