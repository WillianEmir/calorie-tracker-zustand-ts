import { useMemo } from "react"
import { useActivity } from "../store/store"
import SummaryTag from "./SummaryTag"
import ActivityList from "./ActivityList"
import Form from "./Form"

export default function Main() {

  const { activities } = useActivity()

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

  return (
    <main>
      <section className="bg-lime-500">
        <div className="container grid md:grid-cols-2 max-md:space-y-5 max-sm:px-2 mx-auto py-7">
          <div>
            <Form />
          </div>

          <div>

            {activities.length > 0 ? (
              <ActivityList />
            ) : (
              <p className="text-center text-2xl text-white font-medium py-5">No hay actividades aún</p>
            )}

          </div>
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

      </section>
    </main>
  )
}
