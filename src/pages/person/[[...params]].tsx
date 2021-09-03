import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import {
  Paper,
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'

import { Person } from 'types/Person'

import styles from 'styles/Person.module.scss'

const defaultValues = {
  name: '',
  age: 0,
  bloodType: 'A+',
  skills: '',
  isInjured: false,
  isInfected: false,
  canWork: false,
  observation: '',
}

const PersonForm = (): JSX.Element => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
  })
  const [person, setPerson] = useState<Person>()

  const { params } = router.query

  useEffect(() => {
    if (params) {
      fetchPerson(params[0])
    } else {
      reset(defaultValues)
    }
  }, [params])

  useEffect(() => {
    reset(person)
  }, [person])

  const fetchPerson = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/people/${id}`)
      const json = await response.json()
      console.log(json.data)
      setPerson(json.data)
    } catch (err) {
      console.error(err)
    }
  }

  const deletePerson = async (): Promise<void> => {
    debugger
    try {
      const response = await fetch(`/api/people/${params[0]}`, {
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
        router.push('/')
      }
    } catch (err) {
      toast.error(err)
    }
  }

  const onSubmit = async (data: Person): Promise<void> => {
    try {
      const url = params ? `/api/people/${params[0]}` : '/api/people'
      const verb = params ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method: verb,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const json = await response.json()

      if (!json.success) {
        throw 'Error updating/creating person. Try again'
      }

      toast.success(`Person ${params ? 'updated' : 'created'} successfully`)
      router.push('/')
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <div className={styles.container}>
      <Paper elevation={3}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formControlContainer}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  className={styles.formControl}
                  size="small"
                  variant="outlined"
                  label="Name"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.name && (
              <span className={styles.error}>Name is required</span>
            )}
          </div>
          <div
            className={styles.formControlContainer}
            style={{ display: 'flex' }}
          >
            <div>
              <TextField
                className={styles.formControl}
                size="small"
                type="number"
                variant="outlined"
                label="Age"
                {...register('age', {
                  required: true,
                  validate: { positive: (v) => v > 0 },
                })}
              />
              {errors.age?.type === 'required' && (
                <span className={styles.error}>Age is required</span>
              )}
              {errors.age?.type === 'positive' && (
                <span className={styles.error}>Age needs to be positive</span>
              )}
            </div>
            <div>
              <FormControl
                variant="outlined"
                size="small"
                style={{ width: '100%' }}
              >
                <InputLabel>Blood type</InputLabel>
                <Controller
                  name="bloodType"
                  defaultValue="A+"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label="Blood type"
                      value={value}
                      defaultValue="A+"
                      onChange={onChange}
                    >
                      <MenuItem value={'A+'}>A+</MenuItem>
                      <MenuItem value={'A-'}>A-</MenuItem>
                      <MenuItem value={'B+'}>B+</MenuItem>
                      <MenuItem value={'B-'}>B-</MenuItem>
                      <MenuItem value={'O+'}>O+</MenuItem>
                      <MenuItem value={'O-'}>O-</MenuItem>
                      <MenuItem value={'AB+'}>AB+</MenuItem>
                      <MenuItem value={'AB-'}>AB-</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </div>
          </div>
          <div className={styles.formControlContainer}>
            <Controller
              name="skills"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  className={styles.formControl}
                  size="small"
                  variant="outlined"
                  label="Skills"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.skills && (
              <span className={styles.error}>Skills is required</span>
            )}
          </div>
          <div>
            <FormGroup>
              <Controller
                name="isInjured"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    control={<Checkbox checked={value} onChange={onChange} />}
                    label="Is injured?"
                  />
                )}
              />
              <Controller
                name="isInfected"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    control={<Checkbox checked={value} onChange={onChange} />}
                    label="Is infected?"
                  />
                )}
              />
              <Controller
                name="canWork"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    control={<Checkbox checked={value} onChange={onChange} />}
                    label="Can work?"
                  />
                )}
              />
            </FormGroup>
          </div>
          <div className={styles.formControlContainer}>
            <Controller
              name="observation"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  className={styles.formControl}
                  size="small"
                  variant="outlined"
                  label="Observation"
                  multiline
                  maxRows={4}
                  inputProps={{ maxLength: 244 }}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button color="primary" variant="contained" type="submit">
              {params ? 'Update' : 'Register'}
            </Button>
            {params && (
              <Button
                color="secondary"
                variant="outlined"
                type="button"
                onClick={() => deletePerson()}
              >
                Delete
              </Button>
            )}
          </div>
        </form>
      </Paper>
    </div>
  )
}

export default PersonForm
