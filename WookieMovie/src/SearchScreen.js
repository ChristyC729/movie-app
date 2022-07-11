import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const SearchScreen = ({navigation}) => {
  const [text, onChangeText] = useState(''); // text is the value of the text input
  const [isLoading, setLoading] = useState(true);  // isLoading is the state of the loading indicator
  const [data, setData] = useState([]); // data is the state of the data

  // getSearch is run to get the data from the API
  const getSearch = async () => {
    const response = await fetch(
      `https://wookie.codesubmit.io/movies?q=${text}`,
      {
        headers: {
          Authorization: 'Bearer Wookie2019',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getSearch();
  }, [text]);

  // runs through the data and creates a list of movies that matches search
  const MovieList = item => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Results for {text}</Text>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={styles.scrollViewContent}
          contentInsetAdjustmentBehavior="automatic">
          {item.map(movie => {
            return getMovies(movie);
          })}
        </ScrollView>
      </View>
    );
  };

  // creates the movie card
  const getMovies = item => {
    return (
      <View key={item.id} style={styles.movieContainerView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Display', {movie: item})}
          style={styles.moviePressStyles}>
          <Image
            source={{uri: item.poster}}
            resizeMode="stretch"
            style={styles.movieImage}
          />
          <View style={styles.movieTitleView}>
            <Text style={styles.movieText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.searchHeader}>
      <View style={styles.searchContainer}>
        <View style={styles.wookieSearchView}>
          <Text style={styles.wookieSearch}>WOOKIE SEARCH</Text>
        </View>
        <TextInput
          style={styles.searchBar}
          onChangeText={onChangeText}
          value={text}
          placeholder="Search..."
        />
      </View>
      {text.length > 0 && !isLoading ? MovieList(data.movies) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchHeader: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 10,
  },
  searchBar: {
    width: 300,
    height: 35,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 25,
    fontFamily: 'Avenir Next',
    fontWeight: '600',
  },
  sectionContainer: {
    flex: 3,
    paddingHorizontal: 5,
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  movieContainerView: {
    height: 235,
    width: 116,
    marginVertical: 5,
    marginHorizontal: 2,
  },
  moviePressStyles: {
    flex: 1,
    alignContent: 'center',
  },
  movieImage: {
    height: 175,
    width: '100%',
    borderRadius: 10,
  },
  movieTitleView: {
    height: 70,
    justifyContent: 'center',
  },
  movieText: {
    fontSize: 15,
    fontFamily: 'Avenir Next',
    fontWeight: '400',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  wookieSearch: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 35,
    color: '#202945',
  },
  wookieSearchView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
export default SearchScreen;

/*   const onSearch = () => {
    const filteredData = data.movies.filter(movie => {
      return movie.title.toLowerCase().includes(text.toLowerCase());
    });
    return filteredData;
  }; */

/*   const [searchData, setSearchData] = useState([]);
  const [isSearchLoading, setSearchLoading] = useState(true); */

/*  const getData = async () => {
    console.log('Fetching data');
    const response = await fetch('https://wookie.codesubmit.io/movies', {
      headers: {
        Authorization: 'Bearer Wookie2019',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log('Fetched data');
        setData(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getData();
  }, []); */
