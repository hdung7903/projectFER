import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function AddVideo() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedChapter, setSelectedChapter] = useState('');
    const [selectedLesson, setSelectedLesson] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [showAddAlert, setShowAddAlert] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
        setSelectedChapter('');
        setSelectedLesson('');
    };

    const handleChapterChange = (e) => {
        setSelectedChapter(e.target.value);
        setSelectedLesson('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newVideo = {
            name,
            description,
            link,
            courseId: selectedCourse,
            chapterId: selectedChapter,
            lessonId: selectedLesson,
        };

        try {
            await axios.post('http://localhost:8000/videos', newVideo);

            const updatedCourses = [...courses];

            const courseIndex = updatedCourses.findIndex(course => course.id === selectedCourse);
            if (courseIndex === -1) {
                console.error('Course not found');
                return;
            }

            const updatedCourse = JSON.parse(JSON.stringify(updatedCourses[courseIndex]));

            const chapterToUpdate = updatedCourse.chapters.find(chapter => chapter.id === selectedChapter);
            if (!chapterToUpdate) {
                console.error('Chapter not found');
                return;
            }

            const lessonToUpdate = chapterToUpdate.lessons.find(lesson => lesson.id === selectedLesson);
            if (!lessonToUpdate) {
                console.error('Lesson not found');
                return;
            }
            lessonToUpdate.link = link; 

            updatedCourses[courseIndex] = updatedCourse;


            await axios.put(`http://localhost:8000/courses/${selectedCourse}`, updatedCourse);

            setShowAddAlert(true);
            setName('');
            setDescription('');
            setLink('');
            setSelectedCourse('');
            setSelectedChapter('');
            setSelectedLesson('');
            setCourses(updatedCourses);
        } catch (error) {
            console.error('Error adding video:', error);
        }
    };

    return (
        <Container className='pt-5'>
        <Card>
            <Card.Header as="h5">
                <FontAwesomeIcon icon={faVideo} className="me-2" />Create a New Video
            </Card.Header>
            <Card.Body>
                {showAddAlert && (
                    <Alert variant="success" onClose={() => setShowAddAlert(false)} dismissible>
                        Video added successfully!
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Name</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                placeholder="Enter video name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Description</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                placeholder="Enter a short description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Link</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                placeholder="Enter video link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Select Course</Form.Label>
                        <Col sm="9">
                            <Form.Control as="select" value={selectedCourse} onChange={handleCourseChange}>
                                <option value="">Select a course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>{course.title}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    {selectedCourse && (
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">Select Chapter</Form.Label>
                            <Col sm="9">
                                <Form.Control as="select" value={selectedChapter} onChange={handleChapterChange}>
                                    <option value="">Select a chapter</option>
                                    {courses.find(course => course.id === selectedCourse)?.chapters.map((chapter) => (
                                        <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    )}
                    {selectedChapter && (
                        <fieldset className="mb-3">
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={3}>
                                    Select Lesson
                                </Form.Label>
                                <Col sm={9}>
                                    {courses
                                        .find(course => course.id === selectedCourse)
                                        ?.chapters.find(chapter => chapter.id === selectedChapter)
                                        ?.lessons.map((lesson) => (
                                            <Form.Check
                                                type="radio"
                                                label={lesson.title}
                                                name="lessonRadios"
                                                id={`lesson-${lesson.id}`}
                                                key={lesson.id}
                                                value={lesson.id}
                                                checked={selectedLesson === lesson.id}
                                                onChange={(e) => setSelectedLesson(e.target.value)}
                                            />
                                    ))}
                                </Col>
                            </Form.Group>
                        </fieldset>
                    )}
                    <div className="d-grid">
                        <Button variant="primary" type="submit">
                            <FontAwesomeIcon icon={faPlusCircle} className="me-2" />Add Video
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    </Container>
    );
}

export default AddVideo;