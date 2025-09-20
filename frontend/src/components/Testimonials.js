import React, { useState } from 'react';
import './Testimonials.css';

const testimonials = [
    {
        quote: 'I was hesitant to report what I saw, but Campus Safe made it easy and I felt secure knowing it was anonymous. It feels good to know I helped make our campus safer.',
        author: 'Jamie L., Student'
    },
    {
        quote: 'The resources on this platform are incredibly helpful. I learned so much about substance abuse and how to support my friends. It’s a valuable tool for any student.',
        author: 'Alex R., Peer Counselor'
    },
    {
        quote: 'As a parent, knowing my child has access to a platform like this provides immense peace of mind. Thank you for creating a safe space for students to speak up.',
        author: 'Sarah P., Parent'
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === testimonials.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <section className="full-width-section bg-white">
            <div className="container">
                <h2>What Our Community is Saying</h2>
                <div className="testimonial-carousel">
                    <button onClick={goToPrevious} className="carousel-btn prev-btn">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className="testimonial-slide">
                        <p className="testimonial-quote">"{testimonials[currentIndex].quote}"</p>
                        <p className="testimonial-author">- {testimonials[currentIndex].author}</p>
                    </div>
                    <button onClick={goToNext} className="carousel-btn next-btn">
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
