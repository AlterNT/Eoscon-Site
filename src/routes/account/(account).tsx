import { createEffect, createSignal, untrack } from 'solid-js'
import { Panel } from '~/components/panel/panel'
import { Tabs } from '~/components/tabs/tabs'
import { useSession } from '~/util/auth'

export default function Account() {
  const [tabs, setTabs] = createSignal([
    { id: 'test', name: 'name', content: <>a</> },
    { id: 'two', name: 'two', content: <>b</> },
  ])

  const session = useSession()

  createEffect(() => {
    const s = session()
    if (s) {
      const old = untrack(tabs)

      setTabs([
        ...old,
        {
          id: 'test3',
          name: s.user.name!,
          content: <>{s.user.isAdmin! + ''}</>,
        },
      ])
    }
  })

  return (
    <main>
      <Panel title='Account'>
        <Tabs tabs={tabs} initialTabId='test' />
      </Panel>
    </main>
  )
}
