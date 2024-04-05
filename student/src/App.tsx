import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Student from './pages/Student'
import Login from './pages/Login'
import {NextUIProvider} from "@nextui-org/react";

function App() {

	const [count, setCount] = useState(0)

	return (
		<NextUIProvider>
		<div className="App">
			<FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
				<BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
					<Routes>
						<Route path='/login' element={<Login/>} />
						<Route path='/' element={<Student/>} />
					</Routes>
				</BrowserRouter>
			</FrappeProvider>
		</div>
		</NextUIProvider>
	)
}

export default App
