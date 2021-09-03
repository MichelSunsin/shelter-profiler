import { useEffect, useRef, useState } from 'react'

import Table, { TableSize } from 'components/Table'

import { Person } from 'types/Person'
import { ObjectId } from 'mongoose'
import type { NextPage } from 'next'

import styles from 'styles/Index.module.scss'

const Home: NextPage = () => {
  const [people, setPeople] = useState<Person[]>([])
  const [lastFiveAdded, setLastFiveAdded] = useState<Person[]>([])
  const countRef = useRef<{ infected?: number; healthy?: number }>({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetchPeople()
    fetchLastFiveAdded()
  }

  const fetchPeople = async () => {
    const response = await fetch('/api/people/')
    const json = await response.json()
    setPeople(json.data)
  }

  const fetchLastFiveAdded = async () => {
    const response = await fetch('/api/people/lastFiveAdded')
    const json = await response.json()
    setLastFiveAdded(json.data)
  }

  const updateInfectedStatus = async (
    id: ObjectId,
    status: Boolean
  ): Promise<void> => {
    await fetch(`/api/people/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isInfected: !status }),
    })

    fetchPeople()
    fetchLastFiveAdded()
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainTableContainer}>
        <Table
          title={'Registered people'}
          people={people}
          size={TableSize.Default}
          fetchData={fetchData}
          showInfectedPercentage
        />
      </div>
      <div>
        <Table
          title={'Last five added'}
          people={lastFiveAdded}
          size={TableSize.Dense}
          fetchData={fetchData}
        />
      </div>
    </div>
  )
}

export default Home
