import React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp, Loader } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from '../app/store'
import { fetchUniversities, clearUniversities } from "../features/universities/universitiesSlice"

interface SelectUniversityProps {
  label: string
  disabled?: boolean
  onObjectSelected?: (item: string) => void;
}

export const SelectUniversity = (props: SelectUniversityProps) => {

  const { onObjectSelected } = props
  
  const [query, setQuery] = useState("")
  const dispatch = useDispatch<AppDispatch>()
  const [showDropIcon, setShowDropIcon] = useState(true)
  const { universities, loading, error } = useSelector((state: RootState) => state.universities)

  const handleDropIcons = () => {
    if (query.length !== 0) setShowDropIcon(!showDropIcon)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim() === "" || value.length < 3) {
      dispatch(clearUniversities())
      setShowDropIcon(true)
    } else {
      dispatch(fetchUniversities(value))
      setShowDropIcon(false)
    }

    if (onObjectSelected) onObjectSelected(value) // * Invoke callback
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="relative w-96">
        <label className="text-gray-700 float-left font-semibold"> {props.label} </label>
      </div>
      <div className="relative w-96 shadow-lg">
          <input
            type="text"
            value={query}
            disabled={props.disabled}
            onChange={handleInputChange}
            className={`
              w-full p-2 pr-8 border text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-gray-500
              ${error ? "border-red-500" : "border-gray-300"}
            `}
            placeholder="Type to search..."
          />
          {/* Dropdown Icon */}
          {
            showDropIcon ?
              <div className="absolute right-5 top-3 flex items-center z-10 cursor-pointer border-l-2 border-gray-500" onClick={handleDropIcons}>
                <ChevronDown className="w-5 h-5 ml-3 text-gray-500 hover:text-gray-900" />
              </div>
              :
              <div className="absolute right-5 top-3 flex items-center z-10 cursor-pointer border-l-2 border-gray-500" onClick={handleDropIcons}>
                <ChevronUp className="w-5 h-5 ml-3 text-gray-500 hover:text-gray-900" />
              </div>
          }
  
          <div className="relative">
            {/* No data to show */}
            {universities.length === 0 && (query.length >= 3) ? (
              <p className="text-sm text-gray-400 mt-1">Nessuna università trovata</p>
            ) : null}
            {/* Error message feedback */}
            {error && (
              <p className="text-sm text-red-500 mt-1">Un erro ha ocorrito</p>
            )}
          </div>
  
          {universities.length > 0 && !loading && !showDropIcon ? (
            <ul
              className={`max-h-70 overflow-auto border-gray-700 mt-2 rounded shadow-lg transition-all duration-300 ease-in-out transform ${
                universities.length > 0 && !loading && !showDropIcon
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            >
              {universities.slice(0, 5).map((uni, index) => (
                <li key={index} className="p-2 hover:bg-black-100 text-left text-gray-500">
                  <strong>{uni.name}</strong>
                  <br />
                  {uni.country}, <a href={uni.web_pages[0]} target="_blank" rel="noopener noreferrer">{uni.web_pages[0]}</a>
                </li>
              ))}
            </ul>
          ) : loading && (
            <div className="flex justify-center items-center mt-4 m-5">
              <Loader className="animate-spin text-gray-700" size={24} />
            </div>
          )}
      </div>
    </div>
  )
}
