import React, { useState } from 'react';
import {
  Button, TextField, Box, Container,
} from '@mui/material/';
import { styled } from '@mui/system'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as API from '../../API';

const Box1 = styled('div')({
  backgroundColor: '#CAF0F8',
  alignContent: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  flexDirection: 'column' ,
  justifyContent: 'center',
  // boxShadow: `-5px -5px 10px rgba(232,242,255,0.8),
  // 5px 5px 10px rgba(0,0,0,0.25)`,
  // borderRadius: '30px;',
  marginBottom: '40px',

});
const Box2 = styled('div')({
  backgroundColor: '#CAF0F8',
  alignContent: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  flexDirection: 'column' ,
  justifyContent: 'center',
});
const Container1 = styled('div')({
  backgroundColor: '#CAF0F8',
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column' ,
  alignContent:'center',
  flexWrap: 'wrap',
});

const Title = styled('div')({
  textAlign: 'center',
  fontSize: 'x-large',
  marginTop:'50px',
  marginBottom: '80px'
})
const SubTitle = styled('div')({
  textAlign: 'center',
  fontSize: 'medium',

})
const TextField1 = styled('input')({
  borderRadius: '5px',
  background: '#CAF0F8',
  boxShadow: `inset 5px 5px 6px #a4c2c9,
  inset -5px -5px 6px #f0ffff`,
  border: 'none',
  height: '40px',
  width: '250px',

})

const Input = styled('input')({
  border: 'none',
  outline:'none',
  background: 'none',
  readOnly: true,
})
const SubmitButton = styled('button')({
  width: '80px',
  height: '25px',
  boxShadow: `5px 5px 10px #9ab6bc,
  -5px -5px 10px #faffff`,
  borderRadius: '10px',
  backgroundColor: '#CAF0F8',
  border: 'none',
  color: '#505050',
  marginTop:'55px',

})
const TextArea1 = styled('textarea')({
  borderRadius: '5px',
  background: '#CAF0F8',
  boxShadow: `inset 5px 5px 6px #a4c2c9,
  inset -5px -5px 6px #f0ffff`,
  border:'none'
})
// const Select = styled('select')({
//   border: 'none',
//   height: '40px',
//   // boxShadow: `5px 5px 10px #9ab6bc,
//   // -5px -5px 10px #faffff`,
//   borderRadius: '10px',
//   backgroundColor: '#CAF0F8',

// })

function AddItem({ user, setAddItem, addItem }) {
  console.log('user is ', user);
  const [itemName, setItemName] = useState('');
  const [itemCondition, setItemCondition] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const handleClick = () => {
    setAddItem(!addItem);
    // console.log(itemName, itemCondition, itemDescription, itemImage);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('looking for ', e.target)
    console.log('submitted ', itemName, itemImage, itemCondition, itemDescription);
    let itemObj = {name: itemName, thumbnail_url: itemImage, description: itemDescription, item_condition: itemCondition};
    console.log('item object ', itemObj);
    API.insertDevice(user.id, itemObj)
      .then((res) => {
        console.log('success adding an item')
      }).catch((err) => {
        console.log('error adding item was ', err);
      })
  };

  const setCondition = (e) => {
    console.log('e target val ', e.target.value);
    setItemCondition(e.target.value);
  }

  return (
    <Container1 sx={{ height: '100vh', bgcolor: '#CAF0F8' }}>
      <Button onClick={handleClick} >back</Button>
      <Title>ADD AND ITEM
      </Title>
      <Box1 sx={{ bgcolor: '#CAF0F8' }}>
      <SubTitle>Title
      </SubTitle>
        <TextField1 onChange={(e) => setItemName(e.target.value)} value={itemName} variant="filled" />
        <SubTitle>Image URL
      </SubTitle>
        <TextField1 onChange={(e) => setItemImage(e.target.value)} value={itemImage} variant="filled" />
        <SubTitle>Condition
      </SubTitle>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small" onSubmit={onSubmit}>
      <InputLabel id="demo-select-small">Condition</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={itemCondition}
        onChange={(e) => setCondition(e)}
        label="Condition"
      >
        <MenuItem value="New">New</MenuItem>
        <MenuItem value="Open Box">Open Box</MenuItem>
        <MenuItem value="Like New">Like New</MenuItem>
        <MenuItem value="Good">Good</MenuItem>
        <MenuItem value="Fair">Fair</MenuItem>
        <MenuItem value="Broken">Broken</MenuItem>
      </Select>
    </FormControl>
        <SubTitle>Description
        </SubTitle>
        <TextArea1 rows='10' onChange={(e) => setItemDescription(e.target.value)} value={itemDescription} variant="filled" />
        <Box2>
        <SubmitButton onClick={(e) => onSubmit(e)}>Submit</SubmitButton>
        </Box2>
      </Box1>
    </Container1>
  );
}
export default AddItem;