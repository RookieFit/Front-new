import React, { useState } from 'react';

const FoodSearchBar = ({ onSearch, searchTerm }) => {
	const handleInputChange = (e) => {
		if (onSearch) {
			onSearch(e.target.value);
		}
	};

	return (
		<div className="w-full p-4">
			<input
				type="text"
				className="w-full p-2 border border-gray-300 rounded-md"
				placeholder="음식 목록 검색"
				value={searchTerm}
				onChange={handleInputChange}
			/>
		</div>
	);
};

export default FoodSearchBar;
