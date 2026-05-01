import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

export default function Home() {
    const navigate = useNavigate();

    // Comandos de voz específicos para la página de inicio
    const commands = [
        {
            command: 'Ir al buscador',
            callback: () => navigate('/buscador')
        },
        {
            command: 'Abrir buscador',
            callback: () => navigate('/buscador')
        }
    ];

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

    if (!browserSupportsSpeechRecognition) {
        return <Typography variant="h6" sx={{ p: 4 }}>Tu navegador no soporta reconocimiento de voz.</Typography>;
    }

    return (
        <Box sx={{ 
            p: 4, 
            textAlign: 'center', 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f5f5f5' // Fondo claro muy sutil
        }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                Bienvenido a la aplicación
            </Typography>
            <Typography variant="h5" sx={{ mb: 6, color: '#666' }}>
                Pulsa el micrófono y di <strong>"Ir al buscador"</strong> para empezar.
            </Typography>

            <Box sx={{ display: 'flex', gap: '30px', mb: 5, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<MicIcon sx={{ fontSize: 30 }} />}
                    onClick={() => SpeechRecognition.startListening({ language: 'es-ES', continuous: true })}
                    sx={{ padding: '20px 40px', fontSize: '1.2rem', borderRadius: '15px' }}
                >
                    ACTIVAR NAVEGACIÓN
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

            <Typography variant="h5" sx={{ mb: 5, color: '#555', backgroundColor: 'white', padding: '20px 30px', borderRadius: '15px', minWidth: '350px', boxShadow: 2 }}>
                Has dicho: <strong>{transcript}</strong>
            </Typography>
        </Box>
    );
}