import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Rate() {
    const { id } = useParams();
    const [course, setCourse] = useState('');
    const [ratings, setRatings] = useState([]);
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    
    useEffect(() => {
        axios.post('http://localhost:3001/rate', { id })
            .then(res => {
                setCourse(res.data);
            })
            .catch(err => {
                console.log(err);
            });

        // Fetch the ratings for the bar chart
        axios.post('http://localhost:3001/getRatings', { id })
            .then(res => {
                setRatings(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating <= 5 && rating >= 0) {
            axios.post('http://localhost:3001/update', { id, rating, comment, email })
                .then(res => {
                    console.log(res.data);
                    setCourse(res.data);
                    setRating(5);
                    setComment('');
                    setEmail('');
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            alert("Rating should be between 0 and 5");
        }
    };
    const ratingRanges = [0, 0, 0, 0, 0];
    ratings.forEach(r => {
        const ratingValue = r.rating;
        if (ratingValue >= 0 && ratingValue < 1) ratingRanges[0]++;
        else if (ratingValue >= 1 && ratingValue < 2) ratingRanges[1]++;
        else if (ratingValue >= 2 && ratingValue < 3) ratingRanges[2]++;
        else if (ratingValue >= 3 && ratingValue < 4) ratingRanges[3]++;
        else if (ratingValue >= 4 && ratingValue <= 5) ratingRanges[4]++;
    });

    const chartData = {
        labels: ['0-1', '1-2', '2-3', '3-4', '4-5'],
        datasets: [
            {
                label: 'Number of Ratings',
                data: ratingRanges,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-10 text-white bg-gray-900">
            <div className="w-full max-w-3xl p-8 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                <h1 className="mb-6 text-3xl font-bold text-center">{course.name}</h1>
                <div className="mb-8 space-y-3">
                    <p><strong>Platform:</strong> {course.platform}</p>
                    <p><strong>Category:</strong> {course.category}</p>
                    <p><strong>Price:</strong> ${course.price}</p>
                    <p><strong>Rating:</strong> {course.rating ? course.rating.toFixed(2) : "N/A"} ⭐</p>
                    <p><strong>Description:</strong> {course.description}</p>
                </div>
                
                <h2 className="mb-4 text-2xl font-semibold text-center">Ratings Distribution</h2>
                <div className="mb-8">
                    <Bar data={chartData} />
                </div>
                
                <h2 className="mb-4 text-2xl font-semibold text-center">Rate this Course</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="email" className="text-lg">Your Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="rating" className="text-lg">Your Rating (1-5)</label>
                        <input
                            id="rating"
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                            placeholder="Enter your rating"
                            required
                        />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="comment" className="text-lg">Your Comments</label>
                        <textarea
                            id="comment"
                            rows="4"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                            placeholder="Share your thoughts on this course"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 font-semibold text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Submit Review
                    </button>
                </form>
                <div className="mt-8">
                    <h3 className="mb-2 text-lg font-semibold">Comments:</h3>
                    {course.comments && course.comments.length > 0 ? (
                        <ul className="space-y-2">
                            {course.comments.map((comment, index) => (
                                <li key={index} className="p-3 bg-gray-800 border-b border-gray-600 rounded">
                                    <p className="text-sm font-semibold text-blue-400">{comment.email}:</p>
                                    <div className='my-2 '>
                                        <a href={`mailto:${comment.email}?subject=Hello, Discussion about comment in course check reg...`} className='px-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500'>
                                            Mail
                                        </a>
                                    </div>
                                    <p className="text-white">{comment.text}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Rate;
