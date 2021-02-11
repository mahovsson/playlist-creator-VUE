import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

// refs
const error = ref(null);
const isPending = ref(false)

//logout function
const logout = async () => {
  error.value = null
  isPending.value = true

  try {
    await projectAuth.signOut()
    isPending.value = false
  }
  catch(err) {
    console.log(err.message)
    error.value = err.value
    isPending.value = false
  }
}

const useLogout = () => {
  return { logout, error, isPending }
}

export default useLogout

