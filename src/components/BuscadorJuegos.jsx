import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import GamepadIcon from '@mui/icons-material/Gamepad';

export default function BuscadorJuegos() {
    const [juego, setJuego] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // API key de RAWG
    const API_KEY = '2ebe09493784404db03a646d548dac8d'; 

    const buscarEnAPI = async (nombreJuego) => {
        try {
            setError('');
            const respuesta = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${nombreJuego}&page_size=1`);
            const datos = await respuesta.json();

            if (datos.results && datos.results.length > 0) {
                setJuego(datos.results[0]);
            } else {
                setJuego(null);
                setError('No se ha encontrado ningún juego con ese nombre.');
            }
        } catch (err) {
            setError('Error de conexión al buscar el juego.');
        }
    };

    const commands = [
        {
            command: 'Buscar *',
            callback: (nombreJuego) => buscarEnAPI(nombreJuego)
        },
        {
            command: 'Limpiar',
            callback: () => {
                setJuego(null);
                setError('');
                resetTranscript();
            }
        },
        {
            command: 'Ir a inicio',
            callback: () => {
                navigate('/');
            }
        }
    ];

    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

    if (!browserSupportsSpeechRecognition) {
        return <Typography variant="h6" sx={{ p: 4 }}>Tu navegador actual no soporta reconocimiento de voz.</Typography>;
    }

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            backgroundColor: '#e6e6fa', 
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, color: '#333', textAlign: 'center' }}>
                Buscador de videojuegos
            </Typography>

            <Typography variant="h6" sx={{ mb: 4, color: '#666', textAlign: 'center', maxWidth: '800px' }}>
                Comandos disponibles: <strong>"Buscar [juego]"</strong>, <strong>"Limpiar"</strong> o <strong>"Ir a inicio"</strong>
            </Typography>

            <Box sx={{ display: 'flex', gap: '30px', mb: 5, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<MicIcon sx={{ fontSize: 30 }} />}
                    onClick={() => SpeechRecognition.startListening({ language: 'es-ES', continuous: true })}
                    sx={{ padding: '20px 40px', fontSize: '1.2rem', borderRadius: '15px' }}
                >
                    GRABAR AUDIO
                </Button>
                <Button 
                    variant="contained" 
                    color="error"
                    startIcon={<StopIcon sx={{ fontSize: 30 }} />}
                    onClick={SpeechRecognition.stopListening}
                    sx={{ padding: '20px 40px', fontSize: '1.2rem', borderRadius: '15px' }}
                >
                    PARAR
                </Button>
            </Box>

            <Typography variant="h5" sx={{ mb: 5, color: '#555', backgroundColor: 'white', padding: '20px 30px', borderRadius: '15px', minWidth: '350px', textAlign: 'center', boxShadow: 2 }}>
                Has dicho: <strong>{transcript}</strong>
            </Typography>

            {error && <Typography color="error" variant="h5" sx={{ mb: 3 }}>{error}</Typography>}

            {juego && (
                <Card sx={{ maxWidth: 600, width: '100%', borderRadius: '20px', boxShadow: 6 }}>
                    {juego.background_image && (
                        <CardMedia
                            component="img"
                            height="350"
                            image={juego.background_image}
                            alt={juego.name}
                        />
                    )}
                    <CardContent sx={{ padding: '40px' }}>
                        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 3 }}>
                            {juego.name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                            <CalendarTodayIcon sx={{ mr: 2, fontSize: 30 }} />
                            <Typography variant="h5">
                                Fecha: {juego.released}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                            <StarIcon sx={{ mr: 2, fontSize: 30, color: '#fbc02d' }} />
                            <Typography variant="h5">
                                Puntuación: {juego.rating} / 5
                            </Typography>
                        </Box>

                        {juego.platforms && (
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: 'text.secondary', mt: 2 }}>
                                <GamepadIcon sx={{ mr: 2, mt: 0.5, fontSize: 30, color: '#1976d2' }} />
                                <Typography variant="h5" sx={{ lineHeight: 1.4 }}>
                                    Plataformas: {juego.platforms.map(p => p.platform.name).join(', ')}
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}