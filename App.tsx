import { useState, useEffect } from 'react';
import backgroundImage from 'figma:asset/7ede984272e2b001d7c12df417f78c9ba8ec5518.png';
import nebulaImage from 'figma:asset/a5c56cc337bac5d8dc86fbd8619daf5f2ca1bb32.png';
import foregroundImage from 'figma:asset/ff32bc2c373ef013b5882f28cf70a92d7ea4a326.png';
import skullImage from 'figma:asset/0720a84523ca3d6f24fbd18ef28f629f74a8f567.png';
import bloomMuralLogo from 'figma:asset/a89ea7ff067b2ff39bad127a8e95a387530f7b55.png';
import downArrow from 'figma:asset/07014a984312c7c918b251e249c6fba5ea50dd02.png';
import upArrow from 'figma:asset/09cde7458035b2ce3d6816fb902b451a8740358d.png';
import bTypeImage from 'figma:asset/da883cf57ebc908b1f66123495559baa6a5eab86.png';
import muralMockup from 'figma:asset/cf4ef5dc4bced8c6ae0d85224721a35bacd208ed.png';

export default function App() {
  const [currentView, setCurrentView] = useState<'about' | 'projects' | 'studioMural' | 'studioMuralBottom'>('about');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTransitioningToAbout, setIsTransitioningToAbout] = useState(false);
  const [isTransitioningToStudioMural, setIsTransitioningToStudioMural] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showStudioMuralContent, setShowStudioMuralContent] = useState(false);
  const [showStudioMuralBottomContent, setShowStudioMuralBottomContent] = useState(false);
  const [hideStudioMuralContent, setHideStudioMuralContent] = useState(false);
  const [skullOpacity, setSkullOpacity] = useState(1);
  const [downArrowOpacity, setDownArrowOpacity] = useState(0);
  
  const fullBioText = "I'm Luke, a first-year Visual Communication Design student at UTS who came to the degree later than most, with several years of professional experience already behind me. I have worked across branding, motion, and digital marketing, developing a practice that explores how design shapes emotion and perception.\n\nI believe design has become depersonalised by being treated as output rather than world-building. True design constructs energy and atmosphere. It should embrace the tools of the digital age while retaining an analogue soul, with texture, warmth, and imperfection that remind us of the human touch.\n\nEach project, no matter the scale, forms part of a greater visual narrative. My focus is on creating work that feels boldly alive, with imagery that is poignant, aesthetics that strike deeply, and experiences that resonate.";
  
  const studioMuralText = "I was interested in forming a distinct sense of belonging and connection to space through graphic expression - this flourished by using the pervasive cutting mats as a foundation for the piece. Whether or not it's realised, every student in 5A forms their own unique connection to their cutting mat, but we're all unified by the green and yellow grid.\n\nFlexible grid systems then became key - how crucial is the 1:1 box system? Can I retain that sense of connection if the grid is manipulated, expanded, refined?\n\nFurthermore, how can I manipulate typographic treatment to ensure legibility? What are the boundaries? The result plays on scale, forming almost an illusion of depth against the grid while still offering a nod towards the cutting mats, maintaining a sense of familiarity.";
  
  const [displayedText, setDisplayedText] = useState(fullBioText);
  
  // Reverse typewriter effect (About → Projects: delete bio text)
  useEffect(() => {
    if (isTransitioning && currentView === 'projects') {
      let index = fullBioText.length;
      const interval = setInterval(() => {
        if (index > 0) {
          index--;
          setDisplayedText(fullBioText.slice(0, index));
        } else {
          clearInterval(interval);
          setIsTransitioning(false);
          // Trigger projects animation after reverse typewriter completes
          setTimeout(() => setShowProjects(true), 50);
        }
      }, 0.01);
      
      return () => clearInterval(interval);
    }
  }, [isTransitioning, currentView]);

  // Forward typewriter effect (Projects → About: type bio text)
  useEffect(() => {
    if (isTransitioningToAbout && currentView === 'about') {
      setDisplayedText('');
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullBioText.length) {
          index++;
          setDisplayedText(fullBioText.slice(0, index));
        } else {
          clearInterval(interval);
          setIsTransitioningToAbout(false);
        }
      }, 0.01);
      
      return () => clearInterval(interval);
    }
  }, [isTransitioningToAbout, currentView]);

  // Forward typewriter effect (Projects → Studio Mural: type studio mural text)
  useEffect(() => {
    if (isTransitioningToStudioMural && currentView === 'studioMural') {
      setDisplayedText('');
      let index = 0;
      const interval = setInterval(() => {
        if (index < studioMuralText.length) {
          index++;
          setDisplayedText(studioMuralText.slice(0, index));
        } else {
          clearInterval(interval);
          setIsTransitioningToStudioMural(false);
        }
      }, 0.01);
      
      return () => clearInterval(interval);
    }
  }, [isTransitioningToStudioMural, currentView]);
  
  const handleProjectsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentView === 'about') {
      setShowProjects(false);
      setIsTransitioning(true);
      setCurrentView('projects');
    }
  };
  
  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentView === 'projects') {
      // Start by sliding projects up
      setShowProjects(false);
      
      // After slide-up animation completes (0.6s), switch to about and start typewriter
      setTimeout(() => {
        setCurrentView('about');
        setIsTransitioning(false);
        setIsTransitioningToAbout(true);
        setSkullOpacity(1);
      }, 600);
    } else if (currentView === 'studioMural') {
      // Reset studio mural states
      setShowStudioMuralContent(false);
      setDownArrowOpacity(0);
      
      setTimeout(() => {
        setCurrentView('about');
        setIsTransitioningToStudioMural(false);
        setIsTransitioningToAbout(true);
        setSkullOpacity(1);
      }, 600);
    }
  };

  const handleStudioMuralClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentView === 'projects') {
      // Slide projects up
      setShowProjects(false);
      
      // After slide-up completes, switch to studio mural and start animations
      setTimeout(() => {
        setCurrentView('studioMural');
        setIsTransitioningToStudioMural(true);
        
        // Fade out skull
        setSkullOpacity(0);
        
        // Show studio mural content (logo slides down, arrow fades in)
        setTimeout(() => setShowStudioMuralContent(true), 50);
        setTimeout(() => setDownArrowOpacity(1), 650);
      }, 600);
    }
  };

  const handleDownArrowClick = () => {
    if (currentView === 'studioMural') {
      // Move logo and down arrow up out of frame
      setHideStudioMuralContent(true);
      
      // After animation completes, switch to bottom page and show new content
      setTimeout(() => {
        setCurrentView('studioMuralBottom');
        setShowStudioMuralContent(false);
        setHideStudioMuralContent(false);
        setDownArrowOpacity(0);
        
        // Show bottom page content
        setTimeout(() => setShowStudioMuralBottomContent(true), 50);
      }, 600);
    }
  };
  
  const projects = [
    { name: 'STUDIO\nMURAL', handler: handleStudioMuralClick },
    { name: 'TYPE\nANATOMY', handler: (e: React.MouseEvent) => e.preventDefault() },
    { name: 'CHANCE\nAND CHOICE', handler: (e: React.MouseEvent) => e.preventDefault() },
    { name: 'PHOTO\nWORK', handler: (e: React.MouseEvent) => e.preventDefault() },
    { name: 'POST\nCARDS', handler: (e: React.MouseEvent) => e.preventDefault() },
    { name: 'UTS\nGARDEN', handler: (e: React.MouseEvent) => e.preventDefault() }
  ];
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Layer - Fixed */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Nebula Layer - Plus Lighter blend mode, 65% opacity */}
      <div 
        className="fixed inset-0 z-[5]"
        style={{
          backgroundImage: `url(${nebulaImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'plus-lighter',
          opacity: 0.65,
        }}
      />

      {/* Content Layer with 12-column x 5-row grid */}
      <div 
        className="relative z-10 w-full h-full"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(5, 1fr)',
          gap: '20px',
          padding: '20px',
        }}
      >
        {/* Skull Image - Centered in upper-left coral frame */}
        <div 
          className="absolute top-[-2%] left-[-1%] w-[50%] h-[85%] transition-opacity duration-600"
          style={{ opacity: skullOpacity }}
        >
          <img 
            src={skullImage} 
            alt="Skull illustration" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Bloom Mural Logo - Center aligned to columns 3-4, centered in rows 3-4 (third and fourth rows from bottom) */}
        {currentView === 'studioMural' && (
          <div 
            className="absolute flex items-center justify-center"
            style={{ 
              left: 'calc((100% - 40px) / 12 * 3 + 20px)',
              bottom: 'calc((100% - 40px) / 5 * 2 + 60px)',
              height: 'calc((100% - 40px) / 5 * 2 + 20px)',
              transform: hideStudioMuralContent 
                ? 'translateX(-50%) translateY(-150vh)' 
                : showStudioMuralContent 
                  ? 'translateX(-50%) translateY(0)' 
                  : 'translateX(-50%) translateY(-150vh)',
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <img 
              src={bloomMuralLogo} 
              alt="Bloom Mural Logo" 
              className="object-contain"
              style={{
                maxWidth: 'calc(((100% - 40px) / 12 * 4 + 60px) * 1.15)',
                maxHeight: '115%',
              }}
            />
          </div>
        )}

        {/* Down Arrow - Center aligned to columns 3-4, centered in rows 2-3 (second and third rows from bottom) */}
        {currentView === 'studioMural' && (
          <div 
            className="absolute flex items-center justify-center cursor-pointer"
            style={{ 
              left: 'calc((100% - 40px) / 12 * 3 + 20px)',
              bottom: 'calc((100% - 40px) / 5 * 1 + 60px)',
              height: 'calc((100% - 40px) / 5 * 2 + 20px)',
              transform: hideStudioMuralContent ? 'translateX(-50%) translateY(-150vh)' : 'translateX(-50%)',
              opacity: downArrowOpacity,
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s',
            }}
            onClick={handleDownArrowClick}
          >
            <img 
              src={downArrow} 
              alt="Down Arrow" 
              className="w-16 h-16 object-contain"
            />
          </div>
        )}

        {/* Studio Mural Bottom Page Content */}
        {/* Up Arrow - Very centre of columns 3-4, positioned at top */}
        {currentView === 'studioMuralBottom' && (
          <div 
            className="absolute flex items-center justify-center"
            style={{ 
              left: 'calc((100% - 40px) / 12 * 3 + 20px)',
              top: 'calc(20px + ((100% - 40px) / 5 * 0.5))',
              transform: showStudioMuralBottomContent ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(150vh)',
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <img 
              src={upArrow} 
              alt="Up Arrow" 
              className="w-16 h-16 object-contain"
            />
          </div>
        )}

        {/* B-TYPE Image - Center aligned to Up Arrow, Row 4 (fourth from bottom) */}
        {currentView === 'studioMuralBottom' && (
          <div 
            className="absolute flex items-center justify-center"
            style={{ 
              left: 'calc((100% - 40px) / 12 * 3 + 20px)',
              width: 'calc((100% - 40px) / 12 * 4 + 60px)',
              bottom: 'calc((100% - 40px) / 5 * 3 + 20px)',
              height: 'calc((100% - 40px) / 5 * 1)',
              transform: showStudioMuralBottomContent ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(150vh)',
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <img 
              src={bTypeImage} 
              alt="B-TYPE" 
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Mural Mockup - Centre aligned to up arrow position, doesn't go above row 3 from bottom */}
        {currentView === 'studioMuralBottom' && (
          <div 
            className="absolute flex items-start justify-center"
            style={{ 
              left: 'calc((100% - 40px) / 12 * 3 + 20px)',
              bottom: '0px',
              top: 'calc(100vh - ((100% - 40px) / 5 * 3 + 20px) + 20px)',
              transform: showStudioMuralBottomContent ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(150vh)',
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <img 
              src={muralMockup} 
              alt="Mural Mockup" 
              className="object-contain object-top"
              style={{
                maxWidth: 'calc(((100% - 40px) / 12 * 4 + 60px) * 1.1)',
                maxHeight: '100%',
              }}
            />
          </div>
        )}

        {/* Text Content - Columns 8-11 (4 columns second from right) */}
        {(currentView === 'about' || isTransitioning) && (
          <div 
            className="text-white"
            style={{ 
              gridColumn: '8 / 12',
              gridRow: '2',
              fontFamily: 'Futura, "Futura PT", "Century Gothic", "Apple Gothic", sans-serif'
            }}
          >
            <p style={{ fontWeight: 500, whiteSpace: 'pre-wrap' }}>
              {displayedText}
            </p>
          </div>
        )}

        {/* Studio Mural Text - Same position as bio text */}
        {(currentView === 'studioMural' || currentView === 'studioMuralBottom' || isTransitioningToStudioMural) && (
          <div 
            className="text-white"
            style={{ 
              gridColumn: '8 / 12',
              gridRow: '2',
              fontFamily: 'Futura, "Futura PT", "Century Gothic", "Apple Gothic", sans-serif'
            }}
          >
            <p style={{ fontWeight: 500, whiteSpace: 'pre-wrap' }}>
              {displayedText}
            </p>
          </div>
        )}
        
        {/* Projects List - Columns 9-10 (center) */}
        {currentView === 'projects' && !isTransitioning && (
          <div 
            className="text-white flex flex-col items-center justify-center"
            style={{ 
              gridColumn: '9 / 11',
              gridRow: '1 / 6',
              fontFamily: 'Futura, "Futura PT", "Century Gothic", "Apple Gothic", sans-serif',
              fontWeight: 500,
              gap: '35px',
              transform: showProjects ? 'translateY(-70px)' : 'translateY(-150vh)',
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {projects.map((project, index) => (
              <a
                key={index}
                href={`#project-${index}`}
                onClick={project.handler}
                className="text-center"
                style={{ 
                  whiteSpace: 'pre-line',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                }}
              >
                {project.name}
              </a>
            ))}
          </div>
        )}

        {/* Navigation Bar - Bottom */}
        <nav 
          className="text-white"
          style={{ 
            gridColumn: '1 / 13',
            gridRow: '5',
            alignSelf: 'end',
            marginBottom: '66px',
            fontFamily: 'Futura, "Futura PT", "Century Gothic", "Apple Gothic", sans-serif',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '20px',
          }}
        >
          <a 
            href="#about" 
            onClick={handleAboutClick} 
            style={{ 
              fontWeight: 500, 
              cursor: 'pointer',
              fontSize: '1.5rem',
              gridColumn: '8',
              justifySelf: 'start'
            }}
          >
            About
          </a>
          <a 
            href="#projects" 
            onClick={handleProjectsClick} 
            style={{ 
              fontWeight: 500, 
              cursor: 'pointer',
              fontSize: '1.5rem',
              gridColumn: '9 / 11',
              justifySelf: 'center'
            }}
          >
            Projects
          </a>
          <a 
            href="#contact" 
            style={{ 
              fontWeight: 500, 
              cursor: 'pointer',
              fontSize: '1.5rem',
              gridColumn: '11',
              justifySelf: 'end'
            }}
          >
            Contact
          </a>
        </nav>
      </div>

      {/* Foreground Layer - Fixed */}
      <div 
        className="fixed inset-0 z-20 pointer-events-none"
        style={{
          backgroundImage: `url(${foregroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}
