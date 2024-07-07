import React, { useEffect, useRef, useState } from 'react';
import {TextField, InputLabel,Checkbox, FormControlLabel, Grid, FormControl, Select,MenuItem, Button, Box, Typography, Autocomplete} from '@mui/material';
import { styled } from '@mui/system';

const citiesInIsrael = [
        "ירושלים",
        "תל אביב - יפו",
        "חיפה",
        "ראשון לציון",
        "פתח תקווה",
        "אשדוד",
        "נתניה",
        "באר שבע",
        "חולון",
        "בני ברק",
        "רמת גן",
        "בת ים",
        "רחובות",
        "הרצליה",
        "כפר סבא",
        "מודיעין-מכבים-רעות",
        "נצרת",
        "חדרה",
        "עכו (עכו)",
        "רעננה",
        "רמלה",
        "לוד",
        "אשקלון",
        "קרית גת",
        "קרית מוצקין",
        "אילת",
        "נהריה",
        "בית שמש",
        "קרית אתא",
        "גבעתיים",
        "טבריה",
        "קריית ים",
        "רמת השרון",
        "נשר",
        "דימונה",
        "קריית ביאליק",
        "טירת כרמל",
        "הוד השרון",
        "ראש העין",
        "יבנה",
        "אור יהודה",
        "עפולה",
        "מגדל העמק",
        "מודיעין עילית",
        "שדרות",
        "נתיבות",
        "אילבון",
        "טירה",
        "סח'נין",
        "קרית שמונה",
        "צפת (צפת)",
        "בית שאן",
        "מעלות-תרשיחא",
        "גבעת שמואל",
        "קרית ים",
        "קרית מלאכי",
        "קרית שמונה",
        "נס ציונה",
        "מגדל העמק",
        "רהט",
        "טמרה",
        "כפר קאסם",
        "קלנסווה",
        "אום אל-פחם",
        "כפר כנא",
        "בנימינה-גבעת עדה",
        "זכרון יעקב",
        "מעלה אדומים",
        "ביתר עילית",
        "מבשרת ציון",
        "אפרת",
        "ביתר עילית",
        "אריאל",
        "מודיעין עילית",
        "כפר יונה",
        "אבן יהודה",
        "שוהם",
        "גבעתיים",
        "הוד השרון",
        "רמת גן",
        "באקה אל-גרבייה",
        "כפר מנדא",
        "טייבה",
        "דאלית אל-כרמל",
        "צפת",
        "כרמיאל",
        "עין מאהל",
        "מעג'ר",
        "יוקנעם עילית",
        "שפרעם",
        "כפר קרע",
        "כפר קאנא",
        "כפר סבא",
        "נווה ים",
        "ג'לג'וליה",
        "בית ג'ן",
        "קצרין",
        "אום אל-פחם",
        "קלקיליה",
        "טירה",
        "עראבה",
        "קרית מלאכי",
        "קריית שמונה",
        "עזה (עזה)",
        "קריית ביאליק",
        "מג'ד אל-כרום",
        "בצרה",
        "מסעדה",
        "טובא זנגריה",
        "סאג'ור",
        "פקיעין (בוקייעה)",
        "צופית",
        "ג'ת",
        "ג'וריש",
        "מזרעה",
        "כפר עזה",
        "קיבוץ דגניה",
        "נופית",
        "עין חוד",
        "אל-בירה",
        "א-סוויט",
        "מנשייה זבדה",
        "קריית טבעון",
        "סלמה",
        "ג'לג'וליה",
        "רמת ישי",
        "אבו ג'ווייעד (הכפר הבדואי)",
        "עזר",
        "עמיקם",
        "אלעזי",
        "קטורה",
        "אל עומר",
        "טראבלוס",
        "בצרה",
        "עבדה",
        "שקפ",
        "נווה זוהר",
        "רמות",
        "כוכב השחר",
        "כוכב יאיר",
        'כפר בילו',
        "בית העמק",
        "אור עקיבא",
        "גליל ים",
        "אבו קרינאת (הכפר הבדואי)",
        "בית ינאי",
        "בית עריף",
        "אור יהודה",
        "גאליה",
        "יפיע",
        "עין דור",
        "מעין צבי",
        "אכסאל",
        'כפר חב"ד'
    
];


const phonePrefixes = ["052", "054", "050", "053", "055"];

const RTLBox = styled(Box)({
    direction: 'rtl',
    textAlign: 'right'
  });
  
  const AddressForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
    //   phonePrefix: '',
      phoneNumber: '',
      country: 'ישראל',
      city: 'תל אביב - יפו',
      address: '',
      buildingNumber: '',
      homeNumber: '',
      entrance: '',
      sendInvoice: true,
      receiveNews: true
    });

    const handleInputChange = (e, newValue) => {
      const { name, value, type, checked } = e.target;
      const fieldValue = type === 'checkbox' ? checked : value;
        
      setFormData({
        ...formData,
        [name]: newValue || fieldValue
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const userInfo = { ...formData };
      console.log(userInfo);
    };
  
    return (
      <RTLBox component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 2, textAlign:'center', borderRadius: 1, boxShadow: 3 }}>
        <Typography  variant="h5" component="h5" gutterBottom>פרטי משלוח </Typography>
        <TextField
          label="שם לקוח"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label='דוא"ל'
          name="email"
          type="email"
          sx={{textAlign: 'left'}}
          value={formData.email}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
          inputProps={{ style: { direction: 'ltr' } }}
        />
          <TextField
              label="מספר טלפון"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              fullWidth
            />
        {/* <Grid container spacing={2} margin="normal">
          <Grid item xs={8}>
            <TextField
              label="מספר טלפון"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>קידומת</InputLabel>
              <Select
                label="קידומת"
                name="phonePrefix"
                value={formData.phonePrefix}
                onChange={handleInputChange}
                required
              >
                {phonePrefixes.map((prefix) => (
                  <MenuItem key={prefix} value={prefix}>
                    {prefix}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid> */}
        <TextField
          label="מדינה"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <Autocomplete
          options={citiesInIsrael}
          getOptionLabel={(option) => option}
          value={formData.city}
          onChange={(event, newValue) => handleInputChange({ target: { name: 'city', value: newValue } }, newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="עיר"
              name="city"
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
            />
          )}
        />
        <TextField
          label="כתובת"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <div className='flex justify-between gap-4'>
        <TextField
          label="מספר בניין"
          name="buildingNumber"
          value={formData.buildingNumber}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          label="מספר בית"
          name="homeNumber"
          value={formData.homeNumber}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <TextField
          label="כניסה"
          name="entrance"
          value={formData.entrance}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        </div>
        <div className='flex'>
        <FormControlLabel
          control={
            <Checkbox
              name="sendInvoice"
              checked={formData.sendInvoice}
              onChange={handleInputChange}
            />
          }
          label="קבלת חשבונית במייל"
        />
        </div>
        <div className='flex'>
        <FormControlLabel
        // sx={{marginX:'auto'}}
          control={
            <Checkbox
              name="receiveNews"
              checked={formData.receiveNews}
              onChange={handleInputChange}
            />
          }
          label="אישור קבלת חדשות ומבצעים"
        />
        </div>
        <Button 
          variant="contained" 
          color="secondary" 
          type="submit" 
          sx={{ mt: 2, width: '66%', borderRadius: '4px', marginY:'auto', alignSelf:'center' }}
        >
          שלח
        </Button>
      </RTLBox>
    );
  };
  
  export default AddressForm;