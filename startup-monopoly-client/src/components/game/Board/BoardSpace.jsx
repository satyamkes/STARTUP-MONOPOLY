import React from 'react';
import { motion } from 'framer-motion';
import { SPACE_TYPES } from '../../../constants/gameConfig';
import './BoardSpace.css';

const BoardSpace = ({ space, players, currentPlayerId, onClick }) => {
  const playersOnSpace = players?.filter(p => p.position === space.position) || [];
  const isCurrentPlayerSpace = playersOnSpace.some(p => p.id === currentPlayerId);

  const getSpaceStyle = () => {
    if (space.type === SPACE_TYPES.SECTOR && space.sector) {
      return {
        borderTopColor: space.sector.color,
        borderTopWidth: '4px',
      };
    }
    return {};
  };

  const getOwnerInfo = () => {
    if (space.type !== SPACE_TYPES.SECTOR) return null;
    
    const owner = players?.find(p => 
      p.sectors?.some(s => s.sectorId === space.sectorId && s.position === space.position)
    );
    
    return owner;
  };

  const owner = getOwnerInfo();

  return (
    <motion.div
      className={`board-space ${space.type} ${isCurrentPlayerSpace ? 'current-player' : ''}`}
      style={getSpaceStyle()}
      onClick={() => onClick?.(space)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Space Header */}
      <div className="space-header">
        <span className="space-icon text-2xl">{space.icon}</span>
      </div>

      {/* Space Content */}
      <div className="space-content">
        <h4 className="space-title text-xs font-display uppercase truncate">
          {space.label || space.sector?.name}
        </h4>
        
        {space.type === SPACE_TYPES.SECTOR && space.sector && (
          <div className="space-details">
            <p className="space-cost text-xs font-mono">
              ₹{(space.sector.entryCost / 1000)}K
            </p>
            {owner && (
              <div 
                className="space-owner-indicator"
                style={{ backgroundColor: owner.color }}
              />
            )}
          </div>
        )}

        {space.type === SPACE_TYPES.TAX && (
          <p className="space-cost text-xs font-mono text-red-400">
            -₹{(space.amount / 1000)}K
          </p>
        )}

        {space.type === SPACE_TYPES.START && (
          <p className="space-cost text-xs font-mono text-green-400">
            +₹{(space.bonus / 1000)}K
          </p>
        )}
      </div>

      {/* Player Tokens */}
      {playersOnSpace.length > 0 && (
        <div className="space-tokens">
          {playersOnSpace.slice(0, 3).map((player, idx) => (
            <div
              key={player.id}
              className="token-mini"
              style={{
                backgroundColor: player.color,
                zIndex: playersOnSpace.length - idx,
              }}
              title={player.teamName}
            >
              <span className="text-xs">{player.token}</span>
            </div>
          ))}
          {playersOnSpace.length > 3 && (
            <div className="token-mini token-more">
              +{playersOnSpace.length - 3}
            </div>
          )}
        </div>
      )}

      {/* Upgrade Level Indicator */}
      {owner && space.type === SPACE_TYPES.SECTOR && (
        <div className="upgrade-indicators">
          {owner.sectors?.find(s => s.sectorId === space.sectorId && s.position === space.position)?.upgradeLevel && (
            <div className="upgrade-dots">
              {['mvp', 'product', 'scale'].map((level, idx) => {
                const playerSector = owner.sectors.find(s => s.sectorId === space.sectorId && s.position === space.position);
                const currentLevel = playerSector?.upgradeLevel || 'none';
                const levels = ['none', 'mvp', 'product', 'scale'];
                const isActive = levels.indexOf(currentLevel) > idx;
                
                return (
                  <div
                    key={level}
                    className={`upgrade-dot ${isActive ? 'active' : ''}`}
                    style={{ backgroundColor: isActive ? space.sector.color : '#374151' }}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default BoardSpace;