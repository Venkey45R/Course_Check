// import React, { useEffect, useState } from 'react';
// import NavBar from './NavBar';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Course() {
//     const [courses, setCourses] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get('http://localhost:3001/courses')
//             .then(res => {
//                 setCourses(res.data);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }, []);

//     const handleClick = (id) => {
//         navigate(`/rate/${id}`);
//     };

//     return (
//         <div className='min-h-screen text-white bg-black'>
//             <NavBar />
//             <div className='grid grid-cols-1 gap-20 p-10 md:grid-cols-2 lg:grid-cols-3'>
//                 {courses.map((course) => (
//                     <div 
//                         key={course._id} 
//                         onClick={() => handleClick(course._id)}
//                         className='relative max-w-xl p-6 bg-gray-700 border border-white rounded-lg cursor-pointer'
//                     >
//                         <h2 className='mb-2 text-xl font-bold'>{course.name}</h2>
//                         <p className='mb-2 text-white'>Platform: {course.platform}</p>
//                         <p className='mb-2 text-white'>Rating: {course.rating} ⭐</p>
//                         <p className='mb-2 text-white'>Price: ${course.price}</p>
//                         <p className='mb-2 text-white'>{course.description}</p>
//                         <p className='text-white'>Category: {course.category}</p>
//                         <div className='pt-4 mt-4 border-t border-gray-500'>
//                             <h3 className='mb-2 text-lg font-semibold'>Comments:</h3>
//                             {course.comments && course.comments.length > 0 ? (
//                                 <ul className='space-y-2'>
//                                     {course.comments.map((comment, index) => (
//                                         <li key={index} className='p-3 bg-gray-800 rounded'>
//                                             <p className='text-sm font-semibold text-blue-400'>{comment.email} : </p>
//                                             <p className='text-white'>{comment.text}</p>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p className='text-gray-400'>No comments yet.</p>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Course;


import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Course() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/courses')
            .then(res => {
                setCourses(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleClick = (id) => {
        navigate(`/rate/${id}`);
    };

    return (
        <div className='min-h-screen text-white bg-black'>
            <NavBar />
            <div className='grid grid-cols-1 gap-20 p-10 md:grid-cols-2 lg:grid-cols-3'>
                {courses.map((course) => (
                    <div 
                        key={course._id} 
                        onClick={() => handleClick(course._id)}
                        className='relative max-w-xl p-6 bg-gray-700 border border-white rounded-lg cursor-pointer'
                    >
                        <h2 className='mb-2 text-xl font-bold'>{course.name}</h2>
                        <p className='mb-2 text-white'>Platform: {course.platform}</p>
                        <p className='mb-2 text-white'>Rating: {(course.rating).toFixed(2)} ⭐</p>
                        <p className='mb-2 text-white'>Price: ${course.price}</p>
                        <p className='mb-2 text-white'>{course.description}</p>
                        <p className='text-white'>Category: {course.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Course;
