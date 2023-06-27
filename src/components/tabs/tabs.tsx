import {
  Accessor,
  Component,
  For,
  JSX,
  Match,
  Switch,
  createSignal,
} from 'solid-js'

export type Tab = {
  id: string
  name: string
  content: JSX.Element
}

type TabsProps = {
  tabs: Accessor<Tab[]>
  initialTabId: string
}

export const Tabs: Component<TabsProps> = ({ tabs, initialTabId }) => {
  const [currentTab, setTab] = createSignal(initialTabId)

  return (
    <div>
      <div>
        <ul>
          <For each={tabs()}>
            {(tab) => (
              <li>
                <button onClick={() => setTab(tab.id)}>{tab.name}</button>
              </li>
            )}
          </For>
        </ul>
      </div>
      <div>
        <Switch>
          <For each={tabs()}>
            {(tab) => {
              return <Match when={tab.id == currentTab()}>{tab.content}</Match>
            }}
          </For>
        </Switch>
      </div>
    </div>
  )
}
