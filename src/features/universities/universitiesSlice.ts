import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { University } from './universitiesTypes'

const API_URL = 'http://universities.hipolabs.com/search'

// Async thunk for fetching universities
export const fetchUniversities = createAsyncThunk(
  'universities/fetchUniversities',
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}?name=${searchTerm}`, { referrerPolicy: "unsafe-url" })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      return rejectWithValue('Failed to fetch universities')
    }
  }
)

// initial state
interface UniversitiesState {
  universities: University[]
  loading: boolean
  error: string | null
}

const initialState: UniversitiesState = {
  universities: [],
  loading: false,
  error: null,
}

const universitiesSlice = createSlice({
  name: 'universities',
  initialState,
  reducers: {
    clearUniversities: (state) => {
      state.universities = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUniversities.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUniversities.fulfilled, (state, action: PayloadAction<University[]>) => {
        state.loading = false
        state.universities = action.payload || []
      })
      .addCase(fetchUniversities.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

// Export actions and reducer
export const { clearUniversities } = universitiesSlice.actions
export default universitiesSlice.reducer

// Selector
export const selectUniversities = (state: RootState) => state.universities
