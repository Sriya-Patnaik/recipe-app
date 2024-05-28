import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import TrendingSlider from './TredingSlider';
import { useParams } from 'react-router-dom';

const RecipeId = () => {
    const { idMeal } = useParams();
    const [data, setData] = useState(null);
    const [active, setActive] = useState('ingredient');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = '829ad0824a03416caf4e8c2458580e0a'; // Replace 'YOUR_SPOONACULAR_API_KEY' with your actual API key
                const api = await fetch(`https://api.spoonacular.com/recipes/${idMeal}/information?apiKey=${apiKey}`);
                const response = await api.json();

                setData(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [idMeal]);

    return (
        <>
            <Navbar />
            {data && (
                <div style={{ width: '90%', margin: 'auto', textAlign: 'center' }}>
                    <h1>{data.title}</h1>
                    <div style={{ display: 'flex' }}>
                        <div className="img" style={{ width: '30%', marginTop: '2rem' }}>
                            <img src={data.image} alt={data.title} style={{ width: '18rem' }} />
                        </div>
                        <div className="content" style={{ width: '60%' }}>
                            <button className="btn" onClick={() => setActive('ingredient')}>Ingredient</button>
                            <button className="btn" onClick={() => setActive('instruction')}>Instruction</button>
                            {active === 'ingredient' ? (
                                <div>
                                    {data.extendedIngredients.map((ingredient, index) => (
                                        <div key={index} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                            {ingredient.original}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>{data.instructions}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div style={{ marginTop: '1rem' }}>
                <TrendingSlider />
            </div>
        </>
    );
};

export default RecipeId;
