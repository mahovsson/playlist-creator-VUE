<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/playlist-music.png">
      <h1><router-link :to="{ name: 'Home'}">Playlist Creator</router-link></h1>
      <div class="links">
        <div v-if="user">
          <router-link class="btn" :to="{ name: 'CreatePlaylist'}">Create Playlist</router-link>
          <router-link class="btn" :to="{ name: 'UserPlaylist'}">My Playlist</router-link>
          <span>Hi there, {{ user.displayName }}</span>
          <button @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Sign up</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Log in</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'

export default {
  setup () {

      const { logout, error } = useLogout()
      const { user } = getUser()
      const router = useRouter()

      const handleLogout = async () => {
        await logout()
        router.push({ name: 'Login'})
        console.log('you have been logged out')
      }

    return { handleLogout, user }
  }
}
</script>

<style scoped>
  .navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
  }
  nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  nav img {
    max-height: 150px;
  }
  nav h1 {
    margin-left: 20px;
  }
  nav .links {
    margin-left: auto;
  }
  nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
  }
  span {
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
  }
</style>
