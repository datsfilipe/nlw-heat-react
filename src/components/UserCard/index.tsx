import { FormEvent, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/Auth'
import { User } from '../../pages/Profile'
import { api } from '../../services/api'
import styles from './styles.module.scss'

type Props = {
  componentType: 'sendMessageForm' | 'profileCard',
  labelTitle: string;
  textareaPlaceholder: string;
  buttonText: string;
  currentUser?: User;
}

export function UserCard ({
  componentType,
  labelTitle,
  textareaPlaceholder,
  currentUser,
  buttonText }: Props) {
  const { user, signOut } = useContext(AuthContext)
  const [textareaValue, setTextareaValue] = useState('')
  const [validate, setValidate] = useState<boolean>(false)

  async function handleSendData(event: FormEvent) {
    event.preventDefault()

    if (componentType === 'sendMessageForm') {
      if (!textareaValue.trim()) {
        toast.error('Insira um texto válido')
        return
      }
  
      try {
        const message = textareaValue

        await api.post('messages', { message })
  
        toast.success('Mensagem enviada!')
      } catch (err: any) {
        toast.error(`Mensagem não enviada, erro: ${err.message}`)
      } finally {
        setTextareaValue('')
      }
    } else {
      try {
        const description = textareaValue

        await api.post('profile/description', { description })

        toast.success('Descrição atualizada!')
      } catch (err: any) {
        toast.error(`Descrição não atualizada, erro: ${err.message}`)
      }
    }
  }

  useEffect(() => {

    function validateShowForm() {
      if (currentUser) {
        if (user?.id === currentUser.id && componentType === 'profileCard') {
          setValidate(true)
        } else if (componentType === 'profileCard' && user?.id !== currentUser.id) {
          setValidate(false)
        } else {
          setValidate(false)
        }
      }
    }

    validateShowForm()
  })

  return (
    <div className={styles.userCardWrapper}>
      { componentType === 'sendMessageForm' ?
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>
      : ''}
      { componentType === 'sendMessageForm' ?
        <header className={styles.userInformation}>
          <div className={styles.userImage}>
            <img src={user?.avatar_url} alt={user?.name} />
          </div>
          <strong className={styles.userName}>{user?.name}</strong>
          <span className={styles.userGithub}>
            <VscGithubInverted size="16" />
            <a href={`https://github.com/${user?.login}`}>
              {user?.login}
            </a>
          </span>
        </header>
        :
        <header className={styles.userInformation}>
          <div className={styles.userImage}>
            <img src={currentUser?.avatar_url} alt={currentUser?.name} />
          </div>
          <strong className={styles.userName}>{currentUser?.name}</strong>
          <span className={styles.userGithub}>
            <VscGithubInverted size="16" />
            <a href={`https://github.com/${currentUser?.login}`}>
              {currentUser?.login}
            </a>
          </span>
          { validate ? <div className={styles.userAreaDescription}>
            <h1 className={styles.userAreaDescriptionTitle}>DESCRIÇÃO:</h1> {currentUser?.description}
          </div> : '' }
        </header>
      }

      { validate || componentType === 'sendMessageForm' ? 
      <form onSubmit={handleSendData} className={styles.userCard}>
        <label htmlFor="textarea">{labelTitle}</label>
        <textarea
          name="textarea"
          id="textarea"
          placeholder={`${textareaPlaceholder}`}
          onChange={event => setTextareaValue(event.target.value)}
          value={textareaValue}
        />

        <button type="submit" >{`${buttonText}`}</button>
      </form> 
      : 
      <div className={styles.userDescription}>
        <h2 className={styles.userDescriptionTitle}>Descrição</h2>
        <span className={styles.userDescriptionContent}>{
          currentUser?.description ? currentUser.description : 'Nenhuma descrição fornecida ainda...'
        }</span>
      </div>
      }
      
    </div>
  )
}