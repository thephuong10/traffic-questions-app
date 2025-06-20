import React from 'react';
import { Link } from 'react-router-dom';

function MainPage({ tests }) {
  return (
      <div className="home-container">
        <h1>Chọn đề thi</h1>
        <div className="cards-container">
          {tests.map((test, idx) => (
            <div className="card">
              <Link to={`/test-hard/${idx}`} key={idx} style={{ textDecoration: 'none', width:'100%' }}>
                <div className="card-content">
                  <h2>Đề {idx + 1}</h2>
                  <p>25 câu hỏi</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
}

export default MainPage;