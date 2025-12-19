import React, { useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Lightbulb, MessageCircle, ThumbsUp } from 'lucide-react';
import aiSuggestionEngine from '../services/aiSuggestionEngine';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Arial, Helvetica, sans-serif',
  headerBgColor: '#6366f1',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#6366f1',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

// Suggestion Card Component for Chatbot
const SuggestionCard = ({ suggestion, onVote }) => (
  <div style={{
    background: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '12px',
    margin: '8px 0',
    maxWidth: '280px'
  }}>
    <div style={{ fontWeight: 'bold', marginBottom: '6px', fontSize: '14px' }}>
      {suggestion.title}
    </div>
    <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '8px' }}>
      {suggestion.description}
    </div>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '11px',
      color: '#495057'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>👍 {suggestion.netVotes || 0}</span>
        <span>💬 {suggestion.commentCount || 0}</span>
      </div>
      <button
        onClick={() => onVote(suggestion.id)}
        style={{
          background: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
          fontSize: '11px'
        }}
      >
        Vote
      </button>
    </div>
  </div>
);

const getSuggestionSteps = (suggestions, dispatch, navigate) => [
  {
    id: '1',
    message: 'Hello! How can I help you today?',
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 1, label: 'Learn about our services', trigger: '3' },
      { value: 2, label: 'Get personalized suggestions', trigger: '7' },
      { value: 3, label: 'Browse community ideas', trigger: '8' },
      { value: 4, label: 'Get a quote', trigger: '4' },
      { value: 5, label: 'Contact us', trigger: '5' },
      { value: 6, label: 'Explore now', trigger: '6' },
    ],
  },
  {
    id: '3',
    message: 'We offer Business Plans, Pitch Decks, Financial Modelling, Market Research, Startup Consulting, and HR Support. Which one interests you?',
    trigger: '2',
  },
  {
    id: '4',
    message: 'Please visit our Contact page to request a proposal. We\'ll get back to you soon!',
    end: true,
  },
  {
    id: '5',
    message: 'You can reach us at info@predicto.ai or visit the Contact page.',
    end: true,
  },
  {
    id: '6',
    message: 'Navigating to home page...',
    trigger: '7',
  },
  {
    id: '7',
    component: <NavigateToHome />,
    end: true,
  },
  {
    id: '7',
    component: <PersonalizedSuggestionsComponent />,
    trigger: '9',
  },
  {
    id: '8',
    component: <CommunitySuggestionsComponent />,
    trigger: '10',
  },
  {
    id: '9',
    message: 'Would you like to vote on any of these suggestions or explore more options?',
    trigger: '11',
  },
  {
    id: '10',
    message: 'What do you think about these community ideas? Want to vote or add your own suggestion?',
    trigger: '12',
  },
  {
    id: '11',
    options: [
      { value: 'vote', label: 'Vote on suggestions', trigger: '13' },
      { value: 'more', label: 'See more suggestions', trigger: '8' },
      { value: 'create', label: 'Create new suggestion', trigger: '14' },
      { value: 'done', label: 'That\'s all for now', trigger: '2' },
    ],
  },
  {
    id: '12',
    options: [
      { value: 'vote', label: 'Vote on suggestions', trigger: '13' },
      { value: 'create', label: 'Create new suggestion', trigger: '14' },
      { value: 'done', label: 'Thanks!', trigger: '2' },
    ],
  },
  {
    id: '13',
    component: <VoteComponent />,
    trigger: '15',
  },
  {
    id: '14',
    component: <CreateSuggestionComponent />,
    trigger: '2',
  },
  {
    id: '15',
    message: 'Great! Your vote has been recorded. Is there anything else I can help you with?',
    trigger: '2',
  },
];

// Personalized Suggestions Component
const PersonalizedSuggestionsComponent = () => {
  const { suggestions } = useSelector(state => state.suggestions);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const personalizedSuggestions = React.useMemo(() => {
    if (!isAuthenticated || !suggestions.length) return [];
    
    return aiSuggestionEngine.generatePersonalizedSuggestions(
      user,
      suggestions.slice(0, 3),
      {} // user behavior data
    );
  }, [suggestions, user, isAuthenticated]);

  return (
    <div>
      <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>
        💡 Personalized Suggestions for You
      </div>
      {personalizedSuggestions.map(suggestion => (
        <SuggestionCard 
          key={suggestion.id} 
          suggestion={suggestion} 
          onVote={(id) => {
            // Handle voting logic here
            console.log('Voting on suggestion:', id);
          }}
        />
      ))}
      {personalizedSuggestions.length === 0 && (
        <div style={{ fontStyle: 'italic', color: '#6c757d' }}>
          No personalized suggestions available at the moment.
        </div>
      )}
    </div>
  );
};

// Community Suggestions Component
const CommunitySuggestionsComponent = () => {
  const { suggestions } = useSelector(state => state.suggestions);
  
  const topSuggestions = suggestions
    .sort((a, b) => (b.netVotes || 0) - (a.netVotes || 0))
    .slice(0, 3);

  return (
    <div>
      <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>
        🔥 Trending Community Ideas
      </div>
      {topSuggestions.map(suggestion => (
        <SuggestionCard 
          key={suggestion.id} 
          suggestion={suggestion} 
          onVote={(id) => {
            console.log('Voting on suggestion:', id);
          }}
        />
      ))}
    </div>
  );
};

// Vote Component
const VoteComponent = () => (
  <div>
    <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>
      👍 Voting Made Easy!
    </div>
    <div style={{ fontSize: '14px', color: '#6c757d' }}>
      Click the "Vote" button on any suggestion you like. Your voice helps shape our platform!
    </div>
  </div>
);

// Create Suggestion Component  
const CreateSuggestionComponent = () => (
  <div>
    <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>
      ✨ Share Your Ideas
    </div>
    <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '8px' }}>
      We love hearing from our community! Your suggestions help us improve.
    </div>
    <div style={{ fontSize: '13px', color: '#495057' }}>
      Visit our Suggestions page to submit your idea and see what others are thinking about!
    </div>
  </div>
);

function NavigateToHome() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/');
  }, [navigate]);
  return null;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { suggestions } = useSelector(state => state.suggestions);
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Generate dynamic steps based on current state
  const dynamicSteps = getSuggestionSteps(suggestions, dispatch, navigate);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          cursor: 'pointer',
          fontSize: '24px',
        }}
        onClick={toggleChat}
        title="Chat with us - Get personalized suggestions!"
      >
        {isAuthenticated ? '🤖✨' : '🤖'}
      </div>
      {isOpen && (
        <ThemeProvider theme={theme}>
          <ChatBot 
            steps={dynamicSteps} 
            floating={false}
            placeholder="Type your message..."
            enableSmoothScroll={true}
          />
        </ThemeProvider>
      )}
    </>
  );
}
