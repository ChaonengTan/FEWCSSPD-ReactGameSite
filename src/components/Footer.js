import React from 'react'
import './Footer.css';

function Footer() {
    const date = new Date();
    return (
      <div className="Footer">
        <header>
          <h2>Copyright {date.getFullYear()}</h2>
        </header>
      </div>
    )
  }

export default Footer