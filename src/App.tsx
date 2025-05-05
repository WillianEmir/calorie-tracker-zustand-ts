import { useMemo, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import Form from "./components/Form"
import { Activity } from "./types"
import ActivityList from "./components/ActivityList"
import SummaryTag from "./components/SummaryTag"

const initialActivity: Activity = {
  id: uuidv4(),
  category: '',
  name: '',
  calories: 0
}

function App() {

  const [Activity, SetActivity] = useState<Activity>(initialActivity);
  const [activities, setActivities] = useState<Activity[]>([])

  const consumedCalories = useMemo(() => {
    return activities.reduce(
      (total, item) => {
        return total + (item.category === 'Comida' ? item.calories : 0)
      }, 0
    )
  }, [activities])

  const burnedCalories = useMemo(() => {
    return activities.reduce(
      (total, item) => {
        return total + (item.category === 'Ejercicio' ? item.calories : 0)
      }, 0
    )
  }, [activities])

  const differenceCalories = useMemo(() => {
    return consumedCalories - burnedCalories
  }, [activities])

  const restarApp = () => {
    setActivities([])
  }

  return (
    <>
      <header className="bg-lime-700">
        <div className="container mx-auto flex justify-between items-center max-sm:flex-col max-sm:text-center max-sm:py-2.5">
          <h1 className="text-white text-4xl font-semibold py-4 uppercase">
            Contador de Calorias
          </h1>

          <button 
            className="text-white text-xl font-semibold bg-slate-600 p-2.5 cursor-pointer rounded-md hover:bg-slate-700"
            onClick={restarApp}
          >
            Reiniciar App
          </button>
        </div>


      </header>

      <main>
        <section className="bg-lime-500 p-10">
          <div className="container mx-auto">
            <Form
              Activity={Activity}
              SetActivity={SetActivity}
              activities={activities}
              setActivities={setActivities}
              initialActivity={initialActivity}
            />
          </div>
        </section>

        <section className="bg-neutral-800">
          <div className="container mx-auto">
            <h2 className="text-white text-center text-2xl pt-5 font-semibold">Resumen de Calorias</h2>
            <div className="flex max-sm:flex-col justify-between items-center">
              <SummaryTag
                summary={consumedCalories}
                text="Consumidas"
              />
              <SummaryTag
                summary={differenceCalories}
                text="Diferencia"
              />
              <SummaryTag
                summary={burnedCalories}
                text="Quemadas"
              />
            </div>
          </div>
        </section>

        <section className="bg-gray-50">
          <div className="container mx-auto py-10">
            <h2 className="text-4xl text-center font-medium">Comidas y Actividades</h2>

            {activities.length > 0 ? (
              <ActivityList
                activities={activities}
                SetActivity={SetActivity}
                setActivities={setActivities}
              />
            ) : (
              <p className="text-center py-5">No hay actividades aún</p>
            )}

          </div>
        </section>
      </main>

      <footer className="mt-auto bg-lime-700">
        <div className="container mx-auto">
          <p className="text-[17px] text-gray-200 text-center py-2.5">Este proyecto está bajo Licencia MIT © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  )
}

export default App
