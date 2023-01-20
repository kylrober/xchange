import React, { useState, useEffect } from 'react';
import {
  Container, Button, IconButton, AddIcon, Avatar, Box, Typography, Select, FormControl, MenuItem, InputLabel
} from '@mui/material';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import ItemCard from './ItemCard.jsx';
import List from './List.jsx';
import MapIcon from '@mui/icons-material/Map';
import { styled } from '@mui/system';

const Box1 = styled('div')({
  backgroundColor: '#0077B6',
  alignItems: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  flexDirection: 'column' ,
  justifyContent: 'center',
})
const Img1 = styled('img')({
  width:'90%'

  });
  const iconButtonStyling = {
  boxShadow: `-5px -5px 10px #00507a,
  5px 5px 10px #009ef2`,
  borderRadius: '2000px',
  backgroundColor: '#0077B6',
  border: 'none',
  color: '#CAF0F8',
  zIndex: 1000,
  width: '30px',
  height: '30px',
  padding: '10px'
};
const additionalTopButtonsStyling = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between'
}
export default function Search({ changeView, user }) {
  const [category, setCategory] = React.useState('');
  const [condition, setCondition] = React.useState('');
  const handleChange = (event) => {
    setCategory(event.target.value);
    // console.log(category);
  };

  const handleChange2 = (event) => {
    setCondition(event.target.value);
    console.log(condition);
    // console.log(condition);
  };

  const mapClick = (event) => {
    changeView('Map', {});
  }

  const homeClick = (event) => {
    changeView('Profile', {});
  }
  // const [allItems, setAllItems] = useState([]);
  // const [allUsers, setAllUsers] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:8080/devices')
  //     .then((response) => {
  //       // setAllItems(response);
  //     }).catch((error) => {
  //       console.log(error);
  //     });

  // //   axios.get('http://localhost:8080/users')
  // //     .then((response) => {
  // //       setAllUsers(response);
  // //     }).catch((error) => {
  // //       console.log(error);
  // //     });
  // }, []);

  return (
    <Container id="search">
      <Box sx={additionalTopButtonsStyling} id="topButtons">
        <IconButton id="homeButton" onClick={homeClick} >
          <HomeIcon sx={iconButtonStyling} />
        </IconButton>

        <IconButton  id="mapButton" onClick={mapClick}>
          <MapIcon sx={iconButtonStyling}/>
        </IconButton>
      </Box>
      <Box id="filter-box">
        <Box1>
        <Img1 src="https://i.ibb.co/68BVNpt/techxchange-500-150-px-350-150-px-350-100-px-2.png" />
        </Box1>
        <FormControl fullWidth>
          {/* <InputLabel id="label">Category</InputLabel>
          <Select
            sx={{
              marginBottom: '1em',
            }}
            value={category}
            labelId="category-select-label"
            id="category-select"
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value="phones">Phones</MenuItem>
            <MenuItem value="computers">Computers</MenuItem>
            <MenuItem value="consoles">Consoles</MenuItem>
          </Select> */}
        </FormControl>
        <FormControl fullWidth>
          <InputLabel  sx={{color: '#CAF0F8'}} id="demo-simple-select-label">Condition</InputLabel>
          <Select
            value={condition}
            labelId="condition-select-label"
            id="condition-select"
            label="Condition"
            onChange={handleChange2}
            sx={{
              marginBottom: '.5em',
              color: ''
            }}
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Open Box">Open Box</MenuItem>
            <MenuItem value="Like New">Like New</MenuItem>
            <MenuItem value="Good">Good</MenuItem>
            <MenuItem value="Fair">Fair</MenuItem>
            <MenuItem value="Broken">Broken</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box id="results">
        <List user={user} changeView={changeView} condition={condition} />
      </Box>
    </Container>
  );
}