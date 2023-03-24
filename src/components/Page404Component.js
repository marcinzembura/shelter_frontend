// import Head from 'next/head';
// import NextLink from 'next/link';
import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from '../assets/images/404-img.jpg';

const Page = () => (
  <>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >

          <Typography
            align="center"
            color="textPrimary"
            variant="h3"
          >
            Nie zgubiłeś się?
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt="Under development"
              src={Image}
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560
              }}
            />
          </Box>
            <Button href="/"
              component="a"
              startIcon={(<ArrowBackIcon fontSize="small" />)}
              sx={{ mt: 3 }}
              variant="contained"
            >
              Wroć do strony domowej
            </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page;
