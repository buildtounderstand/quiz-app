import { useState } from 'react'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import './App.css'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const questions = [
  // Extraversion (was question 4)
  {
    trait: 'Extraversion',
    question: 'I am the life of the party.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  // Agreeableness
  {
    trait: 'Agreeableness',
    question: 'I am interested in people and sympathize with others’ feelings.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    trait: 'Agreeableness',
    question: 'I take time out for others and make people feel at ease.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
  },
  // Neuroticism
  {
    trait: 'Neuroticism',
    question: 'I get stressed out easily and worry about things.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  },
  {
    trait: 'Neuroticism',
    question: 'I often feel blue and experience mood swings.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
  // 5 image-only questions, each with 4 unique watercolour-style images
  {
    trait: 'Visual',
    question: 'Choose the image that resonates with you most:',
    imageOptions: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', // Watercolour Paris
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', // Watercolour Abstract
      'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80', // Watercolour Desk
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', // Watercolour Mars
    ],
  },
  {
    trait: 'Visual',
    question: 'Pick the picture that best fits your mood:',
    imageOptions: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', // Watercolour Paris
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', // Watercolour Abstract
      'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80', // Watercolour Desk
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', // Watercolour Mars
    ],
  },
  {
    trait: 'Visual',
    question: 'Which of these images do you find most calming?',
    imageOptions: [
      'https://images.unsplash.com/photo-1465101053361-7630a1c470df?auto=format&fit=crop&w=400&q=80', // Watercolour Forest
      'https://images.unsplash.com/photo-1465101062926-1c29b7b0a1b0?auto=format&fit=crop&w=400&q=80', // Watercolour Lake
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', // Watercolour Blue
      'https://images.unsplash.com/photo-1465101077034-6e1b497c8a2e?auto=format&fit=crop&w=400&q=80', // Watercolour Art1
    ],
  },
  {
    trait: 'Visual',
    question: 'Select the artwork you like most:',
    imageOptions: [
      'https://images.unsplash.com/photo-1465101083432-2c1c1e1b1b1b?auto=format&fit=crop&w=400&q=80', // Watercolour Art2
      'https://images.unsplash.com/photo-1465101092926-1c29b7b0a1b0?auto=format&fit=crop&w=400&q=80', // Watercolour Art3
      'https://images.unsplash.com/photo-1465101103361-7630a1c470df?auto=format&fit=crop&w=400&q=80', // Watercolour Art4
      'https://images.unsplash.com/photo-1465101113784-d120267933ba?auto=format&fit=crop&w=400&q=80', // Watercolour Inspire1
    ],
  },
  {
    trait: 'Visual',
    question: 'Pick the image that inspires you most:',
    imageOptions: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80', // Watercolour Books
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', // Watercolour Ocean
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80', // Watercolour Social
      'https://images.unsplash.com/photo-1465101128034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', // Watercolour Inspire2
    ],
  },
  // 5 slider questions
  {
    trait: 'Openness',
    question: 'I enjoy thinking about abstract concepts.',
    type: 'slider',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80', // Watercolour abstract
  },
  {
    trait: 'Conscientiousness',
    question: 'I like order and regularity in my life.',
    type: 'slider',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', // Watercolour organized
  },
  {
    trait: 'Extraversion',
    question: 'I am talkative and outgoing.',
    type: 'slider',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80', // Watercolour social
  },
  {
    trait: 'Agreeableness',
    question: 'I make people feel welcome.',
    type: 'slider',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80', // Watercolour empathy
  },
  {
    trait: 'Neuroticism',
    question: 'I often feel anxious or worried.',
    type: 'slider',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', // Watercolour emotion
  },
];

const likertOptions = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
];

const traitDescriptions = {
  Openness: {
    high: 'You are creative, curious, and open to new experiences.',
    medium: 'You are practical but open-minded.',
    low: 'You prefer routine and familiar experiences.'
  },
  Conscientiousness: {
    high: 'You are organized, reliable, and self-disciplined.',
    medium: 'You are reasonably reliable and organized.',
    low: 'You may be more spontaneous and less detail-oriented.'
  },
  Extraversion: {
    high: 'You are outgoing, energetic, and enjoy socializing.',
    medium: 'You enjoy socializing but also value alone time.',
    low: 'You are reserved and enjoy solitude.'
  },
  Agreeableness: {
    high: 'You are compassionate, cooperative, and value getting along with others.',
    medium: 'You are generally warm but can be firm when needed.',
    low: 'You are more analytical and less concerned with others’ feelings.'
  },
  Neuroticism: {
    high: 'You are sensitive and prone to stress or worry.',
    medium: 'You experience some stress but generally cope well.',
    low: 'You are calm, resilient, and emotionally stable.'
  },
};

