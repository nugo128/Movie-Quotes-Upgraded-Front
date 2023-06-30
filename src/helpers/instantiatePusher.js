import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default function instantiatePusher() {
  window.Pusher = Pusher
  window.Echo = new Echo({
    authEndpoint: `${import.meta.env.VITE_API_BASE_URL}broadcasting/auth`,
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_KEY,
    forceTLS: true,
    cluster: ['eu'],
    auth: {
      headers: {
        withCredentials: true
      }
    }
  })

  return true
}
