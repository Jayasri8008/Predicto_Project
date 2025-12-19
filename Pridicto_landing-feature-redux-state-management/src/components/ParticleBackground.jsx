import React, { useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticleBackground = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesLoaded = async (container) => {
    // console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: ["#3B82F6", "#8B5CF6", "#06B6D4", "#10B981"],
        },
        links: {
          color: "#3B82F6",
          distance: 150,
          enable: true,
          opacity: 0.1,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.5,
            sync: false
          }
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <Particles
      id={`tsparticles-${Math.random().toString(36).substr(2, 9)}`}
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
      className="absolute inset-0 -z-10"
    />
  );
};

export default ParticleBackground;