import { ChangeEvent, Dispatch, SetStateAction, FormEvent, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { categoriesData } from "../data/categoriesData"
import { Activity } from '../types';

type FormProps = {
  Activity: Activity,
  SetActivity: Dispatch<SetStateAction<Activity>>,
  activities: Activity[],
  setActivities: Dispatch<SetStateAction<Activity[]>>,
  initialActivity: Activity
}

export default function Form({Activity, SetActivity, activities, setActivities, initialActivity} : FormProps) {

  const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    SetActivity({
      ...Activity,
      [e.target.id]: e.target.id === 'calories' ? +e.target.value : e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(Activity.name === '' || Activity.calories <= 0 || Activity.category === '') {
      alert('Todos los campos son obligatorios')
      return
    }

    const existActivity = activities.some(item => item.id === Activity.id)

    if(existActivity) {
      const newActivies = activities.map(item => item.id === Activity.id ? {...Activity} : item )
      setActivities(newActivies)
    } else {
      setActivities([...activities, Activity])
    }

    SetActivity({
      ...initialActivity,
      category: Activity.category,
      id: uuidv4()
    })
  }

  const saveButton = useMemo(() => {
    return Activity.category === 'Comida' ?
     'Guardar Comida' : 'Guardar Ejercicio'
  }, [Activity.category])

  return (
    <form 
      className="bg-white p-5 rounded-md shadow-lg space-y-7"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center text-4xl font-medium my-4">¿Qué has hecho hoy?</h2>

      <div className="flex flex-col">
        <label htmlFor="category" className="text-[18px] font-bold mb-2">Categorias:</label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-md"
          value={Activity.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione una Opción --</option>
          {categoriesData.map(option => (
            <option 
              key={option.id} 
              value={option.name}
            >
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="name" className="text-[18px] font-bold mb-2">Actividad:</label>
        <input 
          type="text" 
          id="name"
          className="border border-slate-300 p-2 rounded-md"
          value={Activity.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="calories" className="text-[18px] font-bold mb-2">Calorias:</label>
        <input 
          type="number" 
          id="calories"
          className="border border-slate-300 p-2 rounded-md"
          value={Activity.calories}
          onChange={handleChange}
          required
        />
      </div>

      <input
        type="submit"
        value={saveButton}
        className="text-white text-xl bg-neutral-700 w-full rounded-md py-2 uppercase font-bold cursor-pointer hover:bg-neutral-800 text-wrap"
      />
    </form>
  )
}
