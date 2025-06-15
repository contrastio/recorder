import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>About Recorder</h1>
      <p>
        This is a React application for recording video and audio from your
        camera and microphone. It provides various layout options and
        picture-in-picture functionality.
      </p>
      <p>Use keyboard shortcuts:</p>
      <ul>
        <li>
          <strong>E</strong> - Toggle camera
        </li>
        <li>
          <strong>D</strong> - Toggle microphone
        </li>
      </ul>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          color: '#0077cc',
          textDecoration: 'none',
        }}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default About;
