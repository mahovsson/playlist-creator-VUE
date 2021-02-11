import { projectFirestore } from '../firebase/config'
import { ref, watchEffect } from 'vue'

const getCollection = (collection, query) => {

  const error = ref(null)
  const documents = ref(null)

  // register the firestore collection reference
  let collectionRef = projectFirestore.collection(collection)
  .orderBy('createdAt')

  if (query) {
    collectionRef = collectionRef.where(...query)
  }


  const unsub = collectionRef.onSnapshot(snap => {

    let results = []


    snap.docs.forEach(doc => {
      // must wait for the server to create the timestamp & send it back. We do not want to edit data until it has done this
      doc.data().createdAt && results.push({ ...doc.data(), id: doc.id})
    })

    // update values
    documents.value = results
    error.value = null

  }, err => {
    documents.value = null
    error.value = 'could not fecth the data'
  })

  watchEffect((onInvalidate) => {
    // unsub from previous collection when wacther is stopped - component unmounted
    onInvalidate(() => unsub())
  })

  return { error, documents }

}

export default getCollection