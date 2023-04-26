import { createSlice } from '@reduxjs/toolkit'
const initSlice = [
    { id: 1, exhibitName: "Tranh sơn dầu", room: "1", locate: "A" },
    { id: 2, exhibitName: "Tranh phong thủy", room: "1", locate: "B" },
    { id: 3, exhibitName: "Tranh đá", room: "1", locate: "C" },
    { id: 4, exhibitName: "Tranh Monalisa", room: "1", locate: "D" },
    { id: 5, exhibitName: "Tranh thủ", room: "1", locate: "D" },
    { id: 6, exhibitName: "Tranh phong cảnh", room: "1", locate: "E" },
    { id: 7, exhibitName: "Clifford", room: "1", locate: "G" },
    { id: 8, exhibitName: "Frances", room: "1", locate: "H" },
    { id: 9, exhibitName: "Roxie", room: "1", locate: "F" },
    { id: 10, exhibitName: "Tranh sơn dầu", room: "1", locate: "A" },
    { id: 11, exhibitName: "Tranh phong thủy", room: "1", locate: "B" },
    { id: 12, exhibitName: "Tranh đá", room: "1", locate: "C" },
    { id: 13, exhibitName: "Tranh Monalisa", room: "1", locate: "D" },
    { id: 14, exhibitName: "Tranh thủ", room: "1", locate: "D" },
    { id: 15, exhibitName: "Tranh phong cảnh", room: "1", locate: "E" },
    { id: 16, exhibitName: "Clifford", room: "1", locate: "G" },
    { id: 17, exhibitName: "Frances", room: "1", locate: "H" },
    { id: 18, exhibitName: "Roxie", room: "1", locate: "F" }
]

const exhibitSlice = createSlice({
    name: 'exhibit',
    initialState: initSlice,
    reducers: {
        addExhibit: (state, action) => {
            state.push(action.payload)
        },
        updateTodoStatus: (state, action) => {
            state.map(todo => todo.id === action.payload ? todo.completed = !todo.completed : todo)
        },
        deleteExhibit: (state, action) => {
            state.push(action.payload)
        },
    }
})
export default exhibitSlice