-- Create the reports table
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new'
);

-- Create the counselors table
CREATE TABLE counselors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    phone TEXT,
    email TEXT
);

-- Create the resources table
CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT
);

-- Insert sample data into the counselors table
INSERT INTO counselors (name, role, phone, email) VALUES
('Dr. Anjali Sharma', 'Lead Campus Counselor', '+91 000 000 0001', 'a.sharma@university.edu'),
('Mr. Rohan Verma', 'Student Wellness Advisor', '+91 000 000 0002', 'r.verma@university.edu'),
('National Drug De-addiction Helpline', '24/7 Toll-Free Support', '1800-11-0031', 'info@helpline.gov');

-- Insert sample data into the resources table
INSERT INTO resources (title, url, thumbnail_url) VALUES
('Understanding Drug Addiction', '#', 'https://placehold.co/600x400/1a73e8/ffffff?text=Video+1'),
('Myths vs. Facts About Party Drugs', '#', 'https://placehold.co/600x400/1a73e8/ffffff?text=Video+2'),
('Healthy Coping Strategies for Stress', '#', 'https://placehold.co/600x400/1a73e8/ffffff?text=Video+3'),
('How to Help a Friend Who Might Be Struggling', '#', 'https://placehold.co/600x400/1a73e8/ffffff?text=Video+4'),
('Navigating Peer Pressure in College', '#', 'https://placehold.co/600x400/1a73e8/ffffff?text=Video+5'),
('The Link Between Substance Use and Mental Health', '#', 'https://placehold.co/600x400/1a73e8/ffffff?text=Video+6');
