import React from 'react';

import { styled } from '@mui/system';
import { Box, Avatar } from '@mui/material/';

const avatarSX = {
  marginBottom:'10px',
  boxShadow: `8px 8px 17px #006093,
  -8px -8px 17px #008ed9,
  inset -2px -2px 5px rgba(255,255,255,0.6),
  inset 2px 2px 4px rgba(0,0,0,0.3)`,
  marginTop: '5px',
  width: '75px',
  height: '75px',
  border: '4px solid #0077B6',
  marginRight: '10px',
  marginLeft: '-8px',
}

const Box1 = styled('div')({
  justifyContent: 'center',
  alignContent: 'center',
  display: 'flex',
  bgcolor: '#0077B6',
  height: '10vh',
  borderRadius: '20px',
  width: '90%',
  marginBottom: '15px'
})
const Box2 = styled('div')({
  flexGrow: 1,
  alignContent: 'center',
  backgroundColor: '#0077B6',
  borderRadius: '20px',
  paddingLeft: '20px',
  paddingTop: '14px',
  paddingBottom: '10px',
  background: '#0077B68',
  boxShadow: `inset 6px 6px 6px #006093,
  inset -6px -6px 6px #008ed9`,
  fontSize:'smaller',
  overflow: 'scroll'
})


const ItemCard = ({ item, changeView, user }) => {

const itemClick = (event) => {
  console.log('this item i want is ', item);
  console.log('this is the user I WANT ', user);
  // changeView('ItemDetails', {});
  changeView('ItemDetails', {currentUserId: user.id, currentItemId: item.id, changeview: changeView});
}


return (

  <Box1>
    <Box onClick={itemClick} sx={{
      display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center',
    }}>
      <Avatar src={item.thumbnail_url} sx={avatarSX}/>
    </Box>
    <Box2>
      <div style={{color: '#CAF0F8'}}> {item.name}</div>
      <div style={{color: '#CAF0F8'}} > Condition: {item.item_condition}</div>
      <div style={{color: '#CAF0F8'}}> Description: {item.description}</div>
    </Box2>

  </Box1>

);
}

export default ItemCard;