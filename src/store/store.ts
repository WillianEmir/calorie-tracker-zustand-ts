import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid'
import { Activity } from "../types";
import { ChangeEvent, FormEvent } from "react";

type ActivityState = {
  activities: Activity[]
  activity: Activity
  idEditing: Activity['id']
  changeActivityForm: (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void
  addActivity: (e: FormEvent<HTMLFormElement>) => void
  deleteActivity: (id: Activity['id']) => void
  editActivity: (id: Activity['id']) => void
  restarApp: () => void
}

export const useActivity = create<ActivityState>()(persist((set, get) => ({
  activities: [],
  activity: { id: uuidv4(), category: 'Comida', name: '', calories: 0 },
  idEditing: '',
  changeActivityForm: (e) => {
    set((state) => ({
      activity: {
        ...state.activity,
        [e.target.id]: e.target.id === 'calories' ? +e.target.value : e.target.value
      }
    }))
  },
  addActivity: (e) => {

    e.preventDefault();
    
    if(get().activity.name === '' || get().activity.calories <= 0 || get().activity.category === '') {
      alert('Todos los campos son obligatorios')
      return
    }

    let newActivities: Activity[] = []

    if (get().idEditing) {
      newActivities = get().activities.map(item => item.id === get().activity.id ? { ...get().activity } : item)
    } else {
      newActivities = [...get().activities, get().activity]
    }

    console.log(get().activity); 

    set(() => ({
      activities: newActivities,
      idEditing: '',
      activity: { id: uuidv4(), category: 'Comida', name: '', calories: 0 }
    }))
  },
  deleteActivity: (id) => {
    set((state) => ({
      activities: state.activities.filter(item => item.id !== id)
    }))
  },
  editActivity: (id) => {
    set((state) => ({
      idEditing: id,
      activity: state.activities.find(item => item.id === id) 
    }))
  },
  restarApp: () => {
    set(() => ({
      activities: [],
      idEditing: '',
      activity: { id: uuidv4(), category: 'Comida', name: '', calories: 0 }
    }))
  }
}), {
  name: 'activity-storage'
}))