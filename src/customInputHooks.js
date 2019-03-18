import  { useState } from "react"
export function useInput(initial){
     const [value, setValue] = useState(initial)
     function handleInputChange(e){
         setValue(e.target.value)
     }
     return {
         value,
         onChange:handleInputChange
     }
}