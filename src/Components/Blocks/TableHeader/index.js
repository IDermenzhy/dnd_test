import React from 'react'
import styles from './styles.scss'

export default function TableHeader({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map(e => (
          <th className={styles.cell} key={e.Header}>
            {e.Header}
          </th>
        ))}
      </tr>
    </thead>
  )
}
