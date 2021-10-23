import { FormEvent, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/Auth'
import { api } from '../../services/api'
import styles from './styles.module.scss'

export function SendMessageForm () {
  const { user, signOut } = useContext(AuthContext)
  const [message, setMessage] = useState('')

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault()

    if (!message.trim()) {
      toast.error('Insira algo na mensagem para enviar')
      return
    }

    try {
      await api.post('messages', { message })

      toast.success('Mensagem enviada!')
    } catch (err: any) {
      toast.error(`Mensagem não enviada, erro: ${err.message}`)
    } finally {
      setMessage('')
    }
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>
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

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa pro evento?"
          onChange={event => setMessage(event.target.value)}
          value={message}
        />

        <button type="submit" >Enviar mensagem</button>
      </form>
    </div>
  )
}