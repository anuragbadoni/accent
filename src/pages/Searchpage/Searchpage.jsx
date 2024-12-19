import React from "react";
import "./Searchpage.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { getUserSearch } from "../../api/UserApi";
import UserCard from "../../components/UserCard/UserCard";

const Searchpage = () => {
	// to store the search query
	const [query, setQuery] = useState("");

	// To store the search results
	const [results, setResults] = useState(null);

	// To store the error
	const [error, setError] = useState(null);

	// to remove whitespaces from query
	const removeWhiteSpace = (str) => {
		return /\s/g.test(str);
	};

	// to handle the query change
	
	const handleQueryChange = (e) => {
		if (removeWhiteSpace(e.target.value)) {
			return;
		} else {
			setQuery(e.target.value);
		}
	};

	// to handle search
	const handleSearch = async (e) => {
		e.preventDefault();
		setResults(null);
		setError(null);

		if (query !== "") {
			try {
				const res = await getUserSearch(query);
				setResults(res.data);
			} catch (error) {
				setError(
					"There was a problem getting your results. Please try with a different search term. Your search query should contain only one word"
				);
			}
		}
	};

	return (
		<div className="searchpage">
			<div className="searchpage__container container">
				{/* Search Bar */}
				<div className="searchpage__searchbar--container">
					<h1 className="searchbar__heading">Accent - Search</h1>
					<p className="searchbar__desc">Find Creators across the globe</p>
					<form className="searchbar" onSubmit={handleSearch}>
						<input
							type="text"
							className="searchbar__input"
							placeholder="Search username or firstname"
							value={query}
							onChange={handleQueryChange}
						/>
						<button className="searchbar__btn" type="submit">
							<FaSearch />
						</button>
					</form>
				</div>
				{/* Error */}
				{error && <p>{error}</p>}

				{/* No Results */}
				{!results && <p className="searchpage--noresults">No results found!</p>}

				{/* Results Section */}
				{results && (
					<div className="searchpage__results">
						{results.map((user) => (
							<UserCard user={user} key={user._id} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Searchpage;
