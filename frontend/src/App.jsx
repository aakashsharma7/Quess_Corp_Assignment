import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/attendance" element={<Attendance />} />
                    </Routes>
                </main>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: 'rgba(26, 34, 52, 0.95)',
                            color: '#fff',
                            border: '1px solid rgba(102, 126, 234, 0.3)',
                            borderRadius: '12px',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#43e97b',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#fa709a',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </div>
        </Router>
    );
}

export default App;
