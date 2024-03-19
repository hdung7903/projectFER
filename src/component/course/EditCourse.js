import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Col, Row, Card, Container, CloseButton } from 'react-bootstrap';
import { fetchCourses } from '../../redux/actions/courseActions';

function EditCourse() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const courses = useSelector(state => state.course.courses);
    const [course, setCourse] = useState({
        id: '',
        title: '',
        chapters: []
    });
    
    const courseToEdit = courses.find(course => course.id === id);

    useEffect(() => {
        if (courseToEdit) {
            setCourse(courseToEdit);
        } else {
            dispatch(fetchCourses());
        }
    }, [dispatch, courseToEdit, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const handleChapterTitleChange = (chapterIndex, newTitle) => {
        setCourse((prevCourse) => {
            return { 
                ...prevCourse, 
                chapters: prevCourse.chapters.map((chapter, index) => 
                    index === chapterIndex ? { ...chapter, title: newTitle } : chapter
                )
            };
        });
    };

    const handleAddLesson = (chapterIndex) => {
        setCourse((prevCourse) => {
            const newChapters = [...prevCourse.chapters];
            const newLesson = { id: 'new', title: '' }; 
            newChapters[chapterIndex].lessons.push(newLesson);
            return { ...prevCourse, chapters: newChapters };
        });
    };

    const handleDeleteChapter = (chapterId) => {
        setCourse((prevCourse) => ({
            ...prevCourse,
            chapters: prevCourse.chapters.filter(chapter => chapter.id !== chapterId)
        }));
    };

    const handleLessonTitleChange = (chapterIndex, lessonIndex, newTitle) => {
        setCourse((prevCourse) => {
            const newChapters = [...prevCourse.chapters];
            newChapters[chapterIndex].lessons[lessonIndex].title = newTitle;
            return { ...prevCourse, chapters: newChapters };
        });
    };

    const handleDeleteLesson = (chapterIndex, lessonId) => {
        setCourse((prevCourse) => {
            const newChapters = [...prevCourse.chapters];
            newChapters[chapterIndex].lessons = newChapters[chapterIndex].lessons.filter(lesson => lesson.id !== lessonId);
            return { ...prevCourse, chapters: newChapters };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // dispatch(updateCourse(course.id, course));
        navigate('/');
    };

    return (
        <Container className='my-4'>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Course Title:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Enter course title"
                            name="title"
                            value={course.title}
                            onChange={handleInputChange}
                        />
                    </Col>
                </Form.Group>
                {course.chapters.map((chapter, chapterIndex) => (
                    <Card className="mb-3" key={chapter.id}>
                        <Card.Body>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>
                                    Chapter Title:
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                        type="text"
                                        placeholder={`Chapter ${chapterIndex + 1} title`}
                                        value={chapter.title}
                                        onChange={(e) => handleChapterTitleChange(chapterIndex, e.target.value)}
                                    />
                                </Col>
                                <Col sm={2}>
                                    <CloseButton onClick={() => handleDeleteChapter(chapter.id)} className="float-end" />
                                </Col>
                            </Form.Group>
                            {chapter.lessons.map((lesson, lessonIndex) => (
                                <Form.Group as={Row} className="mb-3" key={lesson.id}>
                                    <Form.Label column sm={2}>
                                        Lesson {lessonIndex + 1}:
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control
                                            type="text"
                                            placeholder={`Lesson title`}
                                            value={lesson.title}
                                            onChange={(e) => handleLessonTitleChange(chapterIndex, lessonIndex, e.target.value)}
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <CloseButton onClick={() => handleDeleteLesson(chapterIndex, lesson.id)} className="float-end" />
                                    </Col>
                                </Form.Group>
                            ))}
                            <Button
                                variant="secondary"
                                onClick={() => handleAddLesson(chapterIndex)}
                            >
                                Add Lesson
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
                <Button variant="success" type="submit">
                    Update Course
                </Button>
            </Form>
        </Container>
    );
}

export default EditCourse;