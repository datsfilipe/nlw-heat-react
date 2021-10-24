import { useContext, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { api } from '../../services/api'
import { Message } from '../../components/MessageList'
import { BiArrowBack } from 'react-icons/bi'
import { Scrollbars } from 'react-custom-scrollbars'
import { AuthContext } from '../../contexts/Auth'

import styles from '../Profile/styles.module.scss'
import { UserCard } from '../../components/UserCard'
import logoImg from '../../assets/logo.svg'

export type User = {
  id: string;
  name: string;
  github_id: string;
  description: string;
  avatar_url: string;
  login: string;
  messages: Message[];
}

export function Profile() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userDescription, setUserDescription] = useState<string>('')
  const { login }: any = useParams()
  const history = useHistory();
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get<User>(`/profile/${login}`).then(response => {
      setCurrentUser(response.data)
    })
  }, [])

  function handleReturnPage () {
    history.push('/home');
  }

  return (
    <>
      { currentUser && user ? 
        <>
          <header className={styles.header}>
            <button onClick={handleReturnPage}>
              <BiArrowBack size="24" />
            </button>
            <img src={logoImg} alt="DoWhile" />
          </header>
          <main className={styles.container}>
            <div className={styles.userCardContainer}>
              <UserCard
                componentType='profileCard'
                labelTitle='Descrição'
                textareaPlaceholder='Fale um pouco sobre você !'
                buttonText='Atualizar descrição'
                currentUser={currentUser}
              />
            </div>
            { user.admin ? <Scrollbars style={{ width: 440, height: 600, borderRadius: 15 }}>
              <ul className={styles.messages}>
                <h2 className={styles.messagesTitle}>Mensagens</h2>
                { currentUser.messages.map( message => {
                  return (
                    <li key={message.id} className={styles.message}>
                      {message.text}
                      <div className={styles.messageCreatedTime}>
                        Created at: {message.created_at}
                      </div>
                    </li>
                  )
                }) }
              </ul>
            </Scrollbars> : '' }
          </main>
        </>
      : ''}
    </>
  )
}