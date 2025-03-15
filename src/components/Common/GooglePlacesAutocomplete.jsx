import React, { useRef, useState } from 'react';
import ApiClient from '../../services/ApiClient';
import PropTypes from 'prop-types';

const GooglePlacesAutocomplete = ({ onSelectAddress, placeholder }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    let debounceTimer = useRef(null);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(async () => {
            if (value.length > 2) {
                try {
                    const response = await ApiClient.get(`/places/autocomplete?query=${value}`);
                    setSuggestions(response.data);
                } catch (error) {
                    console.log("자동완성 요청 실패", error);
                }
            } else {
                setSuggestions([]);
            }
        }, 500);
    };

    const handleSelect = (address) => {
        setQuery(address);
        setSuggestions([]);
        onSelectAddress(address);
    };

    return (
        <div className="flex flex-col w-full h-full m-3">
            <div className='flex flex-col'>
                <label>주소</label>
                <input
                    id="autocomplete"
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className='border p-1 rounded'
                />
            </div>
            <div>
                {suggestions.length > 0 && (
                    <ul className="absolute bg-white border w-1/4 max-h-[120px] overflow-auto">
                        {suggestions.map((address, index) => (
                            <li key={index} onClick={() => handleSelect(address)} className="p-2 hover:bg-gray-200 cursor-pointer">
                                {address}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

GooglePlacesAutocomplete.propTypes = {
    onSelectAddress: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

export default GooglePlacesAutocomplete;
