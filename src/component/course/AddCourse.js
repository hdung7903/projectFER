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
      id: `chapter${course.chapters.length + 1}`,
      title: '',
      lessons: [],
    };
    setCourse({ ...course, chapters: [...course.chapters, newChapter] });
  };

  const handleAddLesson = (chapterId) => {
    const updatedChapters = course.chapters.map((chapter) => {
      if (chapter.id === chapterId) {
        const lessonNumber = chapter.lessons.length + 1;
        const chapterNumber = chapter.id.replace('chapter', '');
        const newLessonId = `${chapterNumber}.${lessonNumber}`;
        const newLesson = { id: newLessonId, title: '' };
        return { ...chapter, lessons: [...chapter.lessons, newLesson] };
      }
      return chapter;
    });
    setCourse({ ...course, chapters: updatedChapters });
  };

  const handleChapterTitleChange = (chapterId, newValue) => {
    const updatedChapters = course.chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return { ...chapter, title: newValue };
      }
      return chapter;
    });
    setCourse({ ...course, chapters: updatedChapters });
  };

  const handleLessonTitleChange = (chapterId, lessonId, newValue) => {
    const updatedChapters = course.chapters.map(chapter => {
      if (chapter.id === chapterId) {
        const updatedLessons = chapter.lessons.map(lesson => {
          if (lesson.id === lessonId) {
            return { ...lesson, title: newValue };
          }
          return lesson;
        });
        return { ...chapter, lessons: updatedLessons };
      }
      return chapter;
    });
    setCourse({ ...course, chapters: updatedChapters });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCourse(course));
    setCourse({ id: uuidv4(), title: '', chapters: [] });
  };

  const handleDeleteChapter = (chapterId) => {
    const updatedChapters = course.chapters.filter(chapter => chapter.id !== chapterId);
    setCourse({ ...course, chapters: updatedChapters });
  };

  const handleDeleteLesson = (chapterId, lessonId) => {
    const updatedChapters = course.chapters.map(chapter => {
      if (chapter.id === chapterId) {
        const updatedLessons = chapter.lessons.filter(lesson => lesson.id !== lessonId);
        return { ...chapter, lessons: updatedLessons };
      }
      return chapter;
    });
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
                    onChange={(e) => handleChapterTitleChange(chapter.id, e.target.value)}
                  />
                </Col>
                <Col sm={2}>
                  <CloseButton onClick={() => handleDeleteChapter(chapter.id)} className="float-end" />
                </Col>
              </Form.Group>
              {chapter.lessons.map((lesson) => (
                <Form.Group as={Row} className="mb-3" key={lesson.id}>
                  <Form.Label column sm={2}>
                    Lesson {lesson.id}:
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder={`Lesson ${lesson.id} title`}
                      value={lesson.title}
                      onChange={(e) => handleLessonTitleChange(chapter.id, lesson.id, e.target.value)}
                    />
                  </Col>
                  <Col sm={2}>
                    <CloseButton onClick={() => handleDeleteLesson(chapter.id, lesson.id)} className="float-end" />
                  </Col>
                </Form.Group>
              ))}
              <Button
                variant="secondary"
                onClick={() => handleAddLesson(chapter.id)}
              >
                Add Lesson
              </Button>
            </Card.Body>
          </Card>
        ))}

        <Button variant="primary" onClick={handleAddChapter} >
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