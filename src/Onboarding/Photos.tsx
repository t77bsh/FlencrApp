import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import Instructions from './_components/Instructions';
import ContinueBtn from './_components/ContinueBtn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import DraggableGrid from 'react-native-draggable-grid';
import GradientBackground from './_components/GradientBackground';

type Images = {uri: string | null; key: number};

// Screen for the user to upload their photos
export default function Photos({navigation}: any) {
  const {user, loading} = useAuth();
  const [userImages, setUserImages] = useState<Images[]>([
    {uri: null, key: 0},
    {uri: null, key: 1},
    {uri: null, key: 2},
    {uri: null, key: 3},
    {uri: null, key: 4},
    {uri: null, key: 5},
  ]);

  const renderImageItem = (item: {uri: string | null; key: number}) => {
    return (
      <View key={item.key} className="m-2 relative">
        {item.uri ? (
          <>
            <Image
              source={{uri: item.uri}}
              className="w-24 h-24 bg-cover rounded-lg"
            />
            <TouchableOpacity
              className="absolute top-0 right-0 m-0.5 bg-black rounded-full p-0"
              onPress={() => removeImage(item.key)}>
              <Ionicons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            className="w-24 h-24 bg-gray-200 justify-center items-center border border-gray-300 rounded-lg"
            onPress={() => selectImage()}>
            <Text className="text-4xl text-gray-700">+</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const selectImage = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
      } else if (result.assets && result.assets[0]) {
        // Place the image in the first empty slot
        setUserImages(currentImages => {
          const newImages = [...currentImages];
          const firstEmptyIndex = newImages.findIndex(
            slot => slot.uri === null,
          );
          if (firstEmptyIndex !== -1) {
            newImages[firstEmptyIndex] = {
              ...newImages[firstEmptyIndex],
              uri:
                result.assets && result.assets[0].uri
                  ? result.assets[0].uri
                  : null,
            };
          }
          return newImages;
        });
      } else {
        console.error('No URI found for the selected image.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const removeImage = (removeKey: number) => {
    setUserImages(currentImages => {
      // Remove the image via its key
      const filteredImages = currentImages.filter(
        (image, _) => image.key !== removeKey,
      );

      // Find the last non empty slot
      let lastNonNullIndex = -1;
      for (let i = 0; i < filteredImages.length; i++) {
        if (filteredImages[i].uri !== null) {
          lastNonNullIndex = i;
        }
      }

      // Add an empty slot after the last non-empty slot
      filteredImages.splice(lastNonNullIndex + 1, 0, {
        uri: null,
        key: removeKey,
      });

      // Return the new positions
      return filteredImages;
    });
  };

  const checkForEmptySandwich = (newImages: Images[]) => {
    for (let i = 0; i < newImages.length; i++) {
      // If a empty slot is found and the next slot is non-empty
      if (
        newImages[i].uri === null &&
        i < newImages.length - 1 &&
        newImages[i + 1].uri !== null
      ) {
        return true;
      }
    }

    // Return false if all empty slots are at the end or the entire array is nulls
    return (
      !(newImages.length === 1 && newImages[0].uri === null) &&
      newImages[newImages.length - 1].uri !== null
    );
  };

  const checkForAtleast3Images = (newImages: Images[]) => {
    let count = 0;
    for (let i = 0; i < newImages.length; i++) {
      if (newImages[i].uri !== null) {
        count++;
      }
    }
    return count >= 3;
  };

  return (
    <GradientBackground>
      <View className="flex-1 justify-between p-4 ">
        <View className="space-y-6">
          {/* Instructions */}
          <Instructions
            title="Photos"
            info="Show yourself off by uploading at least 3 photos!"
          />

          {/* Upload photos  */}
          <DraggableGrid
            numColumns={3}
            renderItem={renderImageItem}
            data={userImages}
            onDragRelease={newImages => {
              // If as the result of the drag and drop, we have empty slots in the middle of the newImages, move them to the end
              if (checkForEmptySandwich(newImages)) {
                // Move the empty slots after the last non-empty slot
                const emptySlots = newImages.filter(img => img.uri === null);
                const nonEmptySlots = newImages.filter(img => img.uri !== null);
                const newImagesAfterEmptySlots = [
                  ...nonEmptySlots,
                  ...emptySlots,
                ];
                setUserImages(newImagesAfterEmptySlots);
              } else {
                setUserImages(newImages);
              }
            }}
          />
        </View>

        {/* Buttons */}
        <ContinueBtn
          navigation={navigation}
          valid={checkForAtleast3Images(userImages)}
          navigateTo="Bio"
          data={{}}
        />
      </View>
    </GradientBackground>
  );
}
