import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [addedCheckIns, setAddedCheckIns] = useState([]);
  const [checkInTitle, setCheckInTitle] = useState('');
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const handleAddCheckIn = () => {
    if (checkInTitle.trim() !== '') {
      // Create a new check-in object with the entered data
      const newCheckIn = {
        title: checkInTitle,
        image: selectedImage,
      };

      // Add the new check-in to the state
      setAddedCheckIns([...addedCheckIns, newCheckIn]);

      // Close the modal and reset state
      closeModal();
      setCheckInTitle('');
      setSelectedImage(null);
    }
  };
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profileimg}
              source={require('../assets/images/ownerImg.png')}
            />
            <Image
              style={styles.dropdownIcon}
              source={require('../assets/icons/dropdownIcon.png')}
            />
          </View>
        </View>

        <View style={styles.body}>
          <ImageBackground
            style={styles.backgroundImg}
            source={require('../assets/images/containerBackgroundImg.png')}>
            <Text style={styles.name}>Hi! 👋 James Doe</Text>
            <Text style={styles.description}>
              Lorem ipsus dolor sit amen, something important to say here
            </Text>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={closeModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={styles.addCheckInTitle}>
                    <Text style={styles.title}>Add Check In</Text>
                    <TouchableOpacity onPress={closeModal}>
                      <Image
                        style={{width: 10, height: 10, marginTop: 5}}
                        source={require('../assets/icons/close.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.title}>Title</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    placeholderTextColor={'#D9D9D9'}
                    value={checkInTitle}
                    onChangeText={text => setCheckInTitle(text)}
                  />
                  <Text style={styles.uploadImgtitle}>Upload Image</Text>
                  {selectedImage && (
                    <Image
                      source={{uri: selectedImage}}
                      style={{flex: 1, width: 50, height: 50}}
                      resizeMode="contain"
                    />
                  )}
                  <TouchableOpacity onPress={openImagePicker}>
                    <View style={styles.pickImage}>
                      <Image
                        style={styles.pickImgIcon}
                        source={require('../assets/icons/box.png')}
                      />
                      <Text style={styles.pickImgtext}>
                        Click or drag file to this area to upload
                      </Text>
                      <Text style={styles.pickImgtext2}>
                        Support for a single or bulk upload. Strictly prohibit
                        from uploading company data or other band files
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                      onPress={closeModal}
                      style={styles.modalBtn1}>
                      <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleAddCheckIn}
                      style={styles.modalBtn2}>
                      <Text style={styles.addText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <TouchableOpacity style={styles.checkInBtn} onPress={openModal}>
              <Text style={styles.btnText}>Add Check In</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View>
          <Text style={styles.addedCheckInText}>Added CheckIns</Text>
        </View>

        {addedCheckIns.length === 0 ? (
          <Text style={styles.dummyText}>No added check-ins yet :(</Text>
        ) : (
          addedCheckIns.map((checkIn, index) => (
            <View key={index} style={styles.checkedInData}>
              {checkIn.image && (
                <ImageBackground
                  style={styles.ImgData}
                  source={{uri: checkIn.image}}>
                  <TouchableOpacity style={styles.checkedInBtn}>
                    <Text style={styles.checkedInbtnText}>Checked In</Text>
                  </TouchableOpacity>
                </ImageBackground>
              )}
              <Text style={styles.checkedInName}>{checkIn.title}</Text>
              <Text style={styles.checkedInDate}>12th Nov, 2022</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={styles.ownerImg}
                  source={require('../assets/images/ownerImg.png')}
                />
                <Text style={styles.checkedInOwner}>Owner: John Doe</Text>
              </View>
            </View>
          ))
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    borderRadius: 35,
    padding: 12,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileimg: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  logoContainer: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 20,
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  logoText: {
    color: 'black',
  },
  dropdownIcon: {
    height: 15,
    width: 15,
  },
  body: {
    marginTop: 20,
    // backgroundColor:'black',
    // backgroundColor:'white',
    width: 360,
    height: 380,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  backgroundImg: {
    width: 400,
    height: 400,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: 'white',
    width: 250,
    marginTop: 12,
  },
  checkInBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: 140,
    height: 45,
    backgroundColor: '#7B5AFF',
    borderRadius: 40,
    // padding:20
  },
  btnText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  addedCheckInText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 28,
  },
  checkedInData: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    elevation: 1,
    marginTop: 10,
    width: 350,
  },
  ImgData: {
    width: 320,
    height: 175,
    marginTop: 10,
    borderRadius: 100,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  checkedInBtn: {
    marginLeft: 'auto',
    marginBottom: 'auto',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: 110,
    height: 45,
    backgroundColor: '#7B5AFF',
    borderRadius: 40,
  },
  checkedInbtnText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  checkedInName: {
    marginTop: 10,
    paddingLeft: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  checkedInDate: {
    marginTop: 10,
    paddingLeft: 10,
    color: '#718096',
    fontSize: 16,
    fontWeight: '500',
  },
  checkedInOwner: {
    marginTop: 10,
    paddingLeft: 10,
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  ownerImg: {
    width: 35,
    height: 35,
    marginTop: 10,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
  },
  addCheckInTitle: {
    //  backgroundColor:'#F8F8F8',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#000000',
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 16,
  },
  uploadImgtitle: {
    color: '#000000',
    marginTop: 15,
    fontWeight: '500',
    fontSize: 16,
  },
  input: {
    height: 45,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
  pickImage: {
    marginTop: 20,
    height: 200,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    borderColor: '#D9D9D9',
  },
  pickImgIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 55,
    height: 55,
  },
  pickImgtext: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  pickImgtext2: {
    color: '#B4B4B4',
    textAlign: 'center',
    fontSize: 14,
    width: 250,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginTop: 20,
    justifyContent: 'space-evenly',
  },
  modalBtn1: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 75,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    elevation: 1,
    marginRight: 5,
  },
  modalBtn2: {
    backgroundColor: '#7B5AFF',
    borderRadius: 20,
    width: 75,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  addText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  dummyText: {
    color: 'grey',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 60,
  },
});
