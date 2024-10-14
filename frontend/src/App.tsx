import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Header from './components/Header';
import Body from './components/Body';
import Login from './components/Login';
import { Pdf } from './components/Pdf';
import NotFound from './components/Notfound';

function App() {
	return (
		<>
			<Header />
			<Body>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/pdf" element={<Pdf />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Body>
		</>
	);
}

export default App;
