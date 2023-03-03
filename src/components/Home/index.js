import {useEffect, useState} from "react";
import "./Home.css"
import CheckboxSet from "../CheckboxSet";
import {useNavigate} from "react-router-dom";
import {formatCurrency} from "../../utils/formatters";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [categories, setCategories] = useState([{name: '', checked: true}]);
  const [characters, setCharacters] = useState([{name: '', checked: true}]);

  const navigate = useNavigate();

  const fetchProductsData = async () => {
    const response = await fetch('http://localhost:3001/products');

    if (!response.ok) {
      throw new Error('Products data could not be fetched!');
    }

    return await response.json();
  }

  const fetchCategoriesData = async () => {
    const response = await fetch('http://localhost:3001/categories');

    if (!response.ok) {
      throw new Error('Categories data could not be fetched!');
    }

    return await response.json();
  }

  const fetchCharactersData = async () => {
    const response = await fetch('http://localhost:3001/characters');

    if (!response.ok) {
      throw new Error('Characters data could not be fetched!');
    }

    return await response.json();
  }

  useEffect(() => {
    console.log('useEffect');
    fetchProductsData()
      .then((productsData) => {
        setAllProducts(productsData.data);
        setDisplayProducts(productsData.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
    fetchCategoriesData()
      .then((categoriesData) => {
        const categories = categoriesData.data.map((category) => {
          return {
            name: category,
            checked: true
          };
        });
        setCategories(categories);
      })
      .catch((e) => {
        console.log(e.message);
      });
    fetchCharactersData()
      .then((charactersData) => {
        const characters = charactersData.data.map((character) => {
          return {
            name: character,
            checked: true
          };
        });
        setCharacters(characters);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  useEffect(() => {
    const categoryNamesToInclude = categories
      .map((category) => {
        return category.checked ? category.name : null;
      })
      .filter((name) => {
        return name !== null;
      });

    const characterNamesToInclude = characters
      .map((character) => {
        return character.checked ? character.name : null;
      })
      .filter((name) => {
        return name !== null;
      });

    const productsToDisplay = allProducts
      .filter((product) => {
        return categoryNamesToInclude.includes(product.category)
          && characterNamesToInclude.includes(product.character);
      });

    setDisplayProducts(productsToDisplay);
  }, [categories, characters]);

  const handleCategoryCheckboxChange = (position) => {
    const updatedCategories = categories.map((category, index) => {
      return index === position ? {name: category.name, checked: !category.checked} : category;
    });

    setCategories(updatedCategories);
  };

  const handleCharacterCheckboxChange = (position) => {
    const updatedCheckedState = characters.map((character, index) => {
      return index === position ? {name: character.name, checked: !character.checked} : character;
    });

    setCharacters(updatedCheckedState);
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  }

  return (
    <div className="home">
      <aside>
        <CheckboxSet
          legend={'Categories'}
          checkboxData={categories}
          onChange={handleCategoryCheckboxChange}
        />
        <CheckboxSet
          legend={'Characters'}
          checkboxData={characters}
          onChange={handleCharacterCheckboxChange}
        />
      </aside>

      <main>
        {displayProducts.map((item, index) => {
          return (
            <div className="product-card"
              key={index}
              onClick={() => handleProductClick(item.id)}
            >
              <img src={item.image} alt={item.title}></img>
              <p>{item.title}</p>
              <p>{formatCurrency(item.price)}</p>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default Home;
