import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { Activity } from "../types"
import { useActivity } from '../store/store'

export default function ActivityList() {

  const { activities, deleteActivity, editActivity } = useActivity()

  const bgCategory = (category: Activity['category']) => {
    return category === 'Comida' ? 'bg-amber-500' : 'bg-lime-500'
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 max-h-[470px] overflow-y-auto pl-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex justify-between items-center bg-white shadow-md rounded-md p-3 mx-2 relative">
            <div>
              <p
                className={`${bgCategory(activity.category)} block absolute -left-5 top-2 p-1 w-25 text-center text-white font-medium border border-slate-300`}
              >
                {activity.category}
              </p>
              <p className="font-bold pt-7 text-xl">{activity.name}</p>
              <p className="text-lime-500 text-4xl font-bold">{activity.calories} Calorias</p>
            </div>
            <div className="space-y-4">
              <PencilSquareIcon
                className="size-8 cursor-pointer"
                onClick={() => editActivity(activity.id)}
              />

              <XCircleIcon
                className="size-8 cursor-pointer text-red-500"
                onClick={() => deleteActivity(activity.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
