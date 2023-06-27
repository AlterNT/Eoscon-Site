import { ParentComponent } from 'solid-js'
import './panel.scss'

type PanelProps = {
  title?: string
}

export const Panel: ParentComponent<PanelProps> = ({ title, children }) => {
  return (
    <div class='panel'>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  )
}
