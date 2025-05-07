import { useMemo } from 'react'
import { categoriesData } from "../data/categoriesData"
import { useActivity } from '../store/store';

export default function Form() {

  const {activity, addActivity, changeActivityForm} = useActivity()
   
  const saveButton = useMemo(
    () => activity.category === 'Comida' ? 'Guardar Comida' : 'Guardar Ejercicio', [activity.category]
  )
  
  // useEffect(() => {
  //   if(idEditing) {
  //     SetActivity(activities.find(item => item.id === idEditing) ?? initialActivity)
  //   }
  // },[idEditing])
  
  return (
    <form 
      className="bg-white p-5 rounded-md shadow-lg space-y-7"
      onSubmit={addActivity}
    >
      <h2 className="text-center text-4xl font-medium my-4">¿Qué has hecho hoy?</h2>

      <div className="flex flex-col">
        <label htmlFor="category" className="text-[18px] font-bold mb-2">Categorias:</label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-md"
          value={activity.category}
          onChange={changeActivityForm}
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
          value={activity.name}
          onChange={changeActivityForm}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="calories" className="text-[18px] font-bold mb-2">Calorias:</label>
        <input 
          type="number" 
          id="calories"
          className="border border-slate-300 p-2 rounded-md"
          value={activity.calories}
          onChange={changeActivityForm}
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
