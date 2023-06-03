import { useNavigate } from 'solid-start'

export default function Error(message, redirect) {
  const navigate = useNavigate()
  const dialog = (
    <dialog class='panel'>
      <h1>Error:</h1>
      {message}
      <button onclick={dialog.close()}>Ok</button>
    </dialog>
  )

  dialog.addEventListener('close', () => {
    navigate(redirect)
  })

  return dialog
}
