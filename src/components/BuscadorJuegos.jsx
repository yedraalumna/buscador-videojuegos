import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';

export default function BuscadorJuegos() {
    const [juego, setJuego] = useState(null);
    const [error, setError] = useState('');

    // API KEY de RAWG
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
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4, color: '#333', textAlign: 'center' }}>
                Buscador de videojuegos
            </Typography>

            <Box sx={{ display: 'flex', gap: '20px', mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<MicIcon />}
                    onClick={() => SpeechRecognition.startListening({ language: 'es-ES', continuous: true })}
                    sx={{ padding: '15px 30px', fontSize: '1.1rem', borderRadius: '15px' }}
                >
                    Grabar audio
                </Button>
                <Button 
                    variant="contained" 
                    color="error"
                    startIcon={<StopIcon />}
                    onClick={SpeechRecognition.stopListening}
                    sx={{ padding: '15px 30px', fontSize: '1.1rem', borderRadius: '15px' }}
                >
                    Parar
                </Button>
            </Box>

            <Typography variant="h6" sx={{ mb: 4, color: '#555', backgroundColor: 'white', padding: '15px', borderRadius: '10px', minWidth: '300px', textAlign: 'center' }}>
                Has dicho: <strong>{transcript}</strong>
            </Typography>

            {error && <Typography color="error" variant="h5" sx={{ mb: 3 }}>{error}</Typography>}

            {juego && (
                <Card sx={{ maxWidth: 500, width: '100%', borderRadius: '20px', boxShadow: 5 }}>
                    {juego.background_image && (
                        <CardMedia
                            component="img"
                            height="300"
                            image={juego.background_image}
                            alt={juego.name}
                        />
                    )}
                    <CardContent sx={{ padding: '30px' }}>
                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                            {juego.name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                            <CalendarTodayIcon sx={{ mr: 1 }} />
                            <Typography variant="h6">
                                Fecha: {juego.released}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                            <StarIcon sx={{ mr: 1, color: '#fbc02d' }} />
                            <Typography variant="h6">
                                Puntuación: {juego.rating} / 5
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}