import { Box, Typography } from '@mui/material';

export default function Home() {
    return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h4">Bienvenido/a a la aplicación</Typography>
            <Typography variant="subtitle1">Usa el menú superior para navegar.</Typography>
        </Box>
    );
}
