import React, {useState, ReactNode, useEffect} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import _ from 'lodash';
import {CharacterFilter} from "../../types/filter-types";
import {Picker} from '@react-native-picker/picker';
import {filterStyle} from "./style";
import {globalStyles} from "../../layout/style";
import {useDispatch} from "react-redux";


const FilterCharacterComponent: React.FC = () => {

    const [selectedStatus, setSelectedStatus] = useState('');
    const dispatch = useDispatch();

    const onFilterChanged = _.debounce((charName: string) => {
        dispatch({type: 'characterList/setCharacterFilter', payload: {name: charName}});
    }, 500);

    const options = [
        { value: '', label: 'egal' },
        { value: 'alive', label: 'am Leben' },
        { value: 'dead', label: 'tot' }
    ]

    const handleInputChange = (inputValue: string) => {
        onFilterChanged(inputValue);
    };

    return (
        <View style={filterStyle.container}>
            <TextInput  placeholderTextColor={'rgba(0,0,0,0.3)'} style={globalStyles.inputs} placeholder={'Name'} onChangeText={handleInputChange}/>
            <Picker
                itemStyle={filterStyle.picker}
                placeholder={'ABC'}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedStatus(itemValue)
                }>
                <Picker.Item label="Alle" value="" />
                <Picker.Item label="Lebend" value="alive" />
                <Picker.Item label="Tot" value="dead" />
            </Picker>
        </View>
    );
};


export default FilterCharacterComponent;