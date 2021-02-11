import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

// refs & signup outside of exported function
// they don't need to be re-created every time we invoke useSignup
const error = ref(null);
const isPending = ref(false)

const login = async (email, password) => {
  error.value = null
  isPending.value = true

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    error.value = null
    isPending.value = false
    return res
  } catch(err) {
      error.value = 'Incorrect login credentials'
      isPending.value = false
  }

}

const useLogin = () => {
  return { error, login, isPending }
}

export default useLogin