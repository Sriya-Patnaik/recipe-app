import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import TrendingSlider from './TredingSlider';
import { useParams, Link } from 'react-router-dom';

const SearchElement = () => {
    const { searchTerm } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = '829ad0824a03416caf4e8c2458580e0a'; // Replace 'YOUR_SPOONACULAR_API_KEY' with your actual API key
                const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${apiKey}`);
                const response = await api.json();

                setData(response.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [searchTerm]);

    return (
        <>
            <Navbar />
            <div style={{
                width: '90%',
                margin: 'auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
                gridGap: '1rem',
                marginTop: '2rem'
            }}>
                {data.map(recipe => (
                    <Link to={`/${recipe.id}`} className='link' key={recipe.id}>
                        <div style={{ textAlign: 'center' }}>
                            <div className="img">
                                <img src={recipe.image} alt={recipe.title} style={{ width: '13rem' }} />
                            </div>
                            <h3>{recipe.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
            <TrendingSlider />
        </>
    );
};

export default SearchElement;
