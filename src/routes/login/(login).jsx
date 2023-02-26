import { onMount } from 'solid-js'

export default function Login() {
  const discord = <a class='button'>Sign in with Discord</a>
  const steam = <a class='button'>Sign in with Steam</a>

  onMount(() => {
    discord.href = `https://discord.com/api/oauth2/authorize?client_id=1078192080364507246&redirect_uri=${encodeURIComponent(
      window.location.origin
    )}&response_type=code&scope=identify`
  })

  return (
    <main>
      <div class='panel'>
        <h1>Login</h1>
        {discord}
        {steam}
      </div>
    </main>
  )
}
