import React, { useState } from 'react';
import './Faq.css';

const faqs = [
    {
        question: 'Is my report truly anonymous?',
        answer: 'Yes, all reports are 100% anonymous. We do not track IP addresses or any personally identifiable information. Our system is designed to protect your privacy while allowing you to voice your concerns.'
    },
    {
        question: 'What kind of incidents should I report?',
        answer: 'You can report any non-emergency incidents that you believe violate campus policy or compromise student safety. This includes, but is not limited to, drug or alcohol abuse, harassment, bullying, and academic integrity violations.'
    },
    {
        question: 'What happens after I submit a report?',
        answer: 'Once submitted, your report is securely transmitted to the appropriate campus administrators for review. They will take appropriate action based on the information provided. You will not be contacted unless you voluntarily provide contact information.'
    },
    {
        question: 'Can I get help for myself or a friend?',
        answer: 'Absolutely. Our platform provides a comprehensive list of resources, including contact information for campus counselors, therapists, and national support helplines. Please visit the "Get Help" page for more information.'
    }
];

const FaqItem = ({ faq, index, toggleFAQ }) => {
    return (
        <div className={`faq-item ${faq.open ? 'open' : ''}`}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h4>{faq.question}</h4>
                <span className="material-symbols-outlined">{faq.open ? 'remove' : 'add'}</span>
            </div>
            <div className="faq-answer">
                <p>{faq.answer}</p>
            </div>
        </div>
    );
};

const Faq = () => {
    const [faqList, setFaqList] = useState(
        faqs.map(faq => ({ ...faq, open: false }))
    );

    const toggleFAQ = index => {
        setFaqList(
            faqList.map((faq, i) => {
                if (i === index) {
                    faq.open = !faq.open;
                } else {
                    faq.open = false;
                }
                return faq;
            })
        );
    };

    return (
        <section className="full-width-section bg-light">
            <div className="container">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-container">
                    {faqList.map((faq, index) => (
                        <FaqItem key={index} faq={faq} index={index} toggleFAQ={toggleFAQ} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
