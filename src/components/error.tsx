import { useNavigate } from 'solid-start'

export default function Error(message: string, redirect: string) {
  const navigate = useNavigate()
  const dialog = (
    <dialog class='panel'>
      <h1>Error:</h1>
      {message}
      <button onclick={() => dialog.close()}>Ok</button>
    </dialog>
  ) as HTMLDialogElement

  dialog.addEventListener('close', () => {
    navigate(redirect)
  })

  return dialog
}