function getTraitLevel(score, maxScore) {
  if (score >= maxScore * 0.8) return 'high';
  if (score >= maxScore * 0.4) return 'medium';
  return 'low';
}

// Personalized endings for each dominant trait
const endings = {
  Openness: [
    "Your high Openness score suggests you are imaginative, creative, and open to new experiences. You thrive on exploring new ideas and enjoy thinking outside the box.",
    "People like you often find inspiration in art, culture, and innovation. Embrace your curiosity and let it lead you to exciting discoveries and personal growth."
  ],
  Conscientiousness: [
    "Your results show strong Conscientiousness. You are organized, reliable, and value structure in your life. Your attention to detail helps you achieve your goals and maintain high standards.",
    "Others appreciate your dependability and work ethic. Continue to use your discipline and planning skills to turn your ambitions into reality." 
  ],
  Extraversion: [
    "With Extraversion as your leading trait, you are energetic, outgoing, and enjoy connecting with others. Social situations invigorate you, and you bring enthusiasm to group activities.",
    "Your positive energy is contagious, making you a valued friend and teammate. Keep sharing your vibrant spirit with the world!"
  ],
  Agreeableness: [
    "Your high Agreeableness score highlights your compassion and empathy. You value harmony and are sensitive to the needs of those around you.",
    "People trust you for your kindness and support. Let your caring nature continue to foster strong, meaningful relationships in your life."
  ],
  Neuroticism: [
    "A higher Neuroticism score means you are sensitive and emotionally aware. You may experience strong feelings and occasional stress, but this also gives you deep insight into yourself and others.",
    "Remember to practice self-care and seek balance. Your emotional depth can be a source of strength and understanding for yourself and those you care about."
  ],
};

// Hobby suggestions for each dominant trait
const hobbies = {
  Openness: [
    'Painting or drawing',
    'Creative writing',
    'Traveling to new places',
    'Photography',
    'Learning new languages',
    'Exploring museums or art galleries',
    'Playing musical instruments',
  ],
  Conscientiousness: [
    'Gardening',
    'Chess or strategy games',
    'Journaling',
    'Organizing collections',
    'Model building',
    'Cooking with recipes',
    'Puzzle solving',
  ],
  Extraversion: [
    'Team sports',
    'Dancing',
    'Acting or improv',
    'Volunteering',
    'Group travel',
    'Hosting events',
    'Board game nights',
  ],
  Agreeableness: [
    'Volunteering',
    'Book clubs',
    'Animal care',
    'Cooking for friends',
    'Yoga or group fitness',
    'Mentoring',
    'Community gardening',
  ],
  Neuroticism: [
    'Meditation',
    'Solo hiking',
    'Journaling',
    'Painting',
    'Puzzle games',
    'Listening to music',
    'Mindfulness exercises',
  ],
};

