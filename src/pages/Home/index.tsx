import { useContext } from 'react'
import styles from './styles.module.scss'

import { Toaster } from 'react-hot-toast'
import { LoginBox } from '../../components/LoginBox'
import { MessageList } from '../../components/MessageList'
import { UserCard } from '../../components/UserCard'
import { AuthContext } from '../../contexts/Auth'

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
      { !!user ?
      <UserCard
        componentType='sendMessageForm'
        labelTitle='Mensagem'
        textareaPlaceholder='O que você espera do DoWhile?'
        buttonText='Enviar Mensagem'
      />
      : <LoginBox /> }
    </main>
  )
}