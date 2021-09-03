import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from '@material-ui/core'
import { GiRaiseZombie, GiPerson } from 'react-icons/gi'
import { FaTrash, FaUserEdit } from 'react-icons/fa'

import { Person } from 'types/Person'
import { ObjectId } from 'mongoose'

import styles from './Table.module.scss'
import { toast } from 'react-toastify'

export enum TableSize {
  Default = 0,
  Dense = 1,
}

type TableProps = {
  title: string
  people: Person[]
  size: TableSize
  showInfectedPercentage?: boolean
  fetchData: () => void
}

const Table = ({
  title,
  people,
  size,
  showInfectedPercentage = false,
  fetchData,
}: TableProps): JSX.Element => {
  const router = useRouter()
  const [healthyNumber, setHealthyNumber] = useState(0)
  const [infectedNumber, setInfectedNumber] = useState(0)

  useEffect(() => {
    let infectedCount = people.filter((x) => x.isInfected).length
    let healthyCount = people.length - infectedCount

    setHealthyNumber(
      people.length !== 0 ? Math.floor((healthyCount / people.length) * 100) : 0
    )

    setInfectedNumber(
      people.length !== 0
        ? Math.floor((infectedCount / people.length) * 100)
        : 0
    )
  }, [people])

  const updateInfectedStatus = async (
    id: ObjectId,
    status: boolean
  ): Promise<void> => {
    try {
      const response = await fetch(`/api/people/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isInfected: !status }),
      })

      const json = await response.json()

      if (!json.success) {
        throw 'Error updating person. Try again'
      } else {
        toast.success(`Person updated successfully`)
        fetchData()
      }
    } catch (err) {
      toast.error(err)
    }
  }

  const deletePerson = async (id: ObjectId) => {
    try {
      const response = await fetch(`/api/people/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const json = await response.json()

      if (!json.success) {
        throw 'Error removing person. Try again'
      } else {
        toast.success(`Person removed successfully`)
        fetchData()
      }
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <h2>{title}</h2>
        {showInfectedPercentage && (
          <div className={styles.chipsContainer}>
            <Chip
              icon={<GiPerson size={20} />}
              color="primary"
              label={`${healthyNumber}% healthy`}
            />
            <Chip
              icon={<GiRaiseZombie size={20} />}
              variant="outlined"
              label={`${infectedNumber}% infected`}
            />
          </div>
        )}
      </div>
      <TableContainer component={Paper} style={{ maxHeight: '75vh' }}>
        <TableComponent stickyHeader={true}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              {size === TableSize.Default && (
                <>
                  <TableCell align="right">Age</TableCell>
                  <TableCell align="right">Blood type</TableCell>
                </>
              )}
              <TableCell align="center">Infection status</TableCell>
              {size === TableSize.Default && (
                <TableCell colSpan={2} align="center">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {people.length > 0 ? (
              people.map((row: Person) => (
                <TableRow key={`${row._id}`}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  {size === TableSize.Default && (
                    <>
                      <TableCell align="right">{row.age}</TableCell>
                      <TableCell align="right">{row.bloodType}</TableCell>
                    </>
                  )}
                  <TableCell align="center">
                    <div>
                      <IconButton
                        onClick={(event) => {
                          event.preventDefault()
                          updateInfectedStatus(row._id, row.isInfected)
                        }}
                      >
                        {row.isInfected ? <GiRaiseZombie /> : <GiPerson />}
                      </IconButton>
                    </div>
                  </TableCell>
                  {size === TableSize.Default && (
                    <>
                      <TableCell align="center">
                        <IconButton
                          onClick={(event) => {
                            event.preventDefault()
                            router.push(`/person/${row._id}`)
                          }}
                        >
                          <FaUserEdit />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={(event) => {
                            deletePerson(row._id)
                          }}
                        >
                          <FaTrash />
                        </IconButton>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>
                  <i>No records</i>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableComponent>
      </TableContainer>
    </div>
  )
}

export default Table
