import { projectFirestore } from '../firebase/config'
import { ref, watchEffect } from 'vue'

const getDocument = (collection, id) => {

  const error = ref(null)
  const document = ref(null)

  // register the firestore collection reference
  let documentRef = projectFirestore.collection(collection).doc(id)

  const unsub = documentRef.onSnapshot(doc => {
    if(doc.data()){
      document.value = { ...doc.data(), id: doc.id }
      error.value = null
    } else {
      error.value = 'that document does not exist'
    }

  }, err => {
    error.value = 'could not fecth the document'
  })

  watchEffect((onInvalidate) => {
    // unsub from previous collection when wacther is stopped - component unmounted
    onInvalidate(() => unsub())
  })

  return { error, document }

}

export default getDocument