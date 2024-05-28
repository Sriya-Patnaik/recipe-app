import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import TrendingSlider from './TredingSlider';

const Category = () => {
    const { name } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = '829ad0824a03416caf4e8c2458580e0a'; // Replace 'YOUR_SPOONACULAR_API_KEY' with your actual API key
                const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${name}&apiKey=${apiKey}`);
                const response = await api.json();

                if (!response.results) {
                    setError("No recipes found.");
                    return;
                }

                setData(response.results);
            } catch (error) {
                setError("Error fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [name]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
                                <img src={recipe.image} alt="" style={{ width: '13rem' }} />
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

export default Category;
