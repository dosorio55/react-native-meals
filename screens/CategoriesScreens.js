import { FlatList } from 'react-native'
import CategoryGridTile from '../components/CategoryGridTile'
import { CATEGORIES } from '../data/dummy-data'


function CategoriesScreens({ navigation }) {
    function renderCategoryItem(itemData) {
    
        function pressHandler(title) {
            navigation.navigate('Meals Overview');
        }
        return <CategoryGridTile title={itemData.item.title} color={itemData.item.color}
            pressHandler={pressHandler} />
    };
    
    return (
        <FlatList data={CATEGORIES} keyExtractor={item => item.id} renderItem={renderCategoryItem} numColumns={2} />
    )
}

export default CategoriesScreens