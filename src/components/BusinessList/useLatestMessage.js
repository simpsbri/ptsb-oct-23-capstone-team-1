import { useEffect, useState } from 'react'

function useLatestMessage(busMessages, businessId) {
  const [latestMessage, setLatestMessage] = useState(null)

  useEffect(() => {
    if (busMessages && busMessages.length > 0) {
      const businessMessages = busMessages.filter(
        (message) => message.businessId === businessId,
      )

      if (businessMessages.length > 0) {
        businessMessages.sort((a, b) => {
          const dateA = Date.parse(a.createdAt)
          const dateB = Date.parse(b.createdAt)

          return dateB - dateA
        })

        setLatestMessage(businessMessages[0])
      } else {
        setLatestMessage(null)
      }
    } else {
      setLatestMessage(null)
    }
  }, [busMessages, businessId])

  return latestMessage
}

export { useLatestMessage }
