'use client'
import ClipLoader from 'react-spinners/ClipLoader'

const styleOverride = {
  display: 'block',
  margin: '100px auto',
}

const Loading: React.FC = () => {
  return (
    <ClipLoader
      color="#3b82f6"
      cssOverride={styleOverride}
      size={150}
      aria-label="Loading"
    />
  )
}

export default Loading
