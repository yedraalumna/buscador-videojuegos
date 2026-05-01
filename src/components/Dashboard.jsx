import { AppBar, Button, Container, Toolbar, Box } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

function Dashboard() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ 
                        display: 'flex', 
                        width: '100%', 
                        justifyContent: 'center', 
                        gap: 2
                    }}>
                        <Button 
                            component={Link} 
                            to={'/'} 
                            startIcon={<HomeIcon />}
                            sx={{ color: 'white', py: 2, px: 3, fontSize: '1.1rem', textTransform: 'none' }}
                        >
                            Inicio
                        </Button>

                        <Button 
                            component={Link} 
                            to={'/buscador'} 
                            startIcon={<SearchIcon />}
                            sx={{ color: 'white', py: 2, px: 3, fontSize: '1.1rem', textTransform: 'none' }}
                        >
                            Buscador por Voz
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Dashboard;
