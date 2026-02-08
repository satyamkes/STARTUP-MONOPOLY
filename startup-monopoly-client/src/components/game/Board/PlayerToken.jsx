import React from 'react';
import { motion } from 'framer-motion';
import './PlayerToken.css';

const PlayerToken = ({ player, position, isCurrentPlayer }) => {
  return (
    <motion.div

      className={`player-token ${isCurrentPlayer ? 'current' : ''}`}
      style={{
        backgroundColor: player.color,
        borderColor: player.color,
      }}

       initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        y: isCurrentPlayer ? [0, -5, 0] : 0,
      }}
      transition={{
        scale:{ duration: 0.3},
        y:{
          duration:1,
          repeat: isCurrentPlayer ? Infinity : 0,
          ease: 'easeInOut',
        }
      }}
      
      whileHover={{scale: 1.1}}
    >
      <span className="token-emoji">{player.token}</span>
      {isCurrentPlayer && (
        <motion.div
          className="token-glow "
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{

            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.div>
  );
};

export default PlayerToken;