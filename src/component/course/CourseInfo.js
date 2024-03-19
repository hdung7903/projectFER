import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, ListGroup, Accordion, Spinner, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

function CourseInfo() {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourseInfo();
  }, [id]);

  const fetchCourseInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Failed to fetch course info:', error);
    }
  };


  const renderIframe = (link) => {
    const videoId = extractVideoID(link);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
      <div className="ratio ratio-16x9">
      <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        width="100%"
        height="300" 
      ></iframe>
      </div>
    );
  };

  const extractVideoID = (link) => {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = link.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <Container className="pt-4">
    <h1>{course?.title || 'Course Info'}</h1>
    <Accordion defaultActiveKey="0" flush>
      {course?.chapters.map((chapter, index) => (
        <Card key={index} className="mb-3">
          <Accordion.Item eventKey={`chapter-${index}`}>
            <Accordion.Header>
              <FontAwesomeIcon icon={faAngleDown} className="me-2" />
              {chapter.title}
            </Accordion.Header>
            <Accordion.Body>
              {chapter.lessons.map((lesson, idx) => (
                <Accordion defaultActiveKey="0" flush key={idx}>
                  <Accordion.Item eventKey={`lesson-${idx}`}>
                    <Accordion.Header>
                      <FontAwesomeIcon icon={faPlayCircle} className="me-2" />
                      {lesson.title}
                    </Accordion.Header>
                    <Accordion.Body>
                      {lesson.link && renderIframe(lesson.link)}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Card>
      ))}
    </Accordion>
  </Container>
  );
}

export default CourseInfo;