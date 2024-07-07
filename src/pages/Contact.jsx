import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Header';
import contact from '../assets/json/contact.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import { CssBaseline } from '@mui/material';

export const ContactUs = ({data, whatsApp = false})=>(
  <section className="bg-primary-white text-primary p-6 text-center rounded-lg w-full mx-auto">
      <Link to={data.linkTo} >
      <h3 className="text-2xl font-semibold text-primary mb-4 hover:text-blue-600">{data.title}</h3>
      </Link>
      <p className="text-lg mb-2">{data.address}</p>
      <p className="text-lg mb-6">{data.phone}</p>
      {whatsApp && <FontAwesomeIcon className='cursor-pointer hover:text-green-600' 
      icon={faWhatsapp} size='2xl' color='#25D366' />}
</section>
)


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    updates: true
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="pageContainer max-sm:p-0">
      <div className='mx-auto mb-4 p-4 w-3/4 fade-in max-sm:w-11/12 max-sm:px-0'>
        {/* <form dir='auto' className="flex flex-col gap-4 px-12 py-8 rounded-2xl border bg-primary-yellow/70 max-sm:rounded-none max-sm:px-4">
            <div className="text-center m-auto">
              <h1 className="text-3xl font-bold text-center mb-8">כתבו לנו</h1>
              <p className='text-lg text-center mb-4'>אם יש לכם שאלות, הערות או הארות - הרגישו חופשי לפנות אלינו</p>
            </div>
            <input type="name"  placeholder="שם" required name='name' className="inputField" />
            <input type="email" placeholder="אימייל" name='email' required className="inputField" />
            <textarea placeholder="Message" className="inputField h-40"></textarea>
            <div className='flex justify-center w-full'>
            <Button 
              variant='contained' 
              color='success'
              type="submit" 
              className="bg-primary m-auto w-1.2 h-10 text-white px-4 py-2 rounded-xl">שליחה</Button>
            </div>
          </form> */}
      <CssBaseline />
      <Box
          component="form"
          onSubmit={handleSubmit}         
          sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          py: 4,
          mx: 'auto',
          textAlign: 'right', // RTL layout
          direction: 'rtl' // RTL layout
        }}
        className='bg-primary-yellow/80 px-8 py-4 rounded-2xl shadow-lg mx-auto'
      >
        <Box textAlign="center">
          <Typography variant="h4" component="h1" gutterBottom>
            כתבו לנו
          </Typography>
          <Typography variant="body1" gutterBottom>
            אם יש לכם שאלות, הערות או הארות - הרגישו חופשי לפנות אלינו
          </Typography>
        </Box>
        <FormControl 
         className='bg-white rounded-lg'
        variant="outlined" color="success">
          <InputLabel htmlFor="name">שם</InputLabel>
          <OutlinedInput 
          id="name" 
          name="name" 
          label="שם" 
          value={formData.name}
          onChange={handleChange}
          required />
        </FormControl>
        <FormControl 
         className='bg-white rounded-lg'
          variant="outlined" color="success">
          <InputLabel htmlFor="email" sx={{ direction: 'ltr' }}>אימייל</InputLabel>
          <OutlinedInput
            id="email"
            name="email"
            label="אימייל"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            sx={{ direction: 'ltr' }}
          />
        </FormControl>
        <textarea 
         label="תוכן ההודעה"
         placeholder='תוכן ההודעה'
         name="message"
         value={formData.message}
         onChange={handleChange}
         rows={8}
         className='bg-white border text-center focus-visible:outline-primary/80 align-top min-h-16 rounded-lg' />
 
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.updates}
              onChange={handleChange}
              color="success"/>
          }
          label="אישור קבלת עדכונים במייל"
          sx={{ mx: 0 }} // Ensures checkbox stays aligned
        />
        <Box textAlign="center">
          <Button variant="contained" className='w-1/2' color="success" type="submit">
            שליחה
          </Button>
        </Box>
      </Box>
        </div>
        <div className='w-3/4 mx-auto shadow-md max-sm:w-5/6'>
          <ContactUs data={contact} whatsApp={true} />
        </div>
    </div>
  );
};

export default Contact;


const GadgetNestLogo = () => {
  return (
    <svg width="300" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100">
      <g fill="none" stroke="#FF6F61" strokeWidth="2">
        <path d="M100,20 Q60,60 100,100 Q140,60 100,20" />
        <path d="M100,20 Q80,40 100,60 Q120,40 100,20" />
        <path d="M100,60 Q70,90 100,120 Q130,90 100,60" transform="translate(0, -40)" />
        <path d="M100,60 Q90,70 100,80 Q110,70 100,60" transform="translate(0, -40)" />
        <path d="M100,100 Q130,140 100,180 Q70,140 100,100" transform="translate(0, -60)" />
      </g>
      <text 
        x="150" 
        y="65" 
        fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" 
        fontWeight="bold" 
        fill="#FF6F61" 
        fontSize="24">
        GadgetNest
      </text>
    </svg>
  );
};