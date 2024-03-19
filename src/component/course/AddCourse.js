import React, { useState } from 'react';
import { Button, Form, Col, Row, Card, Container, CloseButton } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addCourse } from '../../redux/actions/courseActions';

function AddCourse() {
  const dispatch = useDispatch();
  const [course, setCourse] = useState({
    id: uuidv4(),
    title: '',
    chapters: [],
  });

  const handleAddChapter = () => {
    const newChapter = {
      id: (course.chapters.length + 1).toString(),
      title: '',
      lessons: [],
    };
    setCourse({ ...course, chapters: [...course.chapters, newChapter] });
  };

  const handleAddLesson = (chapterIndex) => {
    const updatedChapters = [...course.chapters];
    const lessonNumber = updatedChapters[chapterIndex].lessons.length + 1;
    const newLesson = { id: `${chapterIndex + 1}.${lessonNumber}`, title: '' };
    updatedChapters[chapterIndex].lessons.push(newLesson);
    
    setCourse({ ...course, chapters: updatedChapters });
  };

  const handleChapterTitleChange = (chapterIndex, newValue) => {
    const updatedChapters = [...course.chapters];
    updatedChapters[chapterIndex].title = newValue;
    setCourse({ ...course, chapters: updatedChapters });
  };

  const handleLessonTitleChange = (chapterIndex, lessonIndex, newValue) => {
    let updatedChapters = [...course.chapters];
    let updatedLessons = [...updatedChapters[chapterIndex].lessons];
    updatedLessons[lessonIndex].title = newValue;
    updatedChapters[chapterIndex].lessons = updatedLessons;
    setCourse({ ...course, chapters: updatedChapters });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const courseDataToSave = {
      id: course.id,
      title: course.title,
      chapters: course.chapters.map(chapter => ({
        id: chapter.id,
        title: chapter.title,
        lessons: chapter.lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title
        }))
      }))
    };

    dispatch(addCourse(courseDataToSave));
    setCourse({ id: uuidv4(), title: '', chapters: [] });
  };

  const handleDeleteChapter = (chapterIndex) => {
    const updatedChapters = course.chapters.filter((_, index) => index !== chapterIndex);
    setCourse({ ...course, chapters: updatedChapters });
  };

  const handleDeleteLesson = (chapterIndex, lessonIndex) => {
    let updatedChapters = [...course.chapters];
    let updatedLessons = updatedChapters[chapterIndex].lessons.filter((_, index) => index !== lessonIndex);
    updatedChapters[chapterIndex].lessons = updatedLessons;
    setCourse({ ...course, chapters: updatedChapters });
  };

  const isSubmitDisabled = course.title.trim() === '' ||
    course.chapters.some(chapter => chapter.title.trim() === '' || chapter.lessons.some(lesson => lesson.title.trim() === ''));

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
              value={course.title}
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
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
                  <CloseButton onClick={() => handleDeleteChapter(chapterIndex)} className="float-end" />
                </Col>
              </Form.Group>
              {chapter.lessons.map((lesson, lessonIndex) => (
                <Form.Group as={Row} className="mb-3" key={lesson.id}>
                  <Form.Label column sm={2}>
                    Lesson {lesson.id}:
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder={`Lesson ${lessonIndex + 1} title`}
                      value={lesson.title}
                      onChange={(e) => handleLessonTitleChange(chapterIndex, lessonIndex, e.target.value)}
                    />
                  </Col>
                  <Col sm={2}>
                    <CloseButton onClick={() => handleDeleteLesson(chapterIndex, lessonIndex)} className="float-end" />
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

        <Button variant="primary" onClick={handleAddChapter}>
          Add Chapter
        </Button>
        <Button variant="success" type="submit" className="ms-2" disabled={isSubmitDisabled}>
          Create Course
        </Button>
      </Form>
    </Container>
  );
}

export default AddCourse;