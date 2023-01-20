import React, { useState, useEffect } from 'react';
import {
  Button, IconButton, Avatar, Box, Text1, Container
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Add, Home } from '@mui/icons-material';
import axios from 'axios';
import * as API from '../../API.js';
import ProposeTradeForm from './ProposeTradeForm';
import {styled} from '@mui/system';

function Item({props, changeView, user}) {
  console.log('')
  const [itemId, setItemId] = useState();
  const [itemPhoto, setItemPhoto] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [itemDetails, setItemDetails] = useState('');
  const [itemCondition, setItemCondition] = useState('');

  const [userId, setUserId] = useState();
  const [currentUserDescription, setCurrentUserDescription] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [profilePhotoThumbnail, setProfilePhotoThumbnail] = useState('');
  const [currentUserLocation, setCurrentUserLocation] = useState({});

  const [displayProposeTradeForm, setDisplayProposeTradeForm] = useState(false);
  const [displayItemDetails, setDisplayItemDetails] = useState(false);

  const Box1 = styled('div')({
    backgroundColor: '#0077B6',
    alignItems: 'center',
    display: 'flex',
    boxShadow: `-5px -5px 10px #00507a,
    5px 5px 10px #009ef2`,
    borderRadius: '30px',
    marginBottom: '20px',
    justifyContent: 'flex-start'
  });

  const ImgBox = styled('div')({
    boxShadow: `-8px -8px 12px rgba(232,242,255,0.8),
    8px 8px 12px rgba(0,0,0,0.25),
    inset -2px -2px 5px rgba(255,255,255,0.6),
    inset 2px 2px 4px rgba(0,0,0,0.3)`,
    marginBottom: '20px',
    height:'225px',
    width: '225px',
    borderRadius: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '5px'
  });

  const Box2 = styled('div')({
    backgroundColor: '#0077B6',
    alignContent: 'center',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'column' ,
    justifyContent: 'center',

    marginBottom: '20px'
  });

  const Image = styled('img')({
    height:'225px',
    width: '225px',
    borderRadius: '50%'
  });

  const ProposeTradeButton = styled('button')({
    position: 'fixed',
    bottom: '20px',
    width: '150px',
    height: '30px',
    boxShadow: `-5px -5px 10px #00507a,
    5px 5px 10px #009ef2`,
    borderRadius: '30px',
    backgroundColor: '#CAF0F8',
    border: '4px solid #CAF0F8',
    color: '#CAF0F8',
  });

  const additionalTopButtonsStyling = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }

  const additionalUserInfoStyling = {
    flexDirection: 'row' ,
    justifyContent: 'center',
  }

  const additionalTitleStyling = {
    alignItems: 'center',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  }

  const additionalItemInfoStyling = {
    justifyContent: 'flex-start',
    padding: '20px',
    height: '5vh'
  };

  const additionalButtonStyling = {
    display: 'flex',
    justifyContent: 'center',
  };

  const avatarSX = {
    marginBottom:'10px',
    boxShadow: `-5px -5px 10px #00507a,
    5px 5px 10px #009ef2`,
    marginTop: '15px',
    width: '75px',
    height: '75px',
    border: '4px solid #CAF0F8',
    marginRight: '20px'
  }
  const itemAvatarSX = {
    marginBottom:'10px',
    boxShadow: `-5px -5px 10px #00507a,
    5px 5px 10px #009ef2`,
    marginTop: '15px',
    width: '200px',
    height: '200px',
    border: '7px solid #0077B6',

  }

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
  const Text1 = styled('div')({
    fontFamily: `'Inter', sans-serif`,
    color: '#CAF0F8'
  });

  useEffect(() => {
    // console.log('PROPS ARE ', props)
    console.log('user in item details is ', user)

    API.getItemFromID(props.currentItemId)
      .then((response) => {
        console.log(response.data);
        setItemId(response.data[0].id);
        setItemPhoto(response.data[0].thumbnail_url);
        setItemTitle(response.data[0].name);
        setItemDetails(response.data[0].description);
        setItemCondition(response.data[0].item_condition);
        setUserId(response.data[0].user_id);
      }).catch((error) => {
        console.log(error);
      });
  }, [props.currentItemId]);

  useEffect(() => {
    API.getUserFromID(userId)
    .then((response) => {
      setCurrentUserDescription(response.data[0].description)
      setCurrentUserEmail(response.data[0].email)
      setProfilePhotoThumbnail(response.data[0].thumbnail_url)
      setCurrentUserLocation({ 'street': response.data[0].street, 'city': response.data[0].city, 'state': response.data[0].state })
      setDisplayItemDetails(true);
    }).catch((error) => {
      console.log(error);
    })}, [itemId]);


  const onProposeTradeClick = (e) => {
    e.preventDefault();
    setDisplayProposeTradeForm(true);
    setDisplayItemDetails(false);
  };

  const onHomeButtonClick = (e) => {
    e.preventDefault();
    setDisplayItemDetails(false);
    changeView('Profile', {user: user, changeView: changeView});
  };

  const onAddButtonClick = (e) => {
    e.preventDefault();
    const bookmarkObj = {
      itemID: itemId,
      userID: user.id,
    };
    axios.post('http://localhost:8080/bookmark', bookmarkObj)
      .then(() => {
        console.log('bookmark added');
      }).catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container sx={{padding: 0}}>
      <Box>
        <ProposeTradeForm
          displayProposeTradeForm={displayProposeTradeForm}
          setDisplayProposeTradeForm={setDisplayProposeTradeForm}
          setDisplayItemDetails={setDisplayItemDetails}
          currentUserId={props.currentUserId}
          userId={userId}
          itemPhoto={itemPhoto}
          itemId={itemId}/>
      </Box>


      <Box sx={ displayItemDetails ? {display: 'block'} : {display: 'none'} }>
        <Box sx={additionalTopButtonsStyling}>
          <IconButton onClick={(e) => { onHomeButtonClick(e); }}>
            <Home sx={iconButtonStyling}/>
          </IconButton>
          <IconButton onClick={(e) => { onAddButtonClick(e); }}>
            <Add sx={iconButtonStyling}/>
          </IconButton>
        </Box>
         <Box2>
        <Avatar sx={itemAvatarSX} src={itemPhoto}/>
        </Box2>
        <div style={additionalTitleStyling}>
          <Text1  variant='h4' >{itemTitle}</Text1>
        </div>


        <Box1 sx={additionalUserInfoStyling}>
          <Avatar sx={avatarSX} alt="" src={profilePhotoThumbnail}/>
          <Box>
            <Text1><u>Location</u>:</Text1>
            <Text1>{currentUserLocation.city}, {currentUserLocation.state}</Text1>
          </Box>
        </Box1>

        <Box1 sx={additionalItemInfoStyling}>
          <Text1><u>Details</u>: {itemDetails}</Text1>
        </Box1>

        <Box1 sx={additionalItemInfoStyling}>
          <Text1><u>Condition</u>: {itemCondition}</Text1>
        </Box1>

        <Box sx={additionalButtonStyling}>
          <ProposeTradeButton sx={userId === props.currentUserId ? {visibility: 'hidden'} : {visibility: 'visible',
  width: '120px',
  height: '30px',
  boxShadow: `6px 6px 12px #00507a,
  -6px -6px 12px #009ef2`,
  borderRadius: '10px',
  backgroundColor: '#0077B6',
  border: 'none',
  color: '#CAF0F8',
}} onClick={(e) => { onProposeTradeClick(e); }}>
            Propose Trade
          </ProposeTradeButton>
        </Box>
      </Box>
    </Container>
    );
}

export default Item;