import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

// declare the connection & refs inside the function
// because the collection state is not global (like a user)
// different collections may be used at once this way


const useCollection = (collection) => {

  let error = ref(null)
  const isPending = ref(false)

  const addDoc = async (doc) => {
    error.value = null
    isPending.value = true

    try {
      const res = await projectFirestore.collection(collection).add(doc)
      isPending.value = false
      return res
    }
    catch (err) {
      error.value = 'could not send the message'
      isPending.value = false
    }
  }
  return { error, addDoc, isPending }
}

export default useCollection