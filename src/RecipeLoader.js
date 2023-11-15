import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, KeyboardAvoidingView, Dimensions, useWindowDimensions} from "react-native";

import Cards from "./Cards";
import Filter from "./Filter";

import { DATA } from "./data";

const RecipeLoader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(DATA);

  const { height, width } = useWindowDimensions();
  const [isPortrait, setIsPortrait] = useState(height > width);
  useEffect(() => {
    const handleOrientationChange = () => {
      const { height, width } = Dimensions.get("window");
      setIsPortrait(height > width);
    };

    Dimensions.addEventListener("change", handleOrientationChange);

    return () => {
      Dimensions.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filtered = DATA.filter((recipe) =>
      recipe.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleFilterChange = (selectedCountry) => {
    console.log("Selected Country:", selectedCountry);

    if (!selectedCountry) {
      setFilteredRecipes(DATA);
      return;
    }

    const filtered = DATA.filter((recipe) =>
      recipe.originCountry.toLowerCase() === selectedCountry.toLowerCase()
    );
    setFilteredRecipes(filtered);
  };

  
  return (
    <KeyboardAvoidingView>
      <Filter
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange} 
      />

      <FlatList
        style={isPortrait ? styles.portraitCard : styles.landscapeCard}
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Cards recipe={item} />}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  portraitCard: {
    marginBottom: 580
  },
  landscapeCard: {
    marginBottom: 180
  },
});



export default RecipeLoader;
