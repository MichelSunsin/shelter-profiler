import { useRouter } from 'next/router'
import { Button } from '@material-ui/core'
import { FaUserPlus } from 'react-icons/fa'

import styles from './Header.module.scss'
import { GiRaiseZombie } from 'react-icons/gi'

const Header = (): JSX.Element => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>Shelter profiler</h1>
        <GiRaiseZombie size={40} />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/')}
        >
          Dashboard
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/person')}
        >
          <FaUserPlus size={24} />
        </Button>
      </div>
    </div>
  )
}

export default Header
