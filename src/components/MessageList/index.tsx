import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { io } from 'socket.io-client'

import styles from './styles.module.scss'
import logoImg from '../../assets/logo.svg'

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const messagesQueue: Message[] = []

const socket = io('https://nlw-heat-backend.herokuapp.com')

socket.on('new_message', newMessage => {
  messagesQueue.push(newMessage)
})

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    api.get<Message[]>('messages/last3').then(response => {
      setMessages(response.data)
    })
  }, [])

  useEffect(() => {
    setInterval(() => {
      if(messagesQueue.length > 0) {
        setMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ].filter(Boolean))
        
        messagesQueue.shift()
      }
    }, 3000)
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map(message => {
          return (
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>
                {message.text}
              </p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <button>
                  {message.user.name}
                  <div className={styles.dropdownContent}>
                    <a href='#'>Ver perfil</a>
                  </div>
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}