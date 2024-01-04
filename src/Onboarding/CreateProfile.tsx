import React from 'react';
import Birthday from './Birthday';
import GradientBackground from './_components/GradientBackground';

function CreateProfile({navigation}: {navigation: any}) {
  return <Birthday navigation={navigation} />;
}

export default CreateProfile;