function App() {
  const [screen, setScreen] = useState('welcome'); // 'welcome', 'quiz', 'result'
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [clickedIdx, setClickedIdx] = useState(null);
  const [sliderValue, setSliderValue] = useState(5);

  const handleStart = () => {
    setScreen('quiz');
  };

  const handleOptionClick = (idx) => {
    setClickedIdx(idx);
    const newSelected = [...selected];
    newSelected[current] = idx;
    setSelected(newSelected);
    setTimeout(() => {
      setClickedIdx(null);
      setSliderValue(5);
      if (current < questions.length - 1) {
        setCurrent(current + 1);
      } else {
        setScreen('result');
      }
    }, 250);
  };

  const handleSliderChange = (e) => {
    setSliderValue(Number(e.target.value));
  };

  const handleSliderRelease = () => {
    const newSelected = [...selected];
    newSelected[current] = sliderValue - 1;
    setSelected(newSelected);
    setTimeout(() => {
      setSliderValue(5);
      if (current < questions.length - 1) {
        setCurrent(current + 1);
      } else {
        setScreen('result');
      }
    }, 200);
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected([]);
    setScreen('welcome');
    setClickedIdx(null);
    setSliderValue(5);
  };

  // Calculate OCEAN scores (2-10 scale for each trait)
  const traitScores = questions.reduce((acc, q, idx) => {
    if (q.trait !== 'Visual') {
      acc[q.trait] = (acc[q.trait] || 0) + (selected[idx] !== undefined ? selected[idx] + 1 : 0);
    }
    return acc;
  }, {});

  // Count how many questions per trait (for normalization)
  const traitCounts = questions.reduce((acc, q) => {
    if (q.trait !== 'Visual') {
      acc[q.trait] = (acc[q.trait] || 0) + 1;
    }
    return acc;
  }, {});

  const handleFindHobbyNearMe = () => {
    // Find the highest trait (excluding Visual)
    const mainTraits = Object.keys(traitScores).filter(t => hobbies[t]);
    let maxTrait = mainTraits[0];
    mainTraits.forEach(trait => {
      if (traitScores[trait] > traitScores[maxTrait]) maxTrait = trait;
    });
    const topHobby = hobbies[maxTrait][0];
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const query = encodeURIComponent(`${topHobby} near me`);
          const url = `https://www.google.com/maps/search/${query}/@${latitude},${longitude},12z`;
          window.open(url, '_blank');
        },
        () => {
          // If user denies geolocation, just search without location
          const query = encodeURIComponent(`${topHobby} near me`);
          const url = `https://www.google.com/maps/search/${query}`;
          window.open(url, '_blank');
        }
      );
    } else {
      // Geolocation not supported
      const query = encodeURIComponent(`${topHobby} near me`);
      const url = `https://www.google.com/maps/search/${query}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="quiz-container">
      {screen === 'welcome' && (
        <>
          <h1>OCEAN Personality Test</h1>
          <div className="welcome-screen">
            <div className="watercolour-animation">
              <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse className="wc-blob1" cx="60" cy="60" rx="50" ry="35" fill="#b3c2d1" fillOpacity="0.7" />
                <ellipse className="wc-blob2" cx="120" cy="50" rx="35" ry="25" fill="#7fa1c4" fillOpacity="0.6" />
                <ellipse className="wc-blob3" cx="90" cy="90" rx="30" ry="18" fill="#e0e7ef" fillOpacity="0.5" />
              </svg>
            </div>
            <p style={{ margin: '2rem 0 1.5rem 0', fontSize: '1.15rem' }}>
              Discover your personality profile with the OCEAN (Big Five) test!<br/>
              Answer 15 quick questions to learn more about your traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.
            </p>
            <button className="start-btn" onClick={handleStart}>Start Test</button>
          </div>
        </>
      )}
      {screen === 'quiz' && (
        <div className="question-block">
          <h2>
            Question {current + 1} of {questions.length}
          </h2>
          <p>{questions[current].question}</p>
          {questions[current].image && !questions[current].imageOptions && !questions[current].type && (
            <img
              src={questions[current].image}
              alt="question visual"
              style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            />
          )}
          <div className="options">
            {questions[current].imageOptions ? (
              <div className="image-options">
                {questions[current].imageOptions.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    className={`option image-option${clickedIdx === idx ? ' clicked' : ''}`}
                    onClick={() => handleOptionClick(idx)}
                    disabled={clickedIdx !== null}
                    style={{ padding: 0, background: 'none', border: 'none', boxShadow: 'none' }}
                  >
                    <img
                      src={imgUrl}
                      alt={`option ${idx + 1}`}
                      style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: '10px', margin: '0.5rem', border: clickedIdx === idx ? '3px solid #0d6efd' : '2px solid #b3c2d1', transition: 'border 0.2s' }}
                    />
                  </button>
                ))}
              </div>
            ) : questions[current].type === 'slider' ? (
              <div className="slider-question">
                <div style={{margin: '0.5rem 0', fontWeight: 'bold', fontSize: '1.2rem'}}>Your answer: {sliderValue}</div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={sliderValue}
                  onChange={handleSliderChange}
                  onMouseUp={handleSliderRelease}
                  onTouchEnd={handleSliderRelease}
                  className="slider big-slider"
                  style={{ width: '90%', margin: '1.5rem 0' }}
                />
                <div className="slider-labels" style={{display:'flex', justifyContent:'space-between', fontSize:'0.95rem', marginTop:'-0.5rem'}}>
                  <span>Strongly Disagree</span>
                  <span>Strongly Agree</span>
                </div>
              </div>
            ) : (
              likertOptions.map((opt, idx) => (
                <button
                  key={idx}
                  className={`option${selected[current] === idx ? ' selected' : ''}${clickedIdx === idx ? ' clicked' : ''}`}
                  onClick={() => handleOptionClick(idx)}
                  disabled={clickedIdx !== null}
                >
                  {opt}
                </button>
              ))
            )}
          </div>
        </div>
      )}
      {screen === 'result' && (
        <>
          <h1>OCEAN Personality Test</h1>
          <div className="result">
            <h2>Your OCEAN Profile</h2>
            {/* Radar Chart */}
            <div style={{ maxWidth: 420, margin: '0 auto 2rem auto', background: '#f5f7fa', borderRadius: 16, padding: '1.5rem 0.5rem' }}>
              <Radar
                data={{
                  labels: Object.keys(traitScores).filter(t => t !== 'Visual'),
                  datasets: [
                    {
                      label: 'Your Score',
                      data: Object.entries(traitScores)
                        .filter(([trait]) => trait !== 'Visual')
                        .map(([_, score]) => score),
                      backgroundColor: 'rgba(79, 140, 255, 0.2)',
                      borderColor: 'rgba(79, 140, 255, 0.8)',
                      pointBackgroundColor: 'rgba(79, 140, 255, 1)',
                      pointBorderColor: '#fff',
                      pointHoverBackgroundColor: '#fff',
                      pointHoverBorderColor: 'rgba(79, 140, 255, 1)',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    r: {
                      min: 0,
                      max: Math.max(...Object.keys(traitCounts).map(trait => traitCounts[trait] * 5)),
                      ticks: {
                        stepSize: 2,
                        color: '#888',
                        font: { size: 12 },
                      },
                      pointLabels: {
                        color: '#333',
                        font: { size: 14, weight: 'bold' },
                      },
                      grid: { color: '#b3c2d1' },
                    },
                  },
                }}
                style={{ maxWidth: 400 }}
              />
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {Object.entries(traitScores).map(([trait, score]) => (
                <li key={trait} style={{ margin: '1rem 0' }}>
                  <strong>{trait}:</strong> {score} / {traitCounts[trait] * 5}
                  <div style={{ fontStyle: 'italic', marginTop: '0.25rem' }}>
                    {traitDescriptions[trait][getTraitLevel(score, traitCounts[trait] * 5)]}
                  </div>
                </li>
              ))}
            </ul>
            {/* Personalized ending */}
            {(() => {
              // Find the highest trait (excluding Visual)
              const mainTraits = Object.keys(traitScores).filter(t => endings[t]);
              let maxTrait = mainTraits[0];
              mainTraits.forEach(trait => {
                if (traitScores[trait] > traitScores[maxTrait]) maxTrait = trait;
              });
  return (
    <>
                  <div className="result-ending" style={{marginTop: '2rem', textAlign: 'left'}}>
                    <p>{endings[maxTrait][0]}</p>
                    <p>{endings[maxTrait][1]}</p>
      </div>
                  <div className="result-hobbies" style={{marginTop: '1.5rem', textAlign: 'left'}}>
                    <h3>Hobbies that may suit you:</h3>
                    <ul style={{marginTop: '0.5rem', marginBottom: 0}}>
                      {hobbies[maxTrait].map((hobby, idx) => (
                        <li key={idx} style={{marginBottom: '0.3rem'}}>{hobby}</li>
                      ))}
                    </ul>
                    <button className="find-hobby-btn" style={{marginTop: '1.2rem'}} onClick={handleFindHobbyNearMe}>
                      Find Hobby Near Me
        </button>
                  </div>
                </>
              );
            })()}
            <button onClick={handleRestart}>Restart Test</button>
      </div>
    </>
      )}
    </div>
  );
}

export default App
