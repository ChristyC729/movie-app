import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

// HeaderBackground is the background image for the header
const HeaderBackground = item => {
  return (
    <View style={styles.header}>
      <ImageBackground
        source={{uri: item.backdrop}}
        resizeMode="stretch"
        style={styles.backdrop}>
        <LinearGradient
          colors={['#0000', 'black']}
          style={styles.linearGradient}
        />
      </ImageBackground>
    </View>
  );
};

//generates stars based on rating in data
const starCounter = rating => {
  let star = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.round(rating / 2))
      star.push(<Ionicons key={i} name="ios-star" size={25} color="#202945" />);
    else
      star.push(
        <Ionicons key={i} name="ios-star-half" size={25} color="#202945" />,
      );
  }
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {star}
    </View>
  );
};

// Header styles the header of the movie
const Header = item => {
  return (
    <View style={styles.headerContent}>
      <View style={[styles.shadowProp, {width: '40%', height: 220}]}>
        <Image
          source={{uri: item.poster}}
          resizeMode="stretch"
          style={styles.headerPosterSize}
        />
      </View>
      <View style={styles.title}>
        <View style={styles.titleAlignment}>
          <Text style={styles.titleTextStyle}>{item.title}</Text>
        </View>
        <View style={styles.starView}>
          {starCounter(item.imdb_rating)}
          <Text>(IMDB Rating: {item.imdb_rating}/10)</Text>
        </View>
      </View>
    </View>
  );
};

// Content styles the content of the movie
const Content = item => {
  const releaseYear = new Date(item.released_on).getFullYear();
  const director =
    typeof item.director === 'string'
      ? item.director
      : item.director.join(', ');

  return (
    <View style={styles.castView}>
      <View style={styles.contentHeader}>
        <Text style={[styles.textBoldStyle, {alignSelf: 'center'}]}>
          {releaseYear} | {item.length} | {director}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.textBoldStyle, {marginBottom: 20}]}>
          Cast: {`\n`}
          <Text style={styles.textBoldStyle}>{item.cast.join(', ')}</Text>
        </Text>
        <Text style={styles.textBoldStyle}>
          Movie Description: {`\n`}
          <Text style={styles.textStyle}>{item.overview}</Text>
        </Text>
      </View>
    </View>
  );
};

const DisplayScreen = ({navigation, route}) => {
  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={{flexGrow: 1}}
      contentInsetAdjustmentBehavior="automatic">
      {HeaderBackground(route.params.movie)}
      <View style={styles.contentContainer}>
        {Header(route.params.movie)}
        {Content(route.params.movie)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  header: {
    flex: 1,
    zIndex: -1,
    position: 'absolute',
    height: 250,
    width: '100%',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderColor: 'black',
  },
  headerContent: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  castView: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    padding: 20,
  },
  textBoldStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '300',
  },
  title: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  contentHeader: {
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  content: {
    textAlign: 'left',
    alignContent: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  linearGradient: {
    flex: 1,
    position: 'absolute',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: '100%',
    height: '100%',
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    top: 110,
  },
  headerPosterSize: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  titleAlignment: {
    flex: 2,
    alignContent: 'center',
    justifyContent: 'flex-end',
  },
  titleTextStyle: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  starView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default DisplayScreen;
