import { useState } from "react"
import { ChevronDown, ChevronUp, Loader } from "lucide-react"

interface University {
  name: string
  country: string
  web_pages: string[]
}

interface SelectUniversityProps {
  label: string
  disabled?: boolean
  onObjectSelected?: void
}

export const SelectUniversity = (props: SelectUniversityProps) => {
  const [query, setQuery] = useState("")
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [showDropIcon, setShowDropIcon] = useState(true)
  const [universities, setUniversities] = useState<University[]>([])

  const handleDropIcons = () => {
    if (query.length !== 0) setShowDropIcon(!showDropIcon)
  }

  const fetchUniversities = async (search: string) => {

    // * Only load data if word's length is bigger than 3
    if (search.length < 3) {
      setShowDropIcon(true)
      setUniversities([])
      return
    }

    setLoading(true)

    try {
      
      const response = await fetch(
        `http://universities.hipolabs.com/search?name=${search}`
      )

      const data = await response.json()

      if (data.length) {
        setShowDropIcon(false)
        setUniversities(data)
      }

    } catch (error) {
      console.error("Error fetching universities:", error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-96">
        <label className="block text-gray-700 float-left font-semibold"> {props.label} </label>
        
        <div className="relative shadow-lg">
          <input
            type="text"
            value={query}
            disabled={props.disabled}
            onChange={(e) => {
              setQuery(e.target.value)
              fetchUniversities(e.target.value)
            }}
            className={`
              w-full p-2 pr-8 border text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-gray-500
              ${universities.length === 0 && query.length !== 0 || error !== null ? "border-red-500" : "border-gray-300"}
            `}
            placeholder="Type to search..."
          />
          {/* Dropdown Icon */}
          {
            showDropIcon ? 
              <div className="absolute inset-y-0 right-5 top-1/3 flex items-center z-10 cursor-pointer" onClick={handleDropIcons}>
                <ChevronDown className="w-5 h-5 text-gray-500 hover:text-gray-900" />
              </div>
            :
              <div className="absolute inset-y-0 right-5 top-1/3 flex items-center z-10 cursor-pointer" onClick={handleDropIcons}>
                <ChevronUp className="w-5 h-5 text-gray-500 hover:text-gray-900" />
              </div>
          }
          <div className="relative">
            {/* No data to show */}
            {universities.length === 0 && !error && query.length ? (
              <p className="text-sm text-red-500 mt-1">Nessuna università trovata</p>
            ) : null}
            {/* Error message feedback */}
            {error !== null && query.length && (
              <p className="text-sm text-red-500 mt-1">Un erro ha ocorrito</p>
            )}
          </div>
        </div>
        {universities.length > 0 && !loading && !showDropIcon ? (
          <ul className="border-gray-700 mt-2 rounded shadow-lg">
            {universities.slice(0, 5).map((uni, index) => (
              <li key={index} className="p-2 hover:bg-black-100 text-left text-gray-500">
                <strong>{uni.name}</strong>
                <br />
                {uni.country}, <a href={uni.web_pages[0]} target="_blank" rel="noopener noreferrer">{uni.web_pages[0]}</a>
              </li>
            ))}
          </ul>
        ) : loading ? (
          <div className="flex justify-center items-center mt-4">
            <Loader className="animate-spin text-gray-700" size={24} />
          </div>
        ) : <div></div>}
      </div>
    </div>
  )
}
