import React, { memo } from 'react'
import classNames from 'classnames'

import Styles from './index.module.css'

function App(): React.ReactElement {
  return (
    <main className={classNames(Styles.main)}>
      <div>
        Hello world, this React APP is created by{' '}
        <code className={classNames(Styles.mainCode)}>npx create-react-app with template --choffee</code>.
      </div>
      <div>
        Author: Charlie (Tzu Yin) |{' '}
        <a href="https://github.com/tzynwang" target="_blank" className={Styles.mainAnchor}>
          GitHub
        </a>{' '}
        |{' '}
        <a href="https://tzynwang.github.io/" target="_blank" className={Styles.mainAnchor}>
          Blog
        </a>{' '}
        |{' '}
        <a href="https://www.npmjs.com/~tzyn.wang" target="_blank" className={Styles.mainAnchor}>
          npm Packages
        </a>
      </div>
    </main>
  )
}

export default memo(App)
