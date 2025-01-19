import React from 'react';
import githubMark from './github-mark.svg';

interface GithubLoginButtonProps {
  onClick: () => void;
  style?: React.CSSProperties;
}

export const GithubLoginButton: React.FC<GithubLoginButtonProps> = ({ onClick, style }) => {
  return (
    <div style={{ ...style }}>
      <button
        onClick={onClick}
        style={{ height: '100%', background: 'transparent', border: 'none', cursor: 'pointer' }}
      >
        <img src={githubMark} alt='GitHub 登录' style={{ height: '100%' }} />
      </button>
    </div>
  );
};
