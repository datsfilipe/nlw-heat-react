import { useContext } from 'react'
import styles from './styles.module.scss'

import { Toaster } from 'react-hot-toast'
import { LoginBox } from '../components/LoginBox'
import { MessageList } from '../components/MessageList'
import { SendMessageForm } from '../components/SendMessageForm'
import { AuthContext } from '../contexts/Auth'

export function Home() {
  const { user } = useContext(AuthContext)

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#29292e',
            color: '#e1e1e6',
            fontSize: '1.5rem'
          }
        }}
      />
      <MessageList />
      { !!user ? <SendMessageForm /> : <LoginBox /> }
    </main>
  )
}