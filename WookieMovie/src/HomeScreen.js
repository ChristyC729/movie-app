import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const HomeScreen = ({navigation, props}) => {
  const [isLoading, setLoading] = useState(true); // isLoading is the state of the loading indicator
  const [data, setData] = useState([]); // data is the state of the data
  const [genreList, setGenre] = useState(new Set()); // genreList is the state of the genre list

  // getMovie generates the movie card
  const getMovies = (item, genre) => {
    return (
      <View key={item.id + genre} style={styles.movieCard}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Display', {movie: item})}
          style={styles.moviePressStyle}>
          <Image
            source={{uri: item.poster}}
            resizeMode="stretch"
            style={styles.moviePoster}
          />
          <View
            style={styles.movieContainer}>
            <Text style={styles.movieTitle}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // generates the Genre Sections
  const GenreSection = (item, title) => {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.dividerStyle}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{flexGrow: 1}}
          contentInsetAdjustmentBehavior="automatic">
          {item.map(movie => {
            return getMovies(movie, title);
          })}
        </ScrollView>
      </View>
    );
  };
 // getData runs the API call to get the data
  const getData = async () => {
    const response = await fetch('https://wookie.codesubmit.io/movies', {
      headers: {
        Authorization: 'Bearer Wookie2019',
      },
    })
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  //fetch initial data
  useEffect(() => {
    getData();
  }, []);

  // grabs all exists genres and adds them to the genreList
  const getGenre = movies => {
    movies.map(movie =>
      movie.genres.map(genre => setGenre(prev => new Set(prev).add(genre))),
    );
  };

  useEffect(() => {
    {
      !isLoading ? getGenre(data.movies) : null;
    }
  }, [isLoading]);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      contentInsetAdjustmentBehavior="automatic">
      <View
        style={styles.ScrollViewFrame}>
        {genreList.size != 0
          ? [...genreList].map(genre => {
              const movieList = data.movies.filter(movie =>
                movie.genres.includes(genre),
              );
              return GenreSection(movieList, genre);
            })
          : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dividerStyle: {
    borderBottomWidth: 2,
    borderBottomColor: '#202945',
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: '#202945',
  },
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 5,
    width: '100%',
  },
  ScrollViewFrame:{
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  movieCard: {
    height: 235,
    width: 116,
    marginVertical: 5,
    marginHorizontal: 2,
  },
  moviePoster: {
    height: 175,
    width: '100%',
    borderRadius: 10,
  },
  moviePressStyle: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    height: 70,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});
export default HomeScreen;
